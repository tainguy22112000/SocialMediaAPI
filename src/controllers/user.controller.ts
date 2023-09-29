import { errorMessage } from '@/constants'
import { signAccessToken } from '@/middlewares/auth/signAccessToken'
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

      const accessToken = await signAccessToken(user._id)

      res.status(200).json({
        accessToken,
        email,
        message: 'Login successfully'
      })
    } catch (err) {
      next(err)
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers)
      const user = await UserModel.find()
      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }
}
