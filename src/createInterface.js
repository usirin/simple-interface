import map from 'lodash.map'
import isInstanceOf from './isInstanceOf'
import isInterface from './isInterface'

export default function createInterface(interfaceName, interfaceDefinition) {
  return {
    /**
     * This interface's name.
     */
    name: interfaceName,

    /**
     * Unique interface identifier. Mostly will be used for isInterface checks.
     */
    __interfaceSymbol: Symbol(interfaceName),

    /**
     * Checks if given candidate satisfies this interface's contract.
     *
     * @public
     * @param {object} candidate - instance to be checked
     * @param {function} extractValue
     * @returns {boolean}
     */
    isInstance(candidate) {
      return isInstanceOf(interfaceDefinition, candidate)
    },

    /**
     * Returns contract of this interface.
     *
     * @public
     * @returns {object}
     */
    getContract() {
      return interfaceDefinition
    },

    /**
     * String representation of Interface.
     *
     * @public
     * @returns {string}
     */
    toString() {
      return `${interfaceName} ${definitionToString(interfaceDefinition)}`
    }
  }
}

/**
 * Return string representation of given definition.
 *
 * @public
 * @param {object} interfaceDefinition
 * @returns {string}
 */
function definitionToString(interfaceDefinition) {
  let stringified = map(interfaceDefinition, (value, key) => {
    if (isInterface(value)) {
      return `${key}: ${value.toString()}`
    }
    return `${key}: ${value.name}`
  }).join(', ')

  return `{ ${stringified} }`
}

