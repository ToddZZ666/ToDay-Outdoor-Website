import type { ContactPayload } from '../types/contact';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function sanitizeString(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function validateContactPayload(payload: Partial<ContactPayload>): {
  isValid: boolean;
  error?: string;
  sanitizedPayload?: ContactPayload;
} {
  // 1. Honeypot Check
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    return { isValid: false, error: 'Spam submission detected.' };
  }

  // 2. Required Fields
  const name = sanitizeString(payload.name || '');
  const email = (payload.email || '').trim().toLowerCase();
  const message = sanitizeString(payload.message || '');

  if (!name) {
    return { isValid: false, error: 'Please enter your name.' };
  }
  if (name.length > 100) {
    return { isValid: false, error: 'Name must be under 100 characters.' };
  }

  if (!email) {
    return { isValid: false, error: 'Please enter your email address.' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  if (!message) {
    return { isValid: false, error: 'Please enter your message.' };
  }
  if (message.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long.' };
  }
  if (message.length > 3000) {
    return { isValid: false, error: 'Message cannot exceed 3000 characters.' };
  }

  // 3. Optional Fields
  const company = sanitizeString(payload.company || '');
  const country = sanitizeString(payload.country || '');
  const phone = sanitizeString(payload.phone || '');
  const productOfInterest = sanitizeString(payload.productOfInterest || '');

  return {
    isValid: true,
    sanitizedPayload: {
      name,
      email,
      message,
      company,
      country,
      phone,
      productOfInterest,
      turnstileToken: payload.turnstileToken,
    },
  };
}
