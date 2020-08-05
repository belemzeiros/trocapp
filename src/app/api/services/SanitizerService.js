/**
 * Sanitizer for ember objects
 */
class SanitizerService {
  /**
   * Extracts sanitized value from unknown element
   * @param {*} element An unknown element
   */
  static getValue(element) {
    if (Array.isArray(element)) {
      return element.map(value => SanitizerService.getValue(value));
    }
    if (typeof element === 'object') {
      return SanitizerService.getObject(element);
    }
    return element;
  }

  /**
   * Extracts values from complex objects
   * @param {Object} sourceObject A Object where will be extracted values
   */
  static getObject(emberObject) {
    let sourceObject = { ...emberObject };
    let v;
    const json = {};

    // As 12 linhas a seguir são necessárias devido ao Ember Object
    const isInternal = Object.keys(sourceObject).includes('_internalModel');
    let hasData = false;

    if (isInternal) {
      // eslint-disable-next-line no-underscore-dangle
      const internalData = sourceObject._internalModel;
      hasData = Object.keys(internalData).includes('_data');
    }
    if (isInternal && hasData) {
      // eslint-disable-next-line no-underscore-dangle
      sourceObject = { ...sourceObject._internalModel._data };
    }

    Object.keys(sourceObject).forEach(key => {
      const isInvalidString = key === 'toString';
      const isOwnerKey = key.indexOf('OWNER') === 0;
      const isThereUnderscoreAtBegin = key.indexOf('_') === 0;
      if (isInvalidString || isOwnerKey || isThereUnderscoreAtBegin) {
        return;
      }

      v = sourceObject[key];

      if (typeof v === 'function') {
        return;
      }

      if (Array.isArray(v)) {
        v = v.map(SanitizerService.getValue);
      }
      if (typeof v === 'object') {
        v = SanitizerService.getObject(v);
      }
      json[key] = v;
    });

    return json;
  }
}

export default SanitizerService;
