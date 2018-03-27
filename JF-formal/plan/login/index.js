"use strict";

(function(win, ysp) {
    ysp.runtime.Model.extendLoadingModel({
        getData_control47_iy1NFA: function getData_control47_iy1NFA(elem) {
            if (ysp.appMain.isIOS()) {
                var setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {
                    if (top.WebViewJavascriptBridge) {
                        return callback(top.WebViewJavascriptBridge);
                    }
                    if (top.WVJBCallbacks) {
                        return top.WVJBCallbacks.push(callback);
                    }
                    top.WVJBCallbacks = [callback];
                    var WVJBIframe = top.document.createElement('iframe');
                    WVJBIframe.style.display = 'none';
                    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                    top.document.documentElement.appendChild(WVJBIframe);
                    setTimeout(function() {
                        top.document.documentElement.removeChild(WVJBIframe);
                    }, 0);
                };
                setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('getAutoYSPloginInfo', 'http://bi.goldwind.com.cn/vision/index.jsp', function responseCallback(info) {
                        localStorage['JFBIname'] = info.username;
                        localStorage['JFBIpassword'] = info.password;
                        elem.querySelectorAll('input')[0].value = localStorage['JFBIname'];
                        elem.querySelectorAll('input')[1].value = localStorage['JFBIpassword'];
                        if (elem.querySelectorAll('input')[0].value != '' && elem.querySelectorAll('input')[1].value != '') {
                            ysp.appMain.showLoading();
                            elem.querySelectorAll('input')[3].click();
                        }
                    });
                });
            } else {
                localStorage['JFBIname'] = yspUser.getUsername('http://bi.goldwind.com.cn/vision/index.jsp');
                localStorage['JFBIpassword'] = yspUser.getPassword('http://bi.goldwind.com.cn/vision/index.jsp'); // console.log('姓名:' + localStorage['JFBIname']);
                // console.log('密码:' + localStorage['JFBIpassword']);
                elem.querySelectorAll('input')[0].value = localStorage['JFBIname'];
                elem.querySelectorAll('input')[1].value = localStorage['JFBIpassword']; // elem.querySelectorAll('input')[0].value = '22408';
                // elem.querySelectorAll('input')[1].value = '123';
                if (elem.querySelectorAll('input')[0].value != '' && elem.querySelectorAll('input')[1].value != '') {
                    ysp.appMain.showLoading();
                    elem.querySelectorAll('input')[3].click();
                }
            }
        },
        doAction_uiControl75_tHTsNo: function doAction_uiControl75_tHTsNo(data, elem) {},
        getTemplate_uiControl75_tHTsNo: function getTemplate_uiControl75_tHTsNo() {
            var selfTemplate = 'module.exports = React.createClass({\n  render: function() {\n    return (\n      <div>\n      </div>\n    )\n  }\n});';
            return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
        }
    });
})(window, ysp);