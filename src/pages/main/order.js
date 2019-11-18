// 默认已经定义了main模块
loader.define(function(require, exports, module) {
    var pageview = {};

    // 模块初始化定义
    pageview.init = function() {
        navTab();
    }

    // 底部导航
    function navTab() {
        //menu在tab外层,menu需要传id
        var tab = bui.tab({
            id: "#uiTab",
        })
        tab.lock();
        var uiList = bui.list({
            id: "#scrollList1",
            url: "http://w2n1075050.imwork.net:52812/activity/v2/order/list",
            pageSize: 10, // 当pageSize 小于返回的数据大小的时候,则认为是最后一页,接口返回的数据最好能返回空数组,而不是null
            data: {},
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "pageNum",
                size: "pageSize",
                data: "data.data"
            },
            callback: function(e) {
                console.log(e)
                // e.target 为你当前点击的元素
                // e.currentTarget 为你当前点击的handle 整行
            },
            template: function(data) {
                var html = "";
                data.forEach(function(el, index) {
                    // 处理角标状态
                    var sub = '',
                        subClass = '';
                    switch (el.status) {
                        case 11:
                            sub = '未付';
                            subClass = 'bui-sub';
                            break;
                        case 4:
                            sub = '支付';
                            subClass = 'bui-sub danger';
                            break;
                        default:
                            sub = '';
                            subClass = '';
                            break;
                    }
                    html += `<li class="bui-btn bui-box" href="pages/detail/article.html?activityOrderId=${el.activityOrderId}">
                    <div class="bui-thumbnail ${subClass}" data-sub="${sub}" ><img src="https://www.static.taomz.com${el.activity.mainImage}" alt=""></div>
                    <div class="span1">
                        <h3 class="item-title">${el.activity.activityName}</h3>
                        <p class="item-text">活动结束时间：${el.activity.endTime}</p>
                        <p class="item-text">订单号：${el.orderCode}</p>
                    </div>
                    <span class="price"><i>￥</i>${el.amountTotal}</span>
                </li>`
                });
                return html;
            },
            onBeforeRefresh: function() {
                console.log("brefore refresh")
            },
            onBeforeLoad: function() {
                console.log("brefore load", storage.get("login_token"));
            },
            onRefresh: function() {
                // 刷新以后执行
                console.log("refreshed")
            },
            onLoad: function() {
                // 刷新以后执行
                console.log("loaded")
            },
            onFail: function () {
                console.log("fail")
            }
        });

        var uiList = bui.list({
            id: "#scrollList2",
            url: "http://w2n1075050.imwork.net:52812/activity/v2/order/list",
            pageSize: 10, // 当pageSize 小于返回的数据大小的时候,则认为是最后一页,接口返回的数据最好能返回空数组,而不是null
            data: {},
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "pageNum",
                size: "pageSize",
                data: "data.data"
            },
            callback: function(e) {
                console.log(e)
                // e.target 为你当前点击的元素
                // e.currentTarget 为你当前点击的handle 整行
            },
            template: function(data) {
                var html = "";
                data.forEach(function(el, index) {
                    // 处理角标状态
                    var sub = '',
                        subClass = '';
                    switch (el.status) {
                        case 11:
                            sub = '未付';
                            subClass = 'bui-sub';
                            break;
                        case 4:
                            sub = '支付';
                            subClass = 'bui-sub danger';
                            break;
                        default:
                            sub = '';
                            subClass = '';
                            break;
                    }
                    html += `<li class="bui-btn bui-box" href="pages/detail/article.html?orderCode=${el.orderCode}">
                    <div class="bui-thumbnail ${subClass}" data-sub="${sub}" ><img src="https://www.static.taomz.com${el.activity.mainImage}" alt=""></div>
                    <div class="span1">
                        <h3 class="item-title">${el.activity.activityName}</h3>
                        <p class="item-text">活动结束时间：${el.activity.endTime}</p>
                        <p class="item-text">订单号：${el.orderCode}</p>
                    </div>
                    <span class="price"><i>￥</i>${el.amountTotal}</span>
                </li>`
                });
                return html;
            },
            onBeforeRefresh: function() {
                console.log("brefore refresh")
            },
            onBeforeLoad: function() {
                console.log("brefore load", storage.get("login_token"));
            },
            onRefresh: function() {
                // 刷新以后执行
                console.log("refreshed")
            },
            onLoad: function() {
                // 刷新以后执行
                console.log("loaded")
            },
            onFail: function () {
                console.log("fail")
            }
        });

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})