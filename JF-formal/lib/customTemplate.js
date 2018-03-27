(function (win, ysp) {

  var utils = ysp.utils;
  ysp.customTemplateHelper = {};
  utils.extend(ysp.customTemplateHelper, {
    HeaderCustom: function () {
      var selfTemplate = "// HeaderCustom customTemplate \nimport { back } from 'appRenderer';\n\nvar HeaderCustom = React.createClass({\n\trender(){\n  \treturn(\n    \t<header className=\"navbar navbar-primary header\" style={{background:\"#002755\"}}>\n        <h2 className=\"navbar-title navbar-center\">{this.props.title}</h2>\n        <div className=\"navbar-nav navbar-left\">\n          <a onClick={back} className=\"navbar-nav-item\">\n            <span className=\"navbar-nav-title\">\u8FD4\u56DE</span>\n            <span className=\"icon icon-left-nav navbar-icon\"></span>\n          </a>\n        </div>\n      </header>\n    )\n  }\n})\n\nmodule.exports = HeaderCustom;";
      return "\"use strict\";\n\nvar _appRenderer = require(\"appRenderer\");\n\nvar HeaderCustom = React.createClass({\n  displayName: \"HeaderCustom\",\n  render: function render() {\n    return React.createElement(\n      \"header\",\n      { className: \"navbar navbar-primary header\", style: { background: \"#002755\" } },\n      React.createElement(\n        \"h2\",\n        { className: \"navbar-title navbar-center\" },\n        this.props.title\n      ),\n      React.createElement(\n        \"div\",\n        { className: \"navbar-nav navbar-left\" },\n        React.createElement(\n          \"a\",\n          { onClick: _appRenderer.back, className: \"navbar-nav-item\" },\n          React.createElement(\n            \"span\",\n            { className: \"navbar-nav-title\" },\n            \"\\u8FD4\\u56DE\"\n          ),\n          React.createElement(\"span\", { className: \"icon icon-left-nav navbar-icon\" })\n        )\n      )\n    );\n  }\n}); // HeaderCustom customTemplate \n\n\nmodule.exports = HeaderCustom;";
    }
  });
})(window, ysp);