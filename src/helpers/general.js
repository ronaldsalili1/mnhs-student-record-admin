/**
 * Capitalize the first letter of the word/string
 * @param {string} value 
 * @returns {string}
 */
export const capitalizeFirstLetter = (value) => {
    if (typeof value !== 'string') {
        throw new Error('Input must be a string');
    }
  
    if (value.length === 0) {
        return value;
    }
  
    return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
export const objectToQueryString = (obj) => {
    const keyValuePairs = [];
  
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            keyValuePairs.push(`${encodedKey}=${encodedValue}`);
        }
    }
  
    return `?${keyValuePairs.join('&')}`;
};

/**
 * 
 * @returns {Object}
 */
export const getParamsFromUrl = () => {
    // Create a new URLSearchParams object from the given URL.
    const searchParams = new URLSearchParams(window.location.search);

    // Create an object to store the query string parameters.
    const params = {};
  
    // Iterate over the query string parameters and add them to the object.
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
  
    // Return the object of query string parameters.
    return params;
};

/**
 * 
 * @param {string} input 
 * @param {Object} option 
 */
export const filterOption = (input, option) => {
    const lowerCasedLabel = (option?.label ?? '').toLowerCase();

    return lowerCasedLabel.includes(input.toLowerCase());
};

  