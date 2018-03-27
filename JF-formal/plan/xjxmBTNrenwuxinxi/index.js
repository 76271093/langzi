"use strict";

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control37_nnmEcM: function getData_control37_nnmEcM(elem) {},
    doAction_uiControl37_3i73J7: function doAction_uiControl37_3i73J7(data, elem) {},
    getTemplate_uiControl37_3i73J7: function getTemplate_uiControl37_3i73J7() {
      var selfTemplate = "import {HeaderCustom} from 'ysp-custom-components';\n\nmodule.exports = React.createClass({\n  render: function(){\n    return (\n      <HeaderCustom title=\"\u4EFB\u52A1\u4FE1\u606F\"/>\n    )\n  }\n});";
      return "\"use strict\";\n\nvar _yspCustomComponents = require(\"ysp-custom-components\");\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(_yspCustomComponents.HeaderCustom, { title: \"\\u4EFB\\u52A1\\u4FE1\\u606F\" });\n  }\n});";
    },
    getData_control38_3HGxTB: function (elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody')) {
        var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');var data = [];$(tbody).children('tr').each(function (i) {
          if (i % 2 && i > 2 && i < tbody.querySelectorAll('tr').length - 6) {
            var arr = [];$(this).children('td').each(function (j) {
              /*循环所有td*/if (j > 0 && j <= 2 || j > 3 && j <= 5) {
                arr.push($(this).text()); /*每一对压入数组*/if (arr.length == 2) {
                  arr.unshift(i);data.push(arr);arr = [];
                }
              }
            });
          }
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl38_XxMfJw: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');var asdf;$(tbody).children('tr').each(function (i) {
          $(this).children('td').each(function (j) {
            if ($(this).text() == mark && !asdf) {
              asdf = this.nextElementSibling;
            }
          });
        });asdf && asdf.click();
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;console.log(val, mark);elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'initial';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = val;;
      } else if (data.eventType == 'change') {
        elem.ownerDocument.defaultView.parent.body.querySelector('.combobox-panel>input').value = data.dataCustom;
      }
    },
    getTemplate_uiControl38_XxMfJw: function getTemplate_uiControl38_XxMfJw() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:'blur',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:'focus',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='zhixingribao'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u8BA1\u5212\u5468\u671F/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || '\u8BF7\u9009\u62E9'} format=\"YYYY-MM-DD\" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: 'change' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? \n            <li className='triangle'>\n              <span>{item[1]}\uFF1A</span>\n              <div\n                onInput={onInput.bind(this,item[0])} \n                onClick={onMouseDown.bind(this,item[1])}>{item[2]}\n              </div>\n            </li> : \n            item[1]==\"\u670D\u52A1\u5355\u53F7\" ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2] == '' ? 'SH/TC2017-' : item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li> :\n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: 'blur',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: 'focus',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'zhixingribao' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return (/\u8BA1\u5212\u5468\u671F/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              item[2]\n            )\n          ) : /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || '\u8BF7\u9009\u62E9', format: 'YYYY-MM-DD', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: 'change' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? React.createElement(\n            'li',\n            { className: 'triangle' },\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'div',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onClick: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : item[1] == \"\u670D\u52A1\u5355\u53F7\" ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AInput, { value: item[2] == '' ? 'SH/TC2017-' : item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          ) : React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },

    doAction_uiControl39_BxcPL5body: function doAction_uiControl39_BxcPL5body(data, elem) {
      if (data.eventType == 'click') {
        var index = data.dataCustom;elem.querySelectorAll('span')[index].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: elem.ownerDocument.defaultView }));
      }
    },
    getTemplate_uiControl39_BxcPL5body: function getTemplate_uiControl39_BxcPL5body() {
      var selfTemplate = "export default function({ customData, customHandler }) {\n  return (\n    <div>\n      {customData && customData.map((item, index) => <p onClick={() => customHandler({ eventType: 'click',data:index })}>{item}</p>)}\n    </div>\n  );\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return React.createElement(\n    'div',\n    null,\n    customData && customData.map(function (item, index) {\n      return React.createElement(\n        'p',\n        { onClick: function onClick() {\n            return customHandler({ eventType: 'click', data: index });\n          } },\n        item\n      );\n    })\n  );\n};";
    },
    getData_control40_HXtgpK: function getData_control40_HXtgpK(elem) {
      if (elem) {
        var data = [];$(elem).find('span').each(function (i) {
          data.push($(this).text());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl40_xMCXMZ: function doAction_uiControl40_xMCXMZ(data, elem) {
      if (data.eventType == 'click') {
        var index = data.dataCustom;elem.querySelectorAll('span')[index].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: elem.ownerDocument.defaultView }));
      }
    },
    getTemplate_uiControl40_xMCXMZ: function getTemplate_uiControl40_xMCXMZ() {
      var selfTemplate = "export default function({ customData, customHandler }) {\n  return (\n    <div>\n      {customData && customData.map((item, index) => <p onClick={() => customHandler({ eventType: 'click',data:index })}>{item}</p>)}\n    </div>\n  );\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return React.createElement(\n    'div',\n    null,\n    customData && customData.map(function (item, index) {\n      return React.createElement(\n        'p',\n        { onClick: function onClick() {\n            return customHandler({ eventType: 'click', data: index });\n          } },\n        item\n      );\n    })\n  );\n};";
    },
    getData_control41_QRuXT9: function getData_control41_QRuXT9(elem) {
      var styleDom = document.createElement('style');styleDom.innerHTML = '#focusDiv~input {display: none;}#focusDiv~textarea {display: none;}';elem.ownerDocument.head.appendChild(styleDom);
    },
    doAction_uiControl41_zxUG6A: function doAction_uiControl41_zxUG6A(data, elem) {},
    getTemplate_uiControl41_zxUG6A: function getTemplate_uiControl41_zxUG6A() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control42_xfi6Kr: function getData_control42_xfi6Kr(elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.body && elem.querySelector('iframe').contentWindow.document.body.lastChild && elem.querySelector('iframe').contentWindow.document.body.lastChild.tagName == 'INPUT') {
        elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'none';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = '';
      }
    },
    doAction_uiControl42_uEPm3g: function doAction_uiControl42_uEPm3g(data, elem) {},
    getTemplate_uiControl42_uEPm3g: function getTemplate_uiControl42_uEPm3g() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control43_pgIaaE: function getData_control43_pgIaaE(elem) {},
    doAction_uiControl43_CGeXIx: function doAction_uiControl43_CGeXIx(data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl43_CGeXIx: function getTemplate_uiControl43_CGeXIx() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div className='saveBtn'>\n        <button onClick={()=>{\n          var handler=this.props.customHandler;\n          handler({\n            eventType:'click'\n          })\n        }}>\u4FDD\u5B58</button>\n      </div>\n    )\n  }\n});\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    var _this = this;\n\n    return React.createElement(\n      'div',\n      { className: 'saveBtn' },\n      React.createElement(\n        'button',\n        { onClick: function onClick() {\n            var handler = _this.props.customHandler;\n            handler({\n              eventType: 'click'\n            });\n          } },\n        '\\u4FDD\\u5B58'\n      )\n    );\n  }\n});";
    },
    getData_control14_fyoAie: function getData_control14_fyoAie(elem) {
      ysp.customHelper.controlLoading(elem);
    },
    doAction_uiControl13_ilZyBT: function doAction_uiControl13_ilZyBT(data, elem) {},
    getTemplate_uiControl13_ilZyBT: function getTemplate_uiControl13_ilZyBT() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control25_NA3Uy0: function (elem) {
      if (elem) {
        return 11;
      } else {
        return undefined;
      }
    },
    doAction_uiControl28_KpgZvu: function (data, elem) {
      if (data.eventType == 'click') {
        elem.style.display = 'none';
      }
    },
    getTemplate_uiControl28_KpgZvu: function () {
      var selfTemplate = 'export default ({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:\'click\',\n      data:1\n    })\n  }\n  return(customData && \n    <button className=\'tankuangClose\' onClick={onClick.bind(this)}>\u5173\u95ED</button>\n  )\n}\n\n';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: \'click\',\n      data: 1\n    });\n  };\n  return customData && React.createElement(\n    \'button\',\n    { className: \'tankuangClose\', onClick: onClick.bind(undefined) },\n    \'\\u5173\\u95ED\'\n  );\n};';
    }
  }, "xjxmBTNrenwuxinxi");
})(window, ysp);