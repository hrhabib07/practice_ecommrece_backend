import { TProduct, TProductUpdate } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData)
  return result
}

const getAllProductsFromDB = async (searchTerm?: string) => {
  if (!searchTerm) {
    return Product.find() // return all if no search term
  }

  const result = await Product.find(
    { $text: { $search: searchTerm } }, // ✅ uses text index
    { score: { $meta: 'textScore' } }, // get relevance score
  ).sort({ score: { $meta: 'textScore' } }) // sort by relevance

  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id })
  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

const updateSingleProductFromDB = async (
  id: string,
  updateData: TProductUpdate,
) => {
  const result = await Product.findOneAndReplace({ _id: id }, updateData, {
    returnDocument: 'after',
  })
  return result
}
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateSingleProductFromDB,
}
