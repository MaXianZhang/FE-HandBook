/**
 * @file: 获取滚动条在Y轴上滚动的距离
 */

export const getScrollTop = () => {
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }

    return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
};
