import { auhController } from '@/controllers/auth.controller'
import { userController } from '@/controllers/user.controller'
import { verifyAccessToken } from '@/middlewares/auth'
import { userValidation, loginValidation } from '@/middlewares/validations'
import express from 'express'

const router = express.Router()

router.post('/users/register', userValidation, userController.register)
router.post('/users/login', loginValidation, auhController.login)
router.get('/users/list', verifyAccessToken, userController.list)
router.post('/users/refresh-token', auhController.refreshToken)
router.delete('/users/logout', auhController.logout)

export = router
