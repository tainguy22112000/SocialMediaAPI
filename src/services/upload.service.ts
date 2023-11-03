import { cloudinary } from '@/configs/cloudinary.config'

const uploadService = {
  uploadImage: async (imagePath?: string) => {
    if (!imagePath)
      return {
        code: 404,
        message: 'Image not found'
      }

    const results = await cloudinary.uploader.upload(imagePath, {
      folder: 'images'
    })

    return {
      code: 200,
      data: {
        url: results.secure_url,
        publicId: results.public_id
      },
      message: 'Image was successfully uploaded'
    }
  },

  uploadMutipleImage: async (pathList?: string[]) => {
    if (!pathList || !pathList.length)
      return {
        code: 404,
        message: 'Image not found'
      }

    const imageList = []

    for (const image of pathList) {
      const results = await cloudinary.uploader.upload(image, {
        folder: 'images'
      })
      imageList.push({
        url: results.secure_url,
        publicId: results.public_id
      })
    }

    return {
      code: 200,
      data: imageList,
      message: 'Images were successfully uploaded'
    }
  }
}

export default uploadService
