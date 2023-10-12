import UserModel from '@/models/User.model'
import otpService from '@/services/otp.service'
import userService from '@/services/user.service'
import { NextFunction, Request, Response } from 'express'

export const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, ...result } = await userService.register(req.body)
      return res.json({
        status: 200,
        data: result,
        message: 'Register user successfully!!'
      })
    } catch (err) {
      next(err)
    }
  },

  registerOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await userService.registerOtp(req.body)

      return res
        .status(code)
        .json({ message: `OTP was sent to ${req.body.email} via email`, data })
    } catch (err) {
      next(err)
    }
  },

  verifyOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data, message } = await otpService.verifyOtp(req.body)

      return res.status(code).json({ message, data: data?.username })
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
  }
}
