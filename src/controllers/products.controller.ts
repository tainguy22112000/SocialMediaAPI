import productService from '@/services/product.service'
import { NextFunction, Request, Response } from 'express'

export const productController = {
  getAllProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, message, code } = await productService.getAllProduct()

      return res.status(200).json({
        status: code,
        data: data,
        message: message
      })
    } catch (err) {
      next(err)
    }
  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { product, message, code } = await productService.createProduct(
        req.body
      )

      return res.status(200).json({
        status: code,
        data: product,
        message: message
      })
    } catch (err) {
      next(err)
    }
  }
}
