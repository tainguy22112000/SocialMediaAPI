import { IProduct } from '@/interfaces/Product'
import ProductModel from '@/models/Product.model'

const productService = {
  createProduct: async ({
    name,
    price,
    description,
    brand,
    specs
  }: IProduct) => {
    const isExisted = await ProductModel.findOne({ name: name })

    if (!!isExisted) {
      return {
        code: 400,
        message: 'Product already exists'
      }
    }

    const newProduct = new ProductModel({
      name,
      price,
      description,
      brand,
      specs
    })

    const createdProduct = await ProductModel.create(newProduct)

    return {
      code: 200,
      product: createdProduct,
      message: 'Successfully created new product'
    }
  },

  getAllProduct: async () => {
    const products = await ProductModel.find()
    return {
      code: 200,
      data: products,
      message: 'success'
    }
  }
}

export default productService
