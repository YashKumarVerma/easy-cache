/**
 * @constructor parameters to customize the behavior of the service
 */
export interface ConstructorConfig {
  /** redis backend port */
  redisPort: number

  /** redis backend host */
  redisHost: string

  /** redis backend password */
  redisPassword: string

  /** default TTL for cache expiry */
  defaultTTL: number

  /** debug mode enables verbose logging */
  debug?: boolean

  /** to disable the cache */
  disable?: boolean
}

/**
 * @Cache decorator parameters to customize runtime behavior
 */
export interface CacheDecoratorConfig {
  /**
   * setting it true will disable cachine for the given function.
   *
   * This has been provided to allow the cahce to be disabled for specific
   * functions programatically. This is useful for testing purposes,
   * and also to allow for the cache to be disabled based on a condition
   * or environment configuration.
   *
   * @default false
   */
  disable?: boolean

  /**
   * expireAfter is an alias for TTL. The cache of the given function will
   * automatically be invalidated after the given number of milliseconds.
   *
   * Setting it to 0 will preserve the cache for the given function forever.
   * If this is not provided, then the default TTL defined in the constructor
   * will be used.
   * @default 0
   */
  expireAfter?: number

  /**
   * setting it true will log all operations performed by the module for the
   * given function. This is mainly for debugging purposes.
   *
   * If this is not set, then the debug flag defined in the constructor will
   * be used.
   *
   * If both the flags contradict, then this would be given preference. i.e.
   * If debug mode is off for the entire application, and debug:true is set
   * the debug mode for the given function will be operational.
   *
   * @default false
   */
  debug?: boolean
}
