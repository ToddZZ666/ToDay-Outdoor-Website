/**
 * TiltCard — restrained 3D parallax for a single Featured Collection card.
 *
 * Behaviour:
 *   - The card content lives inside `.tilt-card-inner`. On mouse enter this
 *     inner layer tilts subtly with the pointer (≤ ±3° X / ≤ ±5° Y) and lifts
 *     ~4px.
 *   - Image, title, and the "Explore" CTA sit at different translateZ depths
 *     (set in collection.css), creating a quiet sense of space.
 *   - On cards marked with [data-tilt-layered] (Riviera) the inner layer also
 *     scales up subtly (HOVER_SCALE) while the pointer is over the card — the
 *     scale is composited into the same transform the tilt uses, so both the
 *     zoom-in and the 3D parallax are visible at once.
 *   - Mouse moves are driven through requestAnimationFrame with soft damping;
 *     on mouse leave the inner layer eases back to rest (620ms).
 *   - Reduced-motion / mobile disables the effect entirely (plain hover only).
 *
 * The card container itself never rotates, so the existing entrance tween and
 * the existing card hover CSS stay untouched.
 *
 * Astro integration: use a bare `<script>` (no attributes) so Astro bundles
 * this module. Do NOT use client:load / client:only / type="module".
 */

const ReducedMotion = (function () {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

const IsMobile = (function () {
  if (typeof window === 'undefined') return true;
  // Match the same breakpoint the page's CSS uses: mobile is width < 768px.
  // When innerWidth === 0 (headless environment) we treat it as desktop so
  // the tilt wires up for diagnostics; the effect is a no-op on a 0-wide
  // card anyway.
  return window.innerWidth > 0 && window.innerWidth < 768;
})();

const CONFIG = {
  // Max rotation (degrees). Restrained for refined, calm architectural feel.
  maxX: 3.5,
  maxY: 5.5,
  perspective: 1800,
  lift: 4,
  restTransition: 620,
  moveTransition: 220,
  easing: 'cubic-bezier(0.25, 1, 0.3, 1)',
  // Damping factor — lower = smoother / slower to follow pointer.
  damping: 0.28,
  // Subtle zoom-in scale applied only to layered cards [data-tilt-layered]
  hoverScale: 1.03,
};

/**
 * Initialise the 3D tilt on every card marked with [data-tilt].
 *
 * The card is expected to contain a single direct child with class
 * `tilt-card-inner` (built into the card markup). If the inner layer is
 * absent the call is a no-op.
 *
 * @param {string} [selector] — selector for the card container.
 *                              Defaults to '.card-item[data-tilt]'.
 */
export function initTiltCards(selector) {
  if (ReducedMotion || IsMobile) return;

  const target = selector || '.card-item[data-tilt]';
  const cards = document.querySelectorAll(target);
  Array.prototype.slice.call(cards).forEach(wireCard);
}

/** Wire a single card to tilt. */
function wireCard(card) {
  if (card.__tiltWired) return;
  card.__tiltWired = true;

  const inner = card.querySelector(':scope > .tilt-card-inner');
  if (!inner) {
    throw new Error(
      'TiltCard: [data-tilt] card is missing a direct .tilt-card-inner child. ' +
      'The card content must live inside .tilt-card-inner for the 3D tilt to render.'
    );
  }

  // Set the scene: perspective on the card, preserve-3d on the inner layer.
  card.style.position = 'relative';
  card.style.perspective = CONFIG.perspective + 'px';
  inner.style.transformStyle = 'preserve-3d';
  inner.style.willChange = 'transform';

  const state = {
    targetRX: 0,
    targetRY: 0,
    targetLift: 0,
    targetScale: 1,
    currentRX: 0,
    currentRY: 0,
    currentLift: 0,
    currentScale: 1,
    inCard: false,
    rafId: null,
    dying: false,
  };

  function onMove(e) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const clampedX = Math.max(-1, Math.min(1, dx));
    const clampedY = Math.max(-1, Math.min(1, dy));
    state.targetRY = clampedX * CONFIG.maxY;
    state.targetRX = -clampedY * CONFIG.maxX;
    if (!state.rafId) loop();
  }

  function onEnter() {
    state.inCard = true;
    state.dying = false;
    state.targetLift = CONFIG.lift;
    if (card.hasAttribute('data-tilt-layered')) {
      state.targetScale = CONFIG.hoverScale;
    }
    inner.style.transition =
      'transform ' + CONFIG.moveTransition + 'ms ' + CONFIG.easing;
    if (!state.rafId) loop();
  }

  function onLeave() {
    state.inCard = false;
    state.dying = true;
    state.targetRX = 0;
    state.targetRY = 0;
    state.targetLift = 0;
    state.targetScale = 1;
    inner.style.transition =
      'transform ' + CONFIG.restTransition + 'ms ' + CONFIG.easing;
    if (!state.rafId) loop();
  }

  card.addEventListener('mouseenter', onEnter);
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);

  function loop() {
    state.rafId = requestAnimationFrame(loop);

    // While pointer is over the card, smoothly follow with damping.
    if (state.inCard) {
      state.currentRX += (state.targetRX - state.currentRX) * CONFIG.damping;
      state.currentRY += (state.targetRY - state.currentRY) * CONFIG.damping;
      state.currentLift += (state.targetLift - state.currentLift) * CONFIG.damping;
      state.currentScale += (state.targetScale - state.currentScale) * CONFIG.damping;
      inner.style.transform =
        'scale(' + state.currentScale.toFixed(3) + ') ' +
        'rotateX(' + state.currentRX.toFixed(2) + 'deg) ' +
        'rotateY(' + state.currentRY.toFixed(2) + 'deg) ' +
        'translateZ(' + state.currentLift.toFixed(2) + 'px)';
      return;
    }

    // Pointer left — ease toward zero with damping. Once settled, stop RAF
    // and let CSS transition finish the last few pixels.
    state.currentRX += (state.targetRX - state.currentRX) * CONFIG.damping;
    state.currentRY += (state.targetRY - state.currentRY) * CONFIG.damping;
    state.currentLift += (state.targetLift - state.currentLift) * CONFIG.damping;
    state.currentScale += (state.targetScale - state.currentScale) * CONFIG.damping;
    inner.style.transform =
      'scale(' + state.currentScale.toFixed(3) + ') ' +
      'rotateX(' + state.currentRX.toFixed(2) + 'deg) ' +
      'rotateY(' + state.currentRY.toFixed(2) + 'deg) ' +
      'translateZ(' + state.currentLift.toFixed(2) + 'px)';

    var settled =
      Math.abs(state.currentRX) < 0.01 &&
      Math.abs(state.currentRY) < 0.01 &&
      Math.abs(state.currentLift) < 0.05 &&
      Math.abs(state.currentScale - 1) < 0.001;
    if (state.dying && settled) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
      inner.style.transform =
        'scale(1) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  }
}

