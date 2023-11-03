import { auhController } from '@/controllers/auth.controller'
import { userController } from '@/controllers/user.controller'
import { verifyAccessToken } from '@/middlewares/auth'
import { limitRequests } from '@/middlewares/limitRequests'
import {
  userValidation,
  loginValidation,
  userOtpValidation,
  verifyOtpValidation
} from '@/middlewares/validations'
import express from 'express'

const router = express.Router()

router.post('/users/register', userValidation, userController.register)
router.post(
  '/users/register-otp',
  userOtpValidation,
  userController.registerOtp
)
router.post('/users/verify-otp', verifyOtpValidation, userController.verifyOtp)
router.post('/users/login', loginValidation, auhController.login)
router.get('/users/list', verifyAccessToken, limitRequests, userController.list)
router.post('/users/refresh-token', auhController.refreshToken)
router.delete('/users/logout', auhController.logout)

export = router
