/* eslint-disable consistent-return */

/** importin peer services */
import { InsufficientDataException } from '../error/insufficientData'

/**
 * used to check whether a required value is is passed or not.
 * @param obj: the object to check
 * @param mandatory: the mandatory properties
 * @returns true if all mandatory properties are present in the object
 * @throws {InsufficientDataException} if any mandatory property is missing
 */
export const mandatoryPropsExist = (
  obj: any,
  mandatory: Array<string>,
  exceptionMessage: string,
): boolean => {
  mandatory.forEach((prop) => {
    if (obj[prop] === undefined || obj[prop] === null) {
      throw new InsufficientDataException(
        `"${prop}" is missing`,
        exceptionMessage,
      )
    }
  })

  return true
}
