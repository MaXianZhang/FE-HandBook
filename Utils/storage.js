/**
 * @param {*} key
 * @param {*} value
 */
const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
    window.localStorage.setItem(`${key}_micro_time`, Date.now());
};

/**
 * @param {*} key
 * @param {*} duration 有效时长
 */
const getLocalStorage = (key, duration) => {
    const setTime = +window.localStorage.getItem(`${key}_micro_time`);
    if (setTime && duration) {
        if (+Date.now() - setTime <= duration) {
            return window.localStorage.getItem(key);
        }
        return null;
    }
    return window.localStorage.getItem(key);
};

/**
 * @param {*} key
 */
const removeLocalStorage = (key) => {
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(`${key}_micro_time`);
};

export default {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
};