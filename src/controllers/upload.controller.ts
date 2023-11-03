import uploadService from '@/services/upload.service'
import { NextFunction, Request, Response } from 'express'
import { InternalServerError } from 'http-errors'

export const uploadController = {
  uploadImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, message, code } = await uploadService.uploadImage(
        req.file?.path
      )

      return res.json({
        status: code,
        data: data,
        message: message
      })
    } catch (err) {
      next(InternalServerError)
    }
  },

  uploadMultipleImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as Express.Multer.File[]
      const pathList = files?.map(file => file.path) as string[]
      const { data, message, code } = await uploadService.uploadMutipleImage(
        pathList
      )

      return res.json({
        status: code,
        data: data,
        message: message
      })
    } catch (err) {
      next(InternalServerError)
    }
  }
}
