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
            id: "#tabDynamic",
            menu: "#tabDynamicNav",
            // 1: 声明是动态加载的tab
            autoload: true,
        })

        tab.lock();

        // 2: 监听加载后的事件
        tab.on("to", function(index) {
            switch (index) {
                case 0:
                    loader.require(["pages/main/home"]);
                    break;
                case 1:
                    loader.require(["pages/main/order"]);
                    break;
                case 2:
                    loader.require(["pages/main/message"]);
                    break;
                case 3:
                    loader.require(["pages/main/mine"]);
                    break;
            }

        }).to(0);

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;

})