import { IUser, IUserDocument } from '@/interfaces/User'
import bcrypt from 'bcrypt'
import {
  CallbackError,
  CallbackWithoutResultAndOptionalError,
  Schema,
  model
} from 'mongoose'

const UserSchema: Schema<IUserDocument> = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

UserSchema.pre(
  'save',
  async function (this: IUser, next: CallbackWithoutResultAndOptionalError) {
    try {
      console.log(`Called before save`, this.username, this.password)
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(this.password, salt)
      this.password = hashPassword
      next()
    } catch (error) {
      next(error as CallbackError)
    }
  }
)

UserSchema.methods.checkPassword = async function (
  accessPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(accessPassword, this.password)
  return isMatch
}

const UserModel = model<IUserDocument>('User', UserSchema)

export default UserModel
