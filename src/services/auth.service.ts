import { enviromentConfig } from '@/configs/env.config'
import client from '@/configs/redis.config'
import { errorMessage } from '@/constants'
import { IToken, IUserRegister } from '@/interfaces/User'
import { generateToken } from '@/middlewares/auth'
import { verifyRefreshToken } from '@/middlewares/auth/verifyRefreshToken'
import UserModel from '@/models/User.model'
import createHttpError from 'http-errors'

const authService = {
  login: async ({ email, password }: IUserRegister) => {
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
      { expiresIn: '10m' }
    )
    const refreshToken = await generateToken(
      { userId: user._id },
      enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1y' }
    )

    await client.set(user._id.toString(), refreshToken.toString(), {
      EX: 365 * 24 * 60 * 60
    })

    return { accessToken, refreshToken, user: user.toObject() }
  },

  logout: async ({ refreshToken }: Pick<IToken, 'refreshToken'>) => {
    if (!refreshToken) {
      throw createHttpError.BadRequest()
    }
    const userId = await verifyRefreshToken(refreshToken)
    try {
      await client.del(userId)
    } catch (err) {
      throw createHttpError.InternalServerError()
    }
  },

  refreshToken: async ({ refreshToken }: Pick<IToken, 'refreshToken'>) => {
    if (!refreshToken) {
      throw createHttpError.BadRequest()
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

    return { accessToken, newRefreshToken }
  }
}

export default authService
