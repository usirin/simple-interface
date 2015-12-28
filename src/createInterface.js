import map from 'lodash.map'
import isInstanceOf from './isInstanceOf'
import isInterface from './isInterface'

/**
 * Creates an interface for given contract.
 *
 * @public
 * @param {string} name - name of the interface
 * @param {object} contract - interface contract
 * @returns {object}
 */
export default function createInterface(name, contract) {
  return {
    /**
     * Name of the interface.
     */
    name: name,

    /**
     * Unique interface identifier. Mostly will be used for isInterface checks.
     */
    __interfaceSymbol: Symbol(name),

    /**
     * Checks if given candidate satisfies this interface's contract.
     *
     * @public
     * @param {object} candidate - instance to be checked
     * @param {function} extractValue
     * @returns {boolean}
     */
    isInstance(candidate) {
      return isInstanceOf(contract, candidate)
    },

    /**
     * Returns contract of this interface.
     *
     * @public
     * @returns {object}
     */
    getContract() {
      return contract
    },

    /**
     * String representation of Interface.
     *
     * @public
     * @returns {string}
     */
    toString() {
      return `${name} ${contractToString(contract)}`
    }
  }
}

/**
 * Return string representation of given definition.
 *
 * @public
 * @param {object} contract
 * @returns {string}
 */
function contractToString(contract) {
  let stringified = map(contract, (value, key) => {
    if (isInterface(value)) {
      return `${key}: ${value.toString()}`
    }
    return `${key}: ${value.name}`
  }).join(', ')

  return `{ ${stringified} }`
}

