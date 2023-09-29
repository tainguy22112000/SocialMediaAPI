import JWT from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateToken = async (
  payload: { userId: Types.ObjectId | string },
  secret: string | undefined = '',
  signOptions: JWT.SignOptions
) => {
  return new Promise((resolve, reject) => {
    JWT.sign(payload, secret, signOptions, (error, token) => {
      if (error) reject(error)
      resolve(token)
    })
  })
}
