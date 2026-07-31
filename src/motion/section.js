/**
 * RevealStagger — per-element staggered entrance within a section.
 *
 * Usage (one per Homepage section):
 *
 *   <script>
 *     import { revealStagger } from '../motion/section.js';
 *     revealStagger(
 *       '[aria-label="Outdoor living inspiration"]',
 *       { children: 'h2, h3, p, figure' }
 *     );
 *   </script>
 *
 * Behaviour:
 *   1. Finds all direct/recursive matching children inside the section.
 *   2. Commits each to opacity:0 + y:30.
 *   3. Arms an IntersectionObserver; when the section enters the viewport,
 *      tweens all children to opacity:1 + y:0 with a small stagger, so each
 *      element enters individually rather than the whole section as a block.
 *   4. Same ease / entrance across the whole section → internal consistency.
 *   5. Skips entirely when prefers-reduced-motion is set.
 *
 * Notes:
 *   - The section must NOT have a broad `transition: all` on it, or CSS
 *     transition will fight GSAP's inline style changes.
 *   - Astro integration: use a bare `<script>` (no attributes) so Astro
 *     bundles this module and resolves the gsap import at build time.
 *     Do NOT use client:load / client:only / type="module".
 */

import gsap from 'gsap';

var ReducedMotion = (function () {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

/**
 * Reveal a section's children with a staggered GSAP entrance.
 *
 * @param {string} selector  - CSS selector for the section element.
 * @param {object} [options] - optional config.
 * @param {string} [options.children]       - CSS selector for the elements to
 *                                            animate (e.g. 'h2, h3, p, figure').
 *                                            Defaults to '>*' (direct children).
 * @param {number} [options.duration=0.8]   - tween duration per element (sec).
 * @param {number} [options.distance=30]    - upward travel in px.
 * @param {number} [options.stagger=0.10]   - seconds between each element.
 * @param {string} [options.ease='power3.out']
 * @param {number} [options.threshold=0.15]
 * @param {string} [options.rootMargin='0px 0px -60px 0px']
 */
export function revealStagger(selector, options) {
  options = options || {};
  var childrenSel = options.children || '> *';
  var duration = options.duration !== undefined ? options.duration : 0.8;
  var distance = options.distance !== undefined ? options.distance : 30;
  var stagger = options.stagger !== undefined ? options.stagger : 0.10;
  var ease = options.ease || 'power3.out';
  var threshold = options.threshold !== undefined ? options.threshold : 0.15;
  var rootMargin = options.rootMargin || '0px 0px -60px 0px';

  if (ReducedMotion) return;

  var section = document.querySelector(selector);
  if (!section) return;

  var targets = section.querySelectorAll(childrenSel);
  var arr = Array.prototype.slice.call(targets);
  // Filter to only element nodes.
  arr = arr.filter(function (el) { return el.nodeType === 1; });
  if (arr.length === 0) return;

  // Commit entrance state on every target so the tween has a real start.
  gsap.set(arr, { opacity: 0, y: distance });

  var played = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!played && entry.isIntersecting) {
          played = true;
          observer.disconnect();
          gsap.to(arr, {
            opacity: 1,
            y: 0,
            duration: duration,
            stagger: stagger,
            ease: ease,
          });
        }
      });
    },
    { threshold: threshold, rootMargin: rootMargin }
  );
  observer.observe(section);
}
