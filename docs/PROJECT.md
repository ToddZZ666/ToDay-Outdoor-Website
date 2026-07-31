# Product Requirements Document — ToDay

> **Brand:** ToDay
> **Position:** Premium Outdoor Living Brand
> **Document Type:** Product Requirements Document (PRD)
> **Status:** Approved — Phase 1 Complete

---

## 1. Project Vision

To become the definitive digital home for **ToDay**, a premium outdoor living brand. The website will serve as the primary global touchpoint for B2B partners, showcasing product excellence, brand integrity, and design leadership in the outdoor furniture industry.

## 2. Mission

To deliver a fast, accessible, and visually compelling brand experience that communicates craftsmanship, durability, and modern outdoor living — while generating qualified B2B leads and supporting long-term business growth across North America and Europe.

## 3. Business Goals

| Goal | Description | Priority |
|------|-------------|----------|
| Brand Presence | Establish a premium online brand identity that reflects product quality | Critical |
| Lead Generation | Drive qualified B2B inquiries through strategic CTAs and content | Critical |
| Global Reach | Serve the US, Canadian, and European markets with localised content | High |
| SEO Dominance | Rank for key outdoor furniture terms in target markets | High |
| Scalability | Support future product lines, CMS, and e-commerce without rebuild | Medium |

## 4. Target Audience

### Primary: B2B Buyers

- **Importers** and **distributors** in North America and Europe
- **Hospitality buyers** (hotels, resorts, restaurants sourcing outdoor furniture)
- **Interior designers** and **architects** specifying for commercial projects
- **Retail chains** looking for private-label or wholesale partnerships

### Secondary: End Consumers

- Homeowners seeking premium outdoor furniture
- Design-conscious consumers researching before purchasing through retail partners

## 5. Product Categories

### Current

| Product Line | Description |
|-------------|-------------|
| Outdoor Sofa | Modular and fixed-configuration outdoor seating |
| Dining Set | Complete outdoor dining solutions for 4–8 persons |
| Fire Pit Table | Propane/gas fire pit tables with integrated dining surface |
| Lounge Chair | Ergonomic outdoor lounge and sun-bathing chairs |

### Future Expansion

| Category | Timeline |
|----------|----------|
| Garden (planters, decor, lighting) | Phase 5+ |
| Home & Living (indoor accent furniture) | Phase 7+ |

## 6. Functional Scope

### Phase 1 — Foundation (Complete)

- [x] Astro project initialisation with TypeScript strict mode
- [x] Tailwind CSS styling pipeline
- [x] ESLint + Prettier code quality tooling
- [x] Reusable component architecture (Button, Card, Container, Section, Header, Footer, BaseHead)
- [x] Layout system with responsive container
- [x] SEO metadata component (Open Graph, Twitter Cards, canonical URLs)
- [x] Cloudflare Pages deployment pipeline

### Phase 2 — Homepage

- [ ] Hero section with brand messaging and primary CTA
- [ ] Product category showcase grid
- [ ] Brand value proposition section
- [ ] Call-to-action lead capture section

### Phase 3 — Product Pages

- [ ] Product catalogue overview page
- [ ] Individual product detail pages with specifications
- [ ] Product image gallery / carousel
- [ ] Downloadable spec sheets and catalogues

### Phase 4 — Content

- [ ] About page — brand story, manufacturing, quality commitment
- [ ] Contact page with B2B inquiry form
- [ ] Blog / news section
- [ ] Resource centre (downloads, certifications, guides)

### Phase 5 — Lead Generation

- [ ] Multi-step inquiry form
- [ ] CRM integration (future)
- [ ] Analytics and conversion tracking
- [ ] Cookie consent mechanism

### Phase 6 — Advanced

- [ ] CMS integration for content management
- [ ] Multi-language support (i18n) for European markets
- [ ] Structured data (JSON-LD) for rich search results
- [ ] Optional e-commerce integration (Shopify or equivalent)

## 7. Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Lighthouse score | ≥ 95 all categories |
| Performance | First Contentful Paint | < 1.5s |
| Performance | Largest Contentful Paint | < 2.5s |
| Performance | Cumulative Layout Shift | < 0.1 |
| Performance | First Input Delay | < 100ms |
| Availability | Uptime (via Cloudflare CDN) | 99.9% |
| Accessibility | WCAG compliance | AA minimum |
| Security | HTTPS, CSP headers, form validation | All pages |
| SEO | Pages with unique meta tags | 100% |
| Mobile | Responsive breakpoints | All device sizes |
| Dark Mode | System-preference based toggle | Supported |

## 8. Future Expansion

- **Cloudflare Workers** — Edge API endpoints for dynamic content (e.g., enquiry form handler, stock availability)
- **Cloudflare Images** — Optimised image pipeline with transformations and CDN delivery
- **Cloudflare R2** — Asset storage for catalogues, spec sheets, and media files
- **CMS** — Headless CMS for blog, resource centre, and internationalised content
- **Multi-language** — i18n support for en-US, en-CA, en-GB, and European markets (fr, de, es)
- **E-commerce** — Optional Shopify or equivalent integration for direct sales

## 9. Success Metrics

| Metric | Measurement | Target |
|--------|-------------|--------|
| Organic Traffic | Monthly unique visitors from organic search | ≥ 10,000 at maturity |
| B2B Leads | Qualified contact form submissions per month | ≥ 50 |
| Bounce Rate | Single-page session percentage | < 40% |
| Avg. Session Duration | Time on site | ≥ 2 minutes |
| Page Load Time | Global average from Cloudflare analytics | < 2s |
| SEO Position | Average rank for top-10 target keywords | Top 3 within 12 months |
| Conversion Rate | Form submissions ÷ unique visitors | ≥ 2% |

---

**See also:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [ROADMAP.md](./ROADMAP.md) | [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
