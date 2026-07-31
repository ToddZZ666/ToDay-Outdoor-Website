# Content Strategy — ToDay

> **Purpose:** Define the content architecture, page structures, and lead generation strategy for the ToDay website.

---

## 1. Homepage Structure

### Above the Fold (Hero)
- **Headline:** 6–10 word aspirational statement ("Outdoor Living, Elevated.")
- **Subheadline:** 1–2 sentence value proposition targeting B2B buyers
- **Primary CTA:** "Request a Catalogue" or "Explore the Collection"
- **Background:** Full-bleed lifestyle photography — outdoor setting with product

### Below the Fold

| Section | Content | Purpose |
|---------|---------|---------|
| Featured Products | Grid of current product lines (Outdoor Sofa, Dining Set, Fire Pit Table, Lounge Chair) | Showcase breadth |
| Why ToDay | 3–4 value props: materials, craftsmanship, warranty, global shipping | Build trust |
| Testimonials (future) | Quotes from B2B partners with logos | Social proof |
| CTA Section | "Ready to partner with ToDay?" / "Request a Catalogue" | Lead capture |

## 2. Product Pages

### Catalogue Overview Page (`/products`)

| Element | Description |
|---------|-------------|
| Heading | "Our Collections" |
| Subheading | 1–2 sentence introduction |
| Product Grid | Cards with product image, name, short description, "View Details" link |
| Filtering (future) | Category, material, size filters |

### Product Detail Page (`/products/[slug]`)

| Element | Description |
|---------|-------------|
| Product Name | Full product name |
| Hero Image | Large lifestyle photo |
| Image Gallery | 3–5 images: angles, close-ups, detail shots |
| Description | 2–3 paragraph technical + lifestyle description |
| Specifications | Table: dimensions, materials, weight, warranty |
| Key Features | Bulleted list of differentiators |
| CTA | "Request a Quote" / "Download Spec Sheet" |
| Related Products | 3–4 product cards from same collection |

## 3. About Page (`/about`)

| Section | Content |
|---------|---------|
| Hero | Brand story headline + full-bleed image |
| Our Story | 3–4 paragraphs: founding, philosophy, craftsmanship |
| By the Numbers | Stats: years in business, products sold, markets served |
| Values | 3–4 brand values with icons and descriptions |
| CTA | "Partner with ToDay" → contact page |

## 4. Contact Page (`/contact`)

| Element | Description |
|---------|-------------|
| Heading | "Let's Work Together" |
| Form Fields | Name, Company, Email, Phone, Country, Product Interest (dropdown), Message |
| Validation | HTML5 constraint validation with clear error messages |
| Privacy Note | "We'll never share your information. Read our Privacy Policy." |
| Contact Info | Email, phone (optional), office address |
| Response Promise | "We'll respond within one business day." |

## 5. Future Blog (`/blog`)

### Blog Listing
- Card grid with featured image, title, excerpt, date, category tag
- Pagination (10 posts per page)
- Category filter sidebar

### Blog Post
- Featured image
- Title + author + date + reading time
- Body with headings, images, pull quotes
- Related posts at bottom
- CTA: "Interested in our products? Request a catalogue."

### Content Topics
- Product care and maintenance guides
- Outdoor design inspiration
- Material deep-dives (aluminium, teak, Sunbrella fabrics)
- Industry trends (hospitality, outdoor living)
- Company news and trade show participation

## 6. Resource Centre (Future)

| Asset | Description |
|-------|-------------|
| Product Catalogues | PDF brochures per collection |
| Spec Sheets | Technical specifications per product |
| Certifications | Certificates (ISO, FSC, fire ratings) |
| Installation Guides | Assembly and care instructions |
| Case Studies | B2B project showcase (hotel, resort installations) |

## 7. Internal Linking Strategy

| Page | Links To |
|------|----------|
| Homepage | Product catalogue, About, Contact |
| Product Detail | Related products, Contact (quote), Resource Centre |
| About | Product catalogue, Contact |
| Blog | Related products, Resource Centre |
| Contact | Homepage, Product catalogue |

**Rules:**
- Every page must have at least one internal link to another meaningful page
- Link text must be descriptive (not "click here")
- Use navigation as the backbone, content links as supplemental

## 8. Lead Generation Strategy

| Channel | Mechanism | Lead Type |
|---------|-----------|-----------|
| Product pages | "Request a Quote" button → contact form | Hot lead |
| Homepage | "Request a Catalogue" CTA | Warm lead |
| Blog posts | Content upgrade (e.g., "Download the Full Catalogue") | Cold lead |
| Resource Centre | Gated downloads (email required) | Cold lead |
| Footer | "Partner with ToDay" link | General lead |

### Form Strategy

- **Minimum viable fields:** Name, Email, Company, Country, Message
- **Progressive profiling:** Collect more data over time (use future CRM)
- **Validation:** Client-side + server-side
- **Confirmation:** Thank-you page + auto-reply email (future)

---

**See also:** [SEO_GUIDE.md](./SEO_GUIDE.md) | [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
