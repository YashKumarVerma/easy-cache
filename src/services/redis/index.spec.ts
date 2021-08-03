/**
 * Unit Tests for Redis Plugin
 *
 * @important
 * The unit tests run directly on the live server, and therefore should not be
 * run on a production environment. This is followed in all the other plugins.
 * To setup a test environment, use the following command:
 *
 * $ docker run -p 6379:6379 -d --name=redis-testing redis
 *
 *
 * When adding a new test, please make sure that it follows the same format as
 * the existing tests.
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'

/** import target for testing */
import redis from 'redis'
import RedisPlugin from './index'
import { RedisConfigurationObject } from './interface'

/**
 * @constants
 * Describe your local test environment here.
 */
const ENV: RedisConfigurationObject = {
  debug: false,
  port: 6379,
  host: '127.0.0.1',
  password: '',
}

/** describe the test suite */
describe('services/redis', () => {
  /** RedisPlugin should not be undefined */
  it('should exist', () => {
    expect(RedisPlugin).to.not.be.undefined
  })

  /** RedisPlugin should be a class */
  it('should be a function', () => {
    expect(RedisPlugin).to.be.a('function')
  })

  /** RedisPlugin should have a constructor */
  it('should have a constructor', () => {
    expect(RedisPlugin).to.have.property('constructor')
  })

  /** RedisPlugin constructor should be callable */
  it('should has a callable constructor', () => {
    expect(RedisPlugin).to.have.property('constructor').that.is.a('function')
  })

  /**
   * Test Cases about the constructor
   */
  describe('constructor', () => {
    let redisPluginInstance: RedisPlugin // instance of RedisPlugin

    /** before each test, get a new client instance */
    beforeEach(() => {})

    /** constructor should exist */
    it('should exist', () => {
      expect(RedisPlugin.constructor).to.not.be.undefined
    })

    /** should be callable */
    it('should be callable', () => {
      expect(RedisPlugin.constructor).to.be.a('function')
    })

    /** allow creating objects with new */
    it('should be callable with new', () => {
      redisPluginInstance = new RedisPlugin(ENV)
      expect(redisPluginInstance).to.not.be.undefined
    })

    /** should create a new instance of RedisPlugin */
    it('should create a new instance of RedisPlugin', () => {
      redisPluginInstance = new RedisPlugin(ENV)
      expect(redisPluginInstance).to.not.be.undefined
      expect(redisPluginInstance.client).to.not.be.undefined
      expect(redisPluginInstance.client).to.be.instanceOf(redis.RedisClient)
    })
  })
})
