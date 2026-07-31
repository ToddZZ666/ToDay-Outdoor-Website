/**
 * helpers/getProduct.ts — single product lookup
 */
import { getProduct as _lookup, allProducts } from '../data';
import type { Product } from '../types';

export function getProduct(slug: string): Product | undefined {
  return _lookup(slug);
}

/** All slugs for static generation of the `[slug]` route. */
export function getAllProductSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}
