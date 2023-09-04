/**
 * @file: UE给的稿用px转成系统里的rem，以此为基础可以扩展带倍率之类的稿子
 */

// 默认的h5基准的font-size
const DEFAULT_H5_FONT_SIZE = 16;

/**
 * px变量转成em
 *
 * @param {string | number} 变量
 * @param variable
 * @param fontSize
 * @return {string} 转成rem后的变量
 */

export default (variable, fontSize = DEFAULT_H5_FONT_SIZE) => {
    // 解决variable是字符串类型的数字的场景
    let reg = new RegExp('^[0-9]*$');
    if (reg.test(variable)) {
        variable = parseInt(variable, 10);
    }
    let vars = typeof variable === 'number' ? variable : null;
    if (`${variable}`.indexOf('px') > -1) {
        vars = +(variable.split('px')[0]);
    }
    if (!vars) {
        return variable;
    }
    return `${(vars / fontSize).toFixed(6)}rem`;
};