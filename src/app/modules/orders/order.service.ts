import mongoose, { Types } from 'mongoose'
import { Product } from '../student/product.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

class AppError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

const createOrderIntoDB = async (orderData: TOrder) => {
  const session = await mongoose.startSession()

  try {
    let createdOrder
    await session.withTransaction(async () => {
      // 1) Fetch product (FOR UPDATE)
      const product = await Product.findById(orderData.productId)
        .session(session)
        .select('price inventory.quantity inventory.inStock')

      if (!product) {
        throw new AppError(404, 'Product not found')
      }

      // 2) Stock check
      if (product.inventory.quantity < orderData.quantity) {
        throw new AppError(409, 'Insufficient quantity available in inventory')
      }

      // 3) Decrement inventory & update inStock
      product.inventory.quantity -= orderData.quantity
      product.inventory.inStock = product.inventory.quantity > 0
      await product.save({ session })

      // (Optional) trust DB price instead of request price
      const priceToUse = product.price // or orderData.price if you want to trust client

      // 4) Create order in same transaction
      const [order] = await Order.create(
        [
          {
            email: orderData.email,
            productId:
              orderData.productId instanceof Types.ObjectId
                ? orderData.productId
                : new Types.ObjectId(orderData.productId),
            price: priceToUse,
            quantity: orderData.quantity,
          },
        ],
        { session },
      )

      createdOrder = order
    })

    return createdOrder
  } catch (err) {
    // Bubble custom error upwards
    if (err instanceof AppError) throw err
    throw new AppError(500, 'Failed to create order')
  } finally {
    session.endSession()
  }
}

const getAllOrdersFromDB = async (email?: string) => {
  if (!email) {
    return Order.find() // return all if no search term
  }
  return Order.find({ email: email.toLowerCase() }).sort({ createdAt: -1 })
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
