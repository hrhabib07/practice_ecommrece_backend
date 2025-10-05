import { Model, Types } from 'mongoose'
export interface TOrder {
  email: string
  productId: Types.ObjectId
  price: number
  quantity: number
}

export interface OrderModel extends Model<TOrder> {
  isUserExists(id: string): Promise<TOrder | null>
}
