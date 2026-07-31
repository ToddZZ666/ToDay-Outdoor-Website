# Coding Standards — ToDay

> **Purpose:** Define the coding conventions, quality gates, and engineering standards for the ToDay website.
> These rules are enforced through tooling (ESLint, Prettier, TypeScript) and must be followed by every contributor.

---

## 1. TypeScript Guidelines

| Rule | Standard | Enforced By |
|------|----------|-------------|
| Strict mode | `astro/tsconfigs/strict` — all strict checks enabled | `tsconfig.json` |
| No `any` | Use `unknown` and type guards. `any` is forbidden. | ESLint |
| Interfaces | Prefer `interface` over `type` for object shapes | Convention |
| Type aliases | Use `type` for unions, intersections, and primitives | Convention |
| Exported props | Use `export interface Props` for Astro component props | Convention |
| Literal types | Use `as const` for constant values | Convention |
| Null/undefined | Use `undefined` over `null` except for legacy APIs | Convention |
| Generics | Prefer generic constraints (`extends`) over casts | Convention |

## 2. Framework Guidelines (Astro)

| Rule | Standard |
|------|----------|
| Component boundary | One component per file |
| Frontmatter | Place all logic in `---` frontmatter block |
| Props | Always define and export `Props` interface |
| Conditional classes | Use `class:` directives, not string concatenation |
| Client JS | Minimise: prefer server-rendered HTML |
| Islands | Only hydrate components that need interactivity |
| Slots | Prefer `<slot />` over `children` prop |

## 3. Styling Guidelines (Tailwind CSS)

| Rule | Standard |
|------|----------|
| Utilities only | No custom CSS unless no utility combination achieves the design |
| Mobile-first | Base styles = mobile; override with `sm:`, `md:`, `lg:`, `xl:` |
| Dark mode | Every colour utility must have `dark:` counterpart |
| Spacing | Use Tailwind spacing scale — no arbitrary values |
| Colours | Use named colours from the palette — no hex values inline |
| Transitions | Use `transition-all duration-200` for micro-interactions |
| Custom CSS | Must be justified in a comment and limited to `src/styles/` |

## 4. Component Design

| Principle | Description |
|-----------|-------------|
| Single responsibility | One component = one concern |
| Presentational | Components render what they receive; they don't fetch data |
| Composable | Favour small, composable primitives over large monolithic components |
| Predictable | Same props → same output (pure rendering) |
| Accessible | Semantic HTML, ARIA attributes, keyboard support |
| Responsive | Components must work at all breakpoints without breaking |

### Component Checklist

- [ ] Exports `Props` interface
- [ ] Uses semantic HTML elements
- [ ] Supports `class` prop for style extension
- [ ] Has `dark:` variants for all colour utilities
- [ ] Responsive at `sm:`, `md:`, `lg:` breakpoints minimum
- [ ] Keyboard-focusable interactive elements
- [ ] No hardcoded text that should be configurable

## 5. Folder Organisation

| Directory | Contains | Must Not Contain |
|-----------|----------|------------------|
| `src/components/` | Reusable UI components | Page logic, data fetching |
| `src/layouts/` | Page-level HTML wrappers | Business logic |
| `src/pages/` | Route entry points | Complex UI markup |
| `src/sections/` | Page region composites | Individual primitives |
| `src/styles/` | Global CSS files | Component styles (use Tailwind) |
| `src/types/` | TypeScript definitions | Runtime code |
| `src/utils/` | Pure functions | Side effects, components |
| `src/data/` | Static configuration | Business logic |
| `public/` | Static assets | Files needing transformation |

## 6. Naming Convention

| Artifact | Convention | Example |
|----------|-----------|---------|
| Component files | PascalCase | `Button.astro`, `ProductCard.astro` |
| Layout files | PascalCase | `Layout.astro`, `MarketingLayout.astro` |
| Section files | PascalCase | `HeroSection.astro` |
| Page files | camelCase or kebab-case | `index.astro`, `about.astro` |
| Utility modules | camelCase | `formatDate.ts`, `analytics.ts` |
| Type modules | camelCase | `types.ts`, `index.ts` |
| Data modules | camelCase | `siteConfig.ts` |
| SVG components | PascalCase | `MenuIcon.astro`, `CloseIcon.astro` |
| Functions | camelCase | `formatDate()`, `cn()` |
| Interfaces | PascalCase | `SiteConfig`, `NavLink` |
| Type aliases | PascalCase | `ColorVariant`, `ButtonSize` |
| Constants | camelCase | `siteUrl`, `breakpoints` |
| Environment vars | SCREAMING_SNAKE | `PUBLIC_SITE_URL` |

## 7. Import Convention

```typescript
// 1. External packages (alphabetical)
import { defineConfig } from 'astro/config';
import { clsx } from 'clsx';

// 2. Internal modules (alphabetical by path)
import Container from '~/components/Container.astro';
import { formatDate } from '~/utils/formatDate';

// 3. Styles (last)
import '../styles/global.css';
```

- Use relative imports (or configured alias) — never absolute paths
- Import components directly — no barrel files
- Group imports with blank line separators

## 8. Error Handling

| Scenario | Approach |
|----------|----------|
| Type errors | Caught at compile time by TypeScript strict mode |
| Lint errors | Caught at commit/pre-commit by ESLint |
| Runtime (client) | Minimal client JS means minimal runtime errors |
| 404 | Custom 404 page at `src/pages/404.astro` |
| Form validation | HTML5 constraints + server validation (future) |
| Missing data | Graceful fallbacks (default values, optional chains) |

## 9. Documentation Standards

| Artifact | Required | Format |
|----------|----------|--------|
| Component | Brief comment when purpose isn't obvious from name | `<!-- Breadcrumb navigation -->` |
| Utility function | JSDoc for public functions | `/** Formats a date to locale string. */` |
| Type/Interface | Comment for non-obvious fields | `/** URL of the page. */` |
| Page | No comment needed (route is self-documenting) | — |

## 10. Testing Strategy (Future)

| Layer | Tool | Scope |
|-------|------|-------|
| Static analysis | TypeScript + ESLint | Every change (enforced) |
| Unit tests | Vitest | Utility functions, helpers |
| Component tests | Playwright/Vitest | Interactive components (islands) |
| Integration tests | Playwright | Critical user journeys |
| Visual regression | Playwright screenshot comparison | Pages and key components |
| Performance | Lighthouse CI | Every PR |

## 11. Commit Message Convention

Use conventional commits:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, whitespace (non-functional) |
| `refactor` | Code restructuring (no functional change) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependencies |
| `ci` | CI/CD configuration |

### Examples

```
feat(homepage): add hero section with brand messaging
fix(nav): correct mobile hamburger toggle behaviour
docs(seo): add structured data requirements
style(button): reorder tailwind classes per convention
```

---

**See also:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
