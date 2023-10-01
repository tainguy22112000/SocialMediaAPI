import { userController } from '@/controllers/user.controller'
import { verifyAccessToken } from '@/middlewares/auth'
import express from 'express'

const router = express.Router()

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.get('/users/list', verifyAccessToken, userController.list)
router.post('/users/refresh-token', userController.refreshToken)
router.delete('/users/logout', userController.logout)

export = router
