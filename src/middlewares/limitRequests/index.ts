import { expire, incr, ttl } from '@/utils/limiter'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

const TTL_SECONDS = 60
const LIMIT_REQUESTS = 5

interface ILimitRequest extends Request {
  limit: number
}

export const limitRequests = async (
  req: ILimitRequest,
  res: Response,
  next: NextFunction
) => {
  const ipUser = (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress) as string

  if (!ipUser) {
    return next(createHttpError.Unauthorized())
  }

  try {
    const numberRequest = (await incr(ipUser)) ?? 0
    let _ttl

    if (Number(numberRequest) === 1) {
      await expire(ipUser)
      _ttl = TTL_SECONDS
    } else {
      _ttl = await ttl(ipUser)
    }

    if (numberRequest > LIMIT_REQUESTS) {
      next(createHttpError.TooManyRequests())
    }
    req.limit = numberRequest
    next()
  } catch (err) {
    return next(err)
  }
}
