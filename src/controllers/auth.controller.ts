import { enviromentConfig } from '@/configs/env.config'
import client from '@/configs/redis.config'
import { IAuthRequest } from '@/interfaces/User'
import { generateToken } from '@/middlewares/auth'
import { verifyRefreshToken } from '@/middlewares/auth/verifyRefreshToken'
import authService from '@/services/auth.service'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const auhController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const { email, password } = req.body

      //   const user = await UserModel.findOne({ username: email })
      //   if (!user) {
      //     throw createHttpError.NotFound(errorMessage.NOT_REGISTERED)
      //   }

      //   const isValid = await user.checkPassword(password)
      //   if (!isValid) {
      //     throw createHttpError.Unauthorized(errorMessage.INVALID_PASSWORD)
      //   }

      //   const accessToken = await generateToken(
      //     { userId: user._id },
      //     enviromentConfig.ACCESS_TOKEN_SECRET_KEY,
      //     { expiresIn: '10m' }
      //   )
      //   const refreshToken = await generateToken(
      //     { userId: user._id },
      //     enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      //     { expiresIn: '1y' }
      //   )

      //   await client.set(user._id.toString(), refreshToken.toString(), {
      //     EX: 365 * 24 * 60 * 60
      //   })
      const { accessToken, refreshToken, user } = await authService.login(
        req.body
      )

      const { password, username, ...rest } = user

      res.status(200).json({
        data: {
          accessToken,
          refreshToken,
          email: user.username,
          ...rest
        },
        message: 'Login successfully'
      })
    } catch (err) {
      next(err)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        next(createHttpError.BadRequest())
      }

      const userId = await verifyRefreshToken(refreshToken)
      try {
        await client.del(userId)
        res.status(200).json({ message: 'Log out !!!' })
      } catch (err) {
        next(createHttpError.InternalServerError())
      }
    } catch (err) {
      next(err)
    }
  },

  refreshToken: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        next(createHttpError.BadRequest())
      }

      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await generateToken(
        { userId: userId },
        enviromentConfig.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '30s' }
      )

      const newRefreshToken = await generateToken(
        { userId: userId },
        enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1y' }
      )

      res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken
      })
    } catch (err) {
      next(err)
    }
  }
}
