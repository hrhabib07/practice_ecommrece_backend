import { Request, Response } from 'express'
import { createOrderSchema } from './order.validation'
import { OrderServices } from './order.service'
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const zodParsedData = createOrderSchema.parse(orderData)

    const result = await OrderServices.createOrderIntoDB(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: unknown) {
    let message = 'something went wrong'

    if (err instanceof Error) {
      message = err.message
    }

    res.status(500).json({
      success: false,
      message,
      error: err,
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query
    const result = await OrderServices.getAllOrdersFromDB(email as string)
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    })
  } catch (err: unknown) {
    let message = 'something went wrong'

    if (err instanceof Error) {
      message = err.message
    }

    res.status(500).json({
      success: false,
      message,
      error: err,
    })
  }
}

export const OrderController = {
  createOrder,
  getAllOrders,
}
