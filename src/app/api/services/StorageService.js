import SanitizerService from './SanitizerService';

class StorageService {
  /**
   * Persistence wrapper for window.Storage API
   * Only create a instance on client side, because the window object is required
   * Cookie is fallback when browser not suport window.Storage
   * @param {string} storageType Maybe local, session or cookie, default is session
   */
  constructor(storageType) {
    this.clientStorage = {
      cookie: window.document.cookie,
    };
    if (typeof Storage !== 'undefined') {
      this.storageType = storageType || 'session';
      this.clientStorage.local = window.localStorage;
      this.clientStorage.session = window.sessionStorage;
    } else {
      this.storageType = 'cookie';
    }
  }
  /**
   * Returns a cookie value based on key
   * @param {!string} key Key name of a cookie
   * @returns {string} Parsed value of document.cookie from browser
   */
  getCookie(key) {
    if (this.clientStorage.cookie.length > 0) {
      let start = this.clientStorage.cookie.indexOf(`${key}=`);

      if (start !== -1) {
        start = start + key.length + 1;
        let end = this.clientStorage.cookie.indexOf(';', start);
        if (end === -1) {
          end = this.clientStorage.cookie.length;
        }
        const saved = this.clientStorage.cookie.substring(start, end);
        return decodeURIComponent(saved);
      }
    }
    return '';
  }
  /**
   * Create a new cookie at browser
   * @param {!string} key Key name for save
   * @param {!string} value A stringified value
   * @param {?number} expireDays Number of days for expire cookie
   * @param {?string} path A path name for cookie domain
   */
  setCookie(key, value, expireDays, path) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expireDays);
    let cookie = `${key}=${encodeURIComponent(value)}`;
    if (expireDays) {
      cookie += `;expires=${exdate.toUTCString()}`;
    }
    if (path) {
      cookie += `;path=${path}`;
    }
    this.clientStorage.cookie = cookie;
  }
  /**
   * Gets a saved value by key from browser
   * @param {!string} key Key name
   * @returns {(Object|[])} Parsed object or array from browser
   */
  getItem(key) {
    let savedString;
    if (this.storageType === 'cookie') {
      savedString = this.getCookie(key);
    } else {
      savedString = this.clientStorage[this.storageType][key];
    }
    return JSON.parse(savedString || '{}');
  }
  /**
   * Save the key and value couple at Browser
   * @param {!string} key The key name
   * @param {!(string|number|Object|[])} value Value for save, maybe string, number, Object or array
   * @param {?{expireDays: number, path: string}} args Object with expireDays and path for cookie
   */
  setItem(key, value, args = {}) {
    if (key && value) {
      if (this.storageType === 'cookie') {
        const { expireDays, path } = args;
        this.setCookie(key, JSON.stringify(value), expireDays, path);
      } else {
        this.clientStorage[this.storageType][key] = JSON.stringify(value);
      }
    }
  }
  /**
   * Gets a key/value couple from specific parent object
   * @param {!string} parent Parent key name where key/value couple will be extracted
   * @param {!string} key Key name
   * @returns {(Object|[])} Parsed object or array from browser
   */
  getChild(parent, key) {
    let savedString;

    if (this.storageType === 'cookie') {
      savedString = this.getCookie(parent) || '{}';
    } else {
      savedString = this.clientStorage[this.storageType][parent];
    }

    const savedObject = JSON.parse(savedString || '{}');
    return savedObject[key] || {};
  }

  /**
   * Append a key/value couple at exists object saved on Browser
   * @param {!string} parent Parent key name where key/value couple will be appended
   * @param {!string} key Key name for save data
   * @param {!(string|number|Object|[])} value Value for save, maybe string, number, Object or array
   * @param {?{expireDays: number, path: string}} args Object with expireDays and path for cookie
   */
  setChild(parent, key, value, args = {}) {
    if (parent && key && value) {
      if (this.storageType === 'cookie') {
        const parentCookieString = this.getCookie(parent) || '{}';
        const parentCookieObject = JSON.parse(parentCookieString);
        parentCookieObject[key] = value;
        const { expireDays, path } = args;
        this.setCookie(
          parent,
          JSON.stringify(parentCookieObject),
          expireDays,
          path
        );
      } else {
        const parentString = this.clientStorage[this.storageType][parent];
        const parentObject = JSON.parse(parentString || '{}');
        parentObject[key] = value;
        const stringified = JSON.stringify(parentObject);
        this.clientStorage[this.storageType][parent] = stringified;
      }
    }
  }
  /**
   * Copy some keys/values of an object to new object storage by a key
   * @param {!string} parent Parent key name
   * @param {!string} newKey Name for new key that will be created inside of the parent object
   * @param {!Object} source Source object where data are
   * @param {?Array.<string|[]>} keys Array of key names for be used to map parent object keys
   * @param {?{expireDays: number, path: string}} args Object with expireDays and path for cookie
   */
  setSomeKeys(parent, newKey, source, keys = [], args = {}) {
    let savedString;
    if (this.storageType === 'cookie') {
      savedString = this.getCookie(parent);
    } else {
      savedString = this.clientStorage[this.storageType][parent];
    }
    const savedObject = JSON.parse(savedString || '{}');
    let save = {};

    if (keys.length) {
      keys.forEach(key => {
        let target = null;
        let value = null;

        // when its an array, the first element is key name for gets the value,
        // the second element is an alias to replace original key name and save that value
        if (Array.isArray(key)) {
          target = key[1];
          value = source[key[0]];
        } else {
          target = key;
          value = source[key];
        }

        if (typeof value === 'object') {
          save[target] = SanitizerService.getObject(value);
        } else {
          save[target] = value;
        }
      });
    } else {
      save = SanitizerService.getObject(source);
    }

    savedObject[newKey] = save;
    const stringified = JSON.stringify(savedObject);

    if (this.storageType === 'cookie') {
      const { expireDays, path } = args;
      this.setCookie(parent, stringified, expireDays, path);
    } else {
      this.clientStorage[this.storageType][parent] = stringified;
    }
  }

  /**
   * Gets some pair of keys/values of parent object in browser by a specific key
   * will update equivalent key/values couple on target object
   * @param {!string} parent Parent key name
   * @param {!string} key Key name
   * @param {!Object} targetObject Target object where data have to be set
   */
  getSomeKeys(parent, key, targetObject = {}) {
    const savedString = this.clientStorage[this.storageType][parent];
    const savedObject = JSON.parse(savedString || '{}');
    const objectKey = savedObject[key] || {};

    Object.keys(objectKey).forEach(savedKey => {
      targetObject[savedKey] = objectKey[savedKey];
    });
    return targetObject;
  }
}

export default StorageService;
