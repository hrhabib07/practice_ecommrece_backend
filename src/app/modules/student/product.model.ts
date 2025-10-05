import { Schema, model } from 'mongoose'
import {
  ProductModel,
  TProduct,
  TProductInventory,
  TProductVariant,
} from './product.interface'

const productVariantSchema = new Schema<TProductVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }, // don’t create _id for each variant
)

const productInventorySchema = new Schema<TProductInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
  },
  { _id: false },
)

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      index: true,
    },
    description: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    tags: { type: [String], default: [], index: true },
    variants: { type: [productVariantSchema], default: [] },
    inventory: { type: productInventorySchema, required: true },
  },
  {
    timestamps: true,
  },
)

productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  tags: 'text',
})

export const Product = model<TProduct, ProductModel>('Product', productSchema)
