import { enviromentConfig } from '@/configs/env.config'
import { errorMessage } from '@/constants'
import { IUserRegister } from '@/interfaces/User'
import UserModel from '@/models/User.model'
import { sendMail } from '@/utils/sendMail'
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

    sendMail({
      userEmail: email,
      subject: 'Verify OTP code',
      text: `Hi ${email}. \n Your OTP is ${otp} \n If you have any questions, please contact us via this email address ${enviromentConfig.ROOT_EMAIL}`
    })

    console.log({ otp })

    return {
      code: 200,
      data: await otpService.insertOtp({ email, otp })
    }
  }
}

export default userService
