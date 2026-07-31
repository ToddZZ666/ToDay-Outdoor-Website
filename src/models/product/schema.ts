/** Product Model — Schema
 * ──────────────────────
 * Placeholder for future runtime validation (zod / io-ts / valibot).
 * When enabled, every product data file and any CMS payload will pass
 * through this schema before reaching the page layer.
 *
 * Example (future):
 *   import { z } from 'zod';
 *   export const productSchema = z.object({
 *     slug: z.string().min(3),
 *     name: z.string().min(2),
 *     price: z.number().positive(),
 *     // ...
 *   });
 *   export function validateProduct(raw: unknown): asserts raw is Product {
 *     productSchema.parse(raw);
 *   }
 */
