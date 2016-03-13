import reduce from 'lodash.reduce'
import isInterface from './isInterface'

/**
 * Checks if given candidate is an instance of interface definition. It uses
 * given function to extract values from candidate.
 *
 * @public
 * @param {object} interfaceDefinition
 * @param {object} candidate
 * @param {function} extractValue
 * @returns {boolean}
 */
export default function isInstanceOf(interfaceDefinition, candidate, extractValue = defaultExtract) {

  // don't even try to validate if candidate doesn't exist..
  if (!candidate) {
    return false
  }

  return reduce(interfaceDefinition, (result, Type, property) => {
    return result && is(extractValue(candidate, property), Type)
  }, true)
}

/**
 * Extracts value corresponds to key from object.
 *
 * @public
 * @param {object} obj
 * @param {string} key
 * @return {mixed}
 */
const defaultExtract = (obj, key) => obj[key]

/**
 * Compares by checking candindate is an instance of Type.
 *
 * @public
 * @param {mixed} candidate
 * @param {mixed} Type
 * @returns {boolean}
 */
function is(candidate, Type) {
  if (!candidate) {
    return false
  }

  if (isInterface(Type)) {
    return Type.isInstance(candidate)
  }

  // these are primitives
  return candidate.constructor === Type
}


