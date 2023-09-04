/**
 * @file 卡顿监听
 */

const ONE_MEGABYTE = 1048576;
const ONE_SECOND = 1000;
const LAG_LINE = 24;
const SMOOTH_LINE = 50;
const STANDARD_DURATION = 3;

export default class LagListener {
    constructor(lagCallback = () => {}) {
        this.lagCallback = lagCallback;
        this.prevTime = Date.now();
        this.frames = 0;
        this.lagMemory = [];
        this.smoothCounter = 0;
        this.hodingLagMessage = [];
    }

    begin() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
        };

        animate();
    }

    update() {
        this.frames += 1;
        const time = Date.now();

        if (time >= this.prevTime + ONE_SECOND) {
            this.prevTime = time;
            this.updateMemory();
            this.frames = 0;
        }
    }

    updateMemory() {
        const {jsHeapSizeLimit, usedJSHeapSize} = performance?.memory || {};

        if (this.frames < LAG_LINE) {
            this.lagMemory.push({
                frames: this.frames,
                jsHeapSizeLimit: jsHeapSizeLimit / ONE_MEGABYTE,
                usedJSHeapSize: usedJSHeapSize / ONE_MEGABYTE,
                timeStamp: Date.now()
            });
        } else {
            this.handleLagMemory();
        }

        if (this.frames > SMOOTH_LINE) {
            this.smoothCounter += 1;
            this.handleSmooth();
        } else {
            this.smoothCounter = 0;
        }
    }

    handleLagMemory() {
        const duration = this.lagMemory.length;

        // 算作一次卡顿，存入待发送队列
        if (duration >= STANDARD_DURATION) {
            const lagMemory = Array.from(this.lagMemory);
            const jsHeapSizeLimit = lagMemory.reduce((pre, cur) => pre + cur.jsHeapSizeLimit, 0) / duration;
            const usedJSHeapSize = lagMemory.reduce((pre, cur) => pre + cur.usedJSHeapSize, 0) / duration;
            const frames = lagMemory.reduce((pre, cur) => pre + cur.frames, 0) / duration;
            this.hodingLagMessage.push({
                startTime: lagMemory?.[0]?.timeStamp,
                duration,
                frames,
                jsHeapSizeLimit,
                usedJSHeapSize
            });
        }

        this.lagMemory = [];
    }

    handleSmooth() {
        const duration = this.smoothCounter;
        // 在浏览器性能占用不高时，执行回调
        if (duration >= STANDARD_DURATION && this.hodingLagMessage.length > 0) {
            this.hodingLagMessage.forEach(lagMessage => {
                this.lagCallback(lagMessage);
            });
            this.hodingLagMessage = [];
        }
    }
}
