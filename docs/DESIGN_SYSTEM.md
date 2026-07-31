# Design System — ToDay

> **Purpose:** Define the visual language, component tokens, and design conventions of the ToDay website.
> **Implementation:** Tailwind CSS 4.x utility classes. Do not write custom CSS unless no utility combination can achieve the design.

---

## 1. Brand Personality

| Attribute | Description |
|-----------|-------------|
| Premium | High-quality materials, refined details, elevated craftsmanship |
| Modern | Clean lines, contemporary forms, uncluttered spaces |
| Warm | Inviting, natural textures, relaxed outdoor living |
| Reliable | Durable construction, weather-resistant, built to last |
| Aspirational | Inspires customers to elevate their outdoor living experience |

## 2. Color System

Colours are defined and applied exclusively through Tailwind utility classes. The primary palette uses Tailwind's default blue scale as a foundation. When full brand colours are finalised, map them via Tailwind theme extension in `astro.config.mjs` (vite resolve alias) or at the Tailwind entry point.

### Primary Palette (Placeholder — Finalise with Brand Team)

| Token | Tailwind Class | Usage |
|-------|---------------|-------|
| Brand Primary | `blue-600` | Primary buttons, links, accents |
| Brand Primary Hover | `blue-700` | Button hover states |
| Brand Primary Light | `blue-50` | Background highlights |
| Text Primary | `gray-900` | Headings, body copy |
| Text Secondary | `gray-600` | Supporting text, descriptions |
| Text Muted | `gray-400` | Placeholder, disabled text |
| Background | `white` | Page background, cards |
| Background Muted | `gray-50` | Section alternates |
| Border | `gray-200` | Card borders, dividers |
| Border Strong | `gray-700` | Dark mode borders |

### Semantic Colors

| Token | Tailwind Class | Usage |
|-------|---------------|-------|
| Success | `green-600` | Success messages, checkmarks |
| Warning | `amber-500` | Warnings, notices |
| Error | `red-600` | Error messages, validation |
| Info | `blue-500` | Informational banners |

### Dark Mode Palette

All components must support `dark:` variants. The dark palette inverts the background/text relationship:

| Light Token | Dark Equivalent |
|-------------|-----------------|
| `white` | `gray-900` |
| `gray-50` | `gray-800` |
| `gray-900` | `gray-100` |
| `gray-600` | `gray-400` |
| `gray-200` | `gray-700` |

## 3. Typography

### Font Stack

```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
             Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
```

When brand fonts are acquired, replace the system stack with:
```css
font-family: 'BrandFont', system-ui, -apple-system, ...sans-serif;
```

### Type Scale

| Level | Tailwind | Size | Weight | Usage |
|-------|----------|------|--------|-------|
| Display | `text-5xl` / `text-6xl` | 3rem–3.75rem | Bold (700) | Hero headings |
| Heading 1 | `text-4xl` | 2.25rem | Bold (700) | Page titles |
| Heading 2 | `text-3xl` | 1.875rem | Semibold (600) | Section headings |
| Heading 3 | `text-2xl` | 1.5rem | Semibold (600) | Card titles |
| Heading 4 | `text-xl` | 1.25rem | Semibold (600) | Subsection titles |
| Body Large | `text-lg` | 1.125rem | Normal (400) | Lead paragraphs |
| Body | `text-base` | 1rem | Normal (400) | Default body copy |
| Body Small | `text-sm` | 0.875rem | Normal (400) | Caption, meta text |
| Caption | `text-xs` | 0.75rem | Normal (400) | Small print, labels |

### Line Height

- Headings: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)

## 4. Spacing

Use Tailwind's default spacing scale exclusively. Never use arbitrary values.

| Scale | Tailwind | Rem | Typical Use |
|-------|----------|-----|-------------|
| 0 | `p-0` / `gap-0` | 0 | Reset |
| 1 | `p-1` | 0.25rem | Micro spacing |
| 2 | `p-2` | 0.5rem | Tight element spacing |
| 3 | `p-3` | 0.75rem | Compact element spacing |
| 4 | `p-4` | 1rem | Default element padding |
| 5 | `p-5` | 1.25rem | Generous spacing |
| 6 | `p-6` | 1.5rem | Card padding |
| 8 | `p-8` | 2rem | Section padding |
| 10 | `p-10` | 2.5rem | Wide spacing |
| 12 | `p-12` | 3rem | Large component spacing |
| 16 | `p-16` | 4rem | Section vertical spacing (mobile) |
| 20 | `p-20` | 5rem | Section vertical spacing (desktop) |
| 24 | `p-24` | 6rem | Section vertical spacing (large) |

## 5. Grid

Use Tailwind's grid utilities:

```twig
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <!-- items -->
</div>
```

- **1 column**: mobile default
- **2 columns**: `sm:` breakpoint
- **3 columns**: `lg:` breakpoint (tablet landscape / small desktop)
- **4 columns**: `xl:` breakpoint (wide desktop)

## 6. Radius

| Token | Tailwind | Shape |
|-------|----------|-------|
| Sharp | `rounded-none` | 0 |
| Soft | `rounded-sm` | 0.125rem |
| Default | `rounded` | 0.25rem |
| Rounded | `rounded-lg` | 0.5rem |
| Pill | `rounded-full` | 9999px |

- **Cards**: `rounded-xl`
- **Buttons**: `rounded-lg`
- **Inputs**: `rounded-lg`
- **Avatars / Badges**: `rounded-full`

## 7. Shadow

| Token | Tailwind | Usage |
|-------|----------|-------|
| None | `shadow-none` | Flat elements |
| Soft | `shadow-sm` | Cards at rest |
| Medium | `shadow-md` | Cards on hover, dropdowns |
| High | `shadow-lg` | Modals, drawers |

## 8. Buttons

### Variants

| Variant | Classes | Hover |
|---------|---------|-------|
| Primary | `bg-blue-600 text-white rounded-lg` | `hover:bg-blue-700` |
| Secondary | `bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-lg` | `hover:bg-gray-300` |
| Outline | `border-2 border-blue-600 text-blue-600 rounded-lg` | `hover:bg-blue-50` |
| Ghost | `text-gray-600 rounded-lg` | `hover:bg-gray-100` |

### Sizes

| Size | Classes |
|------|---------|
| Small | `px-3 py-1.5 text-sm` |
| Medium | `px-5 py-2.5 text-base` |
| Large | `px-7 py-3 text-lg` |

**States:** `disabled:opacity-50 disabled:cursor-not-allowed`, `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`

**Implementation:** `src/components/Button.astro`

## 9. Cards

| Element | Classes |
|---------|---------|
| Container | `rounded-xl border border-gray-200 bg-white p-6 shadow-sm` |
| Dark mode | `dark:border-gray-700 dark:bg-gray-800` |
| Hover | `hover:shadow-md transition-shadow` |
| Title | `text-lg font-semibold text-gray-900 dark:text-gray-100` |
| Description | `text-sm leading-relaxed text-gray-600 dark:text-gray-400` |

**Implementation:** `src/components/Card.astro`

## 10. Forms (Future Implementation)

| Element | Classes |
|---------|---------|
| Input | `w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900` |
| Focus | `focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none` |
| Error | `border-red-500 focus:border-red-500 focus:ring-red-500/20` |
| Label | `block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1` |
| Helper | `text-xs text-gray-500 mt-1` |

## 11. Navigation

- **Header**: Sticky, `bg-white/80 backdrop-blur-md`, border bottom
- **Logo**: Left-aligned, `text-xl font-bold`
- **Links**: Right-aligned, `text-sm font-medium`, hover colour change
- **Mobile**: Hamburger menu (future implementation)
- **Footer**: `border-t`, `bg-gray-50`, two-column layout (nav + copyright)

## 12. Icons

- **Library:** Use inline SVG icons (no icon font dependencies)
- **Size:** Match `font-size` of adjacent text (e.g., `h-5 w-5` for `.text-base`)
- **Colour:** `currentColor` for automatic text-colour inheritance
- **Placement:** Store icon SVGs in `src/components/icons/` as Astro components

## 13. Animation Principles

| Principle | Application |
|-----------|-------------|
| Subtle | Micro-interactions only (hover, focus, scroll-reveal) |
| Fast | Transitions ≤ 200ms; no waiting animations |
| Performance | Use `transform` and `opacity` only (GPU-composited) |
| Reduced Motion | Respect `prefers-reduced-motion` — disable all animations |

**Tailwind classes:** `transition-all duration-200`, `hover:translate-y-[-2px]`, `group-hover:opacity-100`

## 14. Photography Style

- Natural light, outdoor settings
- Warm golden-hour tones
- Lifestyle shots showing furniture in use
- Clean compositions with negative space
- Consistent aspect ratio per product line (16:9 or 4:3)

## 15. Illustration Style (Future)

- Minimal line art with limited colour palette
- Used for icons, section dividers, empty states
- Must match brand colour palette

## 16. Responsive Breakpoints

| Breakpoint | Tailwind | Target |
|-----------|----------|--------|
| Default | (none) | Mobile (< 640px) |
| Small | `sm:` | Tablet portrait (≥ 640px) |
| Medium | `md:` | Tablet landscape (≥ 768px) |
| Large | `lg:` | Desktop (≥ 1024px) |
| Extra Large | `xl:` | Wide desktop (≥ 1280px) |
| 2XL | `2xl:` | Large screens (≥ 1536px) |

**Approach:** Mobile-first. Write base styles for mobile, then override with `sm:`, `md:`, `lg:`, `xl:` breakpoints.

## 17. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Colour Contrast | WCAG AA minimum (4.5:1 normal text, 3:1 large text) |
| Keyboard Navigation | All interactive elements focusable and operable |
| Focus Indicators | Visible `focus:ring` on all interactive elements |
| Screen Readers | Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<h1>`–`<h6>`) |
| Alt Text | Every image must have meaningful `alt` text |
| ARIA Labels | Use `aria-label` where visual label is absent |
| Reduced Motion | `@media (prefers-reduced-motion: no-preference)` wrapper |

## 18. Dark Mode Strategy

- **Default:** Respect system preference via `prefers-color-scheme`
- **Toggle:** Future: manual toggle persisted in `localStorage`
- **Implementation:** Tailwind `dark:` variant on all colour-related classes
- **Images:** Consider dark-mode-specific images for brand assets

**Important:** Every colour utility must have a `dark:` counterpart. No exceptions.

---

**See also:** [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) | [CODING_STANDARDS.md](./CODING_STANDARDS.md)
