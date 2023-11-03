import { Document } from 'mongoose'
import { IUser } from './User'

interface IProduct extends Document {
  productId: number
  price: number
  code: string
  name: string
  brand: string
  description: string
  productImage: string
  user: IUser
  release_date: Date
  specs: unknown[]
}

export { IProduct }
