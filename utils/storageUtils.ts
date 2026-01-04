/**
 * Utility functions for local storage operations
 */

/**
 * Save data to local storage
 * @param key Storage key
 * @param value Data to store
 */
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

/**
 * Retrieve data from local storage
 * @param key Storage key
 * @returns The stored data or null if not found
 */
export const getData = async (key: string) => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data', e);
    return null;
  }
};

/**
 * Remove data from local storage
 * @param key Storage key
 */
export const removeData = async (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};