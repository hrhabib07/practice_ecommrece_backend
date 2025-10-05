import { Types } from 'mongoose'
import { z } from 'zod'

const objectIdRegex = /^[a-f\d]{24}$/i

export const createOrderSchema = z.object({
  email: z.string().email('Invalid email address'),
  productId: z
    .string()
    .regex(objectIdRegex, 'productId must be a valid 24-char ObjectId')
    .transform((val) => new Types.ObjectId(val)),
  price: z.number().finite().nonnegative(),
  quantity: z.number().int().min(1),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
