import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionTokens } from '../../motion/tokens';

const HeroAnimatedContent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const { hero } = MotionTokens;

    const tl = gsap.timeline();

    // Headline: line-by-line entrance, each line delayed ~80ms.
    // Opacity + slight upward movement. No dramatic motion.
    tl.fromTo(
      el.querySelectorAll('.hero-line'),
      { opacity: 0, y: hero.distance },
      { opacity: 1, y: 0, duration: hero.duration, ease: hero.ease, stagger: 0.08 },
      0
    );

    // CTA row: appears in sync with the title (starts at t = 0), so buttons
    // enter the layout at the same moment as the headline. Uses the same
    // opacity + upward-movement entrance as the title for visual cohesion.
    tl.fromTo(
      el.querySelectorAll('.hero-cta'),
      { opacity: 0, y: hero.distance },
      { opacity: 1, y: 0, duration: hero.duration, ease: hero.ease, stagger: 0.08 },
      0
    );
  }, []);

  return (
    <div ref={ref}>
      <h1 className="hero-title-block">
        <span className="hero-line hero-line-primary">Designed</span>
        <span className="hero-line hero-line-connector">for</span>
        <span className="hero-line hero-line-primary">Better</span>
        <span className="hero-line hero-line-supporting">Outdoor Living</span>
      </h1>

      <div className="hero-cta-row">
        <a
          className="hero-cta inline-flex w-full items-center justify-center rounded-[11px] bg-[#C67A52] px-8 py-3.5 text-base font-medium text-white hover:-translate-y-[2px] hover:bg-[#B36842] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C67A52] sm:w-auto"
          href="/collection"
        >
          Explore Collection
        </a>
        <a
          className="hero-cta inline-flex w-full items-center justify-center rounded-[11px] border border-text-heading/30 bg-transparent px-8 py-3.5 text-base font-medium text-text-heading hover:-translate-y-[2px] hover:border-[#C67A52] hover:text-[#C67A52] focus:outline-none focus:ring-2 focus:ring-text-heading sm:w-auto"
          href="/contact"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default HeroAnimatedContent;
