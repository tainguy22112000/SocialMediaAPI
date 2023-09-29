import { userController } from '@/controllers/user.controller'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

const router = express.Router()

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError.InternalServerError('This is error'))
  // res.json({
  //   status: 'success',
  //   element: [{}]
  // })
})

router.delete(
  '/users/:id',
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      status: 'success',
      message: 'Item has been deleted'
    })
  }
)

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)

export = router
