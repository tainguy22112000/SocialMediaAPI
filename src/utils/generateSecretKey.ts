import crypto from 'crypto'

export const generateSecretKey = (num = 32) => {
  return crypto.randomBytes(num).toString('hex')
}

// const key1 = generateSecretKey()
// const key2 = generateSecretKey()

// console.table({ key1, key2 })
