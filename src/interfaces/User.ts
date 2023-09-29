interface IUser extends Document {
  username: string
  password: string
}

interface IUserDocument extends IUser {
  checkPassword(password: string): Promise<boolean>
}

export { IUser, IUserDocument }
