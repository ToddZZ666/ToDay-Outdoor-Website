# Design Tokens Specification — ToDay Website

> **Release:** 0.9.6B-1 (Design Tokens Foundation)  
> **Status:** Active Standard  
> **Architecture:** CSS Variables (`@theme` in Tailwind CSS 4.x) + TS Motion Tokens

---

## 1. Overview & Philosophy

Design Tokens are the single source of truth for all visual primitives across the **ToDay** digital brand experience. They bridge the gap between design intent and frontend engineering, enforcing consistent rhythm, surface hierarchy, and motion physics.

### Core Principles
1. **Zero Unintentional Variation:** Component styles must inherit from token tokens rather than utilizing hardcoded magic numbers or ad-hoc RGB/HEX values.
2. **Framework Agnostic Primitives:** Tokens are declared as native CSS Custom Properties (`var(--...)`) inside Tailwind CSS 4 `@theme` configuration, making them accessible to standard CSS stylesheets (`.css`), Astro components (`.astro`), and React modules.
3. **Intentional Hierarchy:** Radius, shadow, and spacing scales reflect functional purpose (e.g., `--radius-button`, `--shadow-card-hover`, `--spacing-section-standard`).

---

## 2. Token Architecture & File Structure

All CSS design tokens are organized modularly within `src/styles/tokens/` and aggregated via `src/styles/global.css`:

```
src/
├── styles/
│   ├── tokens/
│   │   ├── colors.css       # Surface, background, text, border & brand tokens
│   │   ├── spacing.css      # Spacing scale, container max-widths & section vertical rhythm
│   │   ├── radius.css       # Border radius scale across UI primitives
│   │   └── shadows.css      # Elevation & drop shadow system
│   └── global.css           # Global stylesheet entry point (@import tokens)
└── motion/
    └── tokens.ts            # Motion timing, easings, and rAF physics parameters
```

---

## 3. Token System Reference

### 3.1 Color & Surface Tokens (`colors.css`)

| Token | CSS Variable | Value | Purpose / Usage |
|-------|--------------|-------|-----------------|
| `background` | `--color-background` | `#FAF8F5` | Primary warm off-white page background |
| `surface` | `--color-surface` | `#FFFFFF` | Elevated surfaces (cards, primary buttons, modals) |
| `surface-soft` | `--color-surface-soft` | `#F7F4F0` | Hover states, secondary button backgrounds |
| `surface-elevated` | `--color-surface-elevated` | `#FAFAF8` | Spec tables & callout containers |
| `dark-surface` | `--color-dark-surface` | `#222222` | Hero sections & vision cinematic breaks |
| `footer-bg` | `--color-footer-bg` | `#F5F2ED` | Warm footer background |
| `brand` | `--color-brand` | `#C67A52` | Terracotta primary brand accent |
| `brand-hover` | `--color-brand-hover` | `#B36842` | Terracotta hover state |
| `brand-soft` | `--color-brand-soft` | `#F0E2D8` | Active category badges & light terracotta tints |
| `text-heading` | `--color-text-heading` | `#222222` | Editorial headlines and high-contrast titles |
| `text-body` | `--color-text-body` | `#5E5E5E` | Standard body paragraph text |
| `text-muted` | `--color-text-muted` | `#8A847E` | Captions, metadata, and eyebrows |
| `border` | `--color-border` | `#EAE5DF` | Subtle component dividers |
| `border-strong` | `--color-border-strong` | `#D9D2C9` | Input underlines & prominent section dividers |

---

### 3.2 Layout & Spacing Tokens (`spacing.css`)

| Token | CSS Variable | Value | Purpose / Usage |
|-------|--------------|-------|-----------------|
| `container-max` | `--spacing-container-max` | `80rem` (1280px) | Maximum width for main content containers |
| `section-compact` | `--spacing-section-compact` | `3rem` (48px) | Toolbars & compact section padding |
| `section-standard` | `--spacing-section-standard` | `6rem` (96px) | Standard section padding across pages |
| `section-major` | `--spacing-section-major` | `7.5rem` (120px) | Major editorial lookbook sections |
| `section-hero` | `--spacing-section-hero` | `10rem` (160px) | Full-bleed hero & contact form padding |

---

### 3.3 Radius Tokens (`radius.css`)

| Token | CSS Variable | Value | Purpose / Usage |
|-------|--------------|-------|-----------------|
| `radius-xs` | `--radius-xs` | `0.1875rem` (3px) | Filter checkmark checkboxes |
| `radius-sm` | `--radius-sm` | `0.5rem` (8px) | Carousel thumbnails, selects, dropdowns |
| `radius-button` | `--radius-button` | `0.6875rem` (11px) | Standard primary/secondary buttons |
| `radius-md` | `--radius-md` | `0.75rem` (12px) | Product grid cards, material highlights |
| `radius-lg` | `--radius-lg` | `1rem` (16px) | Main hero gallery images, story containers |
| `radius-full` | `--radius-full` | `9999px` | Pill buttons, swatches, round scroll arrows |

---

### 3.4 Elevation & Shadow Tokens (`shadows.css`)

| Token | CSS Variable | Value | Purpose / Usage |
|-------|--------------|-------|-----------------|
| `shadow-card-sm` | `--shadow-card-sm` | `0 4px 16px -10px rgba(34,34,34,0.10)` | Low resting card elevation |
| `shadow-card` | `--shadow-card` | `0 4px 20px -8px rgba(34,34,34,0.10)` | Standard card elevation |
| `shadow-card-hover` | `--shadow-card-hover` | `0 12px 28px -14px rgba(34,34,34,0.18)` | Elevated hover lift |
| `shadow-gallery` | `--shadow-gallery` | `0 18px 60px rgba(0,0,0,0.08)` | Main product gallery image depth |
| `shadow-gallery-hover` | `--shadow-gallery-hover` | `0 24px 80px rgba(0,0,0,0.10)` | Main product gallery hover lift |

---

### 3.5 Motion Tokens (`src/motion/tokens.ts`)

| Category | Token / Key | Value | Usage |
|----------|-------------|-------|-------|
| **Easing** | `MotionEasings.standard` | `cubic-bezier(0.25, 1, 0.3, 1)` | Component hover & UI transitions |
| **Easing** | `MotionEasings.reveal` | `power3.out` | Scroll-triggered text & section entrance |
| **Duration**| `MotionDurations.hover` | `250ms` | Standard interactive element transition |
| **Duration**| `MotionDurations.section` | `600ms` | Section entrance reveal duration |
| **Physics** | `MotionTokens.tilt.damping` | `0.28` | rAF 3D Tilt card inertia damping |

---

## 4. Code Usage Examples

### Tailwind CSS 4 Utility Class Usage
```html
<!-- Background, text, radius & shadow tokens automatically generated via @theme -->
<div class="bg-surface text-text-heading rounded-md shadow-card hover:shadow-card-hover">
  <button class="bg-brand text-white rounded-button hover:bg-brand-hover">
    Explore Collection
  </button>
</div>
```

### Component CSS Usage (`.css` stylesheets)
```css
.product-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: transform var(--motion-duration-normal) var(--motion-ease-standard);
}
```

### TypeScript Motion Module Usage
```typescript
import { MotionTokens, MotionEasings } from '../motion/tokens.ts';

gsap.to('.hero-title', {
  duration: MotionTokens.hero.duration,
  y: 0,
  opacity: 1,
  ease: MotionEasings.reveal,
});
```

---

## 5. Summary of Consolidated Values

During this refactor phase (Release 0.9.6B-1), the following repeated raw values were extracted and consolidated:

* **Raw Colors:** `#FAF8F5`, `#FFFFFF`, `#C67A52`, `#B36842`, `#F0E2D8`, `#222222`, `#5E5E5E`, `#8A847E`, `#EAE5DF`, `#D9D2C9` consolidated into semantic tokens.
* **Hardcoded Radii:** `rounded-[11px]` in `Button.astro` consolidated into `--radius-button: 0.6875rem`.
* **Shadow Specs:** Inline `rgba(34, 34, 34, 0.10)` card shadows consolidated into `--shadow-card` & `--shadow-card-hover`.
* **Motion Easing:** GSAP `'power3.out'` and CSS cubic-bezier curves centralized in `MotionEasings`.

---

## 6. Discovered Inconsistencies for Future Releases

*Note: In accordance with refactoring rules, these inconsistencies were documented during audit but deliberately unedited in 0.9.6B-1 to ensure 100% visual stability.*

1. **Background Mismatch:** Collection page grid (`collection.css`) hardcodes `#FFFFFF` background instead of inheriting `--color-background` (`#FAF8F5`).
2. **Button Radius Mismatch:** Contact form button uses `rounded-full` while About page contact button uses `0px` radius. (To be unified under `--radius-button` or `--radius-full` in Release 0.9.6B-2 Polish).
3. **Container Overrides:** `about.css` declares `max-w: 1280px` with `padding: 0 64px`, overriding standard `Container.astro` padding (`px-4 sm:px-6 lg:px-8`).

---

## 7. Future Extension Guidelines

1. **Adding New Tokens:** Place new color or surface definitions in `src/styles/tokens/colors.css`. Avoid creating inline color variables in individual section stylesheets.
2. **Naming Conventions:** Use lowercase kebab-case for CSS variables (`--category-property-modifier`).
3. **Deprecation:** When a token is replaced, tag it as `deprecated` in CSS comments before removal in a major release.
