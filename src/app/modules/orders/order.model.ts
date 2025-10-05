import { Schema, model } from 'mongoose'
import { OrderModel, TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, 'productId is required'],
      ref: 'Product',
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: [0, 'price must be >= 0'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
      min: [1, 'quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'quantity must be an integer',
      },
    },
  },
  { timestamps: true },
)

export const Order = model<TOrder, OrderModel>('Order', orderSchema)
