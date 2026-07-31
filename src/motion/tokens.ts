/**
 * ToDay Motion Language v1.0 Tokens
 * Single source of truth for website motion architecture.
 *
 * All GSAP, rAF tilt, and CSS transitions reference these global tokens.
 *
 * Principles:
 *   Quiet Luxury     → Soft, deceleration without bounce
 *   Slow Time        → Unhurried durations (250ms - 1200ms)
 *   Natural Light    → Luminance & shadow transitions
 *   Conversational   → Tactile active press feedback
 */

export const MotionDurations = {
  /** Quick tactile feedback (Press / Active) */
  fast: 150,
  /** Standard hover & swatch transitions */
  normal: 250,
  /** Section reveals & modal dropdowns */
  soft: 400,
  /** Scrim fades & full dark-to-light transitions */
  slow: 800,
  /** Ambient environmental shifts (seconds) */
  ambient: 12000,
} as const;

export const MotionEasings = {
  /** Primary brand curve: smooth deceleration, zero bounce */
  natural: 'cubic-bezier(0.25, 1, 0.3, 1)' as const,
  /** Soft entrance easing for text and section reveals */
  soft: 'cubic-bezier(0.16, 1, 0.3, 1)' as const,
  /** Gentle cross-fade easing for opacity transitions */
  gentle: 'cubic-bezier(0.4, 0, 0.2, 1)' as const,
  /** Crisp instant curve for touch press feedback */
  crisp: 'cubic-bezier(0, 0, 0.2, 1)' as const,
} as const;

export const MotionTokens = {
  /** Hero headline: line-by-line entrance */
  hero: { duration: 0.8, distance: 24, ease: MotionEasings.soft },

  /** Hero background: imperceptible slow cinematic movement */
  heroZoom: { duration: 13, ease: 'none' as const },

  /** Section headings: opacity + 16px rise once */
  section: { duration: 0.5, distance: 16, ease: MotionEasings.soft },

  /** Images: gentle depth pull-in (1.03 → 1.00) */
  image: { duration: 1.0, scale: 1.03, ease: MotionEasings.soft },

  /** Cards: staggered reveal */
  card: { duration: 0.4, distance: 10, stagger: 0.08, ease: MotionEasings.soft },

  /** CTA buttons: tactile depress feedback */
  cta: { pressScale: 0.985, duration: 0.15, ease: MotionEasings.crisp },

  /** Paragraph sentences: progressive reading rhythm */
  sentence: { duration: 0.45, stagger: 0.1, ease: MotionEasings.soft },

  /** Hover transitions */
  hover: { duration: 0.25, ease: MotionEasings.natural },

  /** 3D Tilt Card rAF physics parameters */
  tilt: {
    damping: 0.28,
    hoverScale: 1.025,
    maxRotateX: 3.5,
    maxRotateY: 5.5,
    restTransitionMs: 500,
  },
} as const;
