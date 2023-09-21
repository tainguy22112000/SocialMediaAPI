import { logEvents } from '@/utils/logger'
import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { v4 as uuid } from 'uuid'

export const errorHandlerMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `idError: ${uuid()} ---- ${req.url} ---- ${req.method} ---- ${
    err.message
  }`
  logEvents(message)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error'
  })
}
