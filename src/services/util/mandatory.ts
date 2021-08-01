/* eslint-disable consistent-return */
/**
 * used to check whether a required value is is passed or not.
 * @param obj: the object to check
 * @param mandatory: the mandatory properties
 * @returns true if all mandatory properties are present in the object
 */
export const requiredPropertiesExist = (
  obj: any,
  mandatory: Array<string>,
): boolean => {
  mandatory.forEach((prop) => {
    if (obj[prop] === undefined || obj[prop] === null) {
      return false
    }
  })

  return true
}
