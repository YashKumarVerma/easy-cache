export interface ConfigurationObject {
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
}
