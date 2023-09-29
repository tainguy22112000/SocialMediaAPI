import { Application } from 'express'
import mongoose from 'mongoose'
import { enviromentConfig } from './env.config'

export const connectDB = (MONGODB_URI?: string) => {
  mongoose.connect(MONGODB_URI || '', {
    serverSelectionTimeoutMS: 3000
  })

  mongoose.connection.on('connected', () => {
    console.log('Database connection established successfully')
  })
  mongoose.connection.on('error', (error: Error) => {
    console.log('Date connection failed', error)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Date connection is disconnected ...')
  })

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit()
  })
}

export const startServer = async (app: Application) => {
  try {
    await connectDB(enviromentConfig.MONGODB_CONNECTION_STRING)
    app.listen(enviromentConfig.PORT, () => {
      console.log(`Server is Fire at http://localhost:${enviromentConfig.PORT}`)
    })
  } catch (err: any) {
    console.log(
      'Database connection error. Please make sure your database is running ...',
      err
    )
  }
}
