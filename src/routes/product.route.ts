import { productController } from '@/controllers/products.controller'
import { verifyAccessToken } from '@/middlewares/auth'
import { createProductValidation } from '@/middlewares/validations'
import express from 'express'

const router = express.Router()

router.post(
  '/products/create',
  verifyAccessToken,
  createProductValidation,
  productController.createProduct
)
router.get('/products/all', verifyAccessToken, productController.getAllProduct)

export = router
