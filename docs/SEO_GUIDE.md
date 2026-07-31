# SEO Guide — ToDay

> **Purpose:** Define the search engine optimisation rules and best practices for the ToDay website.

---

## 1. SEO Principles

| Principle | Description |
|-----------|-------------|
| **Content-first** | Write for humans first, search engines second |
| **Semantic HTML** | Use heading hierarchy, landmarks, and structured data correctly |
| **Performance is SEO** | Core Web Vitals are ranking factors — performance and SEO are the same concern |
| **Canonical** | Every page has exactly one URL; no duplicate content |
| **Accessible** | Accessibility improvements correlate with ranking improvements |

## 2. Metadata Rules

### Every Page Must Have

```html
<title>Primary Keyword | ToDay</title>
<meta name="description" content="Compelling 150–160 character description with primary keyword." />
```

### Title Tag Rules

- Include brand name at the end: `Primary Keyword | ToDay`
- 50–60 characters maximum
- Primary keyword near the beginning
- Unique per page — no duplicate titles
- Use sentence case or Title Case consistently

### Meta Description Rules

- 150–160 characters
- Include primary keyword naturally
- Include a call-to-action or value proposition
- Unique per page
- Write as a complete sentence, not keyword-stuffed

## 3. Open Graph

Every page must include Open Graph tags (handled by `BaseHead` component):

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:title" content="Page Title | ToDay" />
<meta property="og:description" content="Page description." />
<meta property="og:image" content="https://example.com/og-image.jpg" />
```

### Image Requirements

| Attribute | Requirement |
|-----------|-------------|
| Aspect Ratio | 1.91:1 (1200×630 recommended) |
| Format | JPEG or WebP |
| Max Size | 5MB |
| Branding | Include logo overlay where appropriate |

## 4. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://example.com/page" />
<meta name="twitter:title" content="Page Title | ToDay" />
<meta name="twitter:description" content="Page description." />
<meta name="twitter:image" content="https://example.com/og-image.jpg" />
```

## 5. Structured Data (JSON-LD)

### Organisation Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ToDay",
  "url": "https://example.com",
  "logo": "https://example.com/logo.svg",
  "description": "Premium outdoor living brand specializing in outdoor sofas, dining sets, fire pit tables, and lounge chairs.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
}
```

### Product Schema (Product Pages — Future)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description.",
  "brand": {
    "@type": "Brand",
    "name": "ToDay"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  }
}
```

### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://example.com/products" }
  ]
}
```

## 6. Canonical URLs

- Every page must have a `<link rel="canonical">` tag pointing to its preferred URL
- Use the `canonicalURL` prop on `BaseHead`
- No trailing slashes unless canonical URL structure requires them
- For pagination, use `rel="prev"` and `rel="next"` instead of canonical

## 7. Heading Hierarchy

| Rule | Example |
|------|---------|
| One `<h1>` per page | `<h1>Premium Outdoor Sofas for Hospitality</h1>` |
| Hierarchical order | `h1 → h2 → h3 → h4` (no skipping levels) |
| Keywords in headings | Yes, naturally — not keyword-stuffed |
| Heading describes content | Each heading accurately reflects the section below |

## 8. Image Optimisation

| Rule | Detail |
|------|--------|
| Alt text | Every `<img>` must have descriptive `alt` attribute |
| Format | WebP preferred, JPEG as fallback |
| Responsive | `srcset` with multiple sizes |
| Compression | Quality 80–85 for JPEG/WebP |
| Lazy loading | `loading="lazy"` for below-fold images |
| Dimensions | Always set `width` and `height` to prevent CLS |

## 9. Performance (Core Web Vitals)

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Optimised images, preload hero image, minimal CSS/JS |
| FID | < 100ms | Minimal JavaScript, defer non-critical scripts |
| CLS | < 0.1 | Explicit image dimensions, no dynamic insertions above fold |

## 10. Keyword Strategy

### Primary Keywords (Target: Top 3)

| Keyword | Page Target |
|---------|-------------|
| premium outdoor sofa manufacturer | Product: Outdoor Sofa |
| outdoor dining set supplier | Product: Dining Set |
| fire pit table wholesale | Product: Fire Pit Table |
| commercial lounge chair supplier | Product: Lounge Chair |
| outdoor furniture manufacturer USA | Homepage / About |

### Secondary Keywords

- "commercial outdoor furniture" — hospitality buyer intent
- "hotel outdoor furniture supplier"
- "restaurant patio furniture wholesale"
- "outdoor furniture for resorts"
- "contract outdoor furniture"

### Long-Tail Keywords

- "weather-resistant outdoor sofa for hotels"
- "6-person aluminium dining set commercial"
- "propane fire pit table with dining surface"
- "stackable outdoor lounge chair bulk order"

## 11. International SEO Strategy (Future)

| Consideration | Approach |
|---------------|----------|
| Language variants | Separate URL per language: `/de/`, `/fr/`, `/es/` |
| hreflang tags | `<link rel="alternate" hreflang="de" href="..." />` |
| Country targeting | Cloudflare geo-based redirect or content variation |
| Translation | Professional human translation, not machine |
| Market-specific keywords | Research keywords per market (difference: US vs. UK vs. DE) |

---

**See also:** [CONTENT_STRATEGY.md](./CONTENT_STRATEGY.md) | [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
