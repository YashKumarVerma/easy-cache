/**
 * Time Utilities
 *
 * This file contains a set of utility functions for dealing with time.
 * TIme is a very important concept in this package, and is used a lot
 * of times during testing TTL and expiration.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export { sleep }
