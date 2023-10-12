import { Document } from 'mongoose'

interface IProduct extends Document {
  productId: number
  code: string
  name: string
  brand: string
  desciption: string
  release_date: Date
  specs: unknown[]
}

export { IProduct }
