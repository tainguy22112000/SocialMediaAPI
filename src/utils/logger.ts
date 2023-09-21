import { format } from 'date-fns'
import fs from 'fs'
import path from 'path'

const fileName = path.join(__dirname, '../logs', 'logs.log')

export const logEvents = async (msg: string) => {
  const dateTime = `${format(new Date(), 'MM/dd/yyyy\tHH:mm:ss')}`
  const contentLog = `${dateTime} --------- ${msg}\n`

  try {
    fs.appendFile(fileName, contentLog, err => {
      if (err) throw err
      console.log('The data to append was appended to file!')
    })
  } catch (err) {
    console.error(err)
  }
}
