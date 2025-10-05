import { z } from 'zod'

/** Variant */
export const productVariantZ = z.object({
  type: z.string().min(1, 'Variant type is required'), // e.g., "size", "color"
  value: z.string().min(1, 'Variant value is required'), // e.g., "Small", "Red"
})

/** Inventory */
export const productInventoryZ = z.object({
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean().default(true),
})

/** Create (POST) */
export const productCreateZ = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative('Price cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1)).default([]),
  variants: z.array(productVariantZ).default([]),
  inventory: productInventoryZ, // required
})

/** Update (PATCH) — all fields optional, including nested ones */
export const productUpdateZ = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  variants: z
    .array(
      z.object({
        type: z.string().min(1).optional(),
        value: z.string().min(1).optional(),
      }),
    )
    .optional(),
  inventory: z
    .object({
      quantity: z.number().int().min(0).optional(),
      inStock: z.boolean().optional(),
    })
    .optional(),
})

/** Inferred TS types (optional) */
export type TProductCreate = z.infer<typeof productCreateZ>
export type TProductUpdate = z.infer<typeof productUpdateZ>
