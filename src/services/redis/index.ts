/* eslint-disable no-console */
import redis from 'redis'

import { RedisConfigurationObject } from './interface'

/** class to handle redis operations */
class RedisPlugin {
  config: RedisConfigurationObject

  client!: redis.RedisClient

  constructor(config: RedisConfigurationObject) {
    this.config = config

    /** initialize the redis client */
    this.initializeClient()
      .then(() => this.performTestWrite())
      .then(() => this.performTestRead())
      .catch((e) => {
        console.error(e)
      })
  }

  /** initialize a new redis client based on configuraiton object passed */
  initializeClient() {
    return new Promise((resolve) => {
      this.client = redis.createClient(this.config.port, this.config.host)

      if (this.config.debug) {
        console.log(`[redis] : trying to establish connecion to redis`)
        console.log(`[redis] : configuration ${JSON.stringify(this.config)}`)
      }

      /** display the error if connection fails */
      this.client.on('error', (err) => {
        console.error(`[redis] : redis died`)
        console.error(`[redis] :`, err)
      })

      resolve(true)
    })
  }

  /** to perform a test write operation */
  performTestWrite() {
    return new Promise((resolve, reject) => {
      this.client.set('status', 'server up', (err: any, reply: String) => {
        /** if item written */
        if (reply === 'OK') {
          if (this.config.debug) {
            console.log('[redis] : test write operation successful')
          }
          resolve(true)
        } else {
          if (this.config.debug) {
            console.error('[redis] : test write operation failed')
            console.error('[redis] : ', err)
          }
          reject(false)
        }
      })
    })
  }

  /** to perform a test read operation */
  performTestRead() {
    return new Promise((resolve, reject) => {
      this.client.get('status', (err: any) => {
        /** if error returned */
        if (err != null) {
          if (this.config.debug) {
            console.error('[redis] : test read operation failed')
            console.error('[redis] : ', err)
          }
          reject(false)
        } else {
          if (this.config.debug) {
            console.log('[redis] : test read operation successful')
          }
          resolve(true)
        }
      })
    })
  }
}

// export { initializeRedis, client }
export default RedisPlugin
