
/**
 * Checks if given candidate is an object.
 *
 * @public
 * @param {object} candidate
 * @returns {boolean}
 */
export default function isInterface(candidate) {
  return candidate.name
      && candidate.__interfaceSymbol
      && typeof(candidate.__interfaceSymbol) === 'symbol'
}

