/**
 * helpers/getProducts.ts — full product list + card list + categories
 */
import { products as _products, allProducts as _allProducts } from '../data';
import { CATEGORY_LABELS, type ProductCategory } from '../constants';
import type { Product, ProductCard, ColorOption } from '../types';

/** All full Product records — read-only. */
export function getProducts(): Product[] {
  return _products;
}

/** All full Product records — read-only (alias). */
export function getAllProducts(): Product[] {
  return _allProducts;
}

export function getProductsAsCards(): ProductCard[] {
  return _products.map(cardFromProduct);
}

function cardFromProduct(p: Product): ProductCard {
  const hero = p.gallery.find((g) => g.isHero) || p.gallery[0];
  const colors: ColorOption[] = p.colorOptions.filter((c) => c.hex);
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryName: p.categoryName,
    price: p.price,
    priceFrom: p.priceFrom,
    image: hero?.image || '',
    colors,
    badge: p.badge,
  };
}

export function getCategories(): { label: string; value: string; count: number }[] {
  const counts: Record<string, number> = {};
  _products.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return [
    { label: 'All', value: 'all', count: _products.length },
    ...Object.entries(counts).map(([value, count]) => ({
      label: CATEGORY_LABELS[value as ProductCategory] ?? value,
      value,
      count,
    })),
  ];
}
