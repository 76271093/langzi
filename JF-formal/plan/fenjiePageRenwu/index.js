"use strict";

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control59_AuQ2en: function getData_control59_AuQ2en(elem) {},
    doAction_uiControl61_waArnV: function doAction_uiControl61_waArnV(data, elem) {},
    getTemplate_uiControl61_waArnV: function getTemplate_uiControl61_waArnV() {
      var selfTemplate = "export default ({customHandler})=>{\n  return(\n    <header className=\"navbar navbar-primary header\" style={{background:\"#002755\"}}>\n      <h2 className=\"navbar-title navbar-center\">\u8BBE\u7F6E\u9009\u4E2D\u503C</h2>\n\n    </header>\n  )\n}\n";
      return "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customHandler = _ref.customHandler;\n\n  return React.createElement(\n    \"header\",\n    { className: \"navbar navbar-primary header\", style: { background: \"#002755\" } },\n    React.createElement(\n      \"h2\",\n      { className: \"navbar-title navbar-center\" },\n      \"\\u8BBE\\u7F6E\\u9009\\u4E2D\\u503C\"\n    )\n  );\n};";
    },
    getData_control60_aVo73F: function getData_control60_aVo73F(elem) {
      if (elem) {
        var data = [];$(elem).children('div').each(function (i) {
          data.push($(this).children('span').eq(1).attr('class'));
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl62_Tk4wTC: function doAction_uiControl62_Tk4wTC(data, elem) {
      if (data.eventType == 'click') {
        var inx = data.dataCustom;elem.querySelectorAll('div')[inx].querySelectorAll('span')[1].click();
      }
    },
    getTemplate_uiControl62_Tk4wTC: function getTemplate_uiControl62_Tk4wTC() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var onClick=(mark,e)=>{\n    customHandler({\n      eventType:'click',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='beixuanSousuo'>\n      <div className={customData[0]=='tab-btn-selected-middle-ct' ? 'beixuanSousuoActive' : ''} onClick={onClick.bind(this,0)}>\n        <span>\u5907\u9009</span>\n      </div>\n      <div className={customData[1]=='tab-btn-selected-middle-ct' ? 'beixuanSousuoActive' : ''} onClick={onClick.bind(this,1)}>\n        <span>\u641C\u7D22</span>\n      </div>\n    </div> : <div/>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(mark, e) {\n    customHandler({\n      eventType: 'click',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'beixuanSousuo' },\n    React.createElement(\n      'div',\n      { className: customData[0] == 'tab-btn-selected-middle-ct' ? 'beixuanSousuoActive' : '', onClick: onClick.bind(undefined, 0) },\n      React.createElement(\n        'span',\n        null,\n        '\\u5907\\u9009'\n      )\n    ),\n    React.createElement(\n      'div',\n      { className: customData[1] == 'tab-btn-selected-middle-ct' ? 'beixuanSousuoActive' : '', onClick: onClick.bind(undefined, 1) },\n      React.createElement(\n        'span',\n        null,\n        '\\u641C\\u7D22'\n      )\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control61_HhAImt: function getData_control61_HhAImt(elem) {
      if (elem) {
        var data = [];$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').each(function (i) {
          data.push($(this).text());
        });return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl63_hf3ZDC: function doAction_uiControl63_hf3ZDC(data, elem) {
      if (data.eventType == 'dblclick') {
        var inx = data.customData;$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').eq(inx).children('span')[0].click();$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').eq(inx).children('span')[0].dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true, view: window }));
      }
    },
    getTemplate_uiControl63_hf3ZDC: function getTemplate_uiControl63_hf3ZDC() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var dblclick=(mark,e)=>{\n    customHandler({\n      eventType:'dblclick',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='fenjiexuanren'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            <li onClick={dblclick.bind(this,i)}>{item}</li>\n          )\n        })}\n      </ul>\n    </div> : \n    <div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var dblclick = function dblclick(mark, e) {\n    customHandler({\n      eventType: 'dblclick',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'fenjiexuanren' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return React.createElement(\n          'li',\n          { onClick: dblclick.bind(undefined, i) },\n          item\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control62_1lXGQ0: function getData_control62_1lXGQ0(elem) {
      if (elem) {
        var data = elem.querySelector('div[class="Listview_panel"]') && elem.querySelector('div[class="Listview_panel"]').querySelector('div[class="Listview_item"]') && elem.querySelector('div[class="Listview_panel"]').querySelector('div[class="Listview_item"]').querySelector('span') && elem.querySelector('div[class="Listview_panel"]').querySelector('div[class="Listview_item"]').querySelector('span').textContent || '';return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl64_G7iKk6: function doAction_uiControl64_G7iKk6(data, elem) {
      if (data.eventType == 'click') {
        elem.querySelector('div[class="Listview_panel"]').querySelector('div[class="Listview_item"]').querySelector('span').click();elem.querySelector('div[class="Listview_panel"]').querySelector('div').querySelector('span').dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true, view: window }));
      }
    },
    getTemplate_uiControl64_G7iKk6: function getTemplate_uiControl64_G7iKk6() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:'click',\n      data:0\n    })\n  }\n  return(customData? \n    <div className='beixuanSousuoyixuan'>\n      <span>{customData}</span>\n      <span onClick={onClick.bind(this)}>&times;</span>\n    </div> : \n    <div className='beixuanSousuoyixuan'></div>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: 'click',\n      data: 0\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'beixuanSousuoyixuan' },\n    React.createElement(\n      'span',\n      null,\n      customData\n    ),\n    React.createElement(\n      'span',\n      { onClick: onClick.bind(undefined) },\n      '\\xD7'\n    )\n  ) : React.createElement('div', { className: 'beixuanSousuoyixuan' });\n};";
    },
    getData_control56_riAWMd: function getData_control56_riAWMd(elem) {
      if (elem && elem.querySelector('input')) {
        return elem.querySelector('input').value;
      } else {
        return undefined;
      }
    },
    doAction_uiControl58_0SIoAP: function doAction_uiControl58_0SIoAP(data, elem) {
      if (data.eventType == 'click') {
        elem.querySelectorAll('input')[1].click();
      } else if (data.eventType == 'blur') {
        var val = data.dataCustom;elem.querySelectorAll('input')[0].value = val;
      }
    },
    getTemplate_uiControl58_0SIoAP: function getTemplate_uiControl58_0SIoAP() {
      var selfTemplate = "export default({customData,customHandler})=>{\n  var onClick=(e)=>{\n    customHandler({\n      eventType:'click',\n      data:1\n    })\n  }\n  var onBlur=(e)=>{\n    customHandler({\n      eventType:'blur',\n      data:e.target.value\n    })\n  }  \n  return(customData || customData=='' ?\n    <div className='fenjiesousuo'>\n      <div>\n        <AInput \n          placeHolder='\u8BF7\u8F93\u5165\u5173\u952E\u5B57'\n          value={customData}\n          onBlur={onBlur.bind(this)}/>\n        <span onClick={onClick.bind(this)}></span>\n      </div>\n    </div> : <div></div>\n  )\n}\n\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var onClick = function onClick(e) {\n    customHandler({\n      eventType: 'click',\n      data: 1\n    });\n  };\n  var onBlur = function onBlur(e) {\n    customHandler({\n      eventType: 'blur',\n      data: e.target.value\n    });\n  };\n  return customData || customData == '' ? React.createElement(\n    'div',\n    { className: 'fenjiesousuo' },\n    React.createElement(\n      'div',\n      null,\n      React.createElement(AInput, {\n        placeHolder: '\\u8BF7\\u8F93\\u5165\\u5173\\u952E\\u5B57',\n        value: customData,\n        onBlur: onBlur.bind(undefined) }),\n      React.createElement('span', { onClick: onClick.bind(undefined) })\n    )\n  ) : React.createElement('div', null);\n};";
    },
    getData_control67_MvZDG9: function getData_control67_MvZDG9(elem) {
      console.log(1111111111, elem);if (elem) {
        console.log('能进来');var data = [];$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').each(function (i) {
          data.push($(this).text());
        });console.log(data);return data;
      } else {
        return undefined;
      }
    },
    doAction_uiControl71_HSnSq7: function doAction_uiControl71_HSnSq7(data, elem) {
      if (data.eventType == 'dblclick') {
        var inx = data.customData;$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').eq(inx).children('span')[0].click();$(elem).find('div[class="Listview_panel"]').children('div[class="Listview_item"]').eq(inx).children('span')[0].dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true, view: window }));
      }
    },
    getTemplate_uiControl71_HSnSq7: function getTemplate_uiControl71_HSnSq7() {
      var selfTemplate = "export default ({customData,customHandler})=>{\n  var dblclick=(mark,e)=>{\n    customHandler({\n      eventType:'dblclick',\n      data:mark\n    })\n  }\n  return(customData ? \n    <div className='fenjiexuanrenyixuan'>\n      <ul>\n        {customData.map((item,i)=>{\n          return(\n            <li onClick={dblclick.bind(this,i)}>{item}</li>\n          )\n        })}\n      </ul>\n    </div> : \n    <div/>\n  )\n}\n";
      return "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (_ref) {\n  var customData = _ref.customData,\n      customHandler = _ref.customHandler;\n\n  var dblclick = function dblclick(mark, e) {\n    customHandler({\n      eventType: 'dblclick',\n      data: mark\n    });\n  };\n  return customData ? React.createElement(\n    'div',\n    { className: 'fenjiexuanrenyixuan' },\n    React.createElement(\n      'ul',\n      null,\n      customData.map(function (item, i) {\n        return React.createElement(\n          'li',\n          { onClick: dblclick.bind(undefined, i) },\n          item\n        );\n      })\n    )\n  ) : React.createElement('div', null);\n};";
    }
  }, "fenjiePageRenwu");
})(window, ysp);