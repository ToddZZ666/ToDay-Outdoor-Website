/**
 * Product Model — Single Entry Point
 *
 * All page components import exclusively from this file.
 *   import { getProduct, getProducts, getProductsAsCards, getCategories,
 *            getRelatedProducts, getAllProductSlugs, ProductCard }
 *     from '../models/product';
 *
 * Swapping the data source (local files → CMS → Shopify Headless)
 * requires changing only helpers/*; the page layer never sees it.
 */

// ── Types ──────────────────────────────────────────────
export type {
  Product,
  ProductCard,
  ProductStory,
  ProductFeature,
  ProductDimensions,
  ProductSpecification,
  GalleryImage,
  ColorOption,
  ProductConfiguration,
  ProductSEO,
  RelatedProductRef,
  ProductIdentity,
  ProductHeroImage,
  ResolvedRelatedCard,
  MaterialHighlight,
} from './types';

// ── Constants ──────────────────────────────────────────
export { CATEGORY_LABELS, getCategoryLabel } from './constants';

// ── Public API (Repository pattern) ───────────────────
export { getProduct, getAllProductSlugs } from './helpers/getProduct';
export { getProducts, getAllProducts, getProductsAsCards, getCategories } from './helpers/getProducts';
export { getRelatedProducts } from './helpers/getRelatedProducts';
