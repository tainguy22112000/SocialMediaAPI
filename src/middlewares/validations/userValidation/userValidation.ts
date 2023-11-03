import { RequestHandler } from 'express'
import validator from '../validator'
import userSchema from './userSchema'

export const userValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.register, req.body, next)

export const userOtpValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.registerOtp, req.body, next)

export const loginValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.login, req.body, next)
  
export const verifyOtpValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.verifyOtp, req.body, next)
