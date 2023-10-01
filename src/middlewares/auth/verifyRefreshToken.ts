import { enviromentConfig } from '@/configs/env.config'
import client from '@/configs/redis.config'
import createHttpError from 'http-errors'
import JWT, { VerifyErrors } from 'jsonwebtoken'
export const verifyRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      async (err: VerifyErrors | null, payload: any) => {
        if (err) reject(err)

        try {
          const userId: string = payload.userId

          const token = await client.get(userId)
          if (refreshToken === token) {
            resolve(userId)
          }
        } catch (err) {
          reject(createHttpError.InternalServerError())
        }
        return reject(createHttpError.Unauthorized())
      }
    )
  })
}
