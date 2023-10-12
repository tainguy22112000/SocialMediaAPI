import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import { enviromentConfig } from '@/configs/env.config'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, ROOT_EMAIL } =
  enviromentConfig

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

type TSendMail = {
  userEmail: string
  subject?: string
  text?: string
  html?: string
}

export const sendMail = async ({
  userEmail,
  subject,
  text,
  html
}: TSendMail) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: ROOT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken as string
      }
    })

    const info = await transport.sendMail({
      from: `"Social Media Demo" <${ROOT_EMAIL}>`,
      to: userEmail,
      subject,
      text,
      html
    })

    return { info }
  } catch (err) {
    console.error(err)
  }
}
