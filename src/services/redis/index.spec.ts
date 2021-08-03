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
import { describe, it } from 'mocha'

/** import local codebase for testing */
import redis from 'redis'
import RedisPlugin from './index'
import { RedisConfigurationObject } from './interface'
import { sleep } from '../util/time'

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
      const redisPluginInstance = new RedisPlugin(ENV)
      expect(redisPluginInstance).to.not.be.undefined
    })

    /** should create a new instance of RedisPlugin */
    it('should create a new instance of RedisPlugin', () => {
      const redisPluginInstance = new RedisPlugin(ENV)
      expect(redisPluginInstance).to.not.be.undefined
      expect(redisPluginInstance.client).to.not.be.undefined
      expect(redisPluginInstance.client).to.be.instanceOf(redis.RedisClient)
    })
  })

  /**
   * Test Cases about the config
   */
  describe('config', () => {
    /** config should exist */
    it('should exist', () => {
      const client = new RedisPlugin(ENV)
      expect(client).to.not.be.undefined
    })

    /** should be an object */
    it('should be an object', () => {
      const client = new RedisPlugin(ENV)
      expect(client.config).to.be.an('object')
    })

    /** compare config attributes */
    it('should have the same attributes as the ENV', () => {
      const client = new RedisPlugin(ENV)
      expect(client.config).to.not.be.undefined
      expect(client.config).to.have.property('port')
      expect(client.config).to.have.property('host')
      expect(client.config).to.have.property('password')
      expect(client.config).to.have.property('debug')
    })

    /** attributes should have same values as ENV */
    it('should have the same values as the ENV', () => {
      const client = new RedisPlugin(ENV)
      expect(client.config.port).to.equal(ENV.port)
      expect(client.config.host).to.equal(ENV.host)
      expect(client.config.password).to.equal(ENV.password)
      expect(client.config.debug).to.equal(ENV.debug)
    })
  })

  /**
   * Test cases for initializeClient
   */
  describe('initializeClient', () => {
    /** initializeClient should exist */
    it('should exist', () => {
      const client = new RedisPlugin(ENV)
      expect(client.initializeClient).to.not.be.undefined
    })

    /** should be a function */
    it('should be a function', () => {
      const client = new RedisPlugin(ENV)
      expect(client.initializeClient).to.be.a('function')
    })

    /** should return a promise */
    it('should return a promise', () => {
      const client = new RedisPlugin(ENV)
      expect(client.initializeClient()).to.be.a('promise')
    })

    /** should return a RedisClient instance */
    it('should return a RedisClient instance', async () => {
      const client = new RedisPlugin(ENV)
      expect(client.initializeClient()).to.not.be.undefined
      const returnVal = await client.initializeClient()
      expect(returnVal).to.be.instanceOf(redis.RedisClient)
    })
  })

  /**
   * Test cases for performTestWrite
   */
  describe('performTestWrite', () => {
    /** performTestWrite should exist */
    it('should exist', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestWrite).to.not.be.undefined
    })

    /** should be a function */
    it('should be a function', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestWrite).to.be.a('function')
    })

    /** should return a pending promise */
    it('should return a pending promise', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestWrite()).to.be.a('promise')
    })

    /** should resolve to true on success */
    it('should resolve to true on success', async () => {
      const client = new RedisPlugin(ENV)
      const value = await client.performTestWrite()
      expect(value).to.equal(true)
    })
  })

  /**
   * Test case for performTestRead
   */
  describe('performTestRead', () => {
    /** performTestRead should exist */
    it('should exist', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestRead).to.not.be.undefined
    })

    /** should be a function */
    it('should be a function', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestRead).to.be.a('function')
    })

    /** should return a pending promise */
    it('should return a pending promise', () => {
      const client = new RedisPlugin(ENV)
      expect(client.performTestRead()).to.be.a('promise')
    })

    /** should resolve saved string on success */
    it('should resolve saved string on success', async () => {
      const client = new RedisPlugin(ENV)
      const value = await client.performTestRead()
      expect(value).to.be.a('string')
      expect(value).to.be.equal('server up')
    })

    /** should resolve saved string on success */
    it('should resolve null string when unsaved index requested', async () => {
      const client = new RedisPlugin(ENV)
      const value = await client.performTestRead('some-key')
      expect(value).to.be.equal(null)
    })
  })

  /**
   * Test cases for setCache
   */
  describe('setCache , getCache', () => {
    /** setCache should exist */
    it('should exist', () => {
      const client = new RedisPlugin(ENV)
      expect(client.setCache).to.not.be.undefined
    })

    /** should be a function */
    it('should be a function', () => {
      const client = new RedisPlugin(ENV)
      expect(client.setCache).to.be.a('function')
    })

    /** should return a pending promise */
    it('should return a pending promise', () => {
      const client = new RedisPlugin(ENV)
      expect(client.setCache('index', 'data', 1)).to.be.a('promise')
    })

    /** should resolve to true on success */
    it('should resolve to true on successful insert', async () => {
      const client = new RedisPlugin(ENV)
      const value = await client.setCache('index', 'data', 1)
      expect(value).to.equal(true)
    })

    /** should resolve to null on failure */
    it('should resolve to null on failure', async () => {
      const client = new RedisPlugin(ENV)
      const value = await client.getCache('some-randmo-index')
      expect(value).to.equal(null)
    })

    /**
     * Test cases to validate TTL configurations
     */
    describe('TTL / expiry', () => {
      /** should throw an error when TTL smaller than 1 */
      it('should throw an error when TTL smaller than 1', async () => {
        const client = new RedisPlugin(ENV)
        try {
          await client.setCache('some-index', 'data', 0)
        } catch (err) {
          expect(err).to.be.an('error')
        }
      })

      /** should not throw an error when TTL greater than or equal to 1 */
      it('should not throw an error when TTL greater than or equal to 1', async () => {
        const client = new RedisPlugin(ENV)
        try {
          await client.setCache('some-index', 'data', 1)
        } catch (err) {
          expect(err).to.be.undefined
        }
      })

      /** should return null if data read after TTL */
      it('should return null if data read after TTL', async () => {
        /** set a cache with a TTL of 1 */
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('timeCheck', { data: 100 }, 1)
        expect(value).to.equal(true)

        /** read the value immediately after */
        const immediateCheck = await client.getCache('timeCheck')
        expect(immediateCheck).to.be.equal(JSON.stringify({ data: 100 }))

        /** wait for TTL to expire */
        await sleep(1.1 * 1000)

        /** read the value after TTL */
        const expiredCheck = await client.getCache('timeCheck')
        expect(expiredCheck).to.be.equal(null)
      })
    })

    /**
     * Test cases to validate data i/o from Redis abstraction
     */
    describe('data i/o from Redis abstraction', () => {
      /** should save a string and return JSON.stringify on read */
      it('should save a string and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('some-index', 'data', 1)
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify('data'))
      })

      /** should save a number and return JSON.stringify on read */
      it('should save a number and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('some-index', 100, 1)
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify(100))
      })

      /** should save a boolean and return JSON.stringify on read */
      it('should save a boolean and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('some-index', true, 1)
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify(true))
      })

      /** should save an object and return JSON.stringify on read */
      it('should save an object and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('some-index', { data: 100 }, 1)
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify({ data: 100 }))
      })

      /** should save an array and return JSON.stringify on read */
      it('should save an array and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache('some-index', [100], 1)
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify([100]))
      })

      /** should save a nested object and return JSON.stringify on read */
      it('should save a nested object and return JSON.stringify on read', async () => {
        const client = new RedisPlugin(ENV)
        const value = await client.setCache(
          'some-index',
          { data: { nested: 100 } },
          1,
        )
        expect(value).to.equal(true)

        const readValue = await client.getCache('some-index')
        expect(readValue).not.to.be.null
        expect(readValue).to.be.a('string')
        expect(readValue).to.equal(JSON.stringify({ data: { nested: 100 } }))
      })
    })
  })
})
