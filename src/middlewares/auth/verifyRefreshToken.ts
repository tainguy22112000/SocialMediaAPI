import { enviromentConfig } from '@/configs/env.config'
import JWT, { VerifyErrors } from 'jsonwebtoken'
export const verifyRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      (err: VerifyErrors | null, payload: any) => {
        if (err) reject(err)

        const userId: string = payload.userId
        resolve(userId)
      }
    )
  })
}
