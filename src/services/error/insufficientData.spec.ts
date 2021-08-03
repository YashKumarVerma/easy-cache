/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import code being tested */
import { InsufficientDataException } from './insufficientData'

describe('error/InsufficientDataException', () => {
  /** it should exist */
  it('should exist', () => {
    expect(InsufficientDataException).not.to.be.undefined
  })

  /** it should be an error */
  it('should be an error', () => {
    expect(InsufficientDataException).to.be.a('function')
  })

  /** it should have a name */
  it('should have a name as InsufficientDataException', () => {
    expect(InsufficientDataException.name).to.equal('InsufficientDataException')
  })

  /** it should have a message */
  it('should return context based erorr message', () => {
    try {
      throw new InsufficientDataException('foo missing', 'service/bar')
    } catch (e) {
      expect(e.message).to.equal(
        'Insufficient data supplied : foo missing : required service/bar',
      )
    }
  })
})
