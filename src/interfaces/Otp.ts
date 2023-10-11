import { Document } from 'mongoose'
import { IUserRegister } from './User'

interface IOtp extends Document {
  email: string
  otp: string
  createdAt: Date
}

interface IVerifyOtp extends IUserRegister {
  otp: string
}

type TCreateOtp = Pick<IOtp, 'email' | 'otp'>

type TValidOtp = {
  otp: string
  hashOtp: string
}

export { IOtp, TCreateOtp, TValidOtp, IVerifyOtp }
