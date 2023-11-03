import { createClient, RedisClientType } from 'redis'

const client: RedisClientType = createClient({
  socket: { port: 6380 }
})
client.on('error', (err: Error) => {
  console.log(err)
})
client
  .connect()
  .then(() => console.log('Redis connection established successfully'))

export default client
