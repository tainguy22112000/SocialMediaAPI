import { Application } from 'express'
import mongoose from 'mongoose'

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
  const port = process.env.PORT || 8000

  try {
    await connectDB(process.env.MONGODB_URL)
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`)
    })
  } catch (err: any) {
    console.log(
      'Database connection error. Please make sure your database is running ...',
      err
    )
  }
}
