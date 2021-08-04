/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, it } from 'mocha'

/** import code being tested */
import { currentTimeStampInSeconds, secondsFromTimestamp, sleep } from './time'

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
      const currentTimeStamp = currentTimeStampInSeconds()
      await sleep(1500)
      const elapsedTime = secondsFromTimestamp(currentTimeStamp)
      expect(elapsedTime).to.be.at.least(1)
      expect(elapsedTime).to.be.at.most(2)
    })
  })
})
