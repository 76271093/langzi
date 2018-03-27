"use strict";

(function (win, ysp) {
  ysp.runtime.Model.extendLoadingModel({
    getData_control18_4ZnCkb: function getData_control18_4ZnCkb(elem) {
      return elem.value;
    },
    doAction_uiControl21_0V0i9v: function doAction_uiControl21_0V0i9v(data, elem) {},
    getTemplate_uiControl21_0V0i9v: function getTemplate_uiControl21_0V0i9v() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    var data=this.props.customData;\n    return (\n      <div>\n        {data}\n      </div>\n    )\n  }\n});";
      return "\"use strict\";\n\nmodule.exports = React.createClass({\n  displayName: \"exports\",\n\n  render: function render() {\n    var data = this.props.customData;\n    return React.createElement(\n      \"div\",\n      null,\n      data\n    );\n  }\n});";
    },
    getData_control19_GmJxGo: function getData_control19_GmJxGo(elem) {},
    doAction_uiControl18_kVV753: function doAction_uiControl18_kVV753(data, elem) {
      if (data.eventType == 'click') {
        elem.click();
      }
    },
    getTemplate_uiControl18_kVV753: function getTemplate_uiControl18_kVV753() {
      var selfTemplate = "module.exports = React.createClass({\n  render: function() {\n    return (\n      <div className='saveBtn'>\n        <button onClick={()=>{\n          var handler=this.props.customHandler;\n          handler({\n            eventType:'click'\n          })\n        }}>\u786E\u5B9A</button>\n      </div>\n    )\n  }\n});\n";
      return "'use strict';\n\nmodule.exports = React.createClass({\n  displayName: 'exports',\n\n  render: function render() {\n    var _this = this;\n\n    return React.createElement(\n      'div',\n      { className: 'saveBtn' },\n      React.createElement(\n        'button',\n        { onClick: function onClick() {\n            var handler = _this.props.customHandler;\n            handler({\n              eventType: 'click'\n            });\n          } },\n        '\\u786E\\u5B9A'\n      )\n    );\n  }\n});";
    }
  }, "tipPage");
})(window, ysp);