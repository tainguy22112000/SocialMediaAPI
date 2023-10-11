import { IOtp } from '@/interfaces/Otp'
import { Schema, model } from 'mongoose'

const OtpSchema: Schema<IOtp> = new Schema(
  {
    email: {
      type: String
    },
    otp: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: { expires: 20 }
    }
  },
  {
    collection: 'otp'
  }
)

const OtpModel = model<IOtp>('Otp', OtpSchema)

export default OtpModel
