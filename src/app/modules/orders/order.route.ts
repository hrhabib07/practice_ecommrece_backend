import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

// will call controller function
router.post('/', OrderController.createOrder)
router.get('/', OrderController.getAllOrders)

export const orderRoutes = router
