/**
 * 导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};

    pageview.bind = function () {
        console.log(storage.get("login_token"));
        // 手机号,帐号是同个样式名, 获取值的时候,取的是最后一个focus的值
        var userInput = bui.input({
            id: ".user-input",
            callback: function(e) {
                // 清空数据
                this.empty();
            }
        });

        // 密码显示或者隐藏
        var password = bui.input({
            id: ".password-input",
            iconClass: ".icon-eye",
            onBlur: function(e) {
                if (e.target.value == '') { return false; }
                // 注册的时候校验只能4-18位密码
                var rule = /^[a-zA-Z0-9_-]{4,18}$/;
                if (!rule.test(e.target.value)) {
                    bui.hint("密码只能由4-18位字母或者数字上下横杠组成");
                    return false;
                }
                return true;
            },

            callback: function(e) {
                //切换类型
                this.toggleType();
                //
                $(e.target).toggleClass("active")
            }
        });

        // 图标提醒
        $('#success').on("click", function(argument) {
            bui.confirm({
                "title": "",
                "height": 460,
                "content": '<div class="bui-box-center"><div><i class="icon-successfill success"></i><h3>登录失败</h3><p>用户名或密码错误</p></div></div>',
                "buttons": [{ name: "关闭", className: "primary-reverse" }]
            });
        });

        //提交
        var loginBtn = bui.btn({id: "#login", beforeCallback: function(e) {
                bui.ajax({
                    url: "http://192.168.168.5:9091/login",
                    method: "POST",
                    async: false,
                    contentType: "application/x-www-form-urlencoded",
                    data: "username=" + userInput.value() + "&password=" + hex_md5(password.value())
                }).then(function(res){
                    if (res.code == -1) {
                        $('#success').click();
                    } else {
                        bui.config.ajax = {
                            headers: {"login_token": res.data.token},
                        };
                        $('#login').removeAttr("disabled");
                        userinfo = res.data;
                        storage.set("login_token", res.data.token);
                    }
                }, function(res,status){
                    console.log(status);
                    return false;
                })
            }
        });
        loginBtn.click();

        bui.btn("#register").load();
    };

    pageview.init = function () {
        // 绑定事件
        this.bind();
    };


    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
});