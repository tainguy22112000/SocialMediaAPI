import dotenv from 'dotenv'

dotenv.config()

export const enviromentConfig = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_URL,
  PORT: process.env.PORT || 8000,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_ACCESS_TOKEN_SECRET_KEY: process.env
    .REFRESH_ACCESS_TOKEN_SECRET_KEY as string,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ROOT_EMAIL: process.env.ROOT_EMAIL
}
