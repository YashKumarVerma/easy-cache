/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import the code to be tested */
import EasyCache from './index'
import { ConstructorConfig } from './interface'
import { InsufficientDataException } from '../error/insufficientData'

/**
 * @constants
 * Congiruations to run the tests on
 */
const ENV: ConstructorConfig = {
  defaultTTL: 2,
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
})
