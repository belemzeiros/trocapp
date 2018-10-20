/**
 * Transaction solutions.
 */
class TransactionService {
  /**
   * Generate a unique S4 based string.
   * @returns {string} A text that contains letter and number. Example: 7a64
   */
  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  /**
   * Generate an unique identification for a Gtw-Transaction-Id HTTP Header.
   * Mask example: 607ce687-7a64-f3c4-37ec-41ea166313dc-1528815901315
   * @returns {string} A conventioned based structured text
   */
  static newGuid() {
    const date = new Date().getTime();
    const octet = `${TransactionService.s4()}${TransactionService.s4()}`;
    const ternary = `${TransactionService.s4()}-${TransactionService.s4()}-${TransactionService.s4()}`;
    const dozen = `${TransactionService.s4()}${TransactionService.s4()}${TransactionService.s4()}`;
    return `${octet}-${ternary}-${dozen}-${date}`;
  }
  /**
   * Convert an object to string with url query string pattern.
   * @param {!Object} data A key/value object based
   * @returns {string} A URL query string
   */
  static toQueryString(data) {
    return Object.keys(data)
      .map(key => [key, data[key]].join('='))
      .join('&');
  }
}

export default TransactionService;
