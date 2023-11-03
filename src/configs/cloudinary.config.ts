import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: 'dgvyozqk2',
  api_key: '511912366152745',
  api_secret: '690MvwJeykSDIoITD7d68F0mFaI'
})

const storage = new CloudinaryStorage({
  cloudinary
})

const uploadCloud = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 10 // accept files up 10 mgb
  }
})

export { cloudinary, uploadCloud }
