loader.define(function(require, exports, module) {

    var pageview = {};

    pageview.init = function () {
        // module 为当前的模块信息
        var uiParams = bui.getPageParams();
        var activityOrderId;
        uiParams.done(function(result){
            var urlparam = result;
            activityOrderId = urlparam.activityOrderId;
        })

        bui.ajax({
            url: "http://192.168.168.5:9091/activity/v2/order/detail/" + activityOrderId ,
            method: "GET",
            async: false,
            data: ""
        }).then(function(res){
            var head_html = "";
            var head_body = "";
            var signupType = '';
            switch (res.data.signupType) {
                case 0:
                    signupType = '专业观众';
                    break;
                case 1:
                    signupType = '会员';
                    break;
                case 2:
                    signupType = '招商';
                    break;
                default:
                    signupType = '';
                    break;
            }
            head_html += `
                <li class="bui-btn bui-box">
                <div class="thumbnail ring"><img src="https://www.static.taomz.com${res.data.activity.mainImage}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${res.data.activity.activityName}</h3>
                    <p class="item-text">${res.data.createTime}</p>
                </div>
                <input type="checkbox" class="bui-fav warning" value="">
            </li>
            `
            head_body += `
                <li class="bui-btn bui-box clearactive">
                    <label class="bui-label">订单号</label>
                    <div class="span1">
                        <div class="bui-value" id="orderCode">${res.data.orderCode}</div>
                    </div>
                </li>
                <li class="bui-btn bui-box clearactive">
                    <label class="bui-label">报名类型</label>
                    <div class="span1">
                        <div class="bui-value">${signupType}</div>
                    </div>
                </li>
                <li class="bui-btn bui-box clearactive">
                    <label class="bui-label">支付金额</label>
                    <div class="span1">
                        <div class="bui-value" id="amountTotal">${res.data.amountTotal}</div>
                    </div>
                </li>
            `
            $('#order_detail_head').html(head_html);
            $('#order_detail_body').html(head_body);
        }, function(res,status){
            console.log(status);
            return false;
        });

        bui.btn("#order_pay").click(function(){
            var amountTotal = $('#amountTotal').text();
            var orderCode = $('#orderCode').text();
            bui.ajax({
                url: "http://192.168.168.5:9091/app/wechat/order/unifiedorder" ,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                data: "orderCode=" + orderCode + "&subject=微信支付&totalFee=" + amountTotal + "&orderType=1&type=WAP&openId="
            }).then(function(res){
                console.log(res);
                window.location.href = JSON.parse(res.data).mweb_url;
            }, function(res,status){
                console.log(status);
                return false;
            })
        });
    };

    pageview.init();

    return pageview;
})