import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(createHttpError(404, `Route - ${req.originalUrl}  Not Found`))
}
