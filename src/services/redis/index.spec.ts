/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import target for testing */
import RedisPlugin from './index'

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
})
