/**
 * Time Utilities
 *
 * This file contains a set of utility functions for dealing with time.
 * TIme is a very important concept in this package, and is used a lot
 * of times during testing TTL and expiration.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** To get current timestamp in seconds */
const currentTimeStampInSeconds = () => Date.now() / 1000

/** to get number of seconds from a timestamp */
const secondsFromTimestamp = (timestamp: number) =>
  currentTimeStampInSeconds() - timestamp

export { sleep, currentTimeStampInSeconds, secondsFromTimestamp }
