import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()

// will call controller function
router.post('/', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:productId', ProductController.getSingleProduct)
router.delete('/:productId', ProductController.deleteProduct)
router.put('/:productId', ProductController.updateProduct)

export const productRoutes = router
