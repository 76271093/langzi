(function (win, ysp) {

  var utils = ysp.utils;
  ysp.customHelper = {};
  utils.extend(ysp.customHelper, {
    /* 适配中定制的公共代码放在这里 */

    /*
    // 可以实现一个foo方法，在定制适配组件中被使用，如：ysp.customHelper.foo()
    foo: function(){

    }
    */

    // 以下两个方法用于修改原页面中的错误, 但执行时机不同
    // 当目标页面加载完onload时执行, aWin为当前页面的window对象, doc为当前页面的document对象
    onTargetLoad: function(aWin, doc){
      if(aWin.domutils && aWin.domutils.isIOS){
        aWin.domutils.isIOS=function(){return false;};
      }
      if(aWin.domutils && aWin.domutils.isAndroid){
        aWin.domutils.isAndroid=function(){return false;};
      }
      var styleDom = doc.createElement('style');
      styleDom.innerHTML = '#focusDiv~input {display: none;}#focusDiv~textarea {display: none;}';
      doc.head.appendChild(styleDom);
      
      

      
      
    },

    // 目标页面加载前执行, aWin为当前页面的window对象, doc为当前页面的document对象
    beforeTargetLoad: function(aWin, doc) {
			aWin.HTMLFormElement.prototype.__defineSetter__('target',function(){this.setAttribute('target',ysp.runtime.Browser._linkFrameId)});
      
      
  if (aWin.location.href=='http://bi.goldwind.com.cn/vision/index.jsp') {
    
    aWin.alert=function(){
      alert('密码错误！请检查密码管家设置');
      aWin.close();
    };
    
    var timer = setInterval(function() {
      if (ysp.runtime.Context.activeContext && ysp.runtime.Context.activeContext.model.id !== 'login') {
        ysp.appMain.hideLoading();
        clearInterval(timer);
      } else {
        ysp.appMain.showLoading();
      }
    }, 100);
  }

     // aWin.Navigator.prototype.__defineGetter__('userAgent', function() {return 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Electron/1.0.0 Safari/537.36'}) 
    },

    //登录相关接口
    //判断是否需要跳转到登录页面, 当页面匹配不上的时候会执行该方法, 若返回值为true则跳转, 否则不跳转.
    //判断是否需要跳转的思路为: 当前未登录, 系统自动跳转到了错误提示页面,
    //此时需要提取错误提示页面的特征, 保证只有跳转到错误提示页面的时候,needToLogin的返回值才为true
    needToLogin: function(doc) {
      return false;
    },

    //判断是否登录成功, 当页面匹配不上的时候会执行该方法, 若返回值为true则登录成功刷新页面, 否则不成功不刷新页面.
    //时机: 当登录后的页面不是登录前打开的页面时, 需要用到此方法实现跳转.
    //思路与needToLogin类似, 保证能够唯一区分该页面即可.
    isLoginSuccess: function(doc) {
      return false;
    },
    
    controlLoading: function(elem) {
      var doc = elem.ownerDocument;
      var display = doc.querySelector('[bofid="_maskDiv"]');
      if (display && display.style.display != 'none' && top.yspShowHiddenLoad == undefined) {
        top.yspShowHiddenLoad = 1;
        ysp.appMain.showLoading();
      } else if (display && display.style.display == 'none' && top.yspShowHiddenLoad == 1) {
        top.yspShowHiddenLoad = undefined;
        ysp.appMain.hideLoading();
      }

		}
		

  });

})(window, ysp);
