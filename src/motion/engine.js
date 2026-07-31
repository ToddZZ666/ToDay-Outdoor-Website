/**
 * MotionEngine — production Homepage motion engine.
 *
 * Single-responsibility reveal lifecycle:
 *
 *   Element registered (matched to a reveal type)
 *       ↓
 *   IntersectionObserver detects entry into viewport
 *       ↓
 *   Engine plays the entrance animation once
 *       ↓
 *   Observer disconnects — element remains visible
 *
 * Architecture (separated concerns):
 *
 *   MotionEngine       — registry of reveal types; orchestrates observe()
 *   RevealPlayer.play() — entrance-state → reflow → CSS keyframe (animation only)
 *   (internal) matchEl — compound class → { type, baseClass } resolution
 *   (internal) _isInViewport — synchronous first-render coverage check
 *   (internal) _revealImmediate — one-shot play + unobserve for already-visible elements
 *
 * Design principles:
 *   - ONE trigger for in-viewport reveals: IntersectionObserver.
 *   - ONE auxiliary pass: initial viewport reveal (Pass 1). A single,
 *     synchronous `getBoundingClientRect` scan run once before IO is armed.
 *     Covers the first-render blind spot (elements already on screen).
 *     No timers, no global `revealAll`, no scroll listener, no repeat check.
 *   - The old multi-trigger fallback stack (revealAll, init viewport timer,
 *     scroll listener, 1.5 s watchdog) was the source of off-screen and
 *     premature reveals; it is removed by design.
 *   - Content is NEVER hidden. If JS doesn't run or IO never fires, content is
 *     already at its end-state (opacity:1) via reveal.css.
 *   - `prefers-reduced-motion: reduce` → skip entirely; content stays visible.
 *   - Compound classes (reveal-card-image) resolve to a base reveal type
 *     (reveal-card) via prefix matching; the base class is attached before the
 *     CSS animation is triggered so the selector .reveal-card.is-revealed matches.
 *
 * Extensibility (Motion Design System):
 *   - New reveal types: add an entry to RevealPlayer.ENTRANCE + the matching
 *     CSS keyframe rule in reveal.css. No engine changes required.
 *   - New motion modes (parallax, split-text, timeline): add a sibling class
 *     (e.g. ParallaxEngine) that receives its own observer; shared matcher /
 *     player / registry patterns are reusable.
 *   - Runtime type registration: MotionEngine.registerType(name, state) allows
 *     themes / sections to extend the registry without editing this file.
 *
 * Usage (per Homepage section):
 *
 *   <script>
 *     import { MotionEngine } from '../motion/engine.js';
 *     const engine = new MotionEngine('[class*="reveal-"]', { stagger: 120 });
 *     if (!document.body) {
 *       document.addEventListener('DOMContentLoaded', () => engine.observe());
 *     } else {
 *       engine.observe();
 *     }
 *   </script>
 *
 * Astro integration note (critical):
 *   - Use a bare `<script>` with no attribute. Astro processes it as a bundled
 *     ES module, resolving the import from engine.js at build time.
 *   - Do NOT use `client:load`, `client:only`, or `type="module"` — those cause
 *     Astro to skip script processing, which bypasses bundling and makes the
 *     import 404 at runtime (the failure mode that broke the Homepage in the
 *     0.9.3 release).
 *   - In Astro 14 static output, these processed scripts are inlined at
 *     hydration; no DOM node remains for SSR.
 *   - The previous .ts import path 404'd because Astro passes `is:inline`
 *     scripts through unbundled — that's why engine.js is a plain .js module.
 *   - The engine defers activation behind `DOMContentLoaded` (or immediate if
 *     `document.body` already exists) so it hydrates before the user scrolls.
 */

const ReducedMotion = (function () {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

/**
 * Resolves a DOM element's reveal type by inspecting its class names.
 *
 * Strategy:
 *   1. Exact match — one of the element's classes equals a registered type.
 *   2. Prefix match — a class begins with a registered type name
 *      (e.g. "reveal-card-image" → "reveal-card").
 *
 * Returns { type, baseClass } where:
 *   - `type` is the base reveal class name (e.g. "reveal-card").
 *   - `baseClass` is the same value, provided so the caller can attach it to
 *     the element so the CSS animation rule `.reveal-card.is-revealed` matches.
 *
 * If no type matches, returns null and the element is skipped (it stays
 * visible at its end-state — no animation, no error).
 */
function matchEl(el, registry) {
  var toks = el.className.split(' ');
  for (var t = 0; t < toks.length; t++) {
    var tok = toks[t];
    if (registry[tok]) {
      return { type: tok, baseClass: tok };
    }
    // Prefix match: "reveal-card-image" begins with "reveal-card".
    for (var key in registry) {
      if (registry.hasOwnProperty(key) && tok.indexOf(key) === 0) {
        return { type: key, baseClass: key };
      }
    }
  }
  return null;
}

/**
 * Plays a single element's entrance animation.
 *
 * Sequence (must be atomic — no async gaps inside):
 *   1. Attach the matched base class so the CSS animation rule matches.
 *   2. Set inline entrance state (opacity:0, transform).
 *   3. Force a reflow (offsetHeight) so the browser commits the start.
 *   4. Clear the inline style and add .is-revealed — CSS keyframe plays to
 *      the end-state (opacity:1, transform:0).
 *   5. .is-revealed is left on the element; the animation's `both` fill mode
 *      keeps it at the end-state. Re-adding is idempotent.
 */
function playEl(el, m) {
  if (!el || !m) return;
  if (!el.classList.contains(m.baseClass)) {
    el.classList.add(m.baseClass);
  }
  var e = RevealPlayer.ENTRANCE[m.type];
  el.style.opacity = e.opacity;
  el.style.transform = e.transform;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  void el.offsetHeight;
  el.style.opacity = '';
  el.style.transform = '';
  el.classList.add('is-revealed');
}

/**
 * RevealPlayer — owns the entrance-state registry and the playback routine.
 *
 * Single responsibility: transform "element + reveal type" into "animation plays".
 * Does NOT observe the viewport; does NOT schedule; does NOT fall back.
 */
var RevealPlayer = {
  ENTRANCE: {
    'reveal-section':  { opacity: '0', transform: 'translateY(20px)' },
    'reveal-image':    { opacity: '0', transform: 'scale(1.04)' },
    'reveal-sentence': { opacity: '0', transform: 'translateY(12px)' },
    'reveal-card':     { opacity: '0', transform: 'translateY(12px)' },
    'reveal-cta':      { opacity: '0', transform: 'scale(0.98)' },
    'reveal-generic':  { opacity: '0', transform: 'translateY(14px)' },
  },

  /** Match an element to a reveal type. Returns { type, baseClass } or null. */
  match: matchEl,

  /** Play the entrance animation for an element. */
  play: playEl,
};

/**
 * MotionEngine — orchestrates the reveal lifecycle for a set of elements.
 *
 * Single responsibility: wire registered elements to IntersectionObserver,
 * and fire the player once each when they enter the viewport.
 *
 * Options:
 *   selector    — CSS selector for revealable elements (default '[class*="reveal-"]').
 *   threshold   — IntersectionObserver threshold (default 0.15).
 *   rootMargin  — IntersectionObserver rootMargin (default '0px 0px -60px 0px').
 *   stagger     — ms between successive reveals (default 0).
 */
function MotionEngine(selector, options) {
  options = options || {};
  this.selector = selector || '[class*="reveal-"]';
  this.threshold = options.threshold !== undefined ? options.threshold : 0.15;
  this.rootMargin = options.rootMargin || '0px 0px -60px 0px';
  this.stagger = options.stagger || 0;

  this.elements = [];        // registered elements (HTMLElement[])
  this.observer = null;      // IntersectionObserver | null
  this.revealed = 0;         // count of elements that have been revealed
  this.initRevealed = [];    // elements revealed during initial viewport pass
}

/**
 * Check whether an element is already at least 1% visible on first render.
 *
 * Conservative threshold (0.01) — this is a one-shot coverage pass, so a tiny
 * sliver counts as "on screen." We deliberately do NOT require the full
 * IntersectionObserver threshold here, to avoid missing elements that will
 * intersect within one scroll tick.
 */
MotionEngine.prototype._isInViewport = function (el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Play a single element immediately (no IO gate) and unobserve it so the
 * IntersectionObserver callback never double-plays it.
 *
 * Tracks the element in this.initRevealed so _onEntries can skip it.
 */
MotionEngine.prototype._revealImmediate = function (el, delay) {
  var self = this;
  if (!el) return;
  var idx = Number(el.dataset.revealIdx || '0');
  var d = delay >= 0 ? delay : idx * this.stagger;
  (function (e) {
    setTimeout(function () {
      RevealPlayer.play(e, { type: e._revealType, baseClass: e._revealType });
      self.initRevealed.push(e);
      e._revealType = null;
    }, d);
  })(el);
};

/**
 * Scan the DOM, register matching elements, then run a one-shot initial
 * viewport reveal for elements already on screen, and finally arm IO for
 * the rest.
 *
 * Lifecycle:
 *   Pass 1 — synchronous _isInViewport scan of registered elements.
 *            Already-visible elements are played immediately (with stagger),
 *            recorded in initRevealed, and skipped by the IO callback.
 *   Pass 2 — IntersectionObserver armed for all elements; _onEntries skips
 *            anything already played in Pass 1.
 *
 * Safe to call multiple times on a single instance; the second call is a no-op.
 * Call once per section, after the DOM is ready.
 */
MotionEngine.prototype.observe = function () {
  if (this.observer) return;
  if (ReducedMotion) return;

  var targets = Array.prototype.slice.call(
    document.querySelectorAll(this.selector)
  );
  if (targets.length === 0) return;

  // Register: keep only elements that resolve to a known reveal type.
  for (var i = 0; i < targets.length; i++) {
    var m = RevealPlayer.match(targets[i], RevealPlayer.ENTRANCE);
    if (!m) continue;
    targets[i]._revealType = m.baseClass;  // cache for the player
    this.elements.push(targets[i]);
  }

  if (this.elements.length === 0) return;

  // Pass 1 — initial viewport reveal. Synchronous, one-shot, no IO gate.
  // Covers the first-render blind spot (elements already on screen).
  for (var k = 0; k < this.elements.length; k++) {
    if (this._isInViewport(this.elements[k])) {
      this._revealImmediate(this.elements[k], -1);
    }
  }

  this.observer = new IntersectionObserver(
    this._onEntries.bind(this),
    { threshold: this.threshold, rootMargin: this.rootMargin }
  );
  for (var j = 0; j < this.elements.length; j++) {
    this.observer.observe(this.elements[j]);
  }
};

/** Called by IntersectionObserver when one or more entries cross threshold.
 * Disconnects only once every still-un-revealed element has been scheduled, so
 * on-screen elements caught by IO are never skipped.
 */
MotionEngine.prototype._onEntries = function (entries) {
  var batchRevealed = 0;
  // Count how many elements remain to be revealed (not already done via Pass 1).
  var remaining = 0;
  for (var r = 0; r < this.elements.length; r++) {
    var candidate = this.elements[r];
    if (!candidate.classList.contains('is-revealed') &&
        this.initRevealed.indexOf(candidate) < 0) {
      remaining++;
    }
  }
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (!entry.isIntersecting) continue;
    var el = entry.target;
    if (!(el instanceof HTMLElement)) continue;
    if (el.classList.contains('is-revealed') || this.initRevealed.indexOf(el) >= 0) {
      this.observer.unobserve(el);
      continue;
    }
    var idx = Number(el.dataset.revealIdx || '0');
    var delay = idx * this.stagger;
    (function (e) {
      setTimeout(function () {
        RevealPlayer.play(e, { type: e._revealType, baseClass: e._revealType });
        e._revealType = null;
      }, delay);
    })(el);
    batchRevealed++;
  }
  // Disconnect only after every remaining element has been scheduled — ensures
  // that elements which entered the viewport before this IO frame are never missed.
  if (batchRevealed >= remaining) {
    this.observer.disconnect();
  }
};

export { MotionEngine, RevealPlayer, matchEl, playEl };
