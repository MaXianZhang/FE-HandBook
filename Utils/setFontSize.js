/** 给 h5 html设置font-size
 *
 * @param pageConfig
 * @param isEditor 是否是编辑器环境
 */

// 默认的H5页面的宽度
const DEFAULT_H5_PAGE_WIDTH = 375;
// 默认的字体大小
const DEFAULT_H5_FONT_SIZE = 16;


function setFontSize(isEditor) {
    const html = document.getElementsByTagName('html')[0];
    if (!html) {
        return;
    }
    currentPageWidth = document.body.clientWidth;
    const h5BaseFontSize = isEditor
        ? DEFAULT_H5_FONT_SIZE
        : currentPageWidth / (DEFAULT_H5_PAGE_WIDTH / DEFAULT_H5_FONT_SIZE);
    html && html.style && html.style.setProperty('font-size', `${h5BaseFontSize}px`);
};