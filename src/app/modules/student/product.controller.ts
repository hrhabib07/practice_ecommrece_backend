import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import { productCreateZ } from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const zodParsedData = productCreateZ.parse(productData)

    const result = await ProductServices.createProductIntoDB(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query
    const result = await ProductServices.getAllProductsFromDB(searchTerm as string)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    await ProductServices.deleteProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updateData = req.body
    const zodParsedData = productCreateZ.parse(updateData)

    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      zodParsedData,
    )

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
}
