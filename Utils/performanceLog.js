window.addEventListener("load", function() {
    setTimeout(function() {
        var e = window.performance;
        if (e) {
            var t = e.getEntriesByType("navigation")[0]
              , r = 0;
            t || (r = (t = e.timing).navigationStart);
            var n = [{
                key: "Redirect",
                desc: "\u7f51\u9875\u91cd\u5b9a\u5411\u7684\u8017\u65f6",
                value: t.redirectEnd - t.redirectStart
            }, {
                key: "AppCache",
                desc: "\u68c0\u67e5\u672c\u5730\u7f13\u5b58\u7684\u8017\u65f6",
                value: t.domainLookupStart - t.fetchStart
            }, {
                key: "DNS",
                desc: "DNS\u67e5\u8be2\u7684\u8017\u65f6",
                value: t.domainLookupEnd - t.domainLookupStart
            }, {
                key: "TCP",
                desc: "TCP\u8fde\u63a5\u7684\u8017\u65f6",
                value: t.connectEnd - t.connectStart
            }, {
                key: "Waiting(TTFB)",
                desc: "\u4ece\u5ba2\u6237\u7aef\u53d1\u8d77\u8bf7\u6c42\u5230\u63a5\u6536\u5230\u54cd\u5e94\u7684\u65f6\u95f4 / Time To First Byte",
                value: t.responseStart - t.requestStart
            }, {
                key: "Content Download",
                desc: "\u4e0b\u8f7d\u670d\u52a1\u7aef\u8fd4\u56de\u6570\u636e\u7684\u65f6\u95f4",
                value: t.responseEnd - t.responseStart
            }, {
                key: "HTTP Total Time",
                desc: "http\u8bf7\u6c42\u603b\u8017\u65f6",
                value: t.responseEnd - t.requestStart
            }, {
                key: "DOMContentLoaded",
                desc: "dom\u52a0\u8f7d\u5b8c\u6210\u7684\u65f6\u95f4",
                value: t.domContentLoadedEventEnd - r
            }, {
                key: "Loaded",
                desc: "\u9875\u9762load\u7684\u603b\u8017\u65f6",
                value: t.loadEventEnd - r
            }];
            if (Math.random() > .75) {
                var s = window.location
                  , i = s.href
                  , c = s.pathname
                  , u = navigator.userAgent
                  , d = i.split("?")[0];
                o.a.post("https://tr.jianshu.com/fe/1/mon/atf", {
                    app: "shakespeare-performance",
                    url: d,
                    ua: u,
                    path: c,
                    stats_ttfb: t.responseStart - t.requestStart,
                    stats_domLoaded: t.domContentLoadedEventEnd - r,
                    stats_loaded: t.loadEventEnd - r
                }).then(a.a).catch(a.a)
            }
            console && console.log && console.log(n)
        }
    }, 0)
});
// [
//     {
//         "key": "Redirect",
//         "desc": "网页重定向的耗时",
//         "value": 0
//     },
//     {
//         "key": "AppCache",
//         "desc": "检查本地缓存的耗时",
//         "value": 0
//     },
//     {
//         "key": "DNS",
//         "desc": "DNS查询的耗时",
//         "value": 0
//     },
//     {
//         "key": "TCP",
//         "desc": "TCP连接的耗时",
//         "value": 0
//     },
//     {
//         "key": "Waiting(TTFB)",
//         "desc": "从客户端发起请求到接收到响应的时间 / Time To First Byte",
//         "value": 1229.6000000238419
//     },
//     {
//         "key": "Content Download",
//         "desc": "下载服务端返回数据的时间",
//         "value": 150.5
//     },
//     {
//         "key": "HTTP Total Time",
//         "desc": "http请求总耗时",
//         "value": 1380.1000000238419
//     },
//     {
//         "key": "DOMContentLoaded",
//         "desc": "dom加载完成的时间",
//         "value": 1642.3999999761581
//     },
//     {
//         "key": "Loaded",
//         "desc": "页面load的总耗时",
//         "value": 2633.6999999284744
//     }
// ]