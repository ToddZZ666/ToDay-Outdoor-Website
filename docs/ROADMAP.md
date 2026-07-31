# Development Roadmap — ToDay

> **Purpose:** Define the phased development plan from foundation to full platform maturity.

---

## Phase 1 — Foundation (Complete)

> Establish the project scaffold, tooling, and reusable architecture.

- [x] Astro project initialisation with TypeScript strict mode
- [x] Tailwind CSS styling pipeline
- [x] ESLint + Prettier code quality tooling
- [x] Documentation scaffolding (`docs/` directory with all guides)
- [x] Reusable component architecture (Button, Card, Container, Section, Header, Footer, BaseHead)
- [x] Layout system with responsive container
- [x] SEO metadata component (Open Graph, Twitter Cards, canonical URLs)
- [x] Cloudflare Pages deployment pipeline
- [x] .gitignore, .editorconfig, .prettierignore

## Phase 2 — Homepage (Next)

> Build the main brand-facing landing page with product showcase.

- [ ] Hero section with brand messaging and primary CTA
- [ ] Product category showcase grid
- [ ] Brand value proposition section
- [ ] CTA lead capture section
- [ ] Responsive design verified at all breakpoints
- [ ] Lighthouse score ≥ 95 on mobile and desktop

## Phase 3 — Products

> Product catalogue and detail pages.

- [ ] Product catalogue overview page
- [ ] Individual product detail page template
- [ ] Product image gallery
- [ ] Downloadable spec sheets
- [ ] Related products section

## Phase 4 — SEO Foundation

> Optimise all pages for search engines and establish monitoring.

- [ ] Structured data (JSON-LD) on all pages
- [ ] XML sitemap generation
- [ ] Robots.txt configuration
- [ ] Core Web Vitals optimisation
- [ ] Keyword-optimised content for target product terms
- [ ] Google Search Console setup

## Phase 5 — Content Pages

> Build supporting content for brand building and organic traffic.

- [ ] About page (brand story, values, craftsmanship)
- [ ] Contact page with B2B enquiry form
- [ ] Resource centre (catalogues, spec sheets, certifications)
- [ ] Blog / news section
- [ ] Blog post template and listing page

## Phase 6 — Lead Generation

> Implement conversion mechanisms and tracking.

- [ ] Multi-step B2B enquiry form
- [ ] Form validation (client + server)
- [ ] Thank-you page and confirmation flow
- [ ] Analytics integration (privacy-compliant)
- [ ] Conversion tracking and goals
- [ ] Cookie consent mechanism (GDPR compliant)

## Phase 7 — CMS & Multi-language

> Enable content management and internationalisation.

- [ ] Headless CMS integration (Strapi, Decap CMS, or equivalent)
- [ ] Blog and resource centre migration to CMS
- [ ] i18n routing structure (`/de/`, `/fr/`, `/es/`)
- [ ] English variants: en-US, en-CA, en-GB
- [ ] European language support (German, French, Spanish)
- [ ] hreflang tags and international SEO configuration

## Phase 8 — Optional E-commerce

> Evaluate and implement direct-to-consumer or hybrid sales.

- [ ] Shopify integration assessment
- [ ] Product catalogue sync
- [ ] Buy button or embedded storefront
- [ ] B2B wholesale pricing and login
- [ ] Order enquiry flow

---

## Milestone Map

```
Phase 1: Foundation      ████████████████░░░░  Complete
Phase 2: Homepage        ██░░░░░░░░░░░░░░░░░░  Not started
Phase 3: Products        ██░░░░░░░░░░░░░░░░░░  Not started
Phase 4: SEO             ██░░░░░░░░░░░░░░░░░░  Not started
Phase 5: Content         ░░░░░░░░░░░░░░░░░░░░  Not started
Phase 6: Lead Gen        ░░░░░░░░░░░░░░░░░░░░  Not started
Phase 7: CMS & i18n      ░░░░░░░░░░░░░░░░░░░░  Not started
Phase 8: E-commerce      ░░░░░░░░░░░░░░░░░░░░  Not started
```

---

**See also:** [PROJECT.md](./PROJECT.md) | [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
