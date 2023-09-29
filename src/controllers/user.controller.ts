import { enviromentConfig } from '@/configs/env.config'
import { errorMessage } from '@/constants'
import { IAuthRequest } from '@/interfaces/User'
import { generateToken } from '@/middlewares/auth'
import { verifyRefreshToken } from '@/middlewares/auth/verifyRefreshToken'
import { userValidation } from '@/middlewares/validations'
import UserModel from '@/models/User.model'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const { error } = userValidation(req.body)

      if (error) throw createHttpError(error.details[0].message)

      const isExisted = await UserModel.findOne({ username: email })
      if (isExisted) {
        throw createHttpError.Conflict(errorMessage.registerd(email))
      }

      const user = new UserModel({ username: email, password })
      const savedUser = await user.save()

      return res.json({ status: 200, message: savedUser })
    } catch (err) {
      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const { error } = userValidation(req.body)

      if (error) {
        throw createHttpError(error.details[0].message)
      }

      const user = await UserModel.findOne({ username: email })
      if (!user) {
        throw createHttpError.NotFound(errorMessage.NOT_REGISTERED)
      }

      const isValid = await user.checkPassword(password)
      if (!isValid) {
        throw createHttpError.Unauthorized(errorMessage.INVALID_PASSWORD)
      }

      const accessToken = await generateToken(
        { userId: user._id },
        enviromentConfig.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '10s' }
      )
      const refreshToken = await generateToken(
        { userId: user._id },
        enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1y' }
      )

      res.status(200).json({
        accessToken,
        refreshToken,
        email,
        message: 'Login successfully'
      })
    } catch (err) {
      next(err)
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.find()
      res.status(200).json({ user })
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
