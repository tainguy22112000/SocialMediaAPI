import { createClient, RedisClientType } from 'redis'

const client: RedisClientType = createClient()
client.on('error', (err: Error) => {
  console.log(err)
})
client
  .connect()
  .then(() => console.log('Redis connection established successfully'))

export default client
