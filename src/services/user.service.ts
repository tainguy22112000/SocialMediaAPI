import { errorMessage } from '@/constants'
import { IUserRegister } from '@/interfaces/User'
import UserModel from '@/models/User.model'
import createHttpError from 'http-errors'
import otpGenerator from 'otp-generator'
import otpService from './otp.service'

const userService = {
  register: async ({ email, password }: IUserRegister) => {
    const isExisted = await UserModel.findOne({ username: email })
    if (isExisted) {
      throw createHttpError.Conflict(errorMessage.registerd(email))
    }

    const user = new UserModel({ username: email, password })
    return (await user.save()).toObject()
  },

  checkEmail: async ({ email }: Pick<IUserRegister, 'email'>) => {
    return await UserModel.findOne({ username: email })
  },

  registerOtp: async ({ email }: Pick<IUserRegister, 'email'>) => {
    const isExisted = await UserModel.findOne({ username: email })
    if (isExisted) {
      throw createHttpError.Conflict(errorMessage.registerd(email))
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false
    })

    console.log({ otp })

    return {
      code: 200,
      data: await otpService.insertOtp({ email, otp })
    }
  }
}

export default userService
