import type { ContactPayload, ContactMetadata } from '../types/contact';

const RESEND_API_URL = 'https://api.resend.com/emails';
const ADMIN_EMAIL = 'hello@today-outdoor.com';
const FROM_EMAIL = 'ToDay Website <no-reply@today-outdoor.com>';

export async function sendAdminInquiryEmail(
  apiKey: string,
  payload: ContactPayload,
  metadata: ContactMetadata
): Promise<{ ok: boolean; error?: string }> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1E1B18; padding: 40px 20px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #EAE5DE; border-radius: 8px; overflow: hidden; padding: 32px; }
    .header { border-bottom: 2px solid #4A4638; padding-bottom: 16px; margin-bottom: 24px; }
    .header h2 { font-size: 20px; font-weight: 600; color: #4A4638; margin: 0; text-transform: uppercase; letter-spacing: 0.1em; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #B86B4E; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1E1B18; white-space: pre-wrap; }
    .meta-box { background: #FAF8F5; border: 1px solid #EAE5DE; border-radius: 6px; padding: 16px; margin-top: 32px; font-size: 12px; color: #78716C; }
    .meta-title { font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4A4638; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Inquiry — ToDay Website</h2>
    </div>

    <div class="field">
      <div class="label">Full Name</div>
      <div class="value">${payload.name}</div>
    </div>

    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${payload.email}" style="color:#B86B4E;text-decoration:none;">${payload.email}</a></div>
    </div>

    ${payload.company ? `
    <div class="field">
      <div class="label">Company / Trade</div>
      <div class="value">${payload.company}</div>
    </div>` : ''}

    ${payload.phone ? `
    <div class="field">
      <div class="label">Phone Number</div>
      <div class="value">${payload.phone}</div>
    </div>` : ''}

    ${payload.country ? `
    <div class="field">
      <div class="label">Country / Region</div>
      <div class="value">${payload.country}</div>
    </div>` : ''}

    ${payload.productOfInterest ? `
    <div class="field">
      <div class="label">Product of Interest</div>
      <div class="value">${payload.productOfInterest}</div>
    </div>` : ''}

    <div class="field" style="margin-top: 24px;">
      <div class="label">Message</div>
      <div class="value">${payload.message}</div>
    </div>

    <div class="meta-box">
      <div class="meta-title">Metadata & Analytics</div>
      <div><strong>Timestamp:</strong> ${metadata.timestamp || new Date().toISOString()}</div>
      <div><strong>Source Page:</strong> ${metadata.sourceUrl || 'N/A'}</div>
      <div><strong>Referrer:</strong> ${metadata.referrer || 'Direct'}</div>
      <div><strong>Browser Lang:</strong> ${metadata.browserLang || 'N/A'}</div>
      ${metadata.utmSource ? `<div><strong>UTM Source:</strong> ${metadata.utmSource}</div>` : ''}
      ${metadata.utmMedium ? `<div><strong>UTM Medium:</strong> ${metadata.utmMedium}</div>` : ''}
      ${metadata.utmCampaign ? `<div><strong>UTM Campaign:</strong> ${metadata.utmCampaign}</div>` : ''}
    </div>
  </div>
</body>
</html>
  `;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        reply_to: payload.email,
        subject: `New Inquiry from ${payload.name} — ToDay Website`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Resend API Admin Email error (${res.status}): ${errText}` };
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message || 'Failed to connect to Resend API' };
  }
}

export async function sendVisitorAutoReplyEmail(
  apiKey: string,
  payload: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1E1B18; padding: 40px 20px; line-height: 1.7; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #EAE5DE; border-radius: 8px; padding: 40px 32px; }
    .logo { font-size: 22px; font-weight: 300; letter-spacing: 0.15em; color: #4A4638; margin-bottom: 32px; text-transform: uppercase; border-bottom: 1px solid #EAE5DE; padding-bottom: 16px; }
    p { margin-bottom: 20px; font-size: 15px; color: #4A4638; }
    .footer { margin-top: 40px; pt-6; border-top: 1px solid #EAE5DE; font-size: 13px; color: #78716C; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">ToDay — Outdoor Living</div>

    <p>Hi ${payload.name},</p>

    <p>Thank you for reaching out to ToDay. We have successfully received your inquiry.</p>

    <p>Our design team is reviewing your project details and will respond within 1–2 business days.</p>

    <p>In the meantime, feel free to explore our latest outdoor collections on our website.</p>

    <p>Best regards,<br/><strong>The ToDay Team</strong></p>

    <div class="footer">
      ToDay Outdoor Living &middot; hello@today-outdoor.com
    </div>
  </div>
</body>
</html>
  `;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.email],
        subject: 'Thank you for contacting ToDay',
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Resend API Auto-reply error (${res.status}): ${errText}` };
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message || 'Failed to send auto-reply' };
  }
}
