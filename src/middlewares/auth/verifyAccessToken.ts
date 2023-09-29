import { enviromentConfig } from '@/configs/env.config'
import { errorMessage } from '@/constants'
import { IAuthRequest } from '@/interfaces/User'
import { NextFunction, Response } from 'express'
import createHttpError from 'http-errors'
import JWT, { VerifyErrors } from 'jsonwebtoken'

export const verifyAccessToken = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return next(createHttpError.Unauthorized())
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    next(createHttpError(401, errorMessage.INVALID_TOKEN))
  }
  JWT.verify(
    token,
    enviromentConfig.ACCESS_TOKEN_SECRET_KEY as JWT.Secret,
    async (err: VerifyErrors | null, payload?: string | JWT.JwtPayload) => {
      try {
        if (err) next(createHttpError.Unauthorized())
        req.payload = payload
        next()
      } catch (err) {
        return next(err)
      }
    }
  )
}
