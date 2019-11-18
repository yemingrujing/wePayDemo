// 网站配置
var sitePath = "http://www.easybui.com",
    siteDir = sitePath + "/demo/json/";
// 设置当前应用模式
bui.isWebapp = true;

// 路由初始化给全局变量,必须是router
window.router = bui.router({
    cache: false
});

var userinfo = null;
var storage = bui.storage();
bui.ready(function() {
    // 数据行为存储器
    var bs = bui.store({
        scope: "app",
        data: {
            size: 1
        }
    });

    // 初始化路由
    router.init({
        id: "#bui-router",
        progress: true,
        hash: true,
        beforeLoad: function(e) {
            // 如果没有登录,并且当前页面不是登录页面,则执行跳转, 并且要return false; 这样没有历史记录,不能使用后退.
            if( !userinfo && e.target.pid !== "pages/main/main"){
                router.load({
                    url: "pages/main/main.html"
                })
                return false;
            }
        }
    })

    // 绑定事件
    bind();
})

/**
 * [bind 绑定页面事件]
 * @return {[type]} [description]
 */
function bind() {
    // 绑定应用的所有按钮有href跳转, 增加多个按钮监听则在hangle加逗号分开.
    bui.btn({ id: "#bui-router", handle: ".bui-btn" }).load();

    // 统一绑定应用所有的后退按钮
    $("#bui-router").on("click", ".btn-back", function(e) {
        // 支持后退多层,支持回调
        bui.back();
    });
}