import { IProduct } from '@/interfaces/Product'
import { Schema, model } from 'mongoose'

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: Number, required: true },
    code: String,
    name: String,
    brand: String,
    desciption: String,
    release_date: Date,
    specs: { type: Array, default: [] }
  },
  {
    collection: 'products',
    timestamps: true
  }
)

const ProductModel = model<IProduct>('Product', ProductSchema)

export default ProductModel
