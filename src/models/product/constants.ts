/**
 * Product Model — Category Constants
 * ──────────────────────────────────
 * Canonical mapping between product category values and display labels.
 * Consumed by the Collection page, filter sidebar, and category navigation.
 */

import type { Product } from './types';

/** All category keys as they appear in product data files. */
export type ProductCategory = 'sofa' | 'dining' | 'lounge' | 'firepit' | 'accessories';

/** Map from category key → display label (matches UI design). */
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  sofa: 'Outdoor Sofa',
  dining: 'Dining Set',
  lounge: 'Lounge Chair',
  firepit: 'Fire Pit Table',
  accessories: 'Accessories',
};

/**
 * Resolve a display label for any product's category.
 * Falls back to the raw value if not in the canonical map.
 */
export function getCategoryLabel(product: Pick<Product, 'categoryName' | 'category'>): string {
  if (product.categoryName) return product.categoryName;
  return CATEGORY_LABELS[product.category as ProductCategory] ?? product.category;
}
