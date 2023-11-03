import { RequestHandler } from 'express'
import validator from '../validator'
import productSchema from './productSchema'

export const createProductValidation: RequestHandler = (req, res, next) =>
  validator(productSchema.createProduct, req.body, next)
