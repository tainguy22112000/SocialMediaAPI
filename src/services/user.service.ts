import { errorMessage } from '@/constants'
import { IUserRegister } from '@/interfaces/User'
import UserModel from '@/models/User.model'
import createHttpError from 'http-errors'

const userService = {
  register: async ({ email, password }: IUserRegister) => {
    const isExisted = await UserModel.findOne({ username: email })
    if (isExisted) {
      throw createHttpError.Conflict(errorMessage.registerd(email))
    }

    const user = new UserModel({ username: email, password })
    return (await user.save()).toObject()
  }
}

export default userService
