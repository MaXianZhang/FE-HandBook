/**
 * @file 用于解决滚动穿透问题
 */

import {getScrollTop} from './getScrollTop';

export class ContentScrollController {
    constructor() {
        this.scrollTop = 0;
    }

    contentForbidScroll() {
        this.scrollTop = getScrollTop();

        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollTop}px`;
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
        document.body.style.minHeight = '100%';
    }

    contentScrollRecover(loki, handleLayerConfig = LAYER_5_SHOW_LAYER_NUM) {
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        document.body.style.top = 0;
        document.body.style.width = '100%';
        window.scrollTo(0, this.scrollTop);
    };
}
