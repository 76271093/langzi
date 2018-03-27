"use strict";

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control3_zSW1HL: function getData_control3_zSW1HL(elem) {},
    doAction_uiControl3_4LCLMV: function doAction_uiControl3_4LCLMV(data, elem) {},
    getTemplate_uiControl3_4LCLMV: function getTemplate_uiControl3_4LCLMV() {
      var selfTemplate = "import {HeaderCustom} from 'ysp-custom-components';\n\nmodule.exports = React.createClass({\n  render: function(){\n    return (\n      <HeaderCustom title=\"BI\"/>\n    )\n  }\n});";
      return "\"use strict\";\n\nvar _yspCustomComponents = require(\"ysp-custom-components\");\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(_yspCustomComponents.HeaderCustom, { title: \"BI\" });\n  }\n});";
    },
    getData_control4_Zaz5tR: function (elem) {
      /*table,id=leftPaneTable*/if (elem) {
        var data1 = [];$(elem).find('#leftCatalogTree').find('span>span>table[class~="tree_nodediv"]').each(function (i) {
          data1.push($(this).find('span[class*="flat-level1-tree-textSpan"]').text());
        });var data2 = [];$(elem).find('#leftCatalogTree').find('span>span>table[class~="tree_nodediv"]').each(function (i) {
          var arr = [];if ($(this).find('span[class*="flat-level1-tree-textSpan"]').next().length > 0) {
            $(this).find('span[class*="flat-level1-tree-textSpan"]').next().find('span[class="flat-tree-link"]').each(function (j) {
              arr.push($(this).text());
            });data2.push(arr);
          } else {
            data2.push([]);
          }
        });var firInx = '';$(data1).each(function (i) {
          if (this.trim() == "项目管理") {
            firInx = i;
          }
        });return { fir: "项目管理",
          firInx: firInx, sec: data2 };
      } else {
        return undefined;
      }
    },
    doAction_uiControl4_raSIwW: function (data, elem) {
      if (data.eventType == 'clickFir') {
        // 模板38行传值为i时回调代码
        var txt = data.dataCustom;$(elem).find('span[class="flat-level1-tree-textSpan"]').each(function (i) {
          if (this.title == '名字：' + txt) {
            this.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
          }
        }); // $(elem).find('a[class~="flat-level1-tree-link"]').eq(inx)[0].dispatchEvent(new MouseEvent("mousedown", {
        //   bubbles: true,
        //   cancelable: true,
        //   view: window
        // })); 
        /*传值为标题名称时回调代码*/ //   var text = data.dataCustom; 
        //   $(elem).find('#leftCatalogTree').children('span').children('span').children('table[class="tree_nodediv"]').each(function (i) {
        //     console.log($(this).find('a').eq(0).text().trim() == text.trim());
        //     if ($(this).find('a').eq(0).text() == text.trim()) {
        //       console.log(this);
        //       $(this).find('a').eq(0)[0].dispatchEvent(new MouseEvent("mousedown", {
        //         bubbles: true,
        //         cancelable: true,
        //         view: window
        //       }));
        //     }
        //   });
        /*传值为标题名称时回调代码结束*/
      } else if (data.eventType == 'clickSec') {
        var tableMark = data.dataCustom.tableMark;var inx = data.dataCustom.inx;console.log(tableMark, inx);$(elem).find('#leftCatalogTree').find('span>span>table[class~="tree_nodediv"]').eq(tableMark).find('span[class*="flat-level1-tree-textSpan"]').next().find('span[class="flat-tree-link"]').eq(inx)[0].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));;
      }
    },
    getTemplate_uiControl4_raSIwW: function getTemplate_uiControl4_raSIwW() {
      var selfTemplate = "export default class extends React.Component{\n  constructor(props){\n    super(props);\n    this.state={\n      switchFir:0,\n      switchSec:null\n    }\n  }\n  onClickFir=(inx,e)=>{\n    this.setState({\n      switchFir:inx,\n      switchSec:null\n    });\n    this.props.customHandler({\n      data:'\u9879\u76EE\u7BA1\u7406',\n      eventType:\"clickFir\"\n    })\n  }\n  onClickSec=(inx,mark,e)=>{\n    this.setState({\n      switchSec:inx\n    });\n    this.props.customHandler({\n      data:{\n        inx:inx,\n        tableMark:mark\n      },\n      eventType:\"clickSec\"\n    })\n  }\n  render(){\n    var {customData}=this.props;\n    return(customData ? \n    <div className='FSContainer'>\n      <ul className='firstMenu'>\n       <li onClick={this.onClickFir.bind(this,customData.firInx)} className='menuFir click-active-darkBlue'>{customData.fir}</li>\n\n      </ul>\n      {customData.sec.length>0 ? \n        <div className='SecondMenu'>\n          <ul>\n            {customData.sec[this.state.switchFir].map((item,i)=>{\n              return(\n                <li className={\n                    this.state.switchSec==i && i==0 ? \n                    'menuSec-active-first' :\n                    this.state.switchSec==i && i==(customData.sec[this.state.switchFir].length-1) ?\n                    'menuSec-active-last'  : \n                    this.state.switchSec==i ?\n                    'menuSec' : ''\n                  } onClick={this.onClickSec.bind(this,i,this.state.switchFir)}><span>{item}</span></li> \n              )\n            })}\n          </ul>\n        </div> : <div/>\n      }\n    </div> : <div/>\n    )\n  }\n}\n";
      return "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _class = function (_React$Component) {\n  _inherits(_class, _React$Component);\n\n  function _class(props) {\n    _classCallCheck(this, _class);\n\n    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));\n\n    _this.onClickFir = function (inx, e) {\n      _this.setState({\n        switchFir: inx,\n        switchSec: null\n      });\n      _this.props.customHandler({\n        data: '\u9879\u76EE\u7BA1\u7406',\n        eventType: \"clickFir\"\n      });\n    };\n\n    _this.onClickSec = function (inx, mark, e) {\n      _this.setState({\n        switchSec: inx\n      });\n      _this.props.customHandler({\n        data: {\n          inx: inx,\n          tableMark: mark\n        },\n        eventType: \"clickSec\"\n      });\n    };\n\n    _this.state = {\n      switchFir: 0,\n      switchSec: null\n    };\n    return _this;\n  }\n\n  _createClass(_class, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var customData = this.props.customData;\n\n      return customData ? React.createElement(\n        \"div\",\n        { className: \"FSContainer\" },\n        React.createElement(\n          \"ul\",\n          { className: \"firstMenu\" },\n          React.createElement(\n            \"li\",\n            { onClick: this.onClickFir.bind(this, customData.firInx), className: \"menuFir click-active-darkBlue\" },\n            customData.fir\n          )\n        ),\n        customData.sec.length > 0 ? React.createElement(\n          \"div\",\n          { className: \"SecondMenu\" },\n          React.createElement(\n            \"ul\",\n            null,\n            customData.sec[this.state.switchFir].map(function (item, i) {\n              return React.createElement(\n                \"li\",\n                { className: _this2.state.switchSec == i && i == 0 ? 'menuSec-active-first' : _this2.state.switchSec == i && i == customData.sec[_this2.state.switchFir].length - 1 ? 'menuSec-active-last' : _this2.state.switchSec == i ? 'menuSec' : '', onClick: _this2.onClickSec.bind(_this2, i, _this2.state.switchFir) },\n                React.createElement(\n                  \"span\",\n                  null,\n                  item\n                )\n              );\n            })\n          )\n        ) : React.createElement(\"div\", null)\n      ) : React.createElement(\"div\", null);\n    }\n  }]);\n\n  return _class;\n}(React.Component);\n\nexports.default = _class;";
    },

    getData_control9_D2w6GK: function (elem) {
      /*主任务分解一进来页面的*/if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0].textContent == '客户属性') {
        elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
          var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style="display: none;"]').length;$(elem).children('tr').each(function (i) {
            if (i > 1 && i < $(elem).children('tr').length - 2) {
              var arr = [];var tdNnum = $(this).children('td').not('td[style="display: none;"]').length;var num = count - tdNnum;if (num) {
                $(_arr).each(function (k) {
                  if (k < num) {
                    arr.push(_arr[k]);
                  }
                });$(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });data.push(arr);_arr = arr;
              } else {
                $(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });_arr = arr;data.push(arr);
              }
            }
          });$(data).each(function (i) {
            this.shift();this.shift();var box = '';box = this[0];this[0] = this[1];this[1] = box;var box = '';box = this[1];this[1] = this[4];this[4] = box;var box = '';box = this[3];this[3] = this[4];this[4] = box;
          });return data;
        } else {
          return undefined;
        }
      } /*我的项目一进来的页面*/else if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[3] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '任务名称' && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[3].textContent == '项目名称') {
          var elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
            var data = [];var _arr = [];var count = $(elem).children('tr').eq(1).children('td').not('td[style*="display: none;"]').length;$(elem).children('tr').each(function (i) {
              if (i > 0 && i < $(elem).children('tr').length - 1) {
                var arr = [];var tdNnum = $(this).children('td').not('td[style*="display: none;"]').length;var num = count - tdNnum;if (num) {
                  $(_arr).each(function (k) {
                    if (k < num) {
                      arr.push(_arr[k]);
                    }
                  });$(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                    arr.push($(this).text());
                  });data.push(arr);_arr = arr;
                } else {
                  $(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                    arr.push($(this).text());
                  });_arr = arr;data.push(arr);
                }
              }
            });
          }return data;
        } else {
          return undefined;
        }
    },
    doAction_uiControl8_dhVe5W: function (data, elem) {
      if (data.eventType == 'click') {
        if (data.dataCustom.txt == '编辑') {
          var inx = data.dataCustom.mark + 2;
        } else if (data.dataCustom.txt == '填写日报') {
          var inx = data.dataCustom.mark + 1;
        }elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');$(elem).children('tr').eq(inx).children('td').each(function (i) {
          if (/填写日报|编辑|分解/.test(this.textContent)) {
            ysp.appMain.showLoading();this.querySelector('a').click();
          }
        });
      }
    },
    getTemplate_uiControl8_dhVe5W: function getTemplate_uiControl8_dhVe5W() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  var onClick=(mark,txt,e)=>{\n    customHandler({\n      data:{\n        mark:mark,\n        txt:txt\n      },\n      eventType:'click'\n    })\n  }\n  return(\n    customData && \ncustomData[1][0]=='' && customData[1][1]=='' && customData[1][2]=='' && customData[1][3]=='' && customData[1][4]=='' && customData[1][5]=='' && customData[1][6]=='' && customData[1][7]=='' && customData[1][8]=='' ? \n    <div style={{'textAlign':'center',padding:'15px 0'}}>(\u65E0\u6570\u636E)</div> : \n    customData ? \n    <div className='LTable'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight'>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(/\u7F16\u8F91|\u586B\u5199\u65E5\u62A5|\u5206\u89E3/.test(j) ? \n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span className='click-active-darkBlue' onClick={onClick.bind(this,i,j)}>{customData[i][k]}</span>\n                </div> :\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  var onClick = function onClick(mark, txt, e) {\n    customHandler({\n      data: {\n        mark: mark,\n        txt: txt\n      },\n      eventType: 'click'\n    });\n  };\n  return customData && customData[1][0] == '' && customData[1][1] == '' && customData[1][2] == '' && customData[1][3] == '' && customData[1][4] == '' && customData[1][5] == '' && customData[1][6] == '' && customData[1][7] == '' && customData[1][8] == '' ? React.createElement(\n    'div',\n    { style: { 'textAlign': 'center', padding: '15px 0' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : customData ? React.createElement(\n    'div',\n    { className: 'LTable' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight' },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return (/\u7F16\u8F91|\u586B\u5199\u65E5\u62A5|\u5206\u89E3/.test(j) ? React.createElement(\n              'div',\n              null,\n              React.createElement(\n                'span',\n                null,\n                customData[0][k],\n                '\\uFF1A'\n              ),\n              React.createElement(\n                'span',\n                { className: 'click-active-darkBlue', onClick: onClick.bind(undefined, i, j) },\n                customData[i][k]\n              )\n            ) : React.createElement(\n              'div',\n              null,\n              React.createElement(\n                'span',\n                null,\n                customData[0][k],\n                '\\uFF1A'\n              ),\n              React.createElement(\n                'span',\n                null,\n                customData[i][k]\n              )\n            )\n          );\n        })\n      );\n    })\n  ) : React.createElement('div', null);\n};";
    },
    getData_control22_zm5zbu: function getData_control22_zm5zbu(elem) {
      if (elem && /统计开始日期|统计截止日期  /.test(elem.textContent)) {
        var data = [];$(elem).children('tbody').children('tr').each(function (i) {
          data.push($(this).find('input').eq(0).val());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl25_usqHf0: function doAction_uiControl25_usqHf0(data, elem) {
      if (data.eventType == 'setData1') {
        var newData = data.dataCustom;$(elem).children('tbody').children('tr').eq(0).find('input').eq(0).val(newData);$(elem).children('tbody').children('tr').eq(0).find('input').eq(0)[0].dispatchEvent(new MouseEvent("blur", { bubbles: true, cancelable: true, view: window }));
      } else if (data.eventType == 'setData2') {
        var newData = data.dataCustom;$(elem).children('tbody').children('tr').eq(1).find('input').eq(0).val(newData);$(elem).children('tbody').children('tr').eq(1).find('input').eq(0)[0].dispatchEvent(new MouseEvent("blur", { bubbles: true, cancelable: true, view: window }));
      }
    },
    getTemplate_uiControl25_usqHf0: function getTemplate_uiControl25_usqHf0() {
      var selfTemplate = "module.exports = React.createClass({\n  interiorCustomHandler1:function(time){\n    var handler=this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    })\n  },\n  interiorCustomHandler2:function(time){\n    var handler=this.props.customHandler;\n    handler({\n      eventType: 'setData2',\n      data: time.value\n    })\n  },\n  render: function() {\n    var data=this.props.customData;\n    return ( data && data.length>0 ?\n      <div className='dateContainer'>\n        <div>\n          <span>\u5F00\u59CB\u65E5\u671F</span>\n          <AMUI.DateTimeInput  dateTime={data[0] || \"\u8BF7\u9009\u62E9\"}  format=\"YYYY-MM-DD\" interiorCustomHandler={this.interiorCustomHandler1}  showTimePicker={false} />\n        </div>\n        <div>\n          <span>\u622A\u6B62\u65E5\u671F</span>\n          <AMUI.DateTimeInput  dateTime={data[1] || \"\u8BF7\u9009\u62E9\"}  format=\"YYYY-MM-DD\" interiorCustomHandler={this.interiorCustomHandler2}  showTimePicker={false} />\n        </div>\n      </div> : <div/>\n    )\n  }\n});\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  interiorCustomHandler1: function interiorCustomHandler1(time) {\n    var handler = this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    });\n  },\n  interiorCustomHandler2: function interiorCustomHandler2(time) {\n    var handler = this.props.customHandler;\n    handler({\n      eventType: 'setData2',\n      data: time.value\n    });\n  },\n  render: function render() {\n    var data = this.props.customData;\n    return data && data.length > 0 ? React.createElement(\n      'div',\n      { className: 'dateContainer' },\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u5F00\\u59CB\\u65E5\\u671F'\n        ),\n        React.createElement(AMUI.DateTimeInput, { dateTime: data[0] || \"\u8BF7\u9009\u62E9\", format: 'YYYY-MM-DD', interiorCustomHandler: this.interiorCustomHandler1, showTimePicker: false })\n      ),\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u622A\\u6B62\\u65E5\\u671F'\n        ),\n        React.createElement(AMUI.DateTimeInput, { dateTime: data[1] || \"\u8BF7\u9009\u62E9\", format: 'YYYY-MM-DD', interiorCustomHandler: this.interiorCustomHandler2, showTimePicker: false })\n      )\n    ) : React.createElement('div', null);\n  }\n});";
    },
    getData_control23_V6BgvH: function (elem) {
      if (elem) {
        var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style="display: none;"]').length;$(elem).children('tr').each(function (i) {
          // if (i > 1 && i < $(elem).children('tr').length - 2) {
          var arr = [];var tdNnum = $(this).children('td').not('td[style="display: none;"]').length;var num = count - tdNnum;if (num) {
            $(_arr).each(function (k) {
              if (k < num) {
                arr.push(_arr[k]);
              }
            });$(this).children('td').not('td[style="display: none;"]').each(function (j) {
              arr.push($(this).text());
            });data.push(arr);
          } else {
            $(this).children('td').not('td[style="display: none;"]').each(function (j) {
              arr.push($(this).text());
            });_arr = arr;data.push(arr);
          } // }
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl26_2CcBVr: function (data, elem) {},
    getTemplate_uiControl26_2CcBVr: function getTemplate_uiControl26_2CcBVr() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  return(customData && customData.length>1 ? \n    <div className='logTable'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight'>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> :\n    customData && customData.length==1 ? \n    <div style={{'text-align':'center','margin-top':'10px','padding-top':'10px','background':'#e1e1e1'}}>(\u65E0\u6570\u636E)</div> :\n    <div/>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  return customData && customData.length > 1 ? React.createElement(\n    'div',\n    { className: 'logTable' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight' },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              customData[i][k]\n            )\n          );\n        })\n      );\n    })\n  ) : customData && customData.length == 1 ? React.createElement(\n    'div',\n    { style: { 'text-align': 'center', 'margin-top': '10px', 'padding-top': '10px', 'background': '#e1e1e1' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : React.createElement('div', null);\n};";
    },
    getData_control24_cGXqgi: function (elem) {
      if (elem && /统计开始日期|统计截止日期  /.test(elem.textContent)) {
        var data = [];$(elem).children('tbody').children('tr').each(function (i) {
          data.push($(this).find('input').eq(0).val());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl27_KoQ711: function (data, elem) {
      if (data.eventType == 'setData1') {
        var newData = data.dataCustom;$(elem).children('tbody').children('tr').eq(0).find('input').eq(0).val(newData);$(elem).children('tbody').children('tr').eq(0).find('input').eq(0)[0].dispatchEvent(new MouseEvent("blur", { bubbles: true, cancelable: true, view: window }));
      } else if (data.eventType == 'setData2') {
        var newData = data.dataCustom;$(elem).children('tbody').children('tr').eq(1).find('input').eq(0).val(newData);$(elem).children('tbody').children('tr').eq(1).find('input').eq(0)[0].dispatchEvent(new MouseEvent("blur", { bubbles: true, cancelable: true, view: window }));
      }
    },
    getTemplate_uiControl27_KoQ711: function getTemplate_uiControl27_KoQ711() {
      var selfTemplate = "module.exports = React.createClass({\n  interiorCustomHandler1:function(time){\n    var handler=this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    })\n  },\n  interiorCustomHandler2:function(time){\n    var handler=this.props.customHandler;\n    handler({\n      eventType: 'setData2',\n      data: time.value\n    })\n  },\n  render: function() {\n    var data=this.props.customData;\n    return ( data && data.length>0 ?\n      <div className='dateContainer'>\n        <div>\n          <span>\u5F00\u59CB\u65E5\u671F</span>\n          <AMUI.DateTimeInput  dateTime={data[0] || \"\u8BF7\u9009\u62E9\"}  format=\"YYYY-MM-DD\" interiorCustomHandler={this.interiorCustomHandler1}  showTimePicker={false} />\n        </div>\n        <div>\n          <span>\u622A\u6B62\u65E5\u671F</span>\n          <AMUI.DateTimeInput  dateTime={data[1] || \"\u8BF7\u9009\u62E9\"}  format=\"YYYY-MM-DD\" interiorCustomHandler={this.interiorCustomHandler2}  showTimePicker={false} />\n        </div>\n      </div> : <div/>\n    )\n  }\n});\n\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  interiorCustomHandler1: function interiorCustomHandler1(time) {\n    var handler = this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    });\n  },\n  interiorCustomHandler2: function interiorCustomHandler2(time) {\n    var handler = this.props.customHandler;\n    handler({\n      eventType: 'setData2',\n      data: time.value\n    });\n  },\n  render: function render() {\n    var data = this.props.customData;\n    return data && data.length > 0 ? React.createElement(\n      'div',\n      { className: 'dateContainer' },\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u5F00\\u59CB\\u65E5\\u671F'\n        ),\n        React.createElement(AMUI.DateTimeInput, { dateTime: data[0] || \"\u8BF7\u9009\u62E9\", format: 'YYYY-MM-DD', interiorCustomHandler: this.interiorCustomHandler1, showTimePicker: false })\n      ),\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u622A\\u6B62\\u65E5\\u671F'\n        ),\n        React.createElement(AMUI.DateTimeInput, { dateTime: data[1] || \"\u8BF7\u9009\u62E9\", format: 'YYYY-MM-DD', interiorCustomHandler: this.interiorCustomHandler2, showTimePicker: false })\n      )\n    ) : React.createElement('div', null);\n  }\n});";
    },

    getData_control26_3wyQwr: function getData_control26_3wyQwr(elem) {
      if (elem) {
        var data = [];$(elem).children('span').each(function (i) {
          if (i <= 3) {
            data.push(this.style.color);
          }
        });data.push(elem.querySelectorAll('span')[6].textContent);data.push(elem.querySelectorAll('input')[0].value);data.push(elem.querySelectorAll('input')[1].value);data.push(elem.querySelectorAll('span')[9].textContent);return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl29_hih9Tt: function doAction_uiControl29_hih9Tt(data, elem) {
      if (data.eventType == 'click') {
        var txt = '[' + data.dataCustom + ']';$(elem).children('span').each(function (i) {
          if (i <= 3 && this.textContent == txt) {
            this.click();
          }
        });
      }
    },
    getTemplate_uiControl29_hih9Tt: function getTemplate_uiControl29_hih9Tt() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:'click',\n      data:e.target.textContent\n    })\n  }\n  return(customData ?\n  <div>\n    <div className='btnGroup'>\n      <button className={customData[0]=='gray' ? '' : 'btns-group-active click-active-darkGreen'} onClick={onClick.bind(this)}>\u9996\u9875</button>\n      <button className={customData[1]=='gray' ? '' : 'btns-group-active click-active-darkGreen'} onClick={onClick.bind(this)}>\u4E0A\u9875</button>\n      <button className={customData[2]=='gray' ? '' : 'btns-group-active click-active-darkGreen'} onClick={onClick.bind(this)}>\u4E0B\u9875</button>\n      <button className={customData[3]=='gray' ? '' : 'btns-group-active click-active-darkGreen'} onClick={onClick.bind(this)}>\u5C3E\u9875</button>\n    </div> \n\t\t    <div style={{\"textAlign\":\"center\",\"paddingBottom\":\"20px\",\"fontSize\":\"14px\"}}>\u7B2C{customData[5]}\u9875\uFF0C\u5171{customData[4]}\u9875\uFF0C\u6BCF\u9875{customData[6]}\u884C\uFF0C\u5171{customData[7]}\u884C</div>\t\n   </div>:<div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: 'click',\n      data: e.target.textContent\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    null,\n    React.createElement(\n      'div',\n      { className: 'btnGroup' },\n      React.createElement(\n        'button',\n        { className: customData[0] == 'gray' ? '' : 'btns-group-active click-active-darkGreen', onClick: onClick.bind(undefined) },\n        '\\u9996\\u9875'\n      ),\n      React.createElement(\n        'button',\n        { className: customData[1] == 'gray' ? '' : 'btns-group-active click-active-darkGreen', onClick: onClick.bind(undefined) },\n        '\\u4E0A\\u9875'\n      ),\n      React.createElement(\n        'button',\n        { className: customData[2] == 'gray' ? '' : 'btns-group-active click-active-darkGreen', onClick: onClick.bind(undefined) },\n        '\\u4E0B\\u9875'\n      ),\n      React.createElement(\n        'button',\n        { className: customData[3] == 'gray' ? '' : 'btns-group-active click-active-darkGreen', onClick: onClick.bind(undefined) },\n        '\\u5C3E\\u9875'\n      )\n    ),\n    React.createElement(\n      'div',\n      { style: { \"textAlign\": \"center\", \"paddingBottom\": \"20px\", \"fontSize\": \"14px\" } },\n      '\\u7B2C',\n      customData[5],\n      '\\u9875\\uFF0C\\u5171',\n      customData[4],\n      '\\u9875\\uFF0C\\u6BCF\\u9875',\n      customData[6],\n      '\\u884C\\uFF0C\\u5171',\n      customData[7],\n      '\\u884C'\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control27_nThPUP: function getData_control27_nThPUP(elem) {
      if (elem) {
        return true;
      } else {
        return false;
      }
    },
    doAction_uiControl30_1WU2if: function doAction_uiControl30_1WU2if(data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl30_1WU2if: function getTemplate_uiControl30_1WU2if() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    var data=this.props.customData;\n    return (data ?\n      <button className='head-btn' onClick={(e)=>{\n        var handler=this.props.customHandler;\n        handler({\n          eventType:'click',\n          data:1\n        })\n      }}>\u65B0\u5EFA\u9879\u76EE</button> : \n      <div/>\n    )\n  }\n});";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    var _this = this;\n\n    var data = this.props.customData;\n    return data ? React.createElement(\n      'button',\n      { className: 'head-btn', onClick: function onClick(e) {\n          var handler = _this.props.customHandler;\n          handler({\n            eventType: 'click',\n            data: 1\n          });\n        } },\n      '\\u65B0\\u5EFA\\u9879\\u76EE'\n    ) : React.createElement('div', null);\n  }\n});";
    },
    getData_control28_PmPdwn: function getData_control28_PmPdwn(elem) {
      if (elem) {
        return true;
      } else {
        return false;
      }
    },
    doAction_uiControl31_oPlHgO: function doAction_uiControl31_oPlHgO(data, elem) {
      if (data.eventType == 'click') {
        ysp.appMain.showLoading();elem.click();
      }
    },
    getTemplate_uiControl31_oPlHgO: function getTemplate_uiControl31_oPlHgO() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    var data=this.props.customData;\n    return (data ?\n      <button className='head-btn' onClick={(e)=>{\n        var handler=this.props.customHandler;\n        handler({\n          eventType:'click',\n          data:1\n        })\n      }}>\u65B0\u5EFA\u9879\u76EE</button> : \n      <div/>\n    )\n  }\n});";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    var _this = this;\n\n    var data = this.props.customData;\n    return data ? React.createElement(\n      'button',\n      { className: 'head-btn', onClick: function onClick(e) {\n          var handler = _this.props.customHandler;\n          handler({\n            eventType: 'click',\n            data: 1\n          });\n        } },\n      '\\u65B0\\u5EFA\\u9879\\u76EE'\n    ) : React.createElement('div', null);\n  }\n});";
    },

    getData_control45_p0Pvhf: function (elem) {
      if (elem && elem.querySelector('iframe') && elem.querySelector('iframe').contentWindow && elem.querySelector('iframe').contentWindow.document && elem.querySelector('iframe').contentWindow.document.body && elem.querySelector('iframe').contentWindow.document.body.lastChild && elem.querySelector('iframe').contentWindow.document.body.lastChild.tagName == 'INPUT') {
        elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'none';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = '';
      }
    },
    doAction_uiControl45_7hZLkV: function (data, elem) {},
    getTemplate_uiControl45_7hZLkV: function getTemplate_uiControl45_7hZLkV() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },
    getData_control46_ch1eqD: function (elem) {
      var styleDom = document.createElement('style');styleDom.innerHTML = '#focusDiv~input {display: none;}';elem.ownerDocument.head.appendChild(styleDom);
    },
    doAction_uiControl46_Zhzx5a: function (data, elem) {},
    getTemplate_uiControl46_Zhzx5a: function getTemplate_uiControl46_Zhzx5a() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div/>\n    )\n  }\n});\n";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    return React.createElement(\"div\", null);\n  }\n});";
    },

    getData_control0_zAsgpy: function getData_control0_zAsgpy(elem) {},
    doAction_uiControl0_X8p8gH: function doAction_uiControl0_X8p8gH(data, elem) {},
    getTemplate_uiControl0_X8p8gH: function getTemplate_uiControl0_X8p8gH() {
      var selfTemplate = "module.exports = React.createClass({\n  componentDidMount() {\n    document.body.addEventListener('touchstart', function() { }, false);\n  },\n  render: function() {\n    return (\n      <div>\n      </div>\n    )\n  }\n});";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n  componentDidMount: function componentDidMount() {\n    document.body.addEventListener('touchstart', function () {}, false);\n  },\n\n  render: function render() {\n    return React.createElement('div', null);\n  }\n});";
    },

    getData_control78_G1Lqh8: function (elem) {
      /*额定人员维护页面*/if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[2] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[2].textContent == '售后人员') {
        elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');var data = [];$(elem).find('tr').each(function (i) {
          if (i == 2 || i == 3) {
            var arr = [];$(this).find('td').each(function (j) {
              if (j > 1) {
                arr.push(this.textContent);
              }
            });data.push(arr);
          }
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl79_TAQsh5: function (data, elem) {
      if (data.eventType == 'click' || data.eventType == 'focus') {
        var mark = data.dataCustom;var tbody = elem.querySelector('iframe').contentWindow.document.querySelector('table[id="mainTable"]').querySelector('tbody');$(tbody).children('tr').eq(3).children('td').eq(mark + 2)[0].click();
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom.val;var mark = data.dataCustom.mark;elem.querySelector('iframe').contentWindow.document.body.lastChild.style.display = 'initial';elem.querySelector('iframe').contentWindow.document.body.lastChild.value = val;;
      } else if (data.eventType == 'change') {
        elem.ownerDocument.defaultView.parent.body.querySelector('.combobox-panel>input').value = data.dataCustom;
      }
    },
    getTemplate_uiControl79_TAQsh5: function () {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onInput=(mark,e)=>{\n    customHandler({\n      eventType:'blur',\n      data:{\n        val:e.target.value,\n        mark:mark\n      }\n    })\n  } \n  var onMouseDown=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='EDRYWHContainer'>\n      <div>\n        {customData[1].map((item,i)=>{\n          return(\n            <div>\n              <span>{customData[0][i]}</span>\n              <AInput value={item}\n                onInput={onInput.bind(this,i)} \n                onMouseDown={onMouseDown.bind(this,i)}/>\n            </div>\n          )       \n        })}\n      </div>\n    </div> : <div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onInput = function onInput(mark, e) {\n    customHandler({\n      eventType: 'blur',\n      data: {\n        val: e.target.value,\n        mark: mark\n      }\n    });\n  };\n  var onMouseDown = function onMouseDown(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'EDRYWHContainer' },\n    React.createElement(\n      'div',\n      null,\n      customData[1].map(function (item, i) {\n        return React.createElement(\n          'div',\n          null,\n          React.createElement(\n            'span',\n            null,\n            customData[0][i]\n          ),\n          React.createElement(AInput, { value: item,\n            onInput: onInput.bind(undefined, i),\n            onMouseDown: onMouseDown.bind(undefined, i) })\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control80_g70oGm: function (elem) {
      /*我的日报*/if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[0] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[2] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[0].textContent == '执行日期' && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '项目名称' && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[2].textContent == '工作状态') {
        elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
          var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style*="display: none;"]').length;$(elem).children('tr').each(function (i) {
            if (i > 0 && i < $(elem).children('tr').length - 1) {
              var arr = [];var tdNnum = $(this).children('td').not('td[style*="display: none;"]').length;var num = count - tdNnum;if (num) {
                $(_arr).each(function (k) {
                  if (k < num) {
                    arr.push(_arr[k]);
                  }
                });$(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });data.push(arr);_arr = arr;
              } else {
                $(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });_arr = arr;data.push(arr);
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
    doAction_uiControl80_VdeZgw: function (data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom + 1;elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');$(elem).children('tr').eq(inx).children('td').each(function (i) {
          if (/编辑/.test(this.textContent)) {
            ysp.appMain.showLoading();this.querySelector('a').click();
          }
        });
      }
    },
    getTemplate_uiControl80_VdeZgw: function () {
      var selfTemplate = "\nexport default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  var onClick=(mark,e)=>{\n    customHandler({\n      data:mark,\n      eventType:'click'\n    })\n  }\n  return(\ncustomData && \ncustomData[1][0]=='' && customData[1][1]=='' && customData[1][2]=='' && customData[1][3]=='' && customData[1][4]=='' && customData[1][5]=='' && customData[1][6]=='' && customData[1][7]=='' && customData[1][8]=='' && customData[1][9]=='' && customData[1][10]=='' && customData[1][11]=='' && customData[1][12]=='' && customData[1][13]=='' && customData[1][14]=='' ? \n    <div style={{'textAlign':'center',padding:'15px 0'}}>(\u65E0\u6570\u636E)</div> : \n    customData ? \n    <div className='LTable'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight'>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(j=='\u7F16\u8F91' ? \n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span className='click-active-darkBlue' onClick={onClick.bind(this,i)}>{customData[i][k]}</span>\n                </div> :\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  var onClick = function onClick(mark, e) {\n    customHandler({\n      data: mark,\n      eventType: 'click'\n    });\n  };\n  return customData && customData[1][0] == '' && customData[1][1] == '' && customData[1][2] == '' && customData[1][3] == '' && customData[1][4] == '' && customData[1][5] == '' && customData[1][6] == '' && customData[1][7] == '' && customData[1][8] == '' && customData[1][9] == '' && customData[1][10] == '' && customData[1][11] == '' && customData[1][12] == '' && customData[1][13] == '' && customData[1][14] == '' ? React.createElement(\n    'div',\n    { style: { 'textAlign': 'center', padding: '15px 0' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : customData ? React.createElement(\n    'div',\n    { className: 'LTable' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight' },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return j == '\u7F16\u8F91' ? React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              { className: 'click-active-darkBlue', onClick: onClick.bind(undefined, i) },\n              customData[i][k]\n            )\n          ) : React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              customData[i][k]\n            )\n          );\n        })\n      );\n    })\n  ) : React.createElement('div', null);\n};";
    },
    getData_control7_DT3eVK: function (elem) {
      /*我的项目1*/if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[3] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent == '任务名称' && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[3].textContent == '项目名称') {
        var elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
          var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style*="display: none;"]').length;$(elem).children('tr').each(function (i) {
            if (i > 0 && i < $(elem).children('tr').length - 1) {
              var arr = [];var tdNnum = $(this).children('td').not('td[style*="display: none;"]').length;var num = count - tdNnum;if (num) {
                $(_arr).each(function (k) {
                  if (k < num) {
                    arr.push(_arr[k]);
                  }
                });$(this).children('td').not('td[style*="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });data.push(arr);
              } else {
                $(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });_arr = arr;data.push(arr);
              }
            }
          });
        }return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl6_Te4gsq: function (data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom + 1;elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');$(elem).children('tr').eq(inx).children('td').each(function (i) {
          if (/填写日报/.test(this.textContent)) {
            ysp.appMain.showLoading();this.querySelector('a').click();
          }
        });
      }
    },
    getTemplate_uiControl6_Te4gsq: function () {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  var onClick=(mark,e)=>{\n    customHandler({\n      data:mark,\n      eventType:'click'\n    })\n  }\n  return(\n    customData && \ncustomData[1][0]=='' && customData[1][1]=='' && customData[1][2]=='' && customData[1][3]=='' && customData[1][4]=='' && customData[1][5]=='' && customData[1][6]=='' && customData[1][7]=='' && customData[1][8]=='' ? \n    <div style={{'textAlign':'center',padding:'15px 0'}}>(\u65E0\u6570\u636E)</div> : \n    customData ? \n    <div className='LTable'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight'>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(j=='\u586B\u5199\u65E5\u62A5' ? \n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span className='click-active-darkBlue' onClick={onClick.bind(this,i)}>{customData[i][k]}</span>\n                </div> :\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  var onClick = function onClick(mark, e) {\n    customHandler({\n      data: mark,\n      eventType: 'click'\n    });\n  };\n  return customData && customData[1][0] == '' && customData[1][1] == '' && customData[1][2] == '' && customData[1][3] == '' && customData[1][4] == '' && customData[1][5] == '' && customData[1][6] == '' && customData[1][7] == '' && customData[1][8] == '' ? React.createElement(\n    'div',\n    { style: { 'textAlign': 'center', padding: '15px 0' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : customData ? React.createElement(\n    'div',\n    { className: 'LTable' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight' },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return j == '\u586B\u5199\u65E5\u62A5' ? React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              { className: 'click-active-darkBlue', onClick: onClick.bind(undefined, i) },\n              customData[i][k]\n            )\n          ) : React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              customData[i][k]\n            )\n          );\n        })\n      );\n    })\n  ) : React.createElement('div', null);\n};";
    },
    getData_control8_QwFpB7: function (elem) {
      if (elem && elem.querySelector('td[class="_mt_cell"]') && /年份筛选/.test(elem.querySelector('td[class="_mt_cell"]').textContent)) {
        var _elem = elem.querySelector('td[class="_mt_cell"]');var data = $(_elem).find('input').eq(0).val();return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl7_JrXpMc: function (data, elem) {
      if (data.eventType == 'setData1') {
        var newData = data.dataCustom;console.log(newData);var _elem = elem.querySelector('td[class="_mt_cell"]');$(_elem).find('input').eq(0).val(newData);_elem.querySelectorAll('input')[0].dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: _elem.ownerDocument.defaultView }));_elem.querySelectorAll('input')[0].dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: _elem.ownerDocument.defaultView }));_elem.querySelectorAll('input')[0].dispatchEvent(new MouseEvent("blur", { bubbles: true, cancelable: true, view: _elem.ownerDocument.defaultView }));
      }
    },
    getTemplate_uiControl7_JrXpMc: function () {
      var selfTemplate = "\nmodule.exports = React.createClass({\n  interiorCustomHandler1:function(time){\n    var handler=this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    })\n  },\n  render: function() {\n    var data=this.props.customData;\n    return ( data || data==''?\n      <div className='dateContainer'>\n        <div>\n          <span>\u5E74\u4EFD\u7B5B\u9009</span>\n          <AMUI.DateTimeInput className='nianfenshaixuan' dateTime={data || \"\u8BF7\u9009\u62E9\"}  format=\"YYYY \" viewMode ='years' minViewMode= 'years' interiorCustomHandler={this.interiorCustomHandler1}  showTimePicker={false} />\n        </div>\n      </div> : <div/>\n    )\n  }\n});\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  interiorCustomHandler1: function interiorCustomHandler1(time) {\n    var handler = this.props.customHandler;\n    handler({\n      eventType: 'setData1',\n      data: time.value\n    });\n  },\n  render: function render() {\n    var data = this.props.customData;\n    return data || data == '' ? React.createElement(\n      'div',\n      { className: 'dateContainer' },\n      React.createElement(\n        'div',\n        null,\n        React.createElement(\n          'span',\n          null,\n          '\\u5E74\\u4EFD\\u7B5B\\u9009'\n        ),\n        React.createElement(AMUI.DateTimeInput, { className: 'nianfenshaixuan', dateTime: data || \"\u8BF7\u9009\u62E9\", format: 'YYYY ', viewMode: 'years', minViewMode: 'years', interiorCustomHandler: this.interiorCustomHandler1, showTimePicker: false })\n      )\n    ) : React.createElement('div', null);\n  }\n});";
    },
    getData_control44_oHx8T8: function (elem) {
      if (elem) {
        return true;
      } else {
        return undefined;
      }
    },
    doAction_uiControl44_IsLVAV: function (data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl44_IsLVAV: function () {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  return (customData ? \n    <div className='saveBtn'>\n      <button className='click-active-darkGreen' onClick={()=>{\n        customHandler({\n          eventType:'click'\n        })\n      }}>\u4FDD\u5B58</button>\n    </div> :\n    <div/>\n  )\n}";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  return customData ? React.createElement(\n    'div',\n    { className: 'saveBtn' },\n    React.createElement(\n      'button',\n      { className: 'click-active-darkGreen', onClick: function onClick() {\n          customHandler({\n            eventType: 'click'\n          });\n        } },\n      '\\u4FDD\\u5B58'\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control81_CGKrPZ: function (elem) {
      /*22423中的主任务分解*/if (elem && elem.querySelectorAll('iframe')[0] && elem.querySelectorAll('iframe')[0].contentWindow && elem.querySelectorAll('iframe')[0].contentWindow.document && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody') && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0] && elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0].textContent == '客户属性') {
        elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');if (elem) {
          var data = [];var _arr = [];var count = $(elem).children('tr').eq(2).children('td').not('td[style="display: none;"]').length;$(elem).children('tr').each(function (i) {
            if (i > 1 && i < $(elem).children('tr').length - 2) {
              var arr = [];var tdNnum = $(this).children('td').not('td[style="display: none;"]').length;var num = count - tdNnum;if (num) {
                $(_arr).each(function (k) {
                  if (k < num) {
                    arr.push(_arr[k]);
                  }
                });$(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });data.push(arr);_arr = arr;
              } else {
                $(this).children('td').not('td[style="display: none;"]').each(function (j) {
                  arr.push($(this).text());
                });_arr = arr;data.push(arr);
              }
            }
          });$(data).each(function (i) {
            this.shift();this.shift();var box = '';box = this[0];this[0] = this[1];this[1] = box;var box = '';box = this[1];this[1] = this[4];this[4] = box;var box = '';box = this[3];this[3] = this[4];this[4] = box;
          });return data;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
    doAction_uiControl1_O5LQAG: function (data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom - 1 + 3;elem = elem.querySelectorAll('iframe')[0].contentWindow.document.querySelector('table').querySelector('tbody');$(elem).children('tr').eq(inx).children('td').each(function (i) {
          if (/编辑|分解/.test(this.textContent)) {
            ysp.appMain.showLoading();this.querySelector('a').click();
          }
        });
      }
    },
    getTemplate_uiControl1_O5LQAG: function () {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onToggle=(e)=>{\n    e.target.parentElement.className=='minHeight' ? \n    e.target.parentElement.className='maxHeight' : \n    e.target.parentElement.className='minHeight'; \n  }\n  var onClick=(mark,e)=>{\n    customHandler({\n      data:mark,\n      eventType:'click'\n    })\n  }\n  return(\ncustomData && \ncustomData[1][0]=='' && customData[1][1]=='' && customData[1][2]=='' && customData[1][3]=='' && customData[1][4]=='' && customData[1][5]=='' && customData[1][6]=='' && customData[1][7]=='' && customData[1][8]=='' && customData[1][9]=='' && customData[1][10]=='' ? \n    <div style={{'textAlign':'center',padding:'15px 0'}}>(\u65E0\u6570\u636E)</div> : \n    customData ? \n    <div className='LTable'>\n      {customData.map((item,i)=>{\n        return( i>0 && \n          <div className='minHeight'>\n            <p onClick={onToggle.bind(this)}></p>\n            {item.map((j,k)=>{\n              return(j=='\u7F16\u8F91' || j=='\u5206\u89E3' ? \n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span className='click-active-darkBlue' onClick={onClick.bind(this,i)}>{customData[i][k]}</span>\n                </div> :\n                <div>\n                  <span>{customData[0][k]}\uFF1A</span>\n                  <span>{customData[i][k]}</span>\n                </div>\n              )\n            })}\n          </div>\n        )       \n      })}\n    </div> : \n    <div/>\n  )\n}\n\n\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onToggle = function onToggle(e) {\n    e.target.parentElement.className == 'minHeight' ? e.target.parentElement.className = 'maxHeight' : e.target.parentElement.className = 'minHeight';\n  };\n  var onClick = function onClick(mark, e) {\n    customHandler({\n      data: mark,\n      eventType: 'click'\n    });\n  };\n  return customData && customData[1][0] == '' && customData[1][1] == '' && customData[1][2] == '' && customData[1][3] == '' && customData[1][4] == '' && customData[1][5] == '' && customData[1][6] == '' && customData[1][7] == '' && customData[1][8] == '' && customData[1][9] == '' && customData[1][10] == '' ? React.createElement(\n    'div',\n    { style: { 'textAlign': 'center', padding: '15px 0' } },\n    '(\\u65E0\\u6570\\u636E)'\n  ) : customData ? React.createElement(\n    'div',\n    { className: 'LTable' },\n    customData.map(function (item, i) {\n      return i > 0 && React.createElement(\n        'div',\n        { className: 'minHeight' },\n        React.createElement('p', { onClick: onToggle.bind(undefined) }),\n        item.map(function (j, k) {\n          return j == '\u7F16\u8F91' || j == '\u5206\u89E3' ? React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              { className: 'click-active-darkBlue', onClick: onClick.bind(undefined, i) },\n              customData[i][k]\n            )\n          ) : React.createElement(\n            'div',\n            null,\n            React.createElement(\n              'span',\n              null,\n              customData[0][k],\n              '\\uFF1A'\n            ),\n            React.createElement(\n              'span',\n              null,\n              customData[i][k]\n            )\n          );\n        })\n      );\n    })\n  ) : React.createElement('div', null);\n};";
    }
  }, "index");
})(window, ysp);