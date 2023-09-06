/**
 * @file: 防抖
 */

export default function debounce(func, delay) {
    let timer = null;

    return function(...args){
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func.apply(this, args);
            clearTimeout(timer);
        }, delay);
    }
}
