import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
import { enviromentConfig } from '@/configs/env.config'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } =
  enviromentConfig

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'jaydennguy2211@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken as string
      }
    })

    const info = await transport.sendMail({
      from: '"Fred Foo 👻" <jaydennguy2211@gmail.com>',
      to: 'tai.nguy22112000@gmail.com',
      subject: 'Demo',
      text: 'Hello'
    })

    console.log({ info })
  } catch (err) {
    console.error(err)
  }
}

sendMail()
