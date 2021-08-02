/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import target for testing */
import { mandatoryPropsExist } from './mandatory'
import { InsufficientDataException } from '../error/insufficientData'

/** describe the test suite */
describe('services/util/mandatory', () => {
  /** the funciton should exist */
  it('should exist', () => {
    expect(mandatoryPropsExist).not.to.be.undefined
  })

  /** the exported function should be a function */
  it('should be a function', () => {
    expect(mandatoryPropsExist).to.be.a('function')
  })

  /** function should return true when all props exist */
  it('should return true when all props exist', () => {
    const obj = {
      foo: 'bar',
      id: 4,
    }
    const mandatoryProps = ['foo', 'id']
    const errorMessage = 'test module'
    expect(mandatoryPropsExist(obj, mandatoryProps, errorMessage)).to.be.true
  })

  /** function should throw an error if a prop is missing */
  it('should throw if a prop missing', () => {
    const obj = {
      foo: 'bar',
      id: 4,
    }
    const mandatoryProps = ['foo', 'id', 'bar']
    const errorMessage = 'test module'
    expect(() =>
      mandatoryPropsExist(obj, mandatoryProps, errorMessage),
    ).to.throw()
  })

  /** function should throw an error instance of InsufficientDataException if prop is missing */
  it('should throw an instance of InsufficientDataException if prop missing', () => {
    const obj = {
      foo: 'bar',
      id: 4,
    }
    const mandatoryProps = ['foo', 'id', 'bar']
    const errorMessage = 'test module'
    expect(() =>
      mandatoryPropsExist(obj, mandatoryProps, errorMessage),
    ).to.throw(InsufficientDataException)
  })
})
