/**
 * Product Registry — internal data layer
 * ──────────────────────────────────────
 * DO NOT import this file from page components.
 * All access goes through `helpers/getProduct.ts` etc.
 *
 * The registry is the single source of truth for all product data files.
 * To add a product: create a file in `data/`, export a `Product`,
 * and register it below.
 */
import type { Product } from '../types';
import { coastalSectionalSofa } from './coastal-sectional-sofa';
import { rivieraDiningTable } from './riviera-dining-table';
import { cypressCoffeeTable } from './cypress-coffee-table';
import { nordicLoungeChair } from './nordic-lounge-chair';
import { graniteFirePitTable } from './granite-fire-pit-table';

const productRegistry: Record<string, Product> = {
  'coastal-sectional-sofa': coastalSectionalSofa,
  'riviera-dining-table': rivieraDiningTable,
  'cypress-coffee-table': cypressCoffeeTable,
  'nordic-lounge-chair': nordicLoungeChair,
  'granite-fire-pit-table': graniteFirePitTable,
};

/** Read-only snapshot of all registered products (two names for compatibility). */
export const allProducts: Product[] = Object.values(productRegistry);
export const products: Product[] = allProducts;
export function getProduct(slug: string): Product | undefined {
  return productRegistry[slug];
}
