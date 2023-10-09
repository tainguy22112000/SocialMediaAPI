import { NextFunction } from 'express'
import createHttpError from 'http-errors'
import Joi from 'joi'

const validator = (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
) => {
  const { error } = schemaName.validate(body)
  try {
    error ? next(createHttpError[400](error.details[0].message)) : next()
  } catch (err) {
    console.log(err)
  }
}

export default validator
