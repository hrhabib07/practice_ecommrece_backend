import { Model } from 'mongoose'
// Variant type
export type TProductVariant = {
  type: string // e.g., "size", "color"
  value: string // e.g., "Small", "Red"
}

// Inventory type
export type TProductInventory = {
  quantity: number
  inStock: boolean
}

// Product type
export type TProduct = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: TProductVariant[]
  inventory: TProductInventory
}

export type TProductUpdate = Partial<
  Omit<TProduct, 'variants' | 'inventory'>
> & {
  variants?: Partial<TProductVariant>[]
  inventory?: Partial<TProductInventory>
}

export interface ProductModel extends Model<TProduct> {
  isUserExists(id: string): Promise<TProduct | null>
}
