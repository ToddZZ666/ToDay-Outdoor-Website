import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: Record<string, number | string>;
  to?: Record<string, number | string>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  overflowVisible?: boolean;
  onLetterAnimationComplete?: () => void;
}

let gsapRegistered = false;
function ensureGSAP() {
  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
    gsapRegistered = true;
  }
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  startDelay = 0,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
  overflowVisible = false,
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const isTextTag = Tag === 'p' || Tag === 'span' || Tag === 'div';

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      }
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    if (animationCompletedRef.current) return;

    ensureGSAP();

    const el = ref.current;

    if ((el as any)._rbsplitInstance) {
      try {
        (el as any)._rbsplitInstance.revert();
      } catch (_) {
        /* noop */
      }
      (el as any)._rbsplitInstance = null;
    }

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets: Element[] = [];
    const assignTargets = (self: any) => {
      if (splitType.includes('chars') && self.chars?.length) targets = self.chars;
      if (!targets.length && splitType.includes('words') && self.words?.length) targets = self.words;
      if (!targets.length && splitType.includes('lines') && self.lines?.length) targets = self.lines;
      if (!targets.length) targets = self.chars || self.words || self.lines;
    };

    const splitInstance = new GSAPSplitText(el, {
      type: splitType as 'chars' | 'words' | 'lines',
      smartWrap: true,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      reduceWhiteSpace: false,
      onSplit: (self: any) => {
        assignTargets(self);
        gsap.fromTo(
          targets,
          { ...from },
          {
            ...to,
            duration,
            ease,
            delay: startDelay,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
              fastScrollEnd: true,
              anticipatePin: 0.4,
            },
            onComplete: () => {
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
            willChange: 'transform, opacity',
            force3D: true,
          }
        );
      },
    });

    (el as any)._rbsplitInstance = splitInstance;

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      try {
        splitInstance.revert();
      } catch (_) {
        /* noop */
      }
      (el as any)._rbsplitInstance = null;
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin,
    fontsLoaded,
  ]);

  const style: React.CSSProperties = {
    textAlign: textAlign as any,
    overflow: overflowVisible ? 'visible' : 'hidden',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
    fontFamily: isTextTag
      ? 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      : '"Cormorant Garamond", Georgia, "Times New Roman", serif',
    fontWeight: isTextTag ? 400 : 500,
    letterSpacing: isTextTag ? undefined : '-0.01em',
  };

  return (
    <Tag ref={ref as any} style={style} className={`split-parent ${className}`}>
      {text}
    </Tag>
  );
};

export default SplitText;