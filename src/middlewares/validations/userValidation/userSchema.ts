import Joi from 'joi'

const userSchema = {
  register: Joi.object({
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(32).required()
  }),
  login: Joi.object({
    email: Joi.string().pattern(new RegExp('gmail.com$')).email().required(),
    password: Joi.string().min(4).max(32).required()
  })
}

export default userSchema
