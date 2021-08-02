/* eslint-disable func-names */
import { CacheDecoratorConfig, ConstructorConfig } from './interface'

import { mandatoryPropsExist } from '../util/mandatory'
import RedisPlugin from '../redis'

/** class with constructor and methods */
class EasyCache {
  redisPlugin!: RedisPlugin

  config: ConstructorConfig

  /** constructor to initialize the package with a configuration object */
  constructor(config: ConstructorConfig) {
    /** store the configuration as a data member */
    this.config = config

    if (this.config.disable === undefined) {
      this.config.disable = false
    }

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

  Cache(config: CacheDecoratorConfig) {
    /**
     * The reason that we have to load the configuration (this.config)
     * data member is that any of the class data member or member function
     * is not accessible inside the function being retuend.
     *
     * Therefore, if during development it is needed to pass any class
     * attribute (member/function), assign them locally to this function
     * then it is possible to pass them to the function being retuend.
     */
    const {
      debug: classConfigDefault,
      defaultTTL: classConfigTTL,
      disable: classConfigDisable,
    } = this.config

    /**
     * summon the redis instance from the redis service
     */
    const { redisPlugin } = this

    /**
     * @description Decorator to cache the function behavior
     * @param target the class instance that is cached, i.e. the service class which
     * contains the methods that need to be cached
     * @param name name of the method on which the decorator is placed. This function is
     * bypassed via cache if the same parameter entry exists in memory
     * @param descriptor Object containing the method itself and method details
     */
    return function (
      target: any,
      name: string,
      descriptor: PropertyDescriptor,
    ): any {
      /**
       * load the configuraitons passed into the decorator and seed the default
       * values based on the class configuration.
       *
       * Note that to provide a really flexible decorator, a configuration
       * object is passed into the decorator. This configuration object is
       * represented using the CacheDecoratorConfig interface.
       */
      const {
        debug = classConfigDefault,
        disable = classConfigDisable,
        expireAfter = classConfigTTL,
      } = config

      /** get original function  */
      const original = descriptor.value

      /** if caching is disabled, then end operation right away */
      if (disable) {
        return descriptor
      }

      /** executing the method to get the result */
      descriptor.value = async function (...args: any[]) {
        const functionSignature = EasyCache.getSignature(target, name, args)
        const cacheLookup = await redisPlugin.getCache(functionSignature)

        /** run original method if cache miss and return data */
        if (cacheLookup === null) {
          const result = await original.apply(this, args)

          /** update entry in cache */
          if (debug) {
            console.log(`Attempting to set cache for ${functionSignature}`)
          }
          redisPlugin.setCache(functionSignature, result, expireAfter)
          return result
        }

        /** else return cache result */
        return JSON.parse(cacheLookup)
      }

      return descriptor
    }
  }
}

export default EasyCache
