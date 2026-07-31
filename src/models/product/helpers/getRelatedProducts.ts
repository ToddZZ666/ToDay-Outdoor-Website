/**
 * helpers/getRelatedProducts.ts — resolve related product refs to cards
 */
import { getProduct, allProducts } from '../data';
import type { Product, ResolvedRelatedCard } from '../types';

const knownSlugs = new Set(allProducts.map((p) => p.slug));

export function getRelatedProducts(currentSlug: string, refs: { slug: string }[]): ResolvedRelatedCard[] {
  return refs
    .map((ref) => {
      if (!knownSlugs.has(ref.slug)) {
        console.warn(
          `[product-model] Related slug "${ref.slug}" referenced by ` +
            `"${currentSlug}" not found in registry. Add the product data file ` +
            `and register it in models/product/data/index.ts.`,
        );
        return null;
      }
      const p = getProduct(ref.slug)!;
      return {
        name: p.name,
        price: p.price,
        image: heroOf(p),
        slug: `/products/${p.slug}`,
      };
    })
    .filter((r): r is ResolvedRelatedCard => r !== null);
}

function heroOf(p: Product): string {
  const hero = p.gallery.find((g) => g.isHero) || p.gallery[0];
  return hero?.image || '';
}
