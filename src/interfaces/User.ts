import { Request } from 'express'
import JWT from 'jsonwebtoken'
import { Document } from 'mongoose'

interface IUser extends Document {
  username: string
  password: string
  firstName: string
  lastName: string
  address?: string
  dateOfBirth?: string
  phoneNumber?: string
  gender: 'male' | 'female'
  bio?: string
}

interface IUserRegister extends IUser {
  email: string
}

interface IToken {
  refreshToken: string
  accessToken: string
}

interface IUserDocument extends IUser {
  checkPassword(password: string): Promise<boolean>
}

interface IAuthRequest extends Request {
  headers: { authorization?: string; Authorization?: string }
  cookies: { authToken?: string; accessToken?: string; refreshToken?: string }
  payload?: string | JWT.JwtPayload
  limit?: number
}

interface ILimitRequest extends Request {
  limit: number
}

export {
  IAuthRequest,
  IUser,
  IUserDocument,
  IUserRegister,
  IToken,
  ILimitRequest
}
