import { ConfigurationObject } from './interface'

import { mandatoryPropsExist } from '../util/mandatory'
import RedisPlugin from '../redis'

/** class with constructor and methods */
class EasyCache {
  redisPlugin!: RedisPlugin

  /** constructor to initialize the package with a configuration object */
  constructor(config: ConfigurationObject) {
    /** check if all mandatory properties are set */
    const mandatoryProps = [
      'redisPort',
      'redisHost',
      'redisPassword',
      'defaultTTL',
      'debug',
    ]
    mandatoryPropsExist(config, mandatoryProps, 'initialize decorator')

    /** now initialize a redis instance from redis service */
    this.redisPlugin = new RedisPlugin({
      host: config.redisHost,
      port: config.redisPort,
      password: config.redisPassword,
      debug: true,
    })
  }

  /** private member function to transform a passed function to a string */
  static getSignature(signature: any, propertyKey: string, args: any): string {
    const head = `${signature.name}:${propertyKey}`.toLowerCase()
    let tail = ':'

    args.forEach((element: any) => {
      if (typeof element === 'object') {
        tail += Object.keys(element).reduce((r, k) => r.concat(element[k]), [])
      } else {
        tail += `${element}`
      }
    })
    return `${head}:${tail}`
  }


}

export default EasyCache
