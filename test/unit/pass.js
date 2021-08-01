const { describe, it } = require('mocha')
const chai = require('chai')

const { expect } = chai

describe('test setup', () => {
  it('should always pass', () => {
    expect(1).equal(1)
  })
})
