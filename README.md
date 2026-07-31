# ToDay — Premium Outdoor Living Brand

A corporate website for **ToDay**, a premium outdoor living brand. Built for long-term maintainability, global B2B lead generation, and future scalability.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 7.x |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4.x |
| Linting | ESLint + typescript-eslint |
| Formatting | Prettier |
| Hosting | Cloudflare Pages |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without changes |
| `npm run typecheck` | Run Astro type checking |
| `npm run clean` | Remove build artifacts |

## Project Structure

```
/
├── docs/                    # Engineering documentation
├── public/                  # Static assets (copied verbatim)
├── scripts/                 # Build and automation scripts
├── src/
│   ├── components/          # Reusable UI components
│   ├── data/                # Static configuration and data
│   ├── layouts/             # Page-level layout wrappers
│   ├── pages/               # Route pages (file-based routing)
│   ├── sections/            # Page region compositions
│   ├── styles/              # Global CSS entry points
│   ├── types/               # Shared TypeScript type definitions
│   └── utils/               # Pure utility functions
├── astro.config.mjs         # Astro configuration
├── eslint.config.js         # ESLint flat configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── .prettierrc              # Prettier formatting rules
```

## Documentation

All project documentation lives in `docs/` and is organised by concern:

| Document | What It Covers |
|----------|---------------|
| [PROJECT.md](./docs/PROJECT.md) | Product Requirements Document — vision, goals, scope, metrics |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, folder structure, rendering strategy, component architecture |
| [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) | Visual tokens, typography, spacing, components, accessibility |
| [BRAND_GUIDELINES.md](./docs/BRAND_GUIDELINES.md) | Brand voice, writing style, terminology, tone |
| [CONTENT_STRATEGY.md](./docs/CONTENT_STRATEGY.md) | Page structures, internal linking, lead generation |
| [SEO_GUIDE.md](./docs/SEO_GUIDE.md) | Metadata rules, structured data, Core Web Vitals |
| [CODING_STANDARDS.md](./docs/CODING_STANDARDS.md) | TypeScript, Astro, Tailwind, naming, imports, commits |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Git workflow, CI/CD, environment variables, rollback |
| [DEVELOPMENT_WORKFLOW.md](./docs/DEVELOPMENT_WORKFLOW.md) | Roles, processes, quality gates, definition of done |
| [ROADMAP.md](./docs/ROADMAP.md) | Phased development plan from foundation to e-commerce |
| [CHANGELOG_GUIDELINES.md](./docs/CHANGELOG_GUIDELINES.md) | How to maintain the changelog |

**New contributors:** Read the documents in the order listed above. See [DEVELOPMENT_WORKFLOW.md](./docs/DEVELOPMENT_WORKFLOW.md#3-required-reading-order) for details.

## Development Workflow

1. Create a feature branch from `main` (`feat/`, `fix/`, `docs/`, `refactor/`, `chore/`)
2. Implement the change following [CODING_STANDARDS.md](./docs/CODING_STANDARDS.md)
3. Run quality gates: `npm run lint && npm run typecheck && npm run build`
4. Update documentation if the change affects architecture, design, or process
5. Submit a pull request for review
6. Squash-merge to `main` with a conventional commit message
7. Deployment is automatic via Cloudflare Pages

## Deployment

Production deploys to **Cloudflare Pages** automatically on push to `main`. Preview deployments are generated for all pull requests.

For manual deploy: `npm run build && npx wrangler pages deploy dist/client/`

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for the full deployment guide.

## Product Lines

- **Outdoor Sofa** — Modular and fixed-configuration outdoor seating
- **Dining Set** — Complete outdoor dining solutions for 4–8 persons
- **Fire Pit Table** — Propane/gas fire pit tables with integrated dining surface
- **Lounge Chair** — Ergonomic outdoor lounge and sun-bathing chairs

## Future

- Cloudflare Workers, Images, R2
- Headless CMS and blog
- Multi-language support (en-US, en-CA, en-GB, fr, de, es)
- Optional e-commerce integration
