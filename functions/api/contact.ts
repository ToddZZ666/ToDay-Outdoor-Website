import type { ContactRequestBody, ContactApiResponse } from '../../src/types/contact';
import { validateContactPayload } from '../../src/lib/validation';
import { sendAdminInquiryEmail, sendVisitorAutoReplyEmail } from '../../src/lib/resend';

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const jsonResponse = (data: ContactApiResponse, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });

  try {
    const { request, env } = context;

    // 1. Parse JSON Body
    let body: ContactRequestBody;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON request format.' }, 400);
    }

    const { payload, metadata } = body || {};
    if (!payload) {
      return jsonResponse({ success: false, error: 'Missing request payload.' }, 400);
    }

    // 2. Validate Payload & Honeypot
    const validation = validateContactPayload(payload);
    if (!validation.isValid || !validation.sanitizedPayload) {
      return jsonResponse({ success: false, error: validation.error || 'Invalid form input.' }, 422);
    }

    const sanitizedPayload = validation.sanitizedPayload;

    // 3. Verify Cloudflare Turnstile Token (if TURNSTILE_SECRET_KEY is set in Cloudflare Env)
    if (env.TURNSTILE_SECRET_KEY && sanitizedPayload.turnstileToken) {
      try {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: sanitizedPayload.turnstileToken,
            remoteip: request.headers.get('CF-Connecting-IP') || '',
          }),
        });

        const verifyData: any = await verifyRes.json();
        if (!verifyData.success) {
          return jsonResponse({ success: false, error: 'Spam protection check failed. Please try again.' }, 403);
        }
      } catch (turnstileErr) {
        console.error('Turnstile verification error:', turnstileErr);
        // Continue if turnstile service has temporary issue to avoid blocking real users
      }
    }

    // 4. Check RESEND_API_KEY
    const resendApiKey = env.RESEND_API_KEY;
    if (!resendApiKey) {
      // In local dev without key, log warning and return success for client UI testing
      console.warn('[Contact API] RESEND_API_KEY environment variable is not configured.');
      return jsonResponse({
        success: true,
        message: 'Inquiry received (Development Mode: RESEND_API_KEY not configured).',
      });
    }

    // 5. Send Admin Notification Email via Resend
    const adminResult = await sendAdminInquiryEmail(resendApiKey, sanitizedPayload, metadata || {
      timestamp: new Date().toISOString(),
      sourceUrl: request.url,
      referrer: request.headers.get('Referer') || '',
      browserLang: request.headers.get('Accept-Language') || '',
    });

    if (!adminResult.ok) {
      console.error('Failed to send admin inquiry email:', adminResult.error);
      return jsonResponse({ success: false, error: 'Failed to deliver inquiry email. Please try again or contact us directly.' }, 500);
    }

    // 6. Send Visitor Auto-reply Email (Asynchronously, fail-soft)
    sendVisitorAutoReplyEmail(resendApiKey, sanitizedPayload).catch((err) => {
      console.error('Auto-reply email failed:', err);
    });

    return jsonResponse({
      success: true,
      message: 'Thank you. Your inquiry has been sent successfully.',
    });
  } catch (err: any) {
    console.error('Unexpected error in /api/contact endpoint:', err);
    return jsonResponse({ success: false, error: 'An unexpected server error occurred. Please try again.' }, 500);
  }
}
