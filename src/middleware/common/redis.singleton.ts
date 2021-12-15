import { Logger } from '@nestjs/common'
import * as redis from 'redis'

const RedisConnect = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT) || 6379,
}
class Singleton {
  private logger = new Logger(Singleton.name, true)
  private static instance: Singleton
  private constructor() {
    // do something construct...
  }
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
      // ... any one time initialization goes here ...
    }
    return Singleton.instance
  }

  redisClient = redis
    .createClient(RedisConnect)
    .on('connect', () => {
      this.logger.log('Redis client connected')
    })
    .on('error', (err) => {
      this.logger.error(err)
    })
}

export const RedisSingleton = Singleton.getInstance()
