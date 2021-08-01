/**
 * Class to inform the user that there is insufficient data to perform
 * the given operation
 */
class InsufficientDataException extends Error {
  constructor(message: string, metaData: string) {
    super(`Insufficient data supplied : ${message} : required ${metaData}`)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InsufficientDataException.prototype)
  }
}

export { InsufficientDataException }
