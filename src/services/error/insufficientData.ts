/**
 * Class to inform the user that there is insufficient data to perform
 * the given operation
 */
class InsufficientData extends Error {
  constructor(message: string) {
    super(`Insufficient data supplied : ${message}`)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InsufficientData.prototype)
  }
}

export { InsufficientData }
