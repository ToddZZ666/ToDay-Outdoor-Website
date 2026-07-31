/**
 * Product Model — Canonical Type Definitions
 * ────────────────────────────────────────────
 * Single source of truth for every product shape in the site.
 * All product data files, the registry, the Collection page, and the
 * Product Detail page import exclusively from this file.
 */

// ─── Identity ──────────────────────────────────────────
export interface ProductIdentity {
  slug: string;
  category: string;
  categoryName: string;
  subCategory?: string;
  name: string;
  subtitle?: string;
  status: 'active' | 'coming-soon' | 'discontinued';
  price: number;
  priceFrom?: boolean;
  currency?: string;
  sku?: string;
  badge?: string;
}

// ─── Gallery ───────────────────────────────────────────
export interface GalleryImage {
  id: string;
  image: string;
  thumb?: string;
  alt: string;
  isHero?: boolean;
  order: number;
}

// ─── Options ───────────────────────────────────────────
export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductConfiguration {
  label: string;
  value: string;
}

// ─── Content Sections ──────────────────────────────────
export interface ProductStory {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface MaterialHighlight {
  title: string;
  description: string;
  image?: string;
}

// ─── Technical ─────────────────────────────────────────
export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductDimensions {
  overallWidth: number;
  overallDepth: number;
  overallHeight: number;
  seatHeight: number;
  weight: number;
}

// ─── Downloads ─────────────────────────────────────────
export interface ProductDownload {
  type: 'catalog' | 'care-guide' | 'warranty' | 'installation';
  label: string;
  url: string;
}

// ─── Related ───────────────────────────────────────────
export interface RelatedProductRef {
  slug: string;
}

// ─── SEO ───────────────────────────────────────────────
export interface ProductSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// ─── Collection Card (listing surface) ─────────────────
export interface ProductCard {
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  priceFrom?: boolean;
  image: string;
  colors: ColorOption[];
  badge?: string;
}

// ─── Main Product (canonical) ──────────────────────────
export interface Product extends ProductIdentity {
  shortDescription: string;

  // Gallery
  gallery: GalleryImage[];

  // Options
  colorOptions: ColorOption[];
  configurations: ProductConfiguration[];

  // Content
  story: ProductStory;
  features: ProductFeature[];
  materialHighlights: MaterialHighlight[];
  materialFlatlay?: string;

  // Technical
  specifications: ProductSpecification[];
  dimensions: ProductDimensions;
  dimensionDrawing?: string;
  assemblyDrawing?: string;

  // Downloads
  downloads?: ProductDownload[];

  // Related
  relatedProducts: RelatedProductRef[];

  // SEO
  seo: ProductSEO;
}

// ─── Derived / Runtime Shapes ──────────────────────────

/** Detail-page section: gallery image converted for legacy HeroGallery prop. */
export interface ProductHeroImage {
  src: string;
  alt: string;
  thumb: string;
}

/** Resolved related product card with full href. */
export interface ResolvedRelatedCard {
  name: string;
  price: number;
  image: string;
  slug: string; // canonical href, e.g. /products/coastal-sectional-sofa
}
