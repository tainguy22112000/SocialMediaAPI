import { IProduct } from '@/interfaces/Product'
import { Schema, model } from 'mongoose'

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: 100,
      minlength: 3,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price']
    },
    brand: {
      type: String,
      required: [true, 'Please product brand'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      minlength: 5,
      trim: true
    },
    productImage: {
      type: String,
      required: [false, 'Please provide product image'],
      trim: true
    },
    // user: {
    //   // every products shuold blong to user
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User', // add relationship
    //   required: [true, 'User is required']
    // },
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
