import { uploadCloud } from '@/configs/cloudinary.config'
import { uploadController } from '@/controllers/upload.controller'
import express from 'express'

const router = express.Router()

router.post(
  '/upload',
  uploadCloud.single('images'),
  uploadController.uploadImage
)

router.post(
  '/uploads',
  uploadCloud.array('images'),
  uploadController.uploadMultipleImage
)

export = router
