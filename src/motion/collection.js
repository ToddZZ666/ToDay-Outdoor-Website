/**
 * Collection Motion — light, fast, functional animations for the
 * Collection / product browsing experience.
 *
 * Reuses the existing GSAP setup and MotionTokens. Do not create long
 * cinematic sequences; every motion guides product browsing.
 *
 * Astro integration: use a bare `<script>` (no attributes) so Astro bundles
 * this module and resolves the gsap import at build time.
 * Do NOT use client:load / client:only / type="module".
 */

import gsap from 'gsap';

/** Shared token — fast and restrained. */
var ReducedMotion = (function () {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

/* ==========================================================================
   Editorial Header — slow bg scale + title mask + desc fade-up.
   Completes within ~1s. No long cinematic sequence.
   ========================================================================== */
export function revealEditorial(selector, options) {
  options = options || {};
  var bgSel = options.bg || '.collection-editorial-image-wrap img';
  var titleSel = options.title || '.collection-editorial-title';
  var descSel = options.desc || '.collection-editorial-desc';
  var bgDuration = options.bgDuration !== undefined ? options.bgDuration : 1.1;
  var titleDuration = options.titleDuration !== undefined ? options.titleDuration : 0.7;
  var descDuration = options.descDuration !== undefined ? options.descDuration : 0.55;
  var titleDelay = options.titleDelay !== undefined ? options.titleDelay : 0.05;
  var descDelay = options.descDelay !== undefined ? options.descDelay : 0.15;
  var ease = options.ease || 'power3.out';

  if (ReducedMotion) return;

  var scope = selector ? document.querySelector(selector) : document;
  if (!scope) return;

  var bg = scope.querySelector(bgSel);
  var title = scope.querySelector(titleSel);
  var desc = scope.querySelector(descSel);

  var tl = gsap.timeline();

  if (bg) {
    // Disable the CSS hover transition during the entrance tween so the
    // scale-down is governed solely by GSAP. Re-enable it after.
    gsap.set(bg, { transition: 'none' });
    tl.fromTo(
      bg,
      { scale: 1.03, opacity: 0 },
      { scale: 1.0, opacity: 1, duration: bgDuration, ease: 'none', onComplete: () => gsap.set(bg, { transition: '' }) }
    );
  }

  if (title) {
    gsap.set(title, { overflow: 'hidden' });
    tl.fromTo(
      title,
      { y: 24, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: titleDuration, ease: ease },
      titleDelay
    );
  }

  if (desc) {
    tl.fromTo(
      desc,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: descDuration, ease: ease },
      descDelay
    );
  }
}

/* ==========================================================================
   Category Nav — soft upward stagger on first appearance.
   ========================================================================== */
export function revealCategoryNav(selector, options) {
  options = options || {};
  var itemSel = options.items || '.collection-cat-item';
  var duration = options.duration !== undefined ? options.duration : 0.4;
  var stagger = options.stagger !== undefined ? options.stagger : 0.05;
  var distance = options.distance !== undefined ? options.distance : 12;
  var ease = options.ease || 'power2.out';

  if (ReducedMotion) return;

  var scope = selector ? document.querySelector(selector) : document;
  if (!scope) return;

  var items = scope.querySelectorAll(itemSel);
  var arr = Array.prototype.slice.call(items).filter(function (el) { return el.nodeType === 1; });
  if (arr.length === 0) return;

  gsap.set(arr, { opacity: 0, y: distance });
  gsap.to(arr, { opacity: 1, y: 0, duration: duration, stagger: stagger, ease: ease });
}

/* ==========================================================================
   Product Grid — row-by-row reveal on viewport entry.
   Each card reveals in layered order: image → name → price → swatches.
   Previously revealed cards are never replayed.
   ========================================================================== */
export function revealProductGrid(selector, options) {
  options = options || {};
  var cardSel = options.cards || '.collection-product-card';
  var imageSel = options.image || '.collection-product-image-wrap img';
  var nameSel = options.name || '.collection-product-name';
  var priceSel = options.price || '.collection-product-price';
  var swatchSel = options.swatches || '.collection-product-colors';

  var imageDur = options.imageDuration !== undefined ? options.imageDuration : 0.45;
  var textDur = options.textDuration !== undefined ? options.textDuration : 0.35;
  var cardStagger = options.cardStagger !== undefined ? options.cardStagger : 0.06;

  var threshold = options.threshold !== undefined ? options.threshold : 0.15;
  var rootMargin = options.rootMargin || '0px 0px -40px 0px';
  var ease = options.ease || 'power2.out';

  if (ReducedMotion) return;

  var grid = selector ? document.querySelector(selector) : document;
  if (!grid) return;

  var cards = grid.querySelectorAll(cardSel);
  var arr = Array.prototype.slice.call(cards).filter(function (el) { return el.nodeType === 1; });
  if (arr.length === 0) return;

  // Track revealed cards so they are never replayed.
  var revealed = new Set();

  // Pre-commit entrance state on all child elements so GSAP has a real start.
  arr.forEach(function (card) {
    var inner = card.querySelector(':scope > .tilt-card-inner');
    if (inner) {
      // Tilt card: preserve the layered translateZ depths on the children.
      // Never tween transform on the inner layer or its children; only fade
      // the whole inner layer in via opacity so the 3D geometry stays intact.
      gsap.set(inner, { opacity: 0 });
      return;
    }
    var img = card.querySelector(imageSel);
    var name = card.querySelector(nameSel);
    var price = card.querySelector(priceSel);
    var sw = card.querySelector(swatchSel);
    if (img) gsap.set(img, { opacity: 0, scale: 1.02 });
    if (name) gsap.set(name, { opacity: 0, y: 12 });
    if (price) gsap.set(price, { opacity: 0, y: 10 });
    if (sw) gsap.set(sw, { opacity: 0, y: 8 });
  });

  /** Reveal a single card with layered entrance. */
  function playCard(card) {
    var inner = card.querySelector(':scope > .tilt-card-inner');
    if (inner) {
      // Soft fade of the inner layer — keep 3D depth layers untouched.
      gsap.to(inner, { opacity: 1, duration: imageDur, ease: ease });
      return;
    }

    var img = card.querySelector(imageSel);
    var name = card.querySelector(nameSel);
    var price = card.querySelector(priceSel);
    var sw = card.querySelector(swatchSel);

    var tl = gsap.timeline();
    tl.to(img, { opacity: 1, scale: 1, duration: imageDur, ease: ease }, 0);
    tl.to(name, { opacity: 1, y: 0, duration: textDur, ease: ease }, 0.05);
    tl.to(price, { opacity: 1, y: 0, duration: textDur, ease: ease }, 0.10);
    tl.to(sw, { opacity: 1, y: 0, duration: textDur, ease: ease }, 0.15);
  }

  var playedAll = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (!entry.isIntersecting || revealed.has(el)) return;
        revealed.add(el);
        playCard(el);
        if (revealed.size >= arr.length) {
          playedAll = true;
          observer.disconnect();
        }
      });
    },
    { threshold: threshold, rootMargin: rootMargin, root: null }
  );
  arr.forEach(function (card) { observer.observe(card); });

  // Guard against the rare case where a card was hidden via display:none at
  // observe time; re-observe when it becomes visible so it still reveals.
  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function () {
      arr.forEach(function (card) {
        if (revealed.has(card)) return;
        if (getComputedStyle(card).display !== 'none') {
          observer.observe(card);
        }
      });
    });
    mo.observe(grid, { attributes: true, subtree: true, attributesFilter: ['style'] });
  }
}

/* ==========================================================================
   State & Filtering Logic
   ========================================================================== */
let activeCategoryState = 'all';

export function switchCategory(activeCat, options) {
  activeCategoryState = activeCat;
  updateProductGrid(options);
}

function updateProductGrid(options) {
  options = options || {};
  var cardSel = options.cards || '.collection-product-card';
  var duration = options.duration !== undefined ? options.duration : 0.35;
  var ease = options.ease || 'power2.out';

  var cards = document.querySelectorAll(cardSel);
  var arr = Array.prototype.slice.call(cards).filter(function (el) { return el.nodeType === 1; });
  if (arr.length === 0) return;

  // Gather active filters
  const colorFilters = Array.from(document.querySelectorAll('input[name="filter-color"]:checked')).map(cb => cb.value);
  const priceFilters = Array.from(document.querySelectorAll('input[name="filter-price"]:checked')).map(cb => cb.value);
  const sortSelect = document.getElementById('sort-select');
  const sortVal = sortSelect ? sortSelect.value : 'featured';

  // Sort Array
  arr.sort((a, b) => {
    if (sortVal === 'price-asc') {
      return parseFloat(a.dataset.price || 0) - parseFloat(b.dataset.price || 0);
    } else if (sortVal === 'price-desc') {
      return parseFloat(b.dataset.price || 0) - parseFloat(a.dataset.price || 0);
    } else if (sortVal === 'newest') {
      // In absence of dates, fallback to reverse order
      return parseInt(b.dataset.featuredOrder || 0) - parseInt(a.dataset.featuredOrder || 0);
    } else {
      // featured
      return parseInt(a.dataset.featuredOrder || 0) - parseInt(b.dataset.featuredOrder || 0);
    }
  });

  // Re-append to DOM in sorted order (this is instant)
  const container = document.getElementById('product-list');
  if (container) {
    arr.forEach(card => container.appendChild(card));
  }

  var outgoing = [];
  var incoming = [];
  var visibleCount = 0;

  arr.forEach(function (card) {
    var cat = card.getAttribute('data-category') || 'all';
    var price = parseFloat(card.getAttribute('data-price') || '0');
    var colorsStr = card.getAttribute('data-colors') || '';
    var cardColors = colorsStr.split(',');

    var showCategory = activeCategoryState === 'all' || cat === activeCategoryState;
    
    var showColor = colorFilters.length === 0 || colorFilters.some(c => cardColors.includes(c));
    
    var showPrice = priceFilters.length === 0 || priceFilters.some(pf => {
      if (pf === 'under-1000') return price < 1000;
      if (pf === '1k-2k') return price >= 1000 && price <= 2000;
      if (pf === '2k-4k') return price > 2000 && price <= 4000;
      if (pf === 'over-4k') return price > 4000;
      return false;
    });

    var show = showCategory && showColor && showPrice;
    if (show) visibleCount++;

    var currentlyVisible = getComputedStyle(card).display !== 'none';

    if (ReducedMotion) {
      card.style.display = show ? '' : 'none';
      card.style.opacity = '';
    } else {
      if (show && !currentlyVisible) {
        incoming.push(card);
      } else if (!show && currentlyVisible) {
        outgoing.push(card);
      }
    }
  });

  // Update Count
  const countEl = document.getElementById('product-count');
  if (countEl) countEl.innerText = visibleCount;

  if (ReducedMotion) return;

  var done = 0;
  var total = outgoing.length + incoming.length;
  if (total === 0) return;

  outgoing.forEach(function (card) {
    gsap.to(card, {
      opacity: 0,
      duration: duration,
      ease: ease,
      onComplete: function () {
        card.style.display = 'none';
        card.style.opacity = '';
        if (++done >= total) onSwitchDone();
      },
    });
  });

  incoming.forEach(function (card) {
    card.style.display = '';
    gsap.fromTo(card, { opacity: 0 }, {
      opacity: 1,
      duration: duration,
      ease: ease,
      onComplete: function () {
        card.style.opacity = '';
        if (++done >= total) onSwitchDone();
      },
    });
  });

  function onSwitchDone() {
    arr.forEach(function (card) {
      card.style.opacity = '';
    });
  }
}

// Bind UI Events
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile Filter Toggle
    const mobileToggle = document.getElementById('mobile-filter-toggle');
    const sidebarWrap = document.getElementById('filter-sidebar-wrapper');
    if (mobileToggle && sidebarWrap) {
      mobileToggle.addEventListener('click', () => {
        const isHidden = sidebarWrap.classList.contains('hidden');
        if (isHidden) {
          sidebarWrap.classList.remove('hidden');
          mobileToggle.setAttribute('aria-expanded', 'true');
        } else {
          sidebarWrap.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Filter Change
    document.querySelectorAll('.collection-filter-sidebar input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', () => updateProductGrid());
    });

    // Clear Filters Update
    document.querySelectorAll('[data-filter-clear]').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(() => updateProductGrid(), 10));
    });

    // Sort Change
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => updateProductGrid());
    }
  });
}

/* ==========================================================================
   Filter panel — soft expand / collapse for accordion groups.
   Call with an existing toggle button reference.
   ========================================================================== */
export function revealFilterGroup(btn) {
  if (ReducedMotion) return;

  var group = btn && btn.closest && btn.closest('.collection-filter-group');
  if (!group) return;
  var body = group.querySelector('.collection-filter-body');
  if (!body) return;

  var isOpen = group.classList.contains('open');

  if (!isOpen) {
    // Close: animate to height 0 then hide.
    body.style.overflow = 'hidden';
    var h = body.scrollHeight;
    gsap.to(body, {
      height: 0,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.out',
      onComplete: function () {
        body.style.display = 'none';
        body.style.height = '';
        body.style.opacity = '';
        body.style.overflow = '';
      },
    });
  } else {
    // Open: unhide, measure, then animate to natural height.
    body.style.display = 'block';
    body.style.overflow = 'hidden';
    gsap.set(body, { height: 0, opacity: 0 });
    var targetH = body.scrollHeight;
    gsap.to(body, {
      height: targetH,
      opacity: 1,
      duration: 0.32,
      ease: 'power2.out',
      onComplete: function () {
        body.style.height = '';
        body.style.opacity = '';
        body.style.overflow = '';
      },
    });
  }
}

/* ==========================================================================
   Generic per-element stagger (lightweight, for footer brand values etc).
   ========================================================================== */
export function revealStagger(selector, options) {
  options = options || {};
  var childrenSel = options.children || '> *';
  var duration = options.duration !== undefined ? options.duration : 0.5;
  var stagger = options.stagger !== undefined ? options.stagger : 0.08;
  var distance = options.distance !== undefined ? options.distance : 16;
  var ease = options.ease || 'power2.out';
  var threshold = options.threshold !== undefined ? options.threshold : 0.2;
  var rootMargin = options.rootMargin || '0px 0px -40px 0px';

  if (ReducedMotion) return;

  var section = selector ? document.querySelector(selector) : document;
  if (!section) return;

  var targets = section.querySelectorAll(childrenSel);
  var arr = Array.prototype.slice.call(targets).filter(function (el) { return el.nodeType === 1; });
  if (arr.length === 0) return;

  gsap.set(arr, { opacity: 0, y: distance });

  var played = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!played && entry.isIntersecting) {
          played = true;
          observer.disconnect();
          gsap.to(arr, { opacity: 1, y: 0, duration: duration, stagger: stagger, ease: ease });
        }
      });
    },
    { threshold: threshold, rootMargin: rootMargin }
  );
  observer.observe(section);
}
