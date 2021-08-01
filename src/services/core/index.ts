import { ConfigurationObject } from './interface'

import { mandatoryPropsExist } from '../util/mandatory'
import RedisPlugin from '../redis'

/** class with constructor and methods */
export default class Core {
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
}
