# Architecture Guide — ToDay

> **Purpose:** Document the technical architecture, design decisions, and structural conventions of the ToDay website.
> **Audience:** Developers and engineering reviewers.

---

## 1. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Astro 7.x | Static-first, zero-JS-by-default, island architecture |
| Language | TypeScript (strict) | Type safety, editor intelligence, fewer runtime errors |
| Styling | Tailwind CSS 4.x | Utility-first, consistent design tokens, no dead CSS |
| Linting | ESLint 10.x + typescript-eslint + eslint-plugin-astro | Catch issues at dev time |
| Formatting | Prettier 3.x + prettier-plugin-astro + prettier-plugin-tailwindcss | Automated, consistent formatting |
| Hosting | Cloudflare Pages | Global CDN, edge caching, generous free tier |
| Adapter | @astrojs/cloudflare | Static + future edge function support |
| Runtime | Node ≥ 22.12.0 | LTS, modern JavaScript features |

## 2. Folder Structure

```
/
├── docs/                    # Engineering documentation (this folder)
│   ├── PROJECT.md           # Product Requirements Document
│   ├── ARCHITECTURE.md      # This file — technical architecture
│   ├── DESIGN_SYSTEM.md     # Visual design tokens and component specs
│   ├── BRAND_GUIDELINES.md  # Voice, tone, writing style
│   ├── CONTENT_STRATEGY.md  # Page content plans and structure
│   ├── SEO_GUIDE.md         # Search optimisation rules
│   ├── CODING_STANDARDS.md  # Code conventions and quality gates
│   ├── DEPLOYMENT.md        # Build, deploy, and release process
│   ├── DEVELOPMENT_WORKFLOW.md  # Engineering process and roles
│   ├── ROADMAP.md           # Development phases and milestones
│   └── CHANGELOG_GUIDELINES.md  # How to maintain the changelog
├── public/                  # Static assets (copied verbatim at build)
│   ├── favicon.ico
│   └── favicon.svg
├── scripts/                 # Utility scripts (build, automation)
├── src/
│   ├── components/          # Reusable UI components
│   ├── data/                # Static site data and configuration
│   ├── layouts/             # Page-level layout wrappers
│   ├── pages/               # File-based routing (one file per route)
│   ├── sections/            # Composed page sections (agglomerations of components)
│   ├── styles/              # Global CSS entry points
│   ├── types/               # Shared TypeScript type definitions
│   └── utils/               # Pure utility functions
├── astro.config.mjs         # Astro framework configuration
├── eslint.config.js         # ESLint flat configuration
├── package.json             # Dependencies, scripts, metadata
├── tsconfig.json            # TypeScript compiler configuration
└── .prettierrc              # Prettier formatting rules
```

### Directory Responsibilities

| Directory | Contains | Must Not Contain |
|-----------|----------|------------------|
| `src/components/` | Reusable, single-responsibility UI components | Page-specific logic, data fetching |
| `src/layouts/` | Page-level HTML structure wrappers | Business logic |
| `src/pages/` | Route entry points; composes layouts + sections | Complex UI markup |
| `src/sections/` | Aggregated component compositions for a page region | Utility functions |
| `src/types/` | Interfaces, type aliases, enums shared across files | Runtime code |
| `src/utils/` | Pure functions with no side effects | Components, pages |
| `src/data/` | Static configuration, constants, content data | Business logic |

## 3. Rendering Strategy

| Strategy | When to Use |
|----------|-------------|
| Static Site Generation (SSR off) | All public pages by default |
| Static + Client Island | For interactive components (forms, galleries, carousels) |
| Edge (Cloudflare Workers) | Future: form handlers, API endpoints, dynamic content |

The project uses `output: 'static'` with Cloudflare adapter. All pages are pre-rendered at build time. Interactive behaviour is added via Astro islands when needed.

## 4. Component Architecture

### Component Hierarchy

```
Page (src/pages/)
  └── Layout (src/layouts/)
        ├── BaseHead (SEO metadata)
        ├── Header (navigation)
        ├── Section (page region)
        │     ├── Container (width constraint)
        │     ├── Card / Button (UI primitives)
        │     └── [Section-specific compositions from src/sections/]
        └── Footer (site footer)
```

### Component Design Rules

1. **Single responsibility** — Each component does one thing
2. **Props interface** — Every Astro component exports `Props`
3. **Composition over configuration** — Prefer slot-based children over boolean flags
4. **No data-fetching in components** — Pages fetch and pass data down
5. **Minimal client JS** — Prefer server-rendered HTML; add interactivity only when needed

### State Management

- **No global state library** — State is managed locally within islands
- **URL state** — Navigation state is encoded in the URL (current page, filters, locale)
- **Form state** — Managed within the form component via native HTML validation + progressive enhancement

## 5. Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Component files | PascalCase | `Button.astro`, `ProductCard.astro` |
| Utility files | camelCase | `formatDate.ts`, `cn.ts` |
| Type/interface files | camelCase | `index.ts`, `types.ts` |
| Folder names | lowercase | `components/`, `utils/` |
| Functions | camelCase | `formatDate()`, `truncateText()` |
| Types / Interfaces | PascalCase | `SiteConfig`, `NavLink` |
| Constants | camelCase or SCREAMING_SNAKE | `siteUrl`, `API_ENDPOINT` |

## 6. Import Conventions

- Use **relative imports** for intra-directory references
- Use **aliased imports** (`~/components/...`) when available
- Group imports: 1) external packages, 2) internal modules, 3) styles
- No barrel files (`index.ts` re-exports) for components — import directly

## 7. Error Handling

- **Build-time errors** — TypeScript strict mode catches type errors; ESLint catches logic errors
- **Runtime errors** — Minimal client JS means minimal runtime errors
- **404 handling** — Astro default 404 page (override: `src/pages/404.astro`)
- **Form validation** — HTML5 constraint validation + server-side validation on submission
- **Edge errors** — Cloudflare adapter handles edge-level failures

## 8. Performance Strategy

| Concern | Approach |
|---------|----------|
| JavaScript | Zero JS by default; Astro islands only where needed |
| CSS | Tailwind generates only used utilities; purged at build |
| Images | Sharp-based optimisation pipeline with responsive srcset |
| Fonts | Self-hosted or `font-display: swap` for web fonts |
| Caching | Cloudflare edge caching with immutable Cache-Control for assets |
| HTML | Astro `compressHTML: true` for whitespace minimisation |
| Analytics | Deferred, non-blocking analytics script (future) |

## 9. Deployment Architecture

```
Developer Push (main branch)
        │
        ▼
Cloudflare Pages Git Integration
        │
        ├── npm ci
        ├── npm run build
        └── Deploy to Cloudflare Edge
                │
                ├── Static assets → CDN (immutable cache, 1 year)
                ├── HTML pages → CDN (short TTL, revalidated)
                └── _headers / _redirects → Edge configuration
```

## 10. Future Scalability

| Concern | Future Solution |
|---------|----------------|
| Dynamic content | Cloudflare Workers with KV/R2 |
| Image pipeline | Cloudflare Images with transformations |
| Multi-language | Astro i18n routing with separate content trees |
| CMS | Headless CMS (Strapi, Sanity, or decapCMS) |
| E-commerce | Shopify Storefront API or embedded buy buttons |
| Search | Cloudflare D1 or external search service |
| A/B Testing | Cloudflare Workers A/B testing |

---

**See also:** [CODING_STANDARDS.md](./CODING_STANDARDS.md) | [DEPLOYMENT.md](./DEPLOYMENT.md) | [PROJECT.md](./PROJECT.md)
