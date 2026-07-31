/**
 * HeroZoom — imperceptible cinematic zoom on the hero background.
 *
 * Scales the element matched by `selector` (default `.hero-image`) from
 * 1.06 → 1.00 over ~13 seconds (linear). References MotionTokens.heroZoom.
 *
 * Mount via Astro `client:load`; the tween targets the already-rendered
 * hero background image. Container uses object-cover so the oversize start
 * scale is never visible.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const HERO_ZOOM_DURATION = 13;
export const HERO_ZOOM_START = 1.06;
export const HERO_ZOOM_END = 1.0;

interface HeroZoomProps {
  selector?: string;
}

const HeroZoom = ({ selector = '.hero-image' }: HeroZoomProps) => {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const el = document.querySelector(selector);
    if (!(el instanceof HTMLElement)) return;

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.set(el, {
      scale: HERO_ZOOM_START,
      transformOrigin: 'center center',
      willChange: 'transform',
    });

    const tween = gsap.to(el, {
      scale: HERO_ZOOM_END,
      duration: HERO_ZOOM_DURATION,
      ease: 'none',
    });

    return () => {
      tween.kill();
    };
  }, [selector]);

  return null;
};

export default HeroZoom;
