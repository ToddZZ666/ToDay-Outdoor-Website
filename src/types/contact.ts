export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  country?: string;
  phone?: string;
  productOfInterest?: string;
  honeypot?: string;
  turnstileToken?: string;
}

export interface ContactMetadata {
  timestamp: string;
  sourceUrl: string;
  referrer: string;
  browserLang: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ContactRequestBody {
  payload: ContactPayload;
  metadata: ContactMetadata;
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
