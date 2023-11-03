import Joi from 'joi'

const productSchema = {
  createProduct: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    specs: Joi.array()
  })
}

export default productSchema
