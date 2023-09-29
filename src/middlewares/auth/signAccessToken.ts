import { enviromentConfig } from '@/configs/env.config'
import JWT from 'jsonwebtoken'
import { Types } from 'mongoose'

export const signAccessToken = async (userId: Types.ObjectId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const options = {
      expiresIn: '1h' // 10m 10s
    }
    JWT.sign(
      payload,
      enviromentConfig.ACCESS_TOKEN_SECRET_KEY as string,
      options,
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      }
    )
  })
}
