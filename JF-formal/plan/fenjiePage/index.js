"use strict";

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control11_t9QLL4: function (elem) {},
    doAction_uiControl10_gPKWli: function (data, elem) {},
    getTemplate_uiControl10_gPKWli: function getTemplate_uiControl10_gPKWli() {
      var selfTemplate = "import {HeaderCustom} from 'ysp-custom-components';\n\nmodule.exports = React.createClass({\n  render: function(){\n    return (\n      <HeaderCustom title='\u5206\u89E3\u4EFB\u52A1'/>\n    )\n  }\n});";
      return "'use strict';\n\nvar _yspCustomComponents = require('ysp-custom-components');\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    return React.createElement(_yspCustomComponents.HeaderCustom, { title: '\\u5206\\u89E3\\u4EFB\\u52A1' });\n  }\n});";
    },
    getData_control12_SPcwvZ: function getData_control12_SPcwvZ(elem) {
      /*分解按钮点击后的页面*/if (elem && elem.querySelectorAll('iframe')[0].length > 1 && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').length > 1 && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').length > 1 && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr').length > 1 && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '项目名称' && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[2].textContent == '项目阶段') {
        elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
          var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style*="display: none;"]').length;$(elem).children('tr').each(function (i) {
            if (i > 0 && i < $(elem).children('tr').length - 5) {
              var arr = [];var tdNnum = $(this).children('td').not('td[style*="display: none;"]').length;var num = count - tdNnum;if (num) {
                $(_arr).each(function (k) {
                  if (k < num) {
                    arr.push(_arr[k]);
                  }
                });$(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                  if (j > 0) {
                    arr.push($(this).text());
                  }
                });data.push(arr);
              } else {
                $(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                  if (j > 0) {
                    arr.push($(this).text());
                  }
                });_arr = arr;
                data.push(arr);
              }
            }
          });return data;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
    doAction_uiControl11_bqunnX: function doAction_uiControl11_bqunnX(data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom + 1;elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');elem.querySelectorAll('tr')[inx].querySelectorAll('td')[1].querySelector('a').click();
      }
    },
    getTemplate_uiControl11_bqunnX: function getTemplate_uiControl11_bqunnX() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.stopPropagation();\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  var onClick=(mark,e)=>{\n    customHandler({\n      data:mark,\n      eventType:'click'\n    })\n  }\n  return(customData ? \n    <div className='fenjieList'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight' onClick={onClick.bind(this,i)}>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> : <div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.stopPropagation();\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  var onClick = function onClick(mark, e) {\n    customHandler({\n      data: mark,\n      eventType: 'click'\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'fenjieList' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight', onClick: onClick.bind(undefined, i) },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              customData[i][k]\n            )\n          );\n        })\n      );\n    })\n  ) : React.createElement('div', null);\n};";
    },
    getData_control29_NasQ22: function (elem) {
      /*点击主任务分解中分解按钮后的页面*/if (elem && elem.querySelectorAll('tr')[0] && elem.querySelectorAll('tr')[0].querySelectorAll('td')[1] && elem.querySelectorAll('tr')[0].querySelectorAll('td')[3] && elem.querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelectorAll('tr')[1].querySelectorAll('td')[2] && elem.querySelectorAll('tr')[0].querySelectorAll('td')[1].textContent == '服务单号：' && elem.querySelectorAll('tr')[0].querySelectorAll('td')[3].textContent == '任务名称：' && elem.querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '项目名称' && elem.querySelectorAll('tr')[1].querySelectorAll('td')[2].textContent == '项目阶段') {
        var data = [];$(elem).children('tr').each(function (i) {
          if (i > 0 && i < $(elem).children('tr').length - 5) {
            var arr = [];$(this).children('td').not('td[style*="display: none;"]').each(function (j) {
              if ($(this).children('a')[0]) {
                arr.push($(this).text());
              } else if (j > 0) {
                arr.push($(this).text());
              }
            });data.push(arr);
          }
        }); /*表格有个总的title*/var tit = [];tit.push($(elem).children('tr').eq(0).children('td').eq(2).text());tit.push($(elem).children('tr').eq(0).children('td').eq(4).text());return { data: data, tit: tit };
      } else {
        return undefined;
      }
    },
    doAction_uiControl32_qz0kf8: function (data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom + 1;ysp.appMain.showLoading();elem.querySelectorAll('tr')[inx].querySelector('a').click();
      }
    },
    getTemplate_uiControl32_qz0kf8: function getTemplate_uiControl32_qz0kf8() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight fenjieHead' ? \n    e.target.parentElement.className='maxHeight fenjieHead' : \n    e.target.parentElement.className='minHeight fenjieHead'; \n    e.stopPropagation();\n  }\n  var onClick=(inx,e)=>{\n    customHandler({\n      eventType:'click',\n      data:inx\n    })\n  }\n  return(\n    customData && customData.data && customData.data.length>1 &&\ncustomData.data[1][0]=='' && customData.data[1][1]=='' && customData.data[1][2]=='' && customData.data[1][3]=='' && customData.data[1][4]=='' && customData.data[1][5]=='' && customData.data[1][6]=='' && customData.data[1][7]=='' ? \n    <div style={{'textAlign':'center',padding:'15px 0'}}>(\u65E0\u6570\u636E)</div> : \n\n    customData && customData.data.length>1 ? \n    <div className='zhurenwufenjie'> \n      <div>\n      \t<div>\n        \t<span>\u670D\u52A1\u5355\u53F7\uFF1A</span>\n          <span>{customData.tit[0]}</span>\n        </div>\n        <div>\n        \t<span>\u4EFB\u52A1\u540D\u79F0\uFF1A</span>\n          <span>{customData.tit[1]}</span>\n        </div>\n      </div>\n    \t<div className='logTable'>\n      {customData.data.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight fenjieHead' onClick={onClick.bind(this,i)}>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(\n                <div>\n                  <span>{customData.data[0][k]}\uFF1A</span>\n                  <span>{customData.data[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div>\n    </div>:\n    <div/>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight fenjieHead' ? e.target.parentElement.className = 'maxHeight fenjieHead' : e.target.parentElement.className = 'minHeight fenjieHead';\n    e.stopPropagation();\n  };\n  var onClick = function onClick(inx, e) {\n    customHandler({\n      eventType: 'click',\n      data: inx\n    });\n  };\n  return customData && customData.data && customData.data.length > 1 && customData.data[1][0] == '' && customData.data[1][1] == '' && customData.data[1][2] == '' && customData.data[1][3] == '' && customData.data[1][4] == '' && customData.data[1][5] == '' && customData.data[1][6] == '' && customData.data[1][7] == '' ? React.createElement(\n    'div',\n    { style: { 'textAlign': 'center', padding: '15px 0' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : customData && customData.data.length > 1 ? React.createElement(\n    'div',\n    { className: 'zhurenwufenjie' },\n    React.createElement(\n      'div',\n      null,\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u670D\\u52A1\\u5355\\u53F7\\uFF1A'\n        ),\n        React.createElement(\n          'span',\n          null,\n          customData.tit[0]\n        )\n      ),\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u4EFB\\u52A1\\u540D\\u79F0\\uFF1A'\n        ),\n        React.createElement(\n          'span',\n          null,\n          customData.tit[1]\n        )\n      )\n    ),\n    React.createElement(\n      'div',\n      { className: 'logTable' },\n      customData.data.map(function (item, i) {\n        return i > 0 && React.createElement(\n          'div',\n          { className: 'minHeight fenjieHead', onClick: onClick.bind(undefined, i) },\n          React.createElement('p', { onClick: onToggle.bind(undefined) }),\n          item.map(function (j, k) {\n            return React.createElement(\n              'div',\n              null,\n              React.createElement(\n                'span',\n                null,\n                customData.data[0][k],\n                '\\uFF1A'\n              ),\n              React.createElement(\n                'span',\n                null,\n                customData.data[i][k]\n              )\n            );\n          })\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control31_zvRcAQ: function getData_control31_zvRcAQ(elem) {
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
    doAction_uiControl22_eFhcPh: function doAction_uiControl22_eFhcPh(data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');$(tbody).children('tr').each(function (i) {
          $(this).children('td').each(function (j) {
            if ($(this).text() == mark) {
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
    getTemplate_uiControl22_eFhcPh: function getTemplate_uiControl22_eFhcPh() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:'blur',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:'focus',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='zhixingribao'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u8BA1\u5212\u5468\u671F/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || ' '} format=\"YYYY-MM-DD\" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: 'change' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? \n            <li className='triangle'>\n              <span>{item[1]}\uFF1A</span>\n              <div\n                onInput={onInput.bind(this,item[0])} \n                onClick={onMouseDown.bind(this,item[1])}>{item[2]}\n            \t</div>\n            </li> : \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onFocus={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: 'blur',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: 'focus',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'zhixingribao' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return (/\u8BA1\u5212\u5468\u671F/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              item[2]\n            )\n          ) : /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || ' ', format: 'YYYY-MM-DD', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: 'change' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u5BA2\u6237\u5C5E\u6027|\u670D\u52A1\u6027\u8D28|\u673A\u7EC4\u7C7B\u578B|\u8D1F\u8D23\u4EBA/.test(item[1]) ? React.createElement(\n            'li',\n            { className: 'triangle' },\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'div',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onClick: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onFocus: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control33_3lGBqd: function getData_control33_3lGBqd(elem) {
      if (elem) {
        var data = [];$(elem).find('span').each(function (i) {
          data.push($(this).text());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl33_dhSblK: function doAction_uiControl33_dhSblK(data, elem) {
      if (data.eventType == 'click') {
        var index = data.dataCustom;elem.querySelectorAll('span')[index].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: elem.ownerDocument.defaultView }));
      }
    },
    getTemplate_uiControl33_dhSblK: function getTemplate_uiControl33_dhSblK() {
      var selfTemplate = "export default function({ customData, customHandler }) {\n  return (\n    <div>\n      {customData && customData.map((item, index) => <p onClick={() => customHandler({ eventType: 'click',data:index })}>{item}</p>)}\n    </div>\n  );\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return React.createElement(\n    'div',\n    null,\n    customData && customData.map(function (item, index) {\n      return React.createElement(\n        'p',\n        { onClick: function onClick() {\n            return customHandler({ eventType: 'click', data: index });\n          } },\n        item\n      );\n    })\n  );\n};";
    },
    getData_control34_blslWF: function getData_control34_blslWF(elem) {
      var styleDom = document.createElement('style');styleDom.innerHTML = '#focusDiv~input {display: none;}#focusDiv~textarea {display: none;}';elem.ownerDocument.head.appendChild(styleDom);
    },
    doAction_uiControl34_Ky40Nl: function doAction_uiControl34_Ky40Nl(data, elem) {},
    getTemplate_uiControl34_Ky40Nl: function getTemplate_uiControl34_Ky40Nl() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control35_ssdEcU: function getData_control35_ssdEcU(elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.body && elem.querySelector('iframe').contentWindow.document.body.lastChild && elem.querySelector('iframe').contentWindow.document.body.lastChild.tagName == 'INPUT') {
        elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'none';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = '';
      } else if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.body && elem.querySelector('iframe').contentWindow.document.body.lastChild && elem.querySelector('iframe').contentWindow.document.body.lastChild.tagName == 'TEXTAREA') {
        elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'none';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = '';
      }
    },
    doAction_uiControl35_yxJmLS: function doAction_uiControl35_yxJmLS(data, elem) {},
    getTemplate_uiControl35_yxJmLS: function getTemplate_uiControl35_yxJmLS() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control36_yu5m42: function getData_control36_yu5m42(elem) {
      if (elem) {
        return true;
      } else {
        return false;
      }
    },
    doAction_uiControl36_r7eVDA: function doAction_uiControl36_r7eVDA(data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl36_r7eVDA: function getTemplate_uiControl36_r7eVDA() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  return (customData ? \n    <div className='saveBtn'>\n      <button className='click-active-darkGreen' onClick={()=>{\n        customHandler({\n          eventType:'click'\n        })\n      }}>\u4FDD\u5B58</button>\n    </div> :\n    <div/>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return customData ? React.createElement(\n    'div',\n    { className: 'saveBtn' },\n    React.createElement(\n      'button',\n      { className: 'click-active-darkGreen', onClick: function onClick() {\n          customHandler({\n            eventType: 'click'\n          });\n        } },\n      '\\u4FDD\\u5B58'\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control48_LliyPE: function (elem) {
      /*主任务分解-标题点进来显示的，fenjiePage*/if (elem && elem.querySelector('div[bofid="_param"]').children.length == 0 && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody') && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[3] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[1] && elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[1].textContent == '项目阶段') {
        return undefined;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');var data = [];data.push([0, $(tbody).children('tr').eq(0).children('td').eq(1).text(), $(tbody).children('tr').eq(0).children('td').eq(2).text()], [0, $(tbody).children('tr').eq(0).children('td').eq(3).text(), $(tbody).children('tr').eq(0).children('td').eq(4).text()]);$(tbody).children('tr').each(function (i) {
          if (i % 2 && i < tbody.querySelectorAll('tr').length - 4) {
            var arr = [];$(this).children('td').each(function (j) {
              /*循环所有td*/if (j > 0) {
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
    doAction_uiControl48_ABx51H: function (data, elem) {
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
    getTemplate_uiControl48_ABx51H: function getTemplate_uiControl48_ABx51H() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:'blur',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:'focus',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='zhixingribao'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u670D\u52A1\u5355\u53F7|\u4EFB\u52A1\u540D\u79F0|\u9879\u76EE\u540D\u79F0/.test(item[1]) ? \n            <li>\n              <span>{item[1]}</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || ' '} format=\"YYYY-MM-DD\" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: 'change' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u6267\u884C\u4EBA|\u9879\u76EE\u9636\u6BB5/.test(item[1]) ? \n            <li className='triangle'>\n              <span>{item[1]}\uFF1A</span>\n              <div\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}>{item[2]}\n              </div>\n            </li> : \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: 'blur',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: 'focus',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'zhixingribao' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return (/\u670D\u52A1\u5355\u53F7|\u4EFB\u52A1\u540D\u79F0|\u9879\u76EE\u540D\u79F0/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1]\n            ),\n            React.createElement(\n              'span',\n              null,\n              item[2]\n            )\n          ) : /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4|\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || ' ', format: 'YYYY-MM-DD', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: 'change' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u6267\u884C\u4EBA|\u9879\u76EE\u9636\u6BB5/.test(item[1]) ? React.createElement(\n            'li',\n            { className: 'triangle' },\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'div',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onMouseDown: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control49_0gCNhu: function getData_control49_0gCNhu(elem) {
      if (elem) {
        return true;
      } else {
        return false;
      }
    },
    doAction_uiControl49_IxfsTP: function doAction_uiControl49_IxfsTP(data, elem) {
      if (data.eventType == 'click') {
        ysp.appMain.showLoading();elem.click();
      }
    },
    getTemplate_uiControl49_IxfsTP: function getTemplate_uiControl49_IxfsTP() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    var data=this.props.customData;\n    return (data ?\n      <button className='head-btn' onClick={(e)=>{\n        var handler=this.props.customHandler;\n        handler({\n          eventType:'click',\n          data:1\n        })\n      }}>\u65B0\u5EFA\u9879\u76EE</button> : \n      <div/>\n    )\n  }\n});\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    var _this = this;\n\n    var data = this.props.customData;\n    return data ? React.createElement(\n      'button',\n      { className: 'head-btn', onClick: function onClick(e) {\n          var handler = _this.props.customHandler;\n          handler({\n            eventType: 'click',\n            data: 1\n          });\n        } },\n      '\\u65B0\\u5EFA\\u9879\\u76EE'\n    ) : React.createElement('div', null);\n  }\n});";
    },
    getData_control50_2Dhngl: function (elem) {
      //分解任务的新建按钮
      if (elem && elem.querySelectorAll('tr')[3] && elem.querySelectorAll('tr')[3].querySelectorAll('td')[1] && elem.querySelectorAll('tr')[3].querySelectorAll('td')[1].textContent == '项目阶段') {
        //开始取数据
        var tbody = elem;var data = [];data.push([0, $(tbody).children('tr').eq(0).children('td').eq(1).text(), $(tbody).children('tr').eq(0).children('td').eq(2).text()], [0, $(tbody).children('tr').eq(0).children('td').eq(3).text(), $(tbody).children('tr').eq(0).children('td').eq(4).text()]);$(tbody).children('tr').each(function (i) {
          if (i % 2 && i < tbody.querySelectorAll('tr').length - 4) {
            var arr = [];$(this).children('td').each(function (j) {
              /*循环所有td*/if (j > 0) {
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
    doAction_uiControl50_z5dU0s: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem;$(tbody).children('tr').each(function (i) {
          $(this).children('td').each(function (j) {
            if ($(this).text() == mark) {
              // console.log(this.nextElementSibling);
              this.nextElementSibling.click();
            }
          });
        });
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;elem.ownerDocument.body.lastChild.style.display = 'initial';elem.ownerDocument.body.lastChild.value = val;
      } else if (data.eventType == 'change1') {
        elem.querySelector('tr:nth-child(6) > td:nth-child(3)').click();elem.querySelector('tr:nth-child(6) > td:nth-child(3)').click();var time1 = setInterval(function () {
          if (elem && elem.ownerDocument && elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.parent && elem.ownerDocument.defaultView.parent.body && elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1] && elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1].querySelector('input')) {
            elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1].querySelector('input').value = data.dataCustom;clearInterval(time1);elem.querySelector('tr:nth-child(6) > td:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
          }
        }, 300);
      } else if (data.eventType == 'change2') {
        elem.querySelector('tr:nth-child(6) > td:nth-child(5)').click();elem.querySelector('tr:nth-child(6) > td:nth-child(5)').click();var time1 = setInterval(function () {
          if (elem && elem.ownerDocument && elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.parent && elem.ownerDocument.defaultView.parent.body && elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1] && elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1].querySelectorAll('input')[0]) {
            elem.ownerDocument.defaultView.parent.body.querySelectorAll('.combobox-panel')[1].querySelectorAll('input')[0].value = data.dataCustom;clearInterval(time1);elem.querySelector('tr:nth-child(6) > td:nth-child(4)').dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
          }
        }, 300);
      }
    },
    getTemplate_uiControl50_z5dU0s: function getTemplate_uiControl50_z5dU0s() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:'blur',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  var onFocus=(mark,e)=>{\n    customHandler({\n      eventType:'focus',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='zhixingribao'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            /\u670D\u52A1\u5355\u53F7|\u4EFB\u52A1\u540D\u79F0/.test(item[1]) ? \n            <li>\n              <span>{item[1]}</span>\n              <span>{item[2]}</span>\n            </li> : \n            /\u9879\u76EE\u540D\u79F0/.test(item[1]) ? \n            <li>\n              <span>{item[1]}</span>\n              <span onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}>{item[2]=='' ? '\u8BF7\u9009\u62E9': item[2]}</span>\n            </li> : \n            /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || '\u8BF7\u9009\u62E9'} format=\"YYYY-MM-DD\" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: 'change1' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AMUI.DateTimeInput dateTime={item[2] || '\u8BF7\u9009\u62E9'} format=\"YYYY-MM-DD\" showTimePicker={false} \n                interiorCustomHandler={(time) => customHandler({ data: time.value, eventType: 'change2' })} \n                onFocus={onFocus.bind(this,item[1])}/>\n            </li> : \n            /\u6267\u884C\u4EBA|\u9879\u76EE\u9636\u6BB5/.test(item[1]) ? \n            <li className='triangle'>\n              <span>{item[1]}\uFF1A</span>\n              <div\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}>{item[2]}\n              </div>\n            </li> : \n            <li>\n              <span>{item[1]}\uFF1A</span>\n              <AInput value={item[2]}\n                onInput={onInput.bind(this,item[0])} \n                onMouseDown={onMouseDown.bind(this,item[1])}/>\n            </li>\n          )\n        })}\n      </ul>\n    </div> : <div></div>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: 'blur',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  var onFocus = function onFocus(mark, e) {\n    customHandler({\n      eventType: 'focus',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'zhixingribao' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return (/\u670D\u52A1\u5355\u53F7|\u4EFB\u52A1\u540D\u79F0/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1]\n            ),\n            React.createElement(\n              'span',\n              null,\n              item[2]\n            )\n          ) : /\u9879\u76EE\u540D\u79F0/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1]\n            ),\n            React.createElement(\n              'span',\n              { onInput: onInput.bind(undefined, item[0]),\n                onMouseDown: onMouseDown.bind(undefined, item[1]) },\n              item[2] == '' ? '\u8BF7\u9009\u62E9' : item[2]\n            )\n          ) : /\u8BA1\u5212\u5F00\u59CB\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || '\u8BF7\u9009\u62E9', format: 'YYYY-MM-DD', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: 'change1' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u8BA1\u5212\u7ED3\u675F\u65F6\u95F4/.test(item[1]) ? React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AMUI.DateTimeInput, { dateTime: item[2] || '\u8BF7\u9009\u62E9', format: 'YYYY-MM-DD', showTimePicker: false,\n              interiorCustomHandler: function interiorCustomHandler(time) {\n                return customHandler({ data: time.value, eventType: 'change2' });\n              },\n              onFocus: onFocus.bind(undefined, item[1]) })\n          ) : /\u6267\u884C\u4EBA|\u9879\u76EE\u9636\u6BB5/.test(item[1]) ? React.createElement(\n            'li',\n            { className: 'triangle' },\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'div',\n              {\n                onInput: onInput.bind(undefined, item[0]),\n                onMouseDown: onMouseDown.bind(undefined, item[1]) },\n              item[2]\n            )\n          ) : React.createElement(\n            'li',\n            null,\n            React.createElement(\n              'span',\n              null,\n              item[1],\n              '\\uFF1A'\n            ),\n            React.createElement(AInput, { value: item[2],\n              onInput: onInput.bind(undefined, item[0]),\n              onMouseDown: onMouseDown.bind(undefined, item[1]) })\n          )\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control51_tCX3sl: function (elem) {
      if (elem && elem.querySelector('div[bofid="_param"]').children.length > 0 && elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]') && elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]') && elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]').querySelector('span[class="aliasSpan"]') && elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]').querySelector('span[class="aliasSpan"]').textContent == '售后项目 ') {
        return elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]').querySelector('input').value;
      } else {
        return undefined;
      }
    },
    doAction_uiControl51_unX7qT: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        console.log(elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]').querySelectorAll('input')[1]);elem.querySelector('div[bofid="_param"]').querySelector('table [class="layoutTable"]').querySelector('table[class="cellTable"]').querySelectorAll('input')[1].click();
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'initial';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = val;;
      }
    },
    getTemplate_uiControl51_unX7qT: function getTemplate_uiControl51_unX7qT() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onInput=(e)=>{\n    customHandler({\n      eventType:'blur',\n      data:1\n    })\n  } \n  var onMouseDown=(e)=>{\n    customHandler({\n      eventType:'click',\n      data:1\n    })\n  }\n  return(customData || customData=='' ?\n  \t<div className='shouhouxiangmuDate'>\n      <div>\n      \t<span>\u552E\u540E\u9879\u76EE\uFF1A</span>\n        {customData=='' ?\n          <span className='triangle' onInput={onInput.bind(this)} \n            onMouseDown={onMouseDown.bind(this)}>\u3000</span> : \n          <span className='triangle'\n            onInput={onInput.bind(this)} \n            onMouseDown={onMouseDown.bind(this)}>{customData}\n          </span>\n        }\n      </div>\n    </div> : \n    <div/>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(e) {\n    customHandler({\n      eventType: 'blur',\n      data: 1\n    });\n  };\n  var onMouseDown = function onMouseDown(e) {\n    customHandler({\n      eventType: 'click',\n      data: 1\n    });\n  };\n  return customData || customData == '' ? React.createElement(\n    'div',\n    { className: 'shouhouxiangmuDate' },\n    React.createElement(\n      'div',\n      null,\n      React.createElement(\n        'span',\n        null,\n        '\\u552E\\u540E\\u9879\\u76EE\\uFF1A'\n      ),\n      customData == '' ? React.createElement(\n        'span',\n        { className: 'triangle', onInput: onInput.bind(undefined),\n          onMouseDown: onMouseDown.bind(undefined) },\n        '\\u3000'\n      ) : React.createElement(\n        'span',\n        { className: 'triangle',\n          onInput: onInput.bind(undefined),\n          onMouseDown: onMouseDown.bind(undefined) },\n        customData\n      )\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control70_6rdrxy: function getData_control70_6rdrxy(elem) {
      ysp.customHelper.controlLoading(elem);
    },
    doAction_uiControl74_NFI02U: function doAction_uiControl74_NFI02U(data, elem) {},
    getTemplate_uiControl74_NFI02U: function getTemplate_uiControl74_NFI02U() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control71_4E0d8o: function (elem) {
      if (elem) {
        return 11;
      } else {
        return undefined;
      }
    },
    doAction_uiControl78_rR4bxB: function (data, elem) {
      if (data.eventType == 'click') {
        elem.style.display = 'none';
      }
    },
    getTemplate_uiControl78_rR4bxB: function () {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:'click',\n      data:1\n    })\n  }\n  return(customData && \n    <button className='tankuangClose' onClick={onClick.bind(this)}>\u5173\u95ED</button>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: 'click',\n      data: 1\n    });\n  };\n  return customData && React.createElement(\n    'button',\n    { className: 'tankuangClose', onClick: onClick.bind(undefined) },\n    '\\u5173\\u95ED'\n  );\n};";
    },
    getData_control6_mzVfH0: function (elem) {
      try {
        if (elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').textContent.trim() == '提示信息') {
          alert(elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').nextElementSibling.innerText);elem.ownerDocument.defaultView.parent.document.querySelector('.layui-layer-title').parentNode.querySelector('div.layui-layer-btn > a').click();
        }
      } catch (e) {}
    },
    doAction_uiControl5_8XKuSv: function (data, elem) {},
    getTemplate_uiControl5_8XKuSv: function () {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div>\n      </div>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    }
  }, "fenjiePage");
})(window, ysp);