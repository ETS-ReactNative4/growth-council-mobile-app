import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieve record from the storage using the key
 *
 * @param {string} key
 */
export const getAsyncStorage = async (key) => {
    return await AsyncStorage.getItem(key);
};

/**
 * Store string record in the storage
 *
 * @param {string} key
 * @param {string} value
 */
export const setAsyncStorage = async (key, value) => {
    return await AsyncStorage.setItem(key, value);
};

/**
 * Store string record in the storage
 *
 * @param {string} key
 * @param {array | object} value
 */
export const mergeAsyncStorage = async (key, value) => {
    const val = JSON.stringify(value);
    return await AsyncStorage.mergeItem(key, val);
};

/**
 * Clear records from the storage using the key
 *
 * @param {string} key
 */
export const clearAsyncStorage = async (key) => {
    return await AsyncStorage.removeItem(key);
};

