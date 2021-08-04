/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import the code to be tested */
import EasyCache from './index'
import { ConstructorConfig } from './interface'
import { InsufficientDataException } from '../error/insufficientData'
import { currentTimeStampInSeconds, secondsFromTimestamp } from '../util/time'

/**
 * @constants
 * Congiruations to run the tests on
 */
const ENV: ConstructorConfig = {
  defaultTTL: 5,
  redisHost: 'localhost',
  redisPassword: '',
  redisPort: 6379,
  debug: false,
}

describe('core/EasyCache', () => {
  /** it should be defined */
  it('should be defined', () => {
    expect(EasyCache).not.to.be.undefined
  })

  /** should be callable */
  it('should be callable', () => {
    expect(EasyCache).to.be.a('function')
  })

  /** should have a constructor */
  it('should have a constructor', () => {
    expect(EasyCache).to.have.a.property('constructor')
  })

  /** constructor should be a callable */
  it('constructor should be a callable', () => {
    expect(EasyCache.constructor).to.be.a('function')
  })

  /** initialize the client */
  describe('initialize', () => {
    /** should successfully initialize */
    it('should initialize when all required props supplied', () => {
      const EasyCacheInstance = new EasyCache(ENV)
      expect(EasyCacheInstance).to.be.an('object')
    })

    /** should fail to initialize when any mandatory parameter is missing */
    it('should throw when any mandatory parameter is missing', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const EasyCacheInstance = new EasyCache({ ...ENV, debug: undefined })
      } catch (e) {
        expect(e).to.be.an('error')
      }
    })

    /** should fail to initialize when any mandatory parameter is missing */
    it('should throw error of type InsufficientDataException when any mandatory parameter is missing', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const EasyCacheInstance = new EasyCache({ ...ENV, debug: undefined })
      } catch (e) {
        expect(e).to.be.an('error')
        expect(e).to.be.an.instanceof(InsufficientDataException)
      }
    })

    /** if disable flag is not set, disable config should be set to false */
    it('should set disable config to false if not set', () => {
      const EasyCacheInstance = new EasyCache({ ...ENV, disable: undefined })
      expect(EasyCacheInstance.config.disable).to.be.false
    })
  })

  /** configuration passing */
  describe('configuration', () => {
    /** configuration object passed should match with data member */
    it('should match with config', () => {
      const EasyCacheInstance = new EasyCache(ENV)
      expect(EasyCacheInstance.config).to.deep.equal(ENV)
    })

    /** redis specific configuration should be set for redis plugin */
    it('should pass down configurations to redisPlugin', () => {
      const EasyCacheInstance = new EasyCache(ENV)
      expect(EasyCacheInstance.redisPlugin.config).to.deep.equal({
        host: ENV.redisHost,
        port: ENV.redisPort,
        password: ENV.redisPassword,
        debug: ENV.debug,
      })
    })
  })

  /**
   * Test cases for getSignature
   */
  describe('getSignature', () => {
    /** should be defined */
    it('should be defined', () => {
      expect(EasyCache.getSignature).not.to.be.undefined
    })

    /** should be a function  and callable */
    it('should be a function and callable', () => {
      expect(EasyCache.getSignature).to.be.a('function')
    })

    /** should return a string for given params */
    it('should return a string for given params', () => {
      const signature = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args2',
      ])
      expect(signature).to.be.a('string')
      expect(signature.search('EasyCache')).not.to.equal(-1)
      expect(signature.search('orphanMethod')).to.equal(-1)
    })

    /** should flag classes functions as orphan */
    it('should flag classes functions as orphan', () => {
      const signature = EasyCache.getSignature(undefined, 'functionName', [1])
      expect(signature.search('orphanMethod')).not.to.equal(-1)
    })

    /** functions with same name and parent and params should have same signature */
    it('should have same signature for same (name, parent, params)', () => {
      const signature1 = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args2',
      ])
      const signature2 = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args2',
      ])
      expect(signature1).to.equal(signature2)
    })

    /** functions should have sime sigature for different datatypes of params but same vals */
    it('should have same signature for same(name, parents, params) AND diff(datatypes)', () => {
      class FakeClass {}

      const signature1 = EasyCache.getSignature(FakeClass, 'fx', [1, 2])
      const signature2 = EasyCache.getSignature(FakeClass, 'fx', ['1', '2'])
      expect(signature1).to.equal(signature2)
    })

    /** functions with differnt signature params should have different signature */
    it('should have different signature for same(name, parent) AND diff(params)', () => {
      const signature1 = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args2',
      ])
      const signature2 = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args3',
      ])
      expect(signature1).not.to.equal(signature2)
    })

    /** funcitons with same (name, params) and different parent should have different signature */
    it('should have different signature for same(name, params) AND diff(parent)', () => {
      class FakeClass {}

      const signature1 = EasyCache.getSignature(FakeClass, 'functionName', [
        { a: 1 },
        'args2',
      ])
      const signature2 = EasyCache.getSignature(EasyCache, 'functionName', [
        { a: 1 },
        'args2',
      ])
      expect(signature1).not.to.equal(signature2)
    })

    /** functions with same (parents, params) and different name should have different signature */
    it('should have different signature for same(parents, params) AND diff(name)', () => {
      class FakeClass {}

      const signature1 = EasyCache.getSignature(FakeClass, 'fx', [
        { a: 1 },
        'args2',
      ])
      const signature2 = EasyCache.getSignature(FakeClass, 'fx2', [
        { a: 1 },
        'args2',
      ])
      expect(signature1).not.to.equal(signature2)
    })
  })

  /**
   * Test cases for @Cache
   */
  describe('@Cache', () => {
    /** should be defined */
    it('should be defined', () => {
      const EasyCacheInstance = new EasyCache(ENV)
      expect(EasyCacheInstance.Cache).not.to.be.undefined
    })

    /** should be a directive */
    it('should be a directive', () => {
      const EasyCacheInstance = new EasyCache(ENV)
      expect(EasyCacheInstance.Cache).to.be.a('function')
    })

    /** directives should always return a function */
    it('should execute the host function with expected output', async () => {
      /** declare an instance of EasyCache */
      const EasyCacheInstance = new EasyCache({
        ...ENV,
        defaultTTL: 10,
      })

      class DummyClass {
        @EasyCacheInstance.Cache({})
        public static host() {
          return true
        }
      }

      const hostOutput = await DummyClass.host()
      expect(DummyClass.host).to.be.a('function')
      expect(hostOutput).to.be.true
    })

    /**
     * @important
     *
     * Since this is the first version of the package, with support for only
     * one plugin, i.e. RedisPlugin (which is the default plugin right now),
     * This testcase is written as a unit test for the code module.
     *
     * In due time, this testcase will be migrated to e2e sute of RedisPlugin
     * and removed from here.
     *
     * @todo: migrate to e2e test of RedisPlugin
     */
    /** should transform host function to async */
    it('[redisPlugin] should transform host function to async', async () => {
      /** declare an instance of EasyCache */
      const EasyCacheInstance = new EasyCache(ENV)

      class DummyClass {
        @EasyCacheInstance.Cache({})
        public static host() {
          return true
        }
      }

      expect(DummyClass.host).to.be.a('function')
      expect(DummyClass.host()).not.to.be.true
    })

    /**
     * Test Cache Functionality
     */
    /** check if cache is working */
    it('should cache the output of the host function [time based check]', async () => {
      /** declare an instance of EasyCache */
      const EasyCacheInstance = new EasyCache(ENV)

      class DummyClass {
        /** this function resolves after 1 second to run */
        static async someBulkyOperation(): Promise<string> {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('resultOfSomeBulkyOperation')
            }, 1000)
          })
        }

        /**
         * this is the function that is being cached
         */
        @EasyCacheInstance.Cache({
          expireAfter: 2,
        })
        static async cachedFunction() {
          const result = await DummyClass.someBulkyOperation()
          return result
        }

        static async normalFunction() {
          const result = await DummyClass.someBulkyOperation()
          return result
        }

        static async test(enableCache = false): Promise<Array<string>> {
          const results: Array<string> = []

          for (let i = 0; i < 5; i += 1) {
            if (enableCache) {
              const result = await DummyClass.cachedFunction()
              results.push(result)
            } else {
              const result = await DummyClass.normalFunction()
              results.push(result)
            }
          }

          return results
        }
      }

      /**
       * now run the function a bunch of times, say 10 times
       * Only the output of the first run should take 1000ms to run.
       * Subsequent runs should be way faster than 1000ms.
       */

      /** run the function 10 times, without caching it should take ~5 seconds */
      const initialTimeStamp = currentTimeStampInSeconds()
      const results = await DummyClass.test()
      const timeTakenInSeconds = secondsFromTimestamp(initialTimeStamp)

      /**
       * Since the loop runs 5 times, the non cached function should take about
       * 1000 * 5 = 5000ms to run.
       *
       * 500ms are taken for timestamp irregularity.
       */
      expect(timeTakenInSeconds).to.be.above(4.5)
      expect(timeTakenInSeconds).to.be.below(5.5)
      expect(results.length).to.be.equal(5)

      /** Now run the function 5 times with caching enabled, it should take ~1 second */
      const initialTimeStampWhenCached = currentTimeStampInSeconds()
      const resultsWhenCached = await DummyClass.test(true)
      const timeTakenInSecondsWhenCached = secondsFromTimestamp(
        initialTimeStampWhenCached,
      )

      expect(resultsWhenCached.length).to.be.equal(5)
      expect(timeTakenInSecondsWhenCached).to.be.above(0.5)
      expect(timeTakenInSecondsWhenCached).to.be.below(1.5)

      console.table([
        {
          cached: false,
          start: Math.floor(initialTimeStamp),
          time: `${Math.floor(timeTakenInSeconds)} seconds`,
          timesRun: results.length,
        },
        {
          cached: true,
          start: Math.floor(initialTimeStampWhenCached),
          time: `${Math.floor(timeTakenInSecondsWhenCached)} seconds`,
          timesRun: resultsWhenCached.length,
        },
      ])
    })
  })
})
