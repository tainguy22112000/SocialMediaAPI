import { IAuthRequest } from '@/interfaces/User'
import authService from '@/services/auth.service'
import { NextFunction, Request, Response } from 'express'

export const auhController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      await authService.logout(req.body)
      res.status(200).json({ message: 'Log out !!!' })
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
      const { accessToken, newRefreshToken } = await authService.refreshToken(
        req.body
      )

      res.status(200).json({
        data: {
          accessToken,
          refreshToken: newRefreshToken
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
