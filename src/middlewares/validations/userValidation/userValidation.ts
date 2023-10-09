import { RequestHandler } from 'express'
import validator from '../validator'
import userSchema from './userSchema'

// export const userValidation = (data: IUser) => {
//   const userSchema = Joi.object({
//     email: Joi.string()
//       .pattern(new RegExp('gmail.com$'))
//       .email()
//       .lowercase()
//       .required(),
//     password: Joi.string().min(4).max(32).required()
//   })

//   return userSchema.validate(data)
// }

export const userValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.register, req.body, next)

export const loginValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.login, req.body, next)
