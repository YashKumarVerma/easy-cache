/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import code being tested */
import { sleep } from './time'

describe('services/util/time', () => {
  /** method to halt execution for a given time duration */
  describe('sleep', () => {
    /** should be defined */
    it('should be defined', () => {
      expect(sleep).not.to.be.undefined
    })

    /** should be a function */
    it('should be a function and callable', () => {
      expect(sleep).to.be.a('function')
    })

    /** should sleep for a given duration */
    it('should sleep for a given duration', async () => {
      const currentTimeStamp = new Date().getTime() % 1000
      await sleep(100)
      const elapsedTime = (new Date().getTime() - currentTimeStamp) % 1000
      expect(elapsedTime).to.be.at.least(100)
    })
  })
})
