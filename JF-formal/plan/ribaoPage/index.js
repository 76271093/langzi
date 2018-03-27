'use strict';

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control17_v5NEkA: function (elem) {
      /*我的日报，我的项目点击后的执行情况日报*/if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '执行情况日报') {
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
    doAction_uiControl19_KiVy8R: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');$(tbody).children('tr').each(function (i) {
          $(this).children('td').each(function (j) {
            if ($(this).text() == mark) {
              // console.log(this.nextElementSibling);
              this.nextElementSibling.click();
            }
          });
        });
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'initial';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = val;;
      } else if (data.eventType == 'change') {
        var time1 = setInterval(function () {
          if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').nextElementSibling && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').nextElementSibling.nextElementSibling) {
            elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').nextElementSibling.nextElementSibling.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
          } else {
            console.log(22);
          }if (elem && elem.ownerDocument && elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.parent && elem.ownerDocument.defaultView.parent.body && elem.ownerDocument.defaultView.parent.body.querySelector('.combobox-panel>input')) {
            elem.ownerDocument.defaultView.parent.body.querySelector('.combobox-panel>input').value = data.dataCustom;
            clearInterval(time1);
          } else {
            console.log(11);
          }
        }, 300);
      }
    },
    getTemplate_uiControl19_KiVy8R: function getTemplate_uiControl19_KiVy8R() {
      var selfTemplate = 'export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:\'blur\',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:\'click\',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:\'focus\',\n      data:mark\n    })\n  }\n  return(customData ? \n  \t<div className=\'zhixingribao\'>\n    \t<ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u9879\u76EE\u7F16\u53F7|\u670D\u52A1\u5355\u53F7/.test(item[1]) ? \n            <li>\n            \t<span>{item[1]}\uFF1A</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u6267\u884C\u65E5\u671F/.test(item[1]) ? \n            <li>\n            \t<span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || \'\u8BF7\u9009\u62E9\'} format="YYYY-MM-DD" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: \'change\' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u5DE5\u4F5C\u72B6\u6001|\u5907\u6CE8/.test(item[1]) ? \n            <li className=\'triangle\'>\n            \t<span>{item[1]}\uFF1A</span>\n              <div \n                onInput={onInput.bind(this,item[0])} \n                onClick={onMouseDown.bind(this,item[1])}>{item[2]}\n              </div>\n            </li> : \n          \t<li>\n            \t<span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div/>\n  )\n}';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: \'blur\',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: \'click\',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: \'focus\',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    \'div\',\n    { className: \'zhixingribao\' },\n    React.createElement(\n      \'ul\',\n      null,\n      customData.map(function (item, i) {\n        return (/\u9879\u76EE\u7F16\u53F7|\u670D\u52A1\u5355\u53F7/.test(item[1]) ? React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(\n              \'span\',\n              null,\n              item[2]\n            )\n          ) : /\u6267\u884C\u65E5\u671F/.test(item[1]) ? React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || \'\u8BF7\u9009\u62E9\', format: \'YYYY-MM-DD\', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: \'change\' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u5DE5\u4F5C\u72B6\u6001|\u5907\u6CE8/.test(item[1]) ? React.createElement(\n            \'li\',\n            { className: \'triangle\' },\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(\n              \'div\',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onClick: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement(\'div\', null);\n};';
    },

    getData_control13_VapGkC: function getData_control13_VapGkC(elem) {
      var styleDom = document.createElement('style');styleDom.innerHTML = '#focusDiv~input {display: none;}';elem.ownerDocument.head.appendChild(styleDom);
    },
    doAction_uiControl12_Vbo9zs: function doAction_uiControl12_Vbo9zs(data, elem) {},
    getTemplate_uiControl12_Vbo9zs: function getTemplate_uiControl12_Vbo9zs() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },

    getData_control15_QyBqOb: function getData_control15_QyBqOb(elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.body && elem.querySelector('iframe').contentWindow.document.body.lastChild && elem.querySelector('iframe').contentWindow.document.body.lastChild.tagName == 'INPUT') {
        elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'none';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = '';
      }
    },
    doAction_uiControl14_CO5gMX: function doAction_uiControl14_CO5gMX(data, elem) {},
    getTemplate_uiControl14_CO5gMX: function getTemplate_uiControl14_CO5gMX() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control16_Wk3brx: function (elem) {
      if (elem && elem.title == '保存') {
        return 11;
      } else {
        return undefined;
      }
    },
    doAction_uiControl15_nWuRxu: function (data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl15_nWuRxu: function getTemplate_uiControl15_nWuRxu() {
      var selfTemplate = 'module.exports = React.createClass({\n  render: function() {\n    var data=this.props.customData;\n    return (data ? \n      <div className=\'saveBtn\'>\n        <button className=\'click-active-darkGreen\' onClick={()=>{\n          var handler=this.props.customHandler;\n          handler({\n            eventType:\'click\'\n          })\n        }}>\u4FDD\u5B58</button>\n      </div> : <div/>\n    )\n  }\n});';
      return '\'use strict\';\n\nmodule.exports = React.createClass({\n  displayName: \'exports\',\n\n  render: function render() {\n    var _this = this;\n\n    var data = this.props.customData;\n    return data ? React.createElement(\n      \'div\',\n      { className: \'saveBtn\' },\n      React.createElement(\n        \'button\',\n        { className: \'click-active-darkGreen\', onClick: function onClick() {\n            var handler = _this.props.customHandler;\n            handler({\n              eventType: \'click\'\n            });\n          } },\n        \'\\u4FDD\\u5B58\'\n      )\n    ) : React.createElement(\'div\', null);\n  }\n});';
    },
    getData_control68_LfAGFi: function (elem) {
      /*主任务管理点击编辑后进来的页面*/if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '任务信息') {
        var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');var data = [];$(tbody).children('tr').each(function (i) {
          if (i % 2 && i > 2 && i < tbody.querySelectorAll('tr').length - 4) {
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
    doAction_uiControl72_yoBH6u: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');$(tbody).children('tr').each(function (i) {
          $(this).children('td').each(function (j) {
            if ($(this).text() == mark) {
              // console.log(this.nextElementSibling);
              this.nextElementSibling.click();
            }
          });
        });
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'initial';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = val;;
      } else if (data.eventType == 'change') {
        elem.ownerDocument.defaultView.parent.body.querySelector('.combobox-panel>input').value = data.dataCustom;
      }
    },
    getTemplate_uiControl72_yoBH6u: function getTemplate_uiControl72_yoBH6u() {
      var selfTemplate = 'export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:\'blur\',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:\'click\',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:\'focus\',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className=\'zhixingribao\'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u8BA1\u5212\u5468\u671F/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || \' \'} format="YYYY-MM-DD" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: \'change\' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? \n            <li className=\'triangle\'>\n              <span>{item[1]}\uFF1A</span>\n              <div\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}>{item[2]}\n              </div>\n            </li> : \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div/>\n  )\n}\n\n';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: \'blur\',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: \'click\',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: \'focus\',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    \'div\',\n    { className: \'zhixingribao\' },\n    React.createElement(\n      \'ul\',\n      null,\n      customData.map(function (item, i) {\n        return (/\u8BA1\u5212\u5468\u671F/.test(item[1]) ? React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(\n              \'span\',\n              null,\n              item[2]\n            )\n          ) : /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || \' \', format: \'YYYY-MM-DD\', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: \'change\' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? React.createElement(\n            \'li\',\n            { className: \'triangle\' },\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(\n              \'div\',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onMouseDown: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : React.createElement(\n            \'li\',\n            null,\n            React.createElement(\n              \'span\',\n              null,\n              item[1],\n              \'\\uFF1A\'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement(\'div\', null);\n};';
    },
    getData_control69_Zh4UgH: function getData_control69_Zh4UgH(elem) {
      ysp.customHelper.controlLoading(elem);
    },
    doAction_uiControl73_31KWLu: function doAction_uiControl73_31KWLu(data, elem) {},
    getTemplate_uiControl73_31KWLu: function getTemplate_uiControl73_31KWLu() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },

    getData_control72_vlbPa6: function getData_control72_vlbPa6(elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('pre')) {
        return elem.querySelector('iframe').contentWindow.document.querySelector('pre').textContent;
      } else {
        return undefined;
      }
    },
    doAction_uiControl76_2dwby8: function doAction_uiControl76_2dwby8(data, elem) {},
    getTemplate_uiControl76_2dwby8: function getTemplate_uiControl76_2dwby8() {
      var selfTemplate = 'export default({customData})=>{\n  return(customData || customData==\'\'&& \n  \t<div style={{height:\'200px\',width:\'100%\',display:\'flex\',justifyContent:\'center\',alignItems:\'center\'}}>\n      <p>\u6B63\u5728\u52A0\u8F7D...</p>   \n    </div>\n  )\n}';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData;\n\n  return customData || customData == \'\' && React.createElement(\n    \'div\',\n    { style: { height: \'200px\', width: \'100%\', display: \'flex\', justifyContent: \'center\', alignItems: \'center\' } },\n    React.createElement(\n      \'p\',\n      null,\n      \'\\u6B63\\u5728\\u52A0\\u8F7D...\'\n    )\n  );\n};';
    },
    getData_control73_267tOz: function (elem) {
      if (elem) {
        var data = [];$(elem).find('span').each(function (i) {
          data.push($(this).text());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl77_5IA2hh: function (data, elem) {
      if (data.eventType == 'click') {
        var index = data.dataCustom;elem.querySelectorAll('span')[index].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: elem.ownerDocument.defaultView }));
      }
    },
    getTemplate_uiControl77_5IA2hh: function getTemplate_uiControl77_5IA2hh() {
      var selfTemplate = 'export default function({ customData, customHandler }) {\n  return (\n    <div>\n      {customData && customData.map((item, index) => <p onClick={() => customHandler({ eventType: \'click\',data:index })}>{item}</p>)}\n    </div>\n  );\n}\n';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return React.createElement(\n    \'div\',\n    null,\n    customData && customData.map(function (item, index) {\n      return React.createElement(\n        \'p\',\n        { onClick: function onClick() {\n            return customHandler({ eventType: \'click\', data: index });\n          } },\n        item\n      );\n    })\n  );\n};';
    },
    getData_control84_1ifVN4: function getData_control84_1ifVN4(elem) {
      if (elem) {
        return elem.textContent;
      } else {
        return undefined;
      }
    },
    doAction_uiControl9_o4KxGA: function doAction_uiControl9_o4KxGA(data, elem) {},
    getTemplate_uiControl9_o4KxGA: function getTemplate_uiControl9_o4KxGA() {
      var selfTemplate = 'import {HeaderCustom} from \'ysp-custom-components\';\n\nmodule.exports = React.createClass({\n  render: function(){\n    var data=this.props.customData\n    return ( data ? \n      <HeaderCustom title={data}/> : <HeaderCustom title=\'\u4EFB\u52A1\u4FE1\u606F\'/>\n    )\n  }\n});';
      return '\'use strict\';\n\nvar _yspCustomComponents = require(\'ysp-custom-components\');\n\nmodule.exports = React.createClass({\n  displayName: \'exports\',\n\n  render: function render() {\n    var data = this.props.customData;\n    return data ? React.createElement(_yspCustomComponents.HeaderCustom, { title: data }) : React.createElement(_yspCustomComponents.HeaderCustom, { title: \'\\u4EFB\\u52A1\\u4FE1\\u606F\' });\n  }\n});';
    },
    getData_control2_SlofzJ: function (elem) {
      if (elem) {
        return 11;
      } else {
        return undefined;
      }
    },
    doAction_uiControl2_QZbt6d: function (data, elem) {
      if (data.eventType == 'click') {
        $(elem).remove();
      }
    },
    getTemplate_uiControl2_QZbt6d: function () {
      var selfTemplate = 'export default ({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:\'click\',\n      data:1\n    })\n  }\n  return(customData && \n  \t<button className=\'tankuangClose\' onClick={onClick.bind(this)}>\u5173\u95ED</button>\n  )\n}';
      return '\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: \'click\',\n      data: 1\n    });\n  };\n  return customData && React.createElement(\n    \'button\',\n    { className: \'tankuangClose\', onClick: onClick.bind(undefined) },\n    \'\\u5173\\u95ED\'\n  );\n};';
    },
    getData_control66_0W5euL: function (elem) {
      try {
        if (elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').textContent.trim() == '提示信息') {
          alert(elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').nextElementSibling.innerText);elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').parentNode.querySelector('div.layui-layer-btn > a').click();
        }
      } catch (e) {}
    },
    doAction_uiControl47_TQt99C: function (data, elem) {},
    getTemplate_uiControl47_TQt99C: function () {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div>\n      </div>\n    )\n  }\n});";
      return '"use strict";\n\nmodule.exports = React.createClass({\n  displayName: "exports",\n\n  render: function render() {\n    return React.createElement("div", null);\n  }\n});';
    }
  }, "ribaoPage");
})(window, ysp);