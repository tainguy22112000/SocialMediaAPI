import client from '@/configs/redis.config'

export const incr = async (key?: string) => {
  try {
    if (!key) return null
    const result = await client.incr(key)
    return result
  } catch (err) {
    console.log(err)
  }
}

export const expire = async (key?: string, ttl: number | undefined = 60) => {
  try {
    if (!key) return null
    const result = await client.expire(key, ttl)
    return result
  } catch (err) {
    console.log(err)
  }
}

export const ttl = async (key?: string) => {
  try {
    if (!key) return null
    const result = await client.ttl(key)
    return result
  } catch (err) {
    console.log(err)
  }
}
