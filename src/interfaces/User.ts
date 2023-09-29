import { Request } from 'express'
import JWT from 'jsonwebtoken'
import { Document } from 'mongoose'

interface IUser extends Document {
  username: string
  password: string
}

interface IUserDocument extends IUser {
  checkPassword(password: string): Promise<boolean>
}

interface IAuthRequest extends Request {
  headers: { authorization?: string; Authorization?: string }
  cookies: { authToken?: string; accessToken?: string; refreshToken?: string }
  payload?: string | JWT.JwtPayload
}

export { IAuthRequest, IUser, IUserDocument }
