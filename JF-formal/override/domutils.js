var lang = {
    extend: function(subclass, superclass) {
        superclass = processSuperclass(superclass);
        var f = function() {};
        f.prototype = superclass.prototype;
        subclass.prototype = new f();
        subclass.prototype.constructor = subclass;
        subclass.superclass = superclass.prototype;
        if (superclass.prototype.constructor == Object.prototype.constructor) {
            superclass.prototype.constructor = superclass;
        }
    },
    patch: function(subclass, superclass) {
        this.extend(subclass, superclass);
        if (!superclass.patchedSubClasses) superclass.patchedSubClasses = new Array();
        superclass.patchedSubClasses.push(subclass);
    },
    parseJSON: function(jsonString) {
        return eval ? eval('(' + jsonString + ')') : {};
    },
    toJSONString: function(obj) {
        var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        var s = {
            array: function(x) {
                var a = ['['],
                b,
                f,
                i,
                l = x.length,
                v;
                if (l == 0) {
                    var isNull = true;
                    for (var i in x) {
                        if ('function' == typeof x[i]) {
                            continue;
                        }
                        if (i == "remove" || i == "indexOf") {
                            delete x[i];
                            continue;
                        }
                        if (x.toJSON) return x.toJSON();
                        isNull = false;
                        break;
                    }
                    if (!isNull) {
                        var a = ['{'],
                        b,
                        f,
                        i,
                        v;
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = '}';
                        return a.join('');
                    }
                } else {
                    for (i = 0; i < l; i += 1) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a[a.length] = v;
                                b = true;
                            }
                        }
                    }
                }
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function(x) {
                return String(x);
            },
            'null': function(x) {
                return "null";
            },
            number: function(x) {
                return isFinite(x) ? String(x) : 'null';
            },
            object: function(x) {
                if (x) {
                    if (Object.prototype.toString.call(x) === "[object Array]") {
                        return s.array(x);
                    }
                    var a = ['{'],
                    b,
                    f,
                    i,
                    v;
                    for (i in x) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a.push(s.string(i), ':', v);
                                b = true;
                            }
                        }
                    }
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            string: function(x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g,
                    function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            }
        };
        return s[typeof obj](obj);
    }
};
var processSuperclass = function(superclass) {
    if ("string" == typeof superclass) {
        superclass = jsloader.resolve(superclass);
    } else {;
    }
    return superclass;
}; ! @#$ % ^&*() var domutils = {
    XHR_UNINITIALIZED: 0,
    XHR_OPEN: 1,
    XHR_SENT: 2,
    XHR_RECEIVING: 3,
    XHR_LOADED: 4,
    id_counter: 0,
    isBoxModel: document.compatMode === 'CSS1Compat',
    DOM_DATA: {
        expando: '_bof_data_' + (new Date().getTime()),
        dataCache: {},
        winDataCache: {},
        noData: {
            EMBED: 1,
            OBJECT: 1,
            APPLET: 1
        },
        gid: 0,
        guid: function(pre) {
            var id = (this.gid++) + '';
            return pre ? pre + id: id;
        }
    },
    data: function(elem, name, data) {
        try {
            var b = elem && elem.nodeName;
        } catch(e) {
            return;
        }
        if (!elem || this.DOM_DATA.noData[elem.nodeName]) return;
        if (name && Object.prototype.toString.call(name) === '[object Object]' && !name['nodeType'] && !name['setInterval']) {
            for (var k in name) {
                this.data(elem, k, name[k]);
            }
            return;
        }
        var expando = this.DOM_DATA.expando;
        if (elem == window) elem = this.DOM_DATA.winDataCache;
        var isNode = elem && elem.nodeType;
        var cache = isNode ? this.DOM_DATA.dataCache: elem;
        if (data === undefined) {
            var key = isNode ? elem[expando] : expando;
            var thisCache = cache[key];
            if ((Object.prototype.toString.call(name) === '[object String]') && thisCache) {
                return thisCache[name];
            }
            return thisCache;
        } else {
            var key;
            if (!isNode) {
                key = expando;
            } else if (! (key = elem[expando])) {
                key = elem[expando] = this.DOM_DATA.guid();
            }
            if (name && data !== undefined) {
                if (!cache[key]) cache[key] = {};
                cache[key][name] = data;
            }
        }
    },
    removeData: function(elem, name) {
        try {
            var b = elem && elem.nodeName;
        } catch(e) {
            return;
        }
        if (!elem) return;
        if (elem == window) elem = this.DOM_DATA.winDataCache;
        var expando = this.DOM_DATA.expando;
        var isNode = elem && elem.nodeType;
        var cache = isNode ? this.DOM_DATA.dataCache: elem;
        var key = isNode ? elem[expando] : expando;
        if (!key) return;
        var thisCache = cache[key];
        if (name) {
            if (thisCache) {
                delete thisCache[name];
                var isEmpty = true;
                for (var p in thisCache) {
                    isEmpty = false;
                    break;
                }
                if (isEmpty) {
                    this.removeData(elem);
                }
            }
        } else {
            if (!isNode) {
                try {
                    delete elem[expando];
                } catch(ex) {}
            } else if (elem.removeAttribute) {
                elem.removeAttribute(expando);
            }
            if (isNode) {
                delete cache[key];
            }
        }
    },
    destroyNode: function(child, tmpRemoveChild) {
        try {
            var b = child && child.nodeName;
        } catch(e) {
            return;
        }
        if (!child) {
            return;
        }
        if (tmpRemoveChild) {
            try {
                child.parentNode.removeChild(child);
            } catch(e) {}
            return;
        }
        if (child.nodeType == 3) {
            this.removeNode(child);
        } else if (child.tagName == "TBODY") {
            child.parentNode.removeChild(child);
        } else if (child.tagName == "TABLE") {
            var garbageBin = document.getElementById('IELeakGarbageBin');
            if (!garbageBin) {
                garbageBin = document.createElement('DIV');
                garbageBin.id = 'IELeakGarbageBin';
                garbageBin.style.display = 'none';
                document.body.appendChild(garbageBin);
            }
            garbageBin.appendChild(child);
            garbageBin.innerHTML = '';
        } else if (child.tagName == "TR") {
            var td = child.firstChild;
            while (td) {
                var tmpTd = td.nextSibling;
                td.innerHTML = "";
                this.removeNode(td);
                td = tmpTd;
            }
            this.removeNode(child);
        } else {
            try {
                child.innerHTML = "";
            } catch(e) {}
            this.removeNode(child);
        }
    },
    removeNode: function(node, removeChildren) {
        if (!node) return;
        if (node.removeNode) node.removeNode(removeChildren);
        else if (node.parentNode && node.parentNode.removeChild) node.parentNode.removeChild(node);
    },
    setValueAsAttr: function(panelNode) {
        var elems = panelNode.getElementsByTagName('INPUT');
        for (var i = 0,
        len = elems.length; i < len; i++) {
            var elem = elems[i];
            if (elem.type != 'text') {
                continue;
            }
            elem.setAttribute('value', elem.value);
        }
    },
    doGet: function(url, notUseGBKJSP) {
        var key = 'urlcache',
        cache = registry.get(key);
        var boflog = jsloader.resolve('freequery.control.logger');
        var enableLocalStorage = window._enable_localStorage && typeof sessionStorage != 'undefined' && typeof localStorage != 'undefined';
        try {
            boflog.log('doGet: ' + url);
        } catch(ex) {
            if (window.console != undefined) {
                window.console.log(ex && ex.message);
            }
        }
        if (enableLocalStorage) {
            var localStorageFile;
            if (!notUseGBKJSP && jsloader.getLang()) {
                localStorageFile = localStorage.getItem(jsloader.getLang() + "&" + url);
            } else {
                localStorageFile = localStorage.getItem(url);
            }
            if (localStorageFile) {
                return localStorageFile;
            }
        }
        if (!cache) {
            cache = {};
            registry.put(key, cache);
        }
        if (cache[url]) {
            return cache[url];
        }
        var xhr = jsloader.getXHR(),
        sUrl = notUseGBKJSP ? url: ('gbk.jsp?name=vision/' + url);
        if (!notUseGBKJSP && jsloader.getLang()) {
            sUrl += "&l=" + jsloader.getLang();
        }
        try {
            try {
                boflog.profile('doGet');
            } catch(ex) {
                if (window.console != undefined) {
                    window.console.log(ex && ex.message);
                }
            }
            xhr.open('GET', sUrl, false);
            xhr.send('');
            var txt = (cache[url] = xhr.responseText);
            if (enableLocalStorage) {
                if (!notUseGBKJSP && jsloader.getLang()) {
                    try {
                        localStorage.setItem(jsloader.getLang() + "&" + url, txt);
                    } catch(e) {}
                } else {
                    try {
                        localStorage.setItem(url, txt);
                    } catch(e) {}
                }
            }
            try {
                boflog.profile('doGet');
            } catch(ex) {
                if (window.console != undefined) {
                    window.console.log(ex && ex.message);
                }
            }
            return txt;
        } catch(ex) {
            throw new Error(ex.message + ': ' + url);
        }
    },
    doPost: function(url, data, callback, errorHandler, scope, headers) {
        var xhr = jsloader.getXHR(),
        isAsync = !!callback;
        var boflog = jsloader.resolve('freequery.control.logger');
        var label = 'doPost' + (isAsync ? '_' + (new Date().getTime()) : '') + '_' + url;
        try {
            boflog.profile(label);
        } catch(ex) {
            if (window.console != undefined) {
                window.console.log(ex && ex.message);
            }
        }
        if (isAsync) {
            xhr.onreadystatechange = function() {
                if (!xhr || domutils.XHR_LOADED != xhr.readyState) {
                    return;
                }
                try {
                    boflog.profile(label);
                } catch(ex) {
                    if (window.console != undefined) {
                        window.console.log(ex && ex.message);
                    }
                }
                if (xhr.status != 200) {
                    if (errorHandler) {
                        errorHandler.call(scope, xhr);
                    }
                } else {
                    var ret = xhr.responseText;
                    xhr.abort();
                    callback.call(scope, ret);
                }
                xhr = null;
            };
        }
        var fullURL = (jsloader.baseURL ? jsloader.baseURL: '') + url,
        times = 5;
        for (; (times--);) {
            try {
                xhr.open('POST', fullURL, isAsync);
                xhr.setRequestHeader('If-Modified-Since', '0');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                try {
                    if (headers) {
                        for (var i in headers) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                    }
                } catch(err) {}
                xhr.send(data || '');
                if (isAsync) {
                    return;
                } else if (xhr.status == 200) {
                    try {
                        boflog.profile(label);
                    } catch(ex) {
                        if (window.console != undefined) {
                            window.console.log(ex && ex.message);
                        }
                    }
                    return xhr.responseText;
                }
            } catch(e) {
                if (!times) {
                    throw new Error(e.message + ': ' + url);
                }
            }
        }
    },
    getBrowserType: function() {
        return this.Browser.name;
    },
    getBrowserVersion: function() {
        return this.Browser.version;
    },
    isFirefox: function() {
        return this.Browser.firefox === true;
    },
    isIE: function() {
        return this.Browser.ie === true;
    },
    isIE6: function() {
        return this.Browser.ie6 === true;
    },
    isIE11: function() {
        return navigator.userAgent.toLowerCase().indexOf("trident/7.0") >= 0;
    },
    isEdge: function() {
        return this.Browser.edge === true;
    },
    isChrome: function() {
        return this.Browser.chrome === true;
    },
    isQQBrowser: function() {
        return this.Browser.qqBrowser === true;
    },
    isSafari: function() {
        return this.Browser.safari === true;
    },
    isOpera: function() {
        return this.Browser.opera === true;
    },
    isIE7: function() {
        return this.Browser.ie7 === true;
    },
    isIOS: function() {
        // return this.Browser.Platform.ios;
        return false;
    },
    isAndroid: function() {
        return false;
        // return this.Browser.Platform.android;
    },
    isAndroidApp: function() {
        return this.Browser.Platform.androidApp;
    },
    isZhCN: function() {
        return /\bzh\-/.test(this.Browser.Lang);
    },
    isMobile: function() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent == null) {
            userAgent = "mobile";
        }
        var isIPad = userAgent.indexOf("ipad") > -1;
        var isIPhone = userAgent.indexOf("iphone") > -1;
        var isIPod = userAgent.indexOf("ipod") > -1;
        var isSymbianos = userAgent.indexOf("symbianos") > -1;
        var isAndroid = userAgent.indexOf("android") > -1;
        var isWebos = userAgent.indexOf("webos") > -1;
        var isSymbianos = userAgent.indexOf("symbianos") > -1;
        var isWP = userAgent.indexOf("Windows Phone") > -1;
        if (isIPad || isIPhone || isIPod || isSymbianos || isAndroid || isWebos || isSymbianos || isWP || userAgent.indexOf("mobile") > -1) {
            return true;
        } else {
            return false;
        }
    },
    trim: function(src) {
        if (src && (typeof src == 'string')) return src.replace(/^\s+|\s+$/g, "");
        else return src;
    },
    removeWhiteSpace: function(dom) {
        var child = dom.firstChild;
        while (child) {
            if (child.nodeType == 3) {
                if (this.trim(child.nodeValue).length == 0) {
                    var tmp = child.nextSibling;
                    child.parentNode.removeChild(child);
                    child = tmp;
                } else child = child.nextSibling;
            } else {
                this.removeWhiteSpace(child);
                child = child.nextSibling;
            }
        }
    },
    createDom: function() {
        var dom;
        if (this.isIE() && this.Browser.version < 11 || typeof DOMParser == "undefined") {
            dom = new ActiveXObject("microsoft.XMLDOM");
        } else {
            dom = new DOMParser().parseFromString("<A/>", "text/xml");
        }
        return dom;
    },
    parseXML: function(xmlStr) {
        var result;
        if (this.isIE() && this.Browser.version < 11 || typeof DOMParser == "undefined") {
            if (this.xmldom) {
                result = this.xmldom;
            } else {
                result = new ActiveXObject("Microsoft.XMLDOM");
                this.xmldom = result;
            }
            result.loadXML(xmlStr);
        } else if (this.isAndroid()) {
            var parser = new DOMParser();
            var tempStr = xmlStr.replace(" encoding=\"GBK\"", " encoding=\"utf-8\"");
            result = parser.parseFromString(tempStr, "text/xml");
        } else {
            var parser = new DOMParser();
            result = parser.parseFromString(xmlStr, "text/xml");
        }
        return result;
    },
    nodeToString: function(node) {
        var result;
        if (this.isIE() && this.Browser.version < 11) {
            result = "<?xml version=\"1.0\" encoding=\"GBK\"?>" + node.xml;
        } else {
            var xmlserial = new XMLSerializer();
            result = xmlserial.serializeToString(node);
        }
        return result;
    },
    getXmlNodeChildren: function(parentXmlNode, childNodeNames) {
        var result = [],
        names = (childNodeNames || '*').toLowerCase();
        var tags = names.split(','),
        len = tags.length,
        isAll = names === '*';
        if (parentXmlNode) {
            var node = parentXmlNode.firstChild,
            nodeName, i;
            while (node) {
                if (isAll) {
                    result.push(node);
                } else {
                    nodeName = node.nodeName.toLowerCase();
                    if (len == 1) {
                        if (nodeName === names) {
                            result.push(node);
                        }
                    } else {
                        for (i = 0; i < len; i++) {
                            if (nodeName === tags[i]) {
                                result.push(node);
                                break;
                            }
                        }
                    }
                }
                node = node.nextSibling;
            }
        }
        return result;
    },
    getNodeAtrributeValueByName: function(node, name) {
        var attributes = node.attributes;
        for (var i = 0; i < attributes.length; i++) {
            if (attributes.item(i).nodeName.toUpperCase() == name) {
                return attributes.item(i);
            }
        }
    },
    getValueByAttributeName: function(node, attrName) {
        var attributes = node.attributes;
        for (var i = 0; i < attributes.length; i++) {
            if (attributes.item(i).nodeName.toUpperCase() == attrName.toUpperCase()) {
                return attributes.item(i).nodeValue;
            }
        }
    },
    isLeftButton: function(button) {
        if (this.isIE()) return (button == 1 || button == 0);
        else return button == 0;
    },
    isRightButton: function(button) {
        if (this.isIE() && this.Browser.version < 11) return button == 2;
        else return button == 2;
    },
    findAncElementByClassName: function(baseElements, className, maxDepth) {
        if (! (baseElements instanceof Array)) baseElements = [baseElements];
        if (0 === baseElements.length) return null;
        var re = new RegExp("( |\t|^)" + className + "( |\t|$)");
        var nextBaseElements = [];
        for (var i = 0; i < baseElements.length; i++) {
            var baseElement = baseElements[i];
            if (!baseElement.tagName) continue;
            if (re.test(baseElement.className)) return baseElement;
            if (baseElement.parentNode) nextBaseElements.push(baseElement.parentNode);
        }
        if ("undefined" === typeof maxDepth) return this.findAncElementByClassName(nextBaseElements, className);
        else if (maxDepth > 0) return this.findAncElementByClassName(nextBaseElements, className, maxDepth - 1);
        else return null;
    },
    findElementByClassName: function(baseElements, className, maxDepth) {
        if (! (baseElements instanceof Array)) baseElements = [baseElements];
        if (0 === baseElements.length) return null;
        var re = new RegExp("( |\t|^)" + className + "( |\t|$)");
        var nextBaseElements = [];
        for (var i = 0; i < baseElements.length; i++) {
            var baseElement = baseElements[i];
            if (!baseElement.tagName) continue;
            if (re.test(baseElement.className)) return baseElement;
            var nodes = baseElement.childNodes.length;
            var tmpNode = baseElement.childNodes[0];
            for (var j = 0; j < nodes; j++) {
                nextBaseElements.push(tmpNode);
                tmpNode = tmpNode.nextSibling;
                if (!tmpNode && j + 1 < nodes) tmpNode = baseElement.childNodes[j + 1];
            }
        }
        if ("undefined" === typeof maxDepth) return this.findElementByClassName(nextBaseElements, className);
        else if (maxDepth > 0) return this.findElementByClassName(nextBaseElements, className, maxDepth - 1);
        else return null;
    },
    getElementByClassName: function(clzName, rootNode, tag) {
        return this.getElementsByClassName(clzName, rootNode, tag)[0];
    },
    getElementsByClassName: document.getElementsByClassName ?
    function(clzName, rootNode, tag) {
        var ret = [],
        nodes = (rootNode || document).getElementsByClassName(clzName),
        i = 0,
        node;
        tag = tag ? tag.toUpperCase() : '*';
        for (; node = nodes[i++];) {
            if (tag === '*' || node.tagName === tag) {
                ret.push(node);
            }
        }
        return ret;
    }: function(clzName, rootNode, tag) {
        var ret = [],
        names = clzName.split(/[ ]+/),
        len = names.length,
        i = len;
        var nodes = (rootNode || document).getElementsByTagName(tag || '*'),
        j = 0;
        var patterns = [],
        node,
        nodeClz,
        match,
        k;
        while (--i > -1) {
            patterns.push(new RegExp('(^|\\s)' + names[i] + '(\\s|$)'));
        }
        for (; node = nodes[j++];) {
            match = false;
            nodeClz = node.className;
            for (k = 0; k < len; k++) {
                if (! (match = patterns[k].test(nodeClz))) {
                    break;
                }
            }
            if (match) {
                ret.push(node);
            }
        }
        return ret;
    },
    findElementByBofid: function(baseElements, targetBofid, maxDepth) {
        if (! (baseElements instanceof Array)) baseElements = [baseElements];
        if (0 === baseElements.length) return null;
        var nextBaseElements = [];
        for (var i = 0; i < baseElements.length; i++) {
            var baseElement = baseElements[i];
            if (!baseElement.tagName) continue;
            var bofid = baseElement.getAttribute("bofid");
            if (bofid == targetBofid) return baseElement;
            var nodes = baseElement.childNodes.length;
            var tmpNode = baseElement.childNodes[0];
            for (var j = 0; j < nodes; j++) {
                nextBaseElements.push(tmpNode);
                tmpNode = tmpNode.nextSibling;
                if (!tmpNode && j + 1 < nodes) tmpNode = baseElement.childNodes[j + 1];
            }
        }
        if ("undefined" === typeof maxDepth) return this.findElementByBofid(nextBaseElements, targetBofid);
        else if (maxDepth > 0) return this.findElementByBofid(nextBaseElements, targetBofid, maxDepth - 1);
        else return null;
    },
    hasClassName: function(elem, value) {
        var elemClass = elem && elem.className;
        if (elemClass) {
            var classNames = (value + '').split(/[\.\s]\s*\.?/),
            cl = classNames.length;
            var SPACE = ' ',
            clzName = SPACE + elemClass + SPACE,
            j = 0,
            ret = cl && true;
            for (; j < cl; j++) {
                if (clzName.indexOf(SPACE + classNames[j] + SPACE) < 0) {
                    ret = false;
                    break;
                }
            }
            if (ret) {
                return true;
            }
        }
        return false;
    },
    addClassName: function(elem, value) {
        if (!elem) {
            return;
        }
        var elemClass = elem.className;
        if (!elemClass) {
            elem.className = value;
        } else {
            var classNames = (value + '').split(/[\.\s]\s*\.?/),
            cl = classNames.length;
            var SPACE = ' ',
            clzName = SPACE + elemClass + SPACE,
            setClass = elemClass,
            j = 0;
            for (; j < cl; j++) {
                if (clzName.indexOf(SPACE + classNames[j] + SPACE) < 0) {
                    setClass += SPACE + classNames[j];
                }
            }
            elem.className = setClass.replace(/^\s+|\s+$/g, '');
        }
    },
    removeClassName: function(elem, value) {
        if (!elem || !elem.className) {
            return;
        }
        var elemClass = elem.className;
        var classNames = (value + '').split(/[\.\s]\s*\.?/),
        cl = classNames.length;
        if (!cl) {
            elem.className = '';
        } else {
            var SPACE = ' ',
            clzName = (SPACE + elemClass + SPACE).replace(/[\n\t]/g, SPACE),
            j = 0,
            needle;
            for (; j < cl; j++) {
                needle = SPACE + classNames[j] + SPACE;
                while (clzName.indexOf(needle) >= 0) {
                    clzName = clzName.replace(needle, SPACE);
                }
            }
            elem.className = clzName.replace(/^\s+|\s+$/g, '');
        }
    },
    replaceClassName: function(elem, newClassName, oldClassName) {
        this.removeClassName(elem, oldClassName);
        this.addClassName(elem, newClassName);
    },
    generateId: function(el, prefix) {
        prefix = prefix || 'freequery-gen';
        el = el || {};
        if (!el.id) {
            el.id = prefix + domutils.id_counter++;
        }
        return el.id;
    },
    stopPropagation: function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    preventDefault: function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
    },
    stopEvent: function(ev) {
        if (!ev) return;
        this.preventDefault(ev);
        this.stopPropagation(ev);
    },
    saveCheckboxStatus: function(elem) {
        if (!elem || !elem.getElementsByTagName) return;
        var inputList = elem.getElementsByTagName("input");
        var len = inputList.length;
        for (var i = 0; i < len; i++) {
            var type = inputList[i].type;
            if ((type.toUpperCase() !== "CHECKBOX") && (type.toUpperCase() !== "RADIO")) continue;
            var checkbox = inputList[i];
            checkbox.setAttribute("__checked", checkbox.checked);
        }
    },
    restoreCheckboxStatus: function(elem) {
        if (!elem || !elem.getElementsByTagName) return;
        var inputList = elem.getElementsByTagName("input");
        var len = inputList.length;
        for (var i = 0; i < len; i++) {
            var type = inputList[i].type;
            if ((type.toUpperCase() !== "CHECKBOX") && (type.toUpperCase() !== "RADIO")) continue;
            var checkbox = inputList[i];
            var checked = checkbox.getAttribute("__checked");
            if (true === checked || "true" == checked) {
                checkbox.checked = true;
            } else if (false === checked || "false" == checked) {
                checkbox.checked = false;
            } else {;
            }
        }
    },
    getCumulativeOffset: function(element) {
        var top = 0,
        left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while ( element );
        return {
            left: left,
            top: top,
            toString: function() {
                return "[left:" + left + ", top:" + top + "]";
            }
        };
    },
    getViewport: function() {
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        return {
            width: width,
            height: height,
            toString: function() {
                return "[width:" + width + ", height:" + height + "]";
            }
        };
    },
    createElement: function(tagName, elId) {
        var tag = tagName || "div";
        var id = elId || this.generateId();
        var obj = document.createElement(tag);
        obj.id = id;
        obj.bofid = id;
        return obj;
    },
    createOption: function(text, value) {
        if (this.isFirefox()) {
            var o = document.createElement("OPTION");
            o.value = value;
            o.appendChild(document.createTextNode(text));
            return o;
        } else return new Option(text, value);
    },
    checkFunctionValid: function(op) {
        var util = jsloader.resolve("freequery.common.util");
        return util.checkFunctionValid(op);
    },
    getRadioCheckedValue: function(container, buttonName) {
        var radioArray = this.findRadioArray(container, buttonName);
        if (radioArray && radioArray != "") {
            for (var i = 0; i < radioArray.length; i++) {
                if (radioArray[i].checked) return radioArray[i].value;
            }
        }
    },
    setRadioChecked: function(container, buttonName, radioValue) {
        var radioArray = this.findRadioArray(container, buttonName);
        if (radioArray && radioArray != "") {
            for (var i = 0; i < radioArray.length; i++) {
                if (radioArray[i].value == radioValue) {
                    radioArray[i].checked = true;
                    return;
                }
            }
        }
    },
    findRadioArray: function(container, buttonName) {
        var inputList = container.getElementsByTagName("input");
        var radioArray = [];
        for (var idx in inputList) {
            if (inputList[idx].type == "radio" && inputList[idx].name == buttonName) {
                radioArray[radioArray.length] = inputList[idx];
                break;
            } else if (inputList[idx][0] && inputList[idx][0].type && inputList[idx][0].type == "radio" && inputList[idx][0].name == buttonName) {
                var len = inputList[idx].length
                for (var subIdx = 0; subIdx < len; subIdx++) {
                    if (inputList[idx][subIdx].type == "radio" && inputList[idx][subIdx].name == buttonName) {
                        radioArray[radioArray.length] = inputList[idx][subIdx];
                    }
                }
                break;
            }
        }
        return radioArray;
    }
}; (function(exporter) {
    var ua = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    var regexEdge = /(edge)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/;
    var regex = /(opera|ie|firefox|chrome|version|iphone os|ipad os)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/;
    var UA = ua.match(regexEdge) || ua.match(regex) || [null, 'unknown', 0];
    var mode = null;
    var Browser = {
        name: (UA[1] == 'version') ? UA[3] : UA[1],
        version: mode || ((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
        Platform: {
            name: ua.match(/ip(?:ad|od|hone)/) ? 'ios': (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0],
            version: ua.match(/ip(?:ad|od|hone)/) ? null: (ua.match(/android(\s|\d|\.)*/) || ['other'])[0]
        }
    };
    if (Browser.version && (typeof Browser.version == "string")) {
        Browser.version = parseFloat(Browser.version.replace('_', '.'));
    }
    if (Browser.name == 'unknown') {
        if ((UA = /(msie\s|trident.*rv:)([\w.]+)/.exec(ua))) {
            Browser.name = 'ie';
            Browser.version = parseFloat(UA[2] || '0');
        }
    }
    Browser[Browser.name] = true;
    Browser[Browser.name + parseInt(Browser.version, 10)] = true;
    Browser.Platform[Browser.Platform.name] = true;
    if (Browser.Platform.android) {}
    Browser.Lang = (navigator.userLanguage || navigator.language || '').toLowerCase();
    if (ua.indexOf("qqbrowser") >= 0) Browser.qqBrowser = true;
    exporter['Browser'] = Browser;
})(domutils); ! @#$ % ^&*() var EventAgent = function() {
    this._listeners = {};
};
EventAgent.prototype.destroy = function() {
    this.removeAllListeners();
    this._listeners = null;
};
EventAgent.prototype.addListener = function(element, type, handler, scope) {
    if (type == "dblclick" && domutils.isIOS()) {
        type = "click";
    }
    var eid = this.add(element, type, handler, scope);
    if (eid) {
        this._listeners[eid] = {
            target: element,
            type: type,
            fn: handler,
            scope: scope
        };
    }
};
EventAgent.prototype.removeListener = function(element, type, handler, scope) {
    var eid = this.remove(element, type, handler, scope);
    if (eid && this._listeners[eid]) {
        delete this._listeners[eid];
    }
};
EventAgent.prototype.removeAllListeners = function() {
    for (var eid in this._listeners) {
        var listener = this._listeners[eid];
        this.remove(listener.target, listener.type, listener.fn, listener.scope);
        delete this._listeners[eid];
    }
};
EventAgent.prototype.add = function(target, type, fn, scope) {
    var id = helper.getID(target),
    events,
    eventHandle,
    i,
    len,
    listeners,
    that = this,
    listener;
    if (id === -1 || !type || helper.getConstructorName(fn) != 'Function') {
        return;
    }
    if (!id) {
        helper.setID(target, (id = helper.guid++));
        helper.cache[id] = {
            target: target,
            events: {}
        };
    }
    events = helper.cache[id].events;
    if (!events[type]) {
        var eventutil = jsloader.resolve("freequery.lang.eventutil");
        eventHandle = function(event) {
            event = event ? eventutil.fix(event) : eventutil.getEvent();
            that._handle(target, event);
        };
        events[type] = {
            handle: eventHandle,
            listeners: []
        };
        eventutil.addEventHandler(target, type, eventHandle);
    }
    listeners = events[type].listeners;
    for (i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i].fn === fn && listeners[i].scope === scope) {
            return;
        }
    }
    listener = {
        fn: fn,
        scope: scope
    };
    domutils.generateId(listener, 'ea-gen');
    events[type].listeners.push(listener);
    return listener.id;
};
EventAgent.prototype.remove = function(target, type, fn, scope) {
    var events = this._getEvents(target),
    id = helper.getID(target);
    var eventsType, listeners, len, i, p, isEmpty, undef, eid;
    if (events === undef) {
        return;
    }
    if ((eventsType = events[type])) {
        listeners = eventsType.listeners;
        i = len = listeners.length;
        if (helper.getConstructorName(fn) == 'Function' && len) {
            for (; --i >= 0;) {
                if (fn === listeners[i].fn) {
                    if (scope === undef || scope === listeners[i].scope) {
                        if (!eid) {
                            eid = listeners[i].id;
                        } else {
                            eid = [eid].concat(listeners[i].id);
                        }
                        listeners.splice(i, 1);
                        len--;
                    }
                }
            }
        }
        if (fn === undef || len === 0) {
            var eventutil = jsloader.resolve("freequery.lang.eventutil");
            eventutil.removeEventHandler(target, type, eventsType.handle);
            delete events[type];
        }
    }
    isEmpty = true;
    for (p in events) {
        isEmpty = false;
        break;
    }
    if (type === undef || isEmpty) {
        for (type in events) {
            this.remove(target, type);
        }
        delete helper.cache[id];
        helper.removeID(target);
    }
    return eid;
};
EventAgent.prototype._handle = function(target, ev) {
    var listeners = this._getListeners(target, ev.type).slice(0);
    var ret, i = 0,
    len = listeners.length,
    listener, undef;
    for (; i < len; ++i) {
        listener = listeners[i];
        ret = listener.fn.call(listener.scope || target, ev);
        if (ret === false) {
            domutils.stopEvent(ev);
        }
    }
    if (ev.fixedPreventDefault) {
        if (ev.removeAttribute) {
            ev.removeAttribute("preventDefault");
        } else {
            ev.preventDefault = null;
        }
        ev.fixedPreventDefault = false;
    }
    if (ev.fixedStopPropagation) {
        if (ev.removeAttribute) {
            ev.removeAttribute("stopPropagation");
        } else {
            ev.stopPropagation = null;
        }
        ev.fixedStopPropagation = false;
    }
    return ret;
};
EventAgent.prototype._getEvents = function(target) {
    var id = helper.getID(target),
    c,
    events;
    if (id === -1) {
        return;
    }
    if (!id || !(c = helper.cache[id])) {
        return;
    }
    if (c.target !== target) {
        return;
    }
    events = c.events || {};
    return events;
};
EventAgent.prototype._getListeners = function(target, type) {
    var events = this._getEvents(target) || {},
    eventsType,
    listeners = [];
    if ((eventsType = events[type])) {
        listeners = eventsType.listeners;
    }
    return listeners;
};
var helper = {
    cache: {},
    guid: (new Date).getTime(),
    EVENT_GUID: 'bofEventTargetId',
    getID: function(target) {
        return helper.isValidTarget(target) ? domutils.data(target, helper.EVENT_GUID) : -1;
    },
    setID: function(target, id) {
        if (helper.isValidTarget(target)) {
            domutils.data(target, helper.EVENT_GUID, id);
        }
    },
    removeID: function(target) {
        domutils.removeData(target, helper.EVENT_GUID);
    },
    isValidTarget: function(target) {
        var nodeType = 0;
        try {
            nodeType = target && target.nodeType;
        } catch(e) {
            return false;
        }
        return target && nodeType !== 3 && nodeType !== 8;
    },
    getConstructorName: function(o) {
        return o && Object.prototype.toString.call(o).slice(8, -1);
    }
}; ! @#$ % ^&*() var eventutil = {
    addEventHandler: document.addEventListener ?
    function(el, type, fn, cap) {
        if (!el) {
            return;
        } else if (el.addEventListener) {
            el.addEventListener(type, fn, !!cap);
        } else {
            el['on' + type] = fn;
        }
    }: function(el, type, fn) {
        if (!el) {
            return;
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
    },
    removeEventHandler: document.removeEventListener ?
    function(el, type, fn, cap) {
        if (!el) {
            return;
        } else if (el.removeEventListener) {
            el.removeEventListener(type, fn, !!cap);
        } else {
            el['on' + type] = null;
        }
    }: function(el, type, fn) {
        if (!el) {
            return;
        } else if (el.detachEvent) {
            el.detachEvent('on' + type, fn);
        } else {
            el['on' + type] = null;
        }
    },
    getEvent: function(noFix, win) {
        var p, fn, w = win || window,
        ev = w.event;
        if (!ev && typeof Event != "undefined") {
            fn = arguments.callee;
            while ((fn = fn.caller)) {
                p = fn.arguments[0];
                if (p && (p.constructor === Event || p.constructor === MouseEvent || (p.preventDefault && p.stopPropagation))) {
                    ev = p;
                    break;
                }
            }
        }
        if (ev && !noFix) {
            ev = eventutil.fix(ev, w.document);
        }
        return ev;
    },
    fix: function(ev, docu) {
        var d = docu || document;
        if (!ev.target) {
            ev.target = ev.srcElement || d;
        }
        if (ev.target.nodeType === 3) {
            ev.target = ev.target.parentNode;
        }
        if (!ev.relatedTarget && ev.fromElement) {
            ev.relatedTarget = ev.fromElement === ev.target ? ev.toElement: ev.fromElement;
        }
        if (ev.pageX == null && ev.clientX != null) {
            var doc = d.documentElement,
            body = d.body;
            ev.pageX = ev.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            ev.pageY = ev.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (ev.which == null && (ev.charCode != null || ev.keyCode != null)) {
            ev.which = ev.charCode != null ? ev.charCode: ev.keyCode;
        }
        if (!ev.metaKey && ev.ctrlKey && !domutils.isFirefox()) {
            ev.metaKey = ev.ctrlKey;
        }
        if (!ev.which && ev.button !== undefined) {
            ev.which = (ev.button & 1 ? 1 : (ev.button & 2 ? 3 : (ev.button & 4 ? 2 : 0)));
        }
        if (ev.layerX == null && ev.offsetX != null) {
            ev.layerX = ev.offsetX;
        }
        if (ev.layerY == null && ev.offsetY != null) {
            ev.layerY = ev.offsetY;
        }
        if (ev.charCode == null && ev.keyCode != null) {
            ev.charCode = ev.keyCode;
        }
        if (ev.eventPhase == null) {
            ev.eventPhase = 2;
        }
        if (!ev.preventDefault) {
            ev.fixedPreventDefault = true;
            ev.preventDefault = this._preventDefault;
        }
        if (!ev.stopPropagation) {
            ev.fixedStopPropagation = true;
            ev.stopPropagation = this._stopPropagation;
        }
        return ev;
    },
    _preventDefault: function() {
        this.returnValue = false;
    },
    _stopPropagation: function() {
        this.cancelBubble = true;
    }
}; ! @#$ % ^&*() var Registry = function() {
    this.root = {};
};
Registry.prototype.put = function(name, obj) {
    this.root[name] = obj;
};
Registry.prototype.get = function(name) {
    return this.root[name];
};
Registry.prototype.has = function(name) {
    return name in this.root;
};
Registry.prototype.remove = function(name) {
    var obj = this.root[name];
    delete this.root[name];
    return obj;
};
Registry.prototype.clear = function() {
    for (var name in this.root) this.remove(name);
};
var registry = new Registry(); ! @#$ % ^&*() var CustomEvent = function(name, obj) {
    this.name = name;
    this.obj = obj;
    this.subscribers = [];
};
CustomEvent.prototype = {
    subscribe: function(func, obj) {
        if (!obj) {
            obj = this.obj;
        }
        for (var i = 0,
        len = this.subscribers.length; i < len; ++i) {
            var s = this.subscribers[i];
            if (!s) {
                continue;
            }
            if (s[0] == func && s[1] == obj) {
                return;
            }
        }
        this.subscribers.push([func, obj]);
    },
    unsubscribe: function(func, obj) {
        var found = false;
        if (!obj) {
            obj = this.obj;
        }
        for (var i = 0,
        len = this.subscribers.length; i < len; ++i) {
            var s = this.subscribers[i];
            if (s && s[0] == func && s[1] == obj) {
                this.deleteSubscriber(i);
                found = true;
            }
        }
        return found;
    },
    unsubscribeAll: function() {
        var s = this.subscribers;
        if (s && s.length > 0) {
            for (var i = s.length - 1; i >= 0; i--) {
                this.deleteSubscriber(i);
            }
        }
    },
    deleteSubscriber: function(index) {
        var s = this.subscribers[index];
        if (s) {
            delete s[0];
            delete s[1];
        }
        this.subscribers.splice(index, 1);
    },
    fire: function() {
        var len = this.subscribers.length;
        if (!len && this.silent) {
            return;
        }
        var terminateOnFalse = (this.terminateOnFalse === true);
        for (var i = 0; i < len; ++i) {
            var s = this.subscribers[i];
            if (s) {
                var v = s[0].apply(s[1], arguments);
                if (terminateOnFalse && v === false) {
                    return false;
                }
            }
        }
        return true;
    }
}; ! @#$ % ^&*() var modalWindow = null;
var TransferData = null;
var boflog = jsloader.resolve('freequery.control.logger');
var printStackTrace = null;
var util = {
    debug: false,
    lastId: 0,
    licenses: null,
    hasLogout: false,
    lazyCalls: new Array(),
    batchUpdate: false,
    beginLazyCalls: function() {
        this.batchUpdate = true;
    },
    commitLazyCalls: function() {
        this.batchUpdate = false;
        for (var i = 0; i < this.lazyCalls.length; i++) {
            var method = this.lazyCalls[i].theMethod;
            var thisObj = this.lazyCalls[i].thisObj;
            var argArray = this.lazyCalls[i].argArray;
            method.apply(thisObj, argArray);
        }
        this.lazyCalls = new Array();
    },
    lazyCall: function(_thisObj, _method, _argArray) {
        if (this.batchUpdate) {
            this.lazyCalls.push({
                theMethod: _method,
                thisObj: _thisObj,
                argArray: _argArray
            });
        } else _method.apply(_thisObj, _argArray);
    },
    setStyle: function(obj, prop, value) {
        obj.style.cssText += ";" + prop + ":" + value;
    },
    transferData: function() {
        var data = registry.get("TransferData");
        if (data == null) {
            if (!TransferData) TransferData = jsloader.resolve("freequery.common.TransferData");
            data = new TransferData();
            registry.put("TransferData", data);
        }
        return data;
    },
    getOwner: function(e) {
        while ((e != null) && (!e.owner)) {
            e = e.parentNode;
        }
        if (e) return e.owner;
    },
    trim: function(src) {
        if (src && (typeof src == 'string')) return src.replace(/^\s+|\s+$/g, "");
        else return src;
    },
    RTrim: function(src) {
        if (src && (typeof src == 'string')) return src.replace(/(\s*$)/g, "");
        else return src;
    },
    LTrim: function(src) {
        if (src && (typeof src == 'string')) return src.replace(/(^\s*)/g, "");
        else return src;
    },
    getMousePoint: function(e) {
        var point = {
            x: 0,
            y: 0
        };
        if (typeof window.pageYOffset != 'undefined') {
            point.x = window.pageXOffset;
            point.y = window.pageYOffset;
        } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            point.x = document.documentElement.scrollLeft;
            point.y = document.documentElement.scrollTop;
        } else if (typeof document.body != 'undefined') {
            point.x = document.body.scrollLeft;
            point.y = document.body.scrollTop;
        }
        point.x += e.clientX;
        point.y += e.clientY;
        return point;
    },
    getAbsolutePos: function(el, untilEl) {
        var r = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
        while ((el = el.offsetParent) && (el != untilEl)) {
            r.y += el.offsetTop;
            r.x += el.offsetLeft;
        }
        return r;
    },
    getAbsolutePosScroll: function(el, untilEl) {
        var e = el;
        var r = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
        while ((el = el.offsetParent) && (el != untilEl)) {
            r.y += el.offsetTop;
            r.x += el.offsetLeft;
        }
        while (e != untilEl) {
            r.y -= e.scrollTop;
            r.x -= e.scrollLeft;
            e = e.parentNode;
        }
        return r;
    },
    getAbsolutePosEx: function(element) {
        if (!element || arguments.length != 1) return null;
        var elmt = element;
        var offsetTop = elmt.offsetTop;
        var offsetLeft = elmt.offsetLeft;
        while (elmt = elmt.offsetParent) {
            if (elmt.style.position == 'absolute' || elmt.style.position == 'relative' || (elmt.style.overflow != 'visible' && elmt.style.overflow != '')) {
                break;
            }
            offsetTop += elmt.offsetTop;
            offsetLeft += elmt.offsetLeft;
        }
        return {
            absoluteLeft: offsetLeft,
            absoluteTop: offsetTop,
            offsetWidth: element.offsetWidth,
            offsetHeight: element.offsetHeight,
            viewPort: elmt
        };
    },
    remoteInvokeEx2: function(className, methodName, paramArray, callback, that, noLookup) {
        var result = this.remoteInvoke(className, methodName, paramArray, callback, that, noLookup);
        if (callback) {
            return result;
        }
        if (result.succeeded) {
            return result;
        } else {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            modalWindow.showServerError(result);
            result.result = null;
            return result;
        }
    },
    getRemoteModule: function(rmiModuleName) {
        var cache = registry.get("classcache");
        if (!cache) {
            cache = new Array() registry.put("classcache", cache);
        }
        if (cache[rmiModuleName]) return cache[rmiModuleName];
        var jscode = domutils.doGet("js/bof/service/" + rmiModuleName + "Stub.js.stub", true);
        eval(jscode);
        var kclass = eval(rmiModuleName + "Stub");
        cache[rmiModuleName] = new kclass();
        return cache[rmiModuleName];
    },
    compositeInvoke: function(methodName, paramArray, async, callbackFunc, that) {
        this.clearCompositeInvokeCache(methodName, paramArray);
        var ret = this.remoteInvoke("CompositeService", methodName, paramArray, async ? callback: null, [this, that]);
        function callback(ret) {
            if (ret && ret.succeeded) {
                var tmpKey = methodName + "_" + lang.toJSONString(paramArray);
                if (!this[0].getInvokeCacheList()[tmpKey]) this[0].getInvokeCacheList()[tmpKey] = new Array();
                if (ret.result) {
                    for (var i = 0; i < ret.result.length; i++) this[0].getInvokeCacheList()[tmpKey].push(ret.result[i]);
                }
            }
            if (callbackFunc) {
                if (this[1]) callbackFunc.call(this[1], ret);
                else callbackFunc(ret)
            }
        }
        if (!async) callback.call([this, that], ret);
    },
    clearCompositeInvokeCache: function(methodName, paramArray) {
        var tmpKey;
        if (paramArray) tmpKey = methodName + "_" + lang.toJSONString(paramArray);
        var cachList = this.getInvokeCacheList();
        for (index in cachList) {
            if (paramArray) {
                if (index == tmpKey) cachList[index] = new Array();
            } else {
                if (index.substr(0, methodName.length + 1) == (methodName + "_")) cachList[index] = new Array();
            }
        }
    },
    clearInvokeCache: function(className, methodName, paramArray) {
        var removedList = new Array();
        var list = this.getInvokeCacheList();
        for (index in list) {
            var cache = list[index];
            for (resultIndex in cache) {
                var invoker = cache[resultIndex];
                if (paramArray) {
                    if (invoker.serviceName == className && invoker.methodName == methodName && lang.toJSONString(invoker.params) == lang.toJSONString(paramArray)) invoker.serviceName = "";
                    invoker.methodName = "";
                } else {
                    if (invoker.serviceName == className && invoker.methodName == methodName) invoker.serviceName = "";
                    invoker.methodName = "";
                }
            }
        }
    },
    getInvokeCache: function(methodName, paramArray) {
        var tmpKey = methodName + "_" + lang.toJSONString(paramArray);
        if (!this.getInvokeCacheList()[tmpKey]) this.getInvokeCacheList()[tmpKey] = new Array();
        return this.getInvokeCacheList()[tmpKey];
    },
    getInvokeCacheList: function() {
        var data = registry.get("InvokeCache");
        if (data == null) {
            data = {};
            registry.put("InvokeCache", data);
        }
        return data;
    },
    findResultFromInvokerCache: function(className, methodName, paramArray) {
        var list = this.getInvokeCacheList();
        for (index in list) {
            var cache = list[index];
            for (resultIndex in cache) {
                var invoker = cache[resultIndex];
                if (invoker.serviceName == className && invoker.methodName == methodName && lang.toJSONString(invoker.params) == lang.toJSONString(paramArray)) return {
                    succeeded: true,
                    retCode: 0,
                    result: invoker.result
                };
            }
        }
    },
    remoteInvokeMultipart: function(className, methodName, paramArray, callback, that, headers) {
        headers = headers || {};
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
        }
        return this.remoteInvokeEx(className, methodName, paramArray, callback, that, headers);
    },
    remoteInvokeEx: function(className, methodName, paramArray, callback, that, headers) {
        var result = this.remoteInvoke(className, methodName, paramArray, callback, that, null, headers);
        if (callback) return result;
        if (result.succeeded) return result;
        else {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            modalWindow.showServerError(result);
            return null;
        }
    },
    remoteInvoke: function(className, methodName, paramArray, callback, that, noLookup, headers) {
        if (this.hasLogout) {
            return {
                succeeded: true,
                result: null
            };
        }
        if (className == "UserService" && methodName == "logout") {
            this.hasLogout = true;
        }
        var utilThis = this;
        var paramsStr = lang.toJSONString([].slice.call(paramArray, 0));
        var processResponseText = function(responseText) {
            if (utilThis.encode) {
                responseText = utilThis.coder.decode(responseText);
            }
            var result = {};
            var json = lang.parseJSON(responseText);
            try {
                if (boflog.getEnabled()) {
                    if (json.logMsgs) {
                        for (var i = 0; i < json.logMsgs.length; i++) {
                            if (utilThis.getCharLength(responseText) < maxLen) {
                                boflog.log(json.logMsgs[i].replace(/[ ]/g, ' <wbr>'));
                            } else {
                                boflog.log('<textarea rows="4" style="width:80%;">' + json.logMsgs[i] + '</textarea>');
                            }
                        }
                        delete json.logMsgs;
                        responseText = lang.toJSONString(json);
                    }
                    var maxLen = 200;
                    var s = className + ' .' + methodName + ' (' + paramsStr.replace(/\[|\]/g, '').replace(/,/g, ', ') + ')';
                    if (utilThis.getCharLength(s) < maxLen) {
                        boflog.log(s.replace(/[ ]/g, ' <wbr>'));
                    } else {
                        boflog.log('<textarea rows="4" style="width:80%;">' + s + '</textarea>');
                    }
                    if (utilThis.getCharLength(responseText) < maxLen) {
                        boflog.log(responseText.replace(/[ ]/g, ' <wbr>'));
                    } else {
                        boflog.log('<textarea rows="4" style="width:80%;">' + responseText + '</textarea>');
                    }
                } else {
                    delete json.logMsgs;
                }
            } catch(ex) {
                if (window.console != undefined) {
                    window.console.log(ex && ex.message);
                }
            }
            result.succeeded = json.retCode == 0;
            result.retCode = json.retCode;
            result.result = json.result;
            result.detail = json.detail;
            result.stackTrace = json.stackTrace;
            return result;
        };
        var processError = function(xhr) {
            var retCode = "ERROR_INTERNET_ERROR_CODE",
            result = "",
            detail = "",
            stackTrace = "";
            switch (xhr.status) {
            case 12001:
                result = "ERROR_INTERNET_OUT_OF_HANDLES";
                detail = "No more handles could be generated at this time.";
                break;
            case 12002:
                result = "ERROR_INTERNET_TIMEOUT";
                detail = "The request has timed out.";
                stackTrace = "WinInet HTTP 请求超时，与服务器间的连接已关闭。关于该错误的更详细信息，请参见：\n\n" + "http://askville.amazon.com/Error-status-code-%2312002-correct/AnswerViewer.do?requestId=51620322";
                break;
            case 12004:
                result = "ERROR_INTERNET_INTERNAL_ERROR";
                detail = "An internal error has occurred.";
                break;
            case 12005:
                result = "ERROR_INTERNET_INVALID_URL";
                detail = "The URL is invalid.";
                break;
            case 12006:
                result = "ERROR_INTERNET_UNRECOGNIZED_SCHEME";
                detail = "The URL scheme could not be recognized or is not supported.";
                break;
            case 12007:
                result = "ERROR_INTERNET_NAME_NOT_RESOLVED";
                detail = "The server name could not be resolved.";
                break;
            default:
                result = xhr.status;
                detail = "WinInet error occurred." + xhr.status;
                stackTrace = "For more information, visit the following Microsoft Web site: \n" + "http://msdn.microsoft.com/en-us/library/aa385483.aspx";
            }
            return {
                succeeded: false,
                retCode: retCode,
                result: result,
                detail: detail,
                stackTrace: stackTrace
            };
        };
        var cachedResult = null;
        if (!noLookup) {
            cachedResult = this.findResultFromInvokerCache(className, methodName, paramArray);
        }
        var url = "RMIServlet";
        var data = null;
        if (this.encode) {
            data = encodeURIComponent(className) + "+" + encodeURIComponent(methodName) + "+" + encodeURIComponent(paramsStr);
            data = this.coder.encode(data);
        } else {
            data = "className=" + encodeURIComponent(className) + "&methodName=" + encodeURIComponent(methodName) + "&params=" + encodeURIComponent(paramsStr);
        }
        if (callback) {
            if (cachedResult) {
                if (that) callback.call(that, cachedResult);
                else callback(cachedResult);
                return;
            }
            domutils.doPost(url, data,
            function(responseText) {
                var ret = processResponseText(responseText);
                if (that) callback.call(that, ret);
                else callback(ret);
            },
            function(xhr) {},
            this, headers);
        } else {
            try {
                if (cachedResult) {
                    return cachedResult;
                }
                return processResponseText(domutils.doPost(url, data));
            } catch(ex) {
                if (!printStackTrace) {
                    printStackTrace = jsloader.resolve('thirdparty.printStackTrace');
                }
                var stackTrace = printStackTrace({
                    e: ex
                }).join('\n');
                return {
                    succeeded: false,
                    retCode: ex.message,
                    result: ex.message,
                    detail: '',
                    stackTrace: stackTrace
                };
            }
        }
        return null;
    },
    remoteInvokeEx3: function(className, methodName, paramArray, callback, that) {
        var result = this.remoteInvoke(className, methodName, paramArray, callback, that);
        if (callback) {
            return result;
        }
        if (result.succeeded) {
            return result;
        } else {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            modalWindow.showServerError(result);
            throw new Error(result.retCode);
            result.result = null;
            return result;
        }
    },
    getDataSourceId: function(dataNode) {
        return this.getDataSourceIdByNodeId(dataNode.id);
    },
    getDataSourceIdByNodeId: function(id) {
        var tmpDsID = registry.get("DSID_" + id);
        if (tmpDsID) return tmpDsID;
        var ret = util.remoteInvoke("BusinessViewService", "getDataSourceIdByTreeId", [id]);
        if (!ret.succeeded) return null;
        else if (ret.result) {
            registry.put("DSID_" + id, ret.result);
            return ret.result;
        } else return null;
    },
    generateId: function() {
        this.lastId++;
        return "_FQ" + this.lastId;
    },
    getCookie: function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                if (name != "FQPassword") return this.getCookieVal(j);
                else return unescape(this.getCookieVal(j));
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return "";
    },
    getCookieVal: function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return document.cookie.substring(offset, endstr);
    },
    _b64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encb64hlp: function(a, k, s, iFrom, iTo, fStr) {
        var d = 0;
        for (var i = 0; i + iFrom <= iTo; i++) d |= (fStr ? s.charCodeAt(i + iFrom) : s[i + iFrom]) << (16 - 8 * i);
        for (var i = 0; i <= iTo - iFrom + 1; i++) a[k++] = this._b64.charAt(d >>> (18 - i * 6) & 0x3f);
        return k;
    },
    decb64hlp: function(a, ai, ca, iFrom, iTo) {
        var d = 0;
        var l = iTo - iFrom;
        for (var i = 0; i + iFrom <= iTo; i++) d |= ca[i + iFrom] << (18 - 6 * i);
        for (var i = 0; i < l; i++) a[ai + i] = (d >>> (16 - i * 8)) & 0xff;
        return ai + i;
    },
    encb64: function(s) {
        var fStr = typeof(s) == "string";
        var i;
        var l = s.length;
        var a = new Array();
        var k = 0;
        for (i = 2; i < l; i = i + 3) {
            k = this.encb64hlp(a, k, s, i - 2, i, fStr);
            if ((i + 1) % 57 == 0) a[k++] = "\r\n";
        }
        var padd = l - i + 2;
        if (padd > 0) {
            k = this.encb64hlp(a, k, s, i - 2, l - 1, fStr);
            a[k] = (padd > 1) ? "=": "==";
        }
        return a.join("");
    },
    decb64: function(s, fStr) {
        var i, j = 0;
        var ip = s.indexOf('=');
        var l = ip >= 0 ? ip: s.length;
        var ca = new Array();
        for (i = 0; i < l; i++) {
            var c = s.charAt(i);
            if ("\n\r\t".indexOf(c) >= 0) continue;
            ca[j++] = this._b64.indexOf(c);
        }
        var l = j;
        var a = new Array();
        var ai = 0;
        for (i = 3; i < l; i = i + 4) ai = this.decb64hlp(a, ai, ca, i - 3, i);
        if (i - 4 < l) ai = this.decb64hlp(a, ai, ca, i - 3, l - 1);
        if (!fStr) return a;
        var r = '';
        try {
            r = String.fromCharCode.apply(r, a);
        } catch(E) {
            for (i = 0; i < a.length; i++) r += String.fromCharCode(a[i]);
        }
        return r;
    },
    decb64Unicode: function(s, fStr) {
        var i, j = 0;
        var ip = s.indexOf('=');
        var l = ip >= 0 ? ip: s.length;
        var ca = new Array();
        for (i = 0; i < l; i++) {
            var c = s.charAt(i);
            if ("\n\r\t".indexOf(c) >= 0) continue;
            ca[j++] = this._b64.indexOf(c);
        }
        var l = j;
        var a = new Array();
        var ai = 0;
        for (i = 3; i < l; i = i + 4) ai = this.decb64hlp(a, ai, ca, i - 3, i);
        if (i - 4 < l) ai = this.decb64hlp(a, ai, ca, i - 3, l - 1);
        if (!fStr) return a;
        var r = new Array();
        var highFirst = (a[0] == 254);
        for (var i = 2; i < a.length; i += 2) {
            if (highFirst) r.push(String.fromCharCode(a[i] * 256 + a[i + 1]));
            else r.push(String.fromCharCode(a[i + 1] * 256 + a[i]));
        }
        return r.join('');
    },
    parseCellPosition: function(cellPosition) {
        var cellPos = cellPosition.toUpperCase();
        var charSeq = false;
        var numSeq = false;
        var firstNum = true;
        var row = 0;
        var col = 0;
        for (var i = 0; i < cellPos.length; i++) {
            var c = cellPos.charCodeAt(i);
            if (c > 64 && c < 91) {
                charSeq = true;
                if (numSeq) {
                    alert("不合法的单元格位置,请参考Excel单元格位置定义");
                    return null;
                }
                col = col * 26 + c - 64;
                if (col > 256) {
                    alert("列数过多,只支持256列");
                    return null;
                }
            } else if (c >= 48 && c < 58) {
                if (!charSeq) {
                    alert("不合法的单元格位置,请参考Excel单元格位置定义");
                    return null;
                }
                numSeq = true;
                if (c == 48 && firstNum) {
                    alert("不合法的单元格位置,请参考Excel单元格位置定义");
                    return null;
                }
                row = row * 10 + c - 48;
                firstNum = false;
            } else {
                alert("不合法的单元格位置,请参考Excel单元格位置定义");
                return null;
            }
        }
        if (!charSeq || !numSeq) {
            alert("不合法的单元格位置,请参考Excel单元格位置定义");
            return null;
        }
        var cell = {
            row: null,
            col: null
        };
        cell.row = row - 1;
        cell.col = col - 1;
        return cell;
    },
    toPosition: function(row, col) {
        row = eval(row) + 1;
        col = eval(col);
        if (col > 256) {
            alert("不合法的列号,最大列号为256");
            return null;
        }
        var ic = parseInt(col / 26);
        var pos = "";
        if (ic > 0) {
            pos = String.fromCharCode(ic + 64);
        }
        var c = String.fromCharCode(col % 26 + 65);
        pos = pos + c;
        pos = pos + row;
        return pos;
    },
    isUnsignedInt: function(num) {
        if (num.match(/^[0-9]*[1-9][0-9]*$/)) {
            return true;
        } else {
            return false;
        }
    },
    isUnsignedIntOrZero: function(num) {
        if (num.match(/^[0-9]*[1-9][0-9]*$/)) {
            return true;
        } else if (num == 0) {
            return true;
        } else {
            return false;
        }
    },
    checkStrLen: function(value) {
        var str, Num = 0;
        if ("string" == typeof value) {
            for (var i = 0; i < value.length; i++) {
                str = value.substring(i, i + 1);
                if (str <= "~") Num += 1;
                else Num += 2;
            }
        }
        return Num;
    },
    hasOpFunction: function(expectedFunctions) {
        if (expectedFunctions instanceof Array) {;
        } else {
            expectedFunctions = [expectedFunctions];
        }
        if (0 == expectedFunctions.length) return false;
        var opFunctions = registry.get("opFunctions");
        if (!opFunctions) {
            var ret = util.remoteInvokeEx("UserService", "getAllFunctionsOfCurrentUser", []);
            if (ret && ret.succeeded && ret.result) {
                registry.put("opFunctions", ret.result);
                opFunctions = registry.get("opFunctions");
            }
        }
        var has = false;
        if (opFunctions) {
            for (var i = 0; i < expectedFunctions.length; i++) {
                for (var j = 0; j < opFunctions.length; j++) {
                    var foundOne = (opFunctions[j].id == expectedFunctions[i]);
                    if (foundOne) return true;
                }
            }
        }
        return false;
    },
    checkDateTimeString: function(s, t) {
        var strDate = /^((\d{2}(([02468][048])|([13579][26]))\-((((0?[13578])|(1[02]))\-((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))\-((0?[1-9])|([1-2][0-9])|(30)))|(0?2\-((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0?[13578])|(1[02]))\-((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))\-((0?[1-9])|([1-2][0-9])|(30)))|(0?2\-((0?[1-9])|(1[0-9])|(2[0-8]))))))$/;
        var strTime = /^(((([0-1]?[0-9])|(2[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))?))$/;
        var strDT = /^((\d{2}(([02468][048])|([13579][26]))\-((((0?[13578])|(1[02]))\-((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))\-((0?[1-9])|([1-2][0-9])|(30)))|(0?2\-((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0?[13578])|(1[02]))\-((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))\-((0?[1-9])|([1-2][0-9])|(30)))|(0?2\-((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1]?[0-9])|(2[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))?))?$/;
        if (t == 1) return strDate.test(s);
        else if (t == 2) return strTime.test(s);
        else return strDT.test(s);
    },
    checkNumberString: function(n, t) {
        var s = n + "";
        if (s.length < 1) return false;
        else if (isNaN(s)) return false;
        if (t == 1) return /^-?\d+$/.test(s);
        else if (t == 2) return /^(-?\d+)(\.\d+)?$/.test(s);
        else if (t == 3) {
            return /^\d+$/.test(s) && (parseInt(s) != 0);
        } else return true;
    },
    redefineShowModalDialog: function() {
        var dialogFactory = jsloader.resolve('freequery.dialog.dialogFactory');
        var features2Obj = function(sFeatures, target) {
            if (!sFeatures) {
                return target;
            }
            target = target || {};
            var props = ('' + sFeatures).split(/\s*;\s*/);
            for (var i = 0,
            len = props.length; i < len; i++) {
                var pairs = props[i].split(/\s*:\s*/, 2);
                if (pairs.length == 2) {
                    var key = pairs[0];
                    var value = pairs[1];
                    target[key] = value;
                }
            }
            return target;
        };
        if ('undefined' == typeof window.showModalDialog || domutils.isIE11() || domutils.isChrome()) {
            window.windowShowModalDialog = window.windowShowModalDialog || window.showModalDialog;
            window.showModalDialog = function() {
                var dialogConfig = features2Obj(arguments[2], {
                    path: arguments[0],
                    size: dialogFactory.size.LARGE,
                    isFakedWinShowDialog: true
                });
                return dialogFactory.showDialog(dialogConfig, arguments[1]);
            };
            window.showModalDialog.isFaked = true;
        }
        if ('undefined' == typeof window.showModelessDialog || domutils.isIE11() || domutils.isChrome()) {
            window.windowShowModalDialog = window.windowShowModalDialog || window.showModalDialog;
            window.showModelessDialog = function() {
                var dialogConfig = features2Obj(arguments[2], {
                    path: arguments[0],
                    size: dialogFactory.size.LARGE,
                    isFakedWinShowDialog: true,
                    dialogType: 'modeless'
                });
                return dialogFactory.showDialog(dialogConfig, arguments[1]);
            };
            window.showModelessDialog.isFaked = true;
        }
    },
    redefineAlert: function() {
        if (domutils.isAndroid() || domutils.isIOS()) {
            return;
        }
        window.windowAlert = window.windowAlert || window.alert;
        window.alert = function(text, caption, flags) {
            if (window.bof_offline_xhr) {
                windowAlert(text);
                return;
            }
            var returnValue = 0;
            try {
                if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
                returnValue = modalWindow.open(text, caption, flags);
            } catch(ex) {}
            if (!returnValue && window.windowAlert != undefined) {
                try {
                    returnValue = window.windowAlert(text);
                } catch(e) {}
            }
            return returnValue;
        };
        if ('undefined' == typeof window.showModalDialog || 'undefined' == typeof window.showModelessDialog) {
            this.redefineShowModalDialog();
        }
    },
    check_effect: function(obj) {
        if (obj == "") {
            alert("宽或高输入不能为空");
            return false;
        }
        if (!isNaN(obj)) return true;
        if (isNaN(obj)) {
            if (obj.indexOf("px") != -1 && obj.indexOf("px") != 0) {
                var sub_obj_before = obj.substring(0, obj.indexOf("px"));
                var len = ("" + sub_obj_before).length + "px".length;
                if (!isNaN(sub_obj_before) && obj.length == len) return true;
            }
            if (obj.indexOf("%") != -1 && obj.indexOf("%") != 0) {
                sub_obj_before = obj.substring(0, obj.indexOf("%"));
                len = ("" + sub_obj_before).length + "%".length;
                if (!isNaN(sub_obj_before) && obj.length == len && eval(sub_obj_before) <= 100) return true;
            }
        }
        return false;
    },
    getClean: function(o) {
        var ret = o,
        b, k;
        if (o && ((b = Object.prototype.toString.call(o) === '[object Array]') || (Object.prototype.toString.call(o) === '[object Object]' && 'isPrototypeOf' in o))) {
            ret = b ? [] : {};
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    ret[k] = util.getClean(o[k]);
                }
            }
        }
        return ret;
    },
    getCatalogNodeLocation: function(id) {
        var result = new Array();
        var path = "";
        var name = "";
        var ret = this.remoteInvoke("CatalogService", "getCatalogElementPath", [id]);
        if (ret.succeeded && ret.result) {
            if (ret.result.length > 1) {
                for (var i = 0; i < ret.result.length - 1; i++) {
                    var alias = ret.result[i].alias;
                    if (alias == null || alias == "") alias = ret.result[i].name;
                    path = path + alias + " > ";
                }
                name = ret.result[ret.result.length - 1].alias || ret.result[ret.result.length - 1].name
            } else if (ret.result.length = 1) {
                name = ret.result[0].alias || ret.result[0].name
            }
        }
        result.push(path);
        result.push(name);
        return result;
    },
    getCharLength: function(s) {
        return ("string" == typeof s) ? s.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g, '00').length: 0;
    },
    getShortString: function(s, len, suffix) {
        var ret = "";
        if ("string" == typeof s) {
            len = len || 40;
            var p = 0,
            c = 0;
            for (; p < s.length && c < len; p++) {
                c++;
                if (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(s.charAt(p))) c++;
            }
            if (p > 0) {
                ret = s.substring(0, p);
                if (suffix && p < s.length) ret += suffix;
            }
        }
        return ret;
    },
    locateAction: function(actionIdPath) {
        var isFinished = false;
        if ("string" != typeof actionIdPath) return isFinished;
        var actionIds = actionIdPath.split("\.");
        if (actionIds.length < 1) return isFinished;
        var app = imports("bof.baseajax.common.Application").getInstance();
        var lastAction = app.mainFrameAction;
        if (!lastAction || !lastAction.isValid()) return isFinished;
        var len = actionIds.length;
        for (var i = 0; i < len; i++) {
            var actions = lastAction.actions;
            if (!actions || !actions.length) break;
            var action = null;
            var regex = new RegExp("\\." + actionIds[i] + "\$");
            for (var j = 0; j < actions.length; j++) {
                var act = actions[j];
                if (regex.test(act.className)) {
                    action = act;
                    break;
                }
            }
            if (!action || !action.isValid()) break;
            if (action.isOpenEnabled()) action.execute("open");
            lastAction = action;
            isFinished = (i == len - 1);
        }
        return isFinished;
    },
    compareVersion: function(v1, v2) {
        var a1 = v1.split(".");
        var a2 = v2.split(".");
        var l = a1.length > a2.length ? a2.length: a1.length;
        for (var i = 0; i < l; i++) {
            if (a1[i] - 0 > a2[i] - 0) return 1;
            else if (a1[i] - 0 < a2[i] - 0) return - 1;
        }
        return a1.length - a2.length;
    },
    getInnerText: function(html) {
        var isElement = (html && html.nodeType);
        var span = isElement ? html: document.createElement("SPAN");
        if (!isElement) span.innerHTML = html;
        if (domutils.isFirefox()) {
            function innerText(item) {
                var text = new Array();
                var child = item.firstChild;
                while (child) {
                    if (child.nodeType == 1) {
                        if (child.tagName == "BR") text.push('\n');
                        else text.push(innerText(child));
                    } else if (child.nodeType == 3) text.push(child.nodeValue);
                    child = child.nextSibling;
                }
                return text.join('');
            }
            return innerText(span);
        }
        return typeof span.textContent == "string" ? span.textContent: span.innerText;
    },
    isArray: function(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    },
    rebuildArray: function(o) {
        var arr;
        try {
            arr = [].slice.call(o, 0);
        } catch(err) {
            arr = [];
            for (var i = 0,
            length = o.length; i < length; i++) {
                var obj = o[i];
                var r = {};
                for (var p in obj) {
                    r[p] = obj[p];
                }
                arr.push(r);
            }
        }
        return arr;
    },
    isValidFileName: function(name) {
        return this.trim(name) ? !(/[\/\\\:\*\?\"\<\>\|]/g.test(name)) : false;
    },
    isImage: function(url) {
        var reg = /\.(jpg|bmp|gif|png)$/;
        return reg.test(url);
    },
    setSessionAttribute: function(key, value) {
        this.remoteInvoke("CommonService", "setSessionAttribute", [key, value]);
    },
    getSessionAttribute: function(key) {
        var ret = this.remoteInvokeEx("CommonService", "getSessionAttribute", [key]);
        if (ret) {
            return ret.result;
        }
    },
    arrayContains: function(array, item) {
        var length = array.length;
        if (length != 0) {
            for (var index = 0; index < length; index++) {
                if (array[index] == item) {
                    return index;
                }
            }
        }
        return - 1;
    },
    getFirstValue: function() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] !== null && arguments[i] !== undefined && arguments[i] !== "") {
                return arguments[i];
            }
        }
        return "";
    },
    checkNameValid: function(str, text) {
        return this.checkValid(str, text || "名称");
    },
    checkValid: function(nameStr, text) {
        if (!nameStr || "") {
            alert(text + "输入不允许为空!");
            return false;
        }
        var x = eval("/[\\\\/'\"*?%.><=:;()\\[\\]|]/") var ret = nameStr.match(x);
        if (ret) {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            if (ret == " ") {
                modalWindow.open(text + "输入中不允许包含非法字符' []()\*?%<>=:;|/\" '，该输入中包含非法字符：空格 。请更换为合法字符！")
            } else {
                modalWindow.open(text + "输入中不允许包含非法字符 ' []()\*?%<>=:;|/\" '，该输入中包含非法字符：" + ret + " 。请更换为合法字符！")
            }
            return false;
        }
        return true;
    },
    checkValid2: function(nameStr, text) {
        if (!nameStr || "") {
            alert(text + "输入不允许为空!");
            return false;
        }
        var x = eval("/[\\\\/\"*?%=:;\\[\\]|]/") var ret = nameStr.match(x);
        if (ret) {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            if (ret == " ") {
                modalWindow.open(text + "输入中不允许包含非法字符“[]\*?%=:;|/\"\”，该输入中包含非法字符：空格  。请更换为合法字符！")
            } else {
                modalWindow.open(text + "输入中不允许包含非法字符“[]\*?%=:;|/\"”，该输入中包含非法字符：" + ret + " 。请更换为合法字符！")
            }
            return false;
        }
        return true;
    },
    checkValidEx: function(nameStr, text) {
        var x = eval("/[\\\\/'\"*?%.=:;|]/");
        var ret = nameStr.match(x);
        if (ret) {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            modalWindow.open(text + "输入中不允许包含非法字符 ' \\*?%=:;|/\" '，该输入中包含非法字符：" + ret + " 。请更换为合法字符！") return false;
        }
        return true;
    },
    checkValidWithMsg: function(nameStr, text) {
        if (!nameStr) {
            return text + "输入不允许为空!";
        }
        var x = eval("/[\\\\/'\"*?%.><=:;()\\[\\]|]/");
        var ret = nameStr.match(x);
        if (ret) {
            if (ret == " ") {
                return text + "输入中不允许包含非法字符 ' \\*?%=:;|/\" '，该输入中包含非法字符：空格  。请更换为合法字符！";
            } else {
                return text + "输入中不允许包含非法字符 ' \\*?%=:;|/\" '，该输入中包含非法字符：" + ret + " 。请更换为合法字符！"
            }
        }
        return "";
    },
    dateFormat: function(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },
    openResourceInMobileApp: function(id, alias) {
        if (domutils.isIOS()) {
            var url = "invokemethod:openpage:" + id + ":" + alias;
            var notifyFrame = this.getInvokeIFrame();
            notifyFrame.contentWindow.document.location.href = url;
        } else if (domutils.isAndroid()) {
            localUtil.openResource(id, alias);
        } else {
            window.open("openresource.jsp?resid=" + id + "&refresh=true&showPath=false");
        }
    },
    notifyMobileOpenResourceById: function(id) {
        if (domutils.isAndroid()) console.log("invokemethod:onOpenQuery_" + id);
        else if (domutils.isIOS()) {
            var notifyFrame = this.getInvokeIFrame();
            notifyFrame.contentWindow.document.location.href = "invokemethod:onOpenQuery_" + id;
        }
    },
    notifyMobileSetParamsInfo: function(paramsInfo) {
        if (domutils.isAndroid()) console.log("invokemethod:onSetParamsInfo_" + paramsInfo);
        else if (domutils.isIOS()) {
            var notifyFrame = this.getInvokeIFrame();
            notifyFrame.src = "invokemethod:onSetParamsInfo_" + paramsInfo;
        }
    },
    getInvokeIFrame: function() {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        setTimeout(function() {
            document.body.removeChild(iframe);
        },
        10000);
        return iframe;
    },
    checkFunctionValid: function(op) {
        var opFunctions = registry.get("opFunctions");
        if (!opFunctions) {
            var w = window;
            try {
                do {
                    if (w.registry) opFunctions = w.registry.get("opFunctions");
                    if (opFunctions || w.parent == w) break;
                    w = w.parent;
                } while ( true );
            } catch(e) {}
        }
        if (!opFunctions) {
            var ret = util.remoteInvoke("UserService", "getAllFunctionsOfCurrentUser", []);
            if (ret && ret.succeeded && ret.result) {
                registry.put("opFunctions", ret.result);
                opFunctions = registry.get("opFunctions");
                window.registry = registry;
            }
        }
        if (opFunctions) {
            for (var i = 0; i < opFunctions.length; i++) {
                if (opFunctions[i].id == op) return true;
            }
        }
        return false;
    },
    getSystemConfig: function(key) {
        var systemConfigs = registry.get("systemConfigs");
        if (!systemConfigs) {
            var ret = this.remoteInvokeEx("ConfigClientService", "getSystemConfigs", []);
            if (ret) {
                systemConfigs = ret.result;
                registry.put("systemConfigs", systemConfigs);
            }
        }
        if (systemConfigs) {
            for (var i in systemConfigs) {
                if (systemConfigs[i] && systemConfigs[i].key == key) {
                    return systemConfigs[i].value;
                }
            }
        }
        return null;
    },
    toggleMaximize: function() {
        var ids = ["mainTopTr", "spacerTr", "mainVsTr", "mainLeftTd", "mainHsTd"];
        var isMax = document.body.maximizing = !document.body.maximizing;
        for (var i = 0,
        len = ids.length; i < len; i++) {
            var el = document.getElementById(ids[i]);
            if (el) {
                if (isMax) {
                    el.oldDisplay = el.style.display;
                    el.style.display = "none";
                } else {
                    el.style.display = el.oldDisplay;
                }
            }
        }
        return document.body.maximizing;
    },
    isOLAPParam: function(param) {
        if (!param) return false;
        if (param.id.indexOf("APPARAM.") == 0 || param.id.indexOf("_SMARTBI_") == 0) return true;
    },
    getOffset: function(obj) {
        var p = new Object();
        p.left = 0;
        p.top = 0;
        while (obj) {
            p.left += obj.offsetLeft - obj.scrollLeft;
            p.top += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
        }
        return p;
    },
    each: function(o, cb, s) {
        var n, l;
        if (!o) {
            return 0;
        }
        s = s || o;
        if (o.length !== undefined) {
            for (n = 0, l = o.length; n < l; n++) {
                if (cb.call(s, o[n], n, o) === false) return 0;
            }
        } else {
            for (n in o) {
                if (o.hasOwnProperty(n)) {
                    if (cb.call(s, o[n], n, o) === false) return 0;
                }
            }
        }
        return 1;
    },
    hasLicense: function(licenseName) {
        if (!this.licenses) {
            var ret = util.remoteInvokeEx("UserService", "getMyAccountInfo", []);
            if (ret && ret.succeeded && ret.result) {
                registry.put("opFunctions", ret.result.allFunctionsOfCurrentUser);
                ret = ret.result.licenses;
                if (ret.length < 1) {
                    throw new Error("License error!");
                } else {
                    util.licenses = util.licenses || [];
                    for (var i = 0; i < ret.length; i++) {
                        this.licenses[ret[i]] = true;
                    }
                    registry.put("licenses", util.licenses);
                }
            }
        }
        return this.licenses[licenseName];
    },
    getDenyIdsByLicense: function() {
        var tmpDenyIds = [];
        if (!util.licenses) {
            return tmpDenyIds;
        }
        if (!util.licenses.Query) {
            tmpDenyIds.push("RESOURCEAUDIT");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_FLEXIBLEREPORT");
            tmpDenyIds.push("BROWSE_FLEXIBLEREPORT");
            tmpDenyIds.push("CUSTOM_NOTICE");
        }
        if (!util.licenses.MetricReport) {
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_INDICATEREPORT");
            tmpDenyIds.push("BROWSE_METRICREPORT");
            tmpDenyIds.push("CREATE_METRICREPORT");
            tmpDenyIds.push("CREATEBIZREPORT_METRIC");
            tmpDenyIds.push("WRITE_BACK");
            tmpDenyIds.push("DATA_SAVE");
            tmpDenyIds.push("DATA_AUDIT");
            tmpDenyIds.push("AUDIT_ROLLBACK");
            tmpDenyIds.push("ARCHIVE");
            tmpDenyIds.push("ARCHIVE_ROLLBACK");
            tmpDenyIds.push("CURRENT_AUDIT_ROLLBACK");
            tmpDenyIds.push("CUSTOM_METRICMANAGER");
        }
        if (!util.licenses.ComplexReport) {
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_FREEREPORT");
            tmpDenyIds.push("BROWSE_FREEREPORT");
            tmpDenyIds.push("CREATEBIZREPORT_FREE");
        }
        if (!util.licenses.Writeback) {
            tmpDenyIds.push("BROWSE_FREEREPORT_SAVE");
            tmpDenyIds.push("BROWSE_FREEREPORT_DELCOLUMN");
            tmpDenyIds.push("BROWSE_FREEREPORT_DELROW");
            tmpDenyIds.push("BROWSE_FREEREPORT_APPENDCOLUMN");
            tmpDenyIds.push("BROWSE_FREEREPORT_APPENDROW");
        }
        if (!util.licenses.ComplexReport && !util.licenses.MetricReport) {
            tmpDenyIds.push("CREATEBIZREPORT");
            tmpDenyIds.push("BROWSE_BIZREPORT");
        }
        if (!util.licenses.Portal && !util.licenses.Chart && !util.licenses.Page) {
            tmpDenyIds.push("DASHBOARD");
        }
        if (!util.licenses.Page && !util.licenses.SpreadSheetReport) {
            tmpDenyIds.push("CUSTOM_PORTALMANAGER");
            tmpDenyIds.push("CUSTOM_PORTALMANAGER_PUBLICMANAGER");
            tmpDenyIds.push("CUSTOM_COMMONSETTINGS_PAGETHEMES");
        }
        if (!util.licenses.Chart) {
            tmpDenyIds.push("BROWSE_DASHBOARD");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_DASHBOARD");
        }
        if (!util.licenses.Map) {
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_DASHBOARMAP");
            tmpDenyIds.push("BROWSE_DMAP");
            tmpDenyIds.push("CUSTOM_COMMONSETTINGS_REGIONALMAP");
            tmpDenyIds.push("CUSTOM_COMMONSETTINGS_MAPINTERVALCOLORS");
        }
        if (!util.licenses.BI3Insight) {
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_MULTIDIMENSIONREPORT");
        }
        if (!util.licenses.Mobile) {
            tmpDenyIds.push("CUSTOM_PAGE_SCREENSHOT");
            tmpDenyIds.push("MANAGER_DEVICE_MANAGER");
        }
        if (!util.licenses.BPM) {
            tmpDenyIds.push("BPMPORTAL");
            tmpDenyIds.push("BROWSE_BPM");
            tmpDenyIds.push("CUSTOM_BPMCUSTOM");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_BPM");
            tmpDenyIds.push("MANAGE_BPMMANAGE");
        }
        if (!util.licenses.BPM && !util.licenses.DataImport) {
            tmpDenyIds.push("CUSTOM_DAQ");
        }
        if (!util.licenses.Insight) {
            tmpDenyIds.push("BROWSE_COMBINEDQUERY_INSIGHT");
            tmpDenyIds.push("BROWSE_FLEXIBLEREPORT_INSIGHT");
            tmpDenyIds.push("BROWSE_INSIGHT");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_INSIGHT");
        }
        if (!util.licenses.SpreadSheetReport) {
            tmpDenyIds.push("BROWSE_SPREADSHEET");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_SPREADSHEET");
        }
        if (!util.licenses.WizardQuery) {
            tmpDenyIds.push("BROWSE_COMBINEDQUERY");
            tmpDenyIds.push("CUSTOM_DISPLAYCUSTOM_COMBINEDQUERY");
        }
        return tmpDenyIds;
    },
    changeTdToFixSize: function(node, wDelta, hDelta) {
        var p = node;
        var width = p.clientWidth + (wDelta == undefined ? 0 : wDelta);
        var height = p.clientHeight + (hDelta == undefined ? 0 : hDelta);
        p.style.display = "inline-block";
        p.style.overflow = "auto";
        p.style.width = width + "px";
        p.style.height = height + "px";
    },
    rgbaToHexColor: function(rgbaColor) {
        var rgba = null;
        var result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(rgbaColor);
        if (result) {
            rgba = [parseInt(result[1]).toString(16), parseInt(result[2]).toString(16), parseInt(result[3]).toString(16), parseFloat(result[4], 10)];
        }
        result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(rgbaColor);
        if (result) {
            rgba = [parseInt(result[1]).toString(16), parseInt(result[2]).toString(16), parseInt(result[3]).toString(16)];
        }
        if (rgba != null) {
            if (rgba[0].length == 1) rgba[0] = "0" + rgba[0];
            if (rgba[1].length == 1) rgba[1] = "0" + rgba[1];
            if (rgba[2].length == 1) rgba[2] = "0" + rgba[2];
            if (rgba.length == 3) return {
                color: "#" + rgba.join('')
            };
            if (rgba.length == 4) return {
                alpha: rgba.splice(3, 1)[0] * 100,
                color: "#" + rgba.join('')
            };
        }
        return {
            color: null,
            alpha: null
        };
    },
    getRgbColor: function(hexColor, alpha) {
        var result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(hexColor);
        var rgb = null;
        if (result) {
            rgb = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
            if (typeof alpha != "undefined" && alpha != null) {
                alpha = parseInt(alpha);
                if (alpha >= 0 && alpha <= 100) {
                    rgb.push(alpha / 100);
                }
            }
            if (rgb.length == 3) return "rgb(" + rgb.join(',') + ")";
            if (rgb.length == 4) return "rgba(" + rgb.join(',') + ")";
        }
        return null;
    },
    getInverseColor: function(hexColor) {
        var newHexColor = "#ffffff";
        var result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(hexColor);
        if (result) {
            var r = 255 - parseInt(result[1], 16);
            var g = 255 - parseInt(result[2], 16);
            var b = 255 - parseInt(result[3], 16);
            var rgb = [r, g, b];
            var hexColorObj = this.rgbaToHexColor("rgb(" + rgb.join(',') + ")");
            if (hexColorObj && hexColorObj.color) newHexColor = hexColorObj.color;
        }
        return newHexColor;
    },
    encode: function() {
        var w = window,
        pw = w.parent != w ? w.parent: (w.opener != w ? w.opener: null),
        args;
        try {
            if (pw && pw.jsloader) {
                return pw.jsloader.resolve("freequery.common.util").encode;
            } else if ((args = w.dialogArguments) && typeof args != 'string') {
                var loader = null,
                len, arg;
                if ((len = args.length) && (arg = args[len - 1]) && arg != w) {
                    loader = arg.jsloader;
                } else if (args.alertDialog) {
                    loader = args.alertDialog.getJSLoader();
                }
                if (loader) return loader.resolve("freequery.common.util").encode;
            }
        } catch(e) {}
        if (window.bof_offline_xhr) return false;
        return true;
    } (),
    coder: function() {
        var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 47, 0, 110, 65, 69, 115, 43, 0, 102, 113, 0, 55, 49, 117, 78, 75, 74, 77, 57, 39, 109, 0, 0, 0, 0, 0, 0, 0, 79, 86, 116, 84, 97, 120, 72, 114, 99, 118, 108, 56, 70, 51, 111, 76, 89, 106, 87, 42, 122, 90, 33, 66, 41, 85, 0, 0, 0, 0, 121, 0, 40, 126, 105, 104, 112, 95, 45, 73, 82, 46, 71, 83, 100, 54, 119, 53, 48, 52, 68, 107, 81, 103, 98, 67, 50, 88, 0, 0, 0, 101, 0];
        var encodeArray = {};
        var decodeArray = {};
        for (var i = 0; i < array.length; i++) {
            var c = array[i];
            if (c) {
                var ic = String.fromCharCode(i);
                decodeArray[ic] = encodeArray[ic] = String.fromCharCode(c);
            }
        }
        decodeArray['/'] = '/';
        decodeArray['%'] = '%';
        function encode(data) {
            var dataArray = data.split('');
            for (var i = 0,
            len = dataArray.length; i < len; i++) {
                var e = encodeArray[dataArray[i]];
                dataArray[i] = e;
            }
            return "encode=" + dataArray.join('');
        };
        function decode(responseText) {
            if (responseText.length > 20000) return responseText;
            var responseArray = responseText.split('');
            for (var i = 0,
            len = responseArray.length; i < len; i++) {
                var d = decodeArray[responseArray[i]];
                if (d) responseArray[i] = d;
            }
            return responseArray.join('');
        };
        return {
            encode: encode,
            decode: decode
        };
    } (),
    jsonp: (function(win, doc, undef) {
        var counter = 0;
        var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
        function load(url, timer, errorFn) {
            var script = doc.createElement('script'),
            done = false;
            script.async = true;
            script.src = url;
            if (typeof errorFn === 'function') {
                script.onerror = function(ex) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = undef;
                    }
                    errorFn({
                        url: url,
                        event: ex
                    });
                };
            }
            script.onload = script.onreadystatechange = function() {
                var code = this.readyState;
                if (!done && (!code || code === 'loaded' || code === 'complete')) {
                    done = true;
                    if (timer) {
                        clearTimeout(timer);
                        timer = undef;
                    }
                    script.onload = script.onreadystatechange = null;
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    script = undef;
                }
            };
            head.insertBefore(script, head.firstChild);
        }
        return function(url, params, callback, opts) {
            params = params || {};
            opts = opts || {};
            var callbackName = opts.callbackName || 'callback';
            var timeout = opts.timeout != null ? opts.timeout: 60000;
            var context = opts.context || null;
            var uniqueName = callbackName + '_jp_' + (++counter);
            var queryStr = (url || '').indexOf('?') === -1 ? '?': '&';
            var timer, cleanup = function() {
                if (timer) {
                    clearTimeout(timer);
                }
                win[uniqueName] = timer = undef;
            };
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    queryStr += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
                }
            }
            queryStr += callbackName + '=' + uniqueName;
            win[uniqueName] = function(data) {
                cleanup();
                callback && callback.call(context, data);
            };
            if (timeout) {
                timer = setTimeout(function() {
                    win[uniqueName](new Error('Timeout'));
                },
                timeout);
            }
            load(url + queryStr, timer, opts.errorFn);
            return uniqueName;
        };
    })(window, document)
};;
util.__redefineAlert = domutils.redefineAlert;
util.redefineAlert = function() {
    if (domutils.isAndroid() || domutils.isIOS()) {
        return;
    }
    if (domutils.isChrome() && domutils.Browser.version == 30) {
        return;
    }
    window.windowAlert = window.windowAlert || window.alert;
    window.alert = function(text, caption, flags) {
        if (window.bof_offline_xhr) {
            windowAlert(text);
            return;
        }
        var returnValue = 0;
        try {
            if (!modalWindow) modalWindow = jsloader.resolve("freequery.common.modalWindow");
            returnValue = modalWindow.open(text, caption, flags);
        } catch(ex) {}
        if (!returnValue && window.windowAlert != undefined) {
            try {
                returnValue = window.windowAlert(text);
            } catch(e) {}
        }
        return returnValue;
    };
    if ('undefined' == typeof window.showModalDialog || 'undefined' == typeof window.showModelessDialog) {
        this.redefineShowModalDialog();
    }
}; ! @#$ % ^&*() var logger = (function(ns, win) {
    var exportWin = win;
    try {
        exportWin = (win.top != win && 'object' == typeof win.top.jsloader) ? win.top: win;
    } catch(e) {}
    var exportLogger = exportWin[ns];
    var doc = win.document,
    elWrapper, elList, elEnable, elCopy, elClear, elClose, logEnabled = typeof sessionStorage == "undefined" ? false: sessionStorage.getItem("logEnabled") == "true",
    profiler = {},
    msgBuff = [],
    isEven = false,
    IDs = {
        logger: 'blLogger',
        enable: 'blEnable'
    },
    addEvent = doc.addEventListener ?
    function(el, type, fn, capture) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, !!capture);
        }
    }: function(el, type, fn) {
        if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        }
    },
    removeEvent = doc.removeEventListener ?
    function(el, type, fn, capture) {
        if (el.removeEventListener) {
            el.removeEventListener(type, fn, !!capture);
        }
    }: function(el, type, fn) {
        if (el.detachEvent) {
            el.detachEvent('on' + type, fn);
        }
    };
    function initUI() {
        if (elWrapper && doc.getElementById(IDs.logger)) {
            return;
        }
        elWrapper = doc.createElement('DIV');
        elWrapper.id = IDs.logger;
        elWrapper.innerHTML = ['<div class="header">', ' <div class="left">', '  <label for="' + IDs.enable + '" title="logging enable"><input type="checkbox" id="' + IDs.enable + '">Log</label>', ' </div>', ' <div class="right">', '  <input type="button" value="Copy" title="copy all messages">', '  <input type="button" value="Clear" title="clear all messages">', '  <input type="button" value="Close" title="close">', ' </div>', '</div>', '<div class="main">', ' <ul></ul>', '</div>'].join('');
        var body = doc.getElementsByTagName('BODY')[0];
        body.appendChild(elWrapper);
        elList = elWrapper.getElementsByTagName('UL')[0];
        var elems = elWrapper.getElementsByTagName('INPUT');
        elEnable = elems[0];
        elCopy = elems[1];
        elClear = elems[2];
        elClose = elems[3];
        addEvent(elEnable, 'click',
        function() {
            logEnabled = elEnable.checked;
            if (typeof sessionStorage != "undefined") {
                sessionStorage.setItem("logEnabled", logEnabled ? "true": "false");
            }
        });
        addEvent(elCopy, 'click', copyMsgs);
        addEvent(elClear, 'click', clearMsgs);
        addEvent(elClose, 'click', hide);
        var Drag = (function() {
            var x0 = 0,
            y0 = 0,
            x1 = 0,
            y1 = 0,
            movable = false,
            left, top;
            var win = elWrapper,
            elem = win.firstChild;
            return {
                elem: elem,
                start: function(ev) {
                    ev = ev || win.event;
                    if (ev && (ev.button == 1 || ev.which == 1) && elem) {
                        if (elem.setCapture) {
                            elem.setCapture();
                        }
                        x0 = ev.x ? ev.x: ev.pageX;
                        y0 = ev.y ? ev.y: ev.pageY;
                        x1 = parseInt(win.offsetLeft, 10);
                        y1 = parseInt(win.offsetTop, 10);
                        movable = true;
                    }
                },
                move: function(ev) {
                    ev = ev || win.event;
                    if (ev && movable && elem) {
                        left = x1 + (ev.x ? ev.x: ev.pageX) - x0;
                        top = y1 + (ev.y ? ev.y: ev.pageY) - y0;
                        if (!isNaN(left)) {
                            win.style.left = left + 'px';
                        }
                        if (!isNaN(top)) {
                            win.style.top = top + 'px';
                        }
                    }
                },
                stop: function(ev) {
                    if (movable && elem) {
                        if (elem.releaseCapture) {
                            elem.releaseCapture();
                        }
                        movable = false;
                    }
                }
            };
        })();
        addEvent(Drag.elem, 'mousedown', Drag.start);
        addEvent(Drag.elem, 'mouseup', Drag.stop);
        addEvent(Drag.elem, 'mousemove', Drag.move);
    }
    function addToUI(msg, type) {
        type = type || 'log';
        msg = '[' + (type + '   ').substr(0, 5).toUpperCase().replace(/[ ]/g, '&nbsp;') + ']&nbsp;' + msg;
        if (elList) {
            var newMsg = doc.createElement('LI');
            newMsg.className = isEven ? 'even': 'odd';
            isEven = !isEven;
            newMsg.innerHTML = '<span class="' + type + '">' + msg + '</span>';
            elList.appendChild(newMsg);
            elList.scrollTop = 1000000;
        }
    }
    function addMsg(msg, type) {
        if (!logEnabled) {
            return;
        }
        if (isVisible()) {
            addToUI(msg, type);
        } else {
            msgBuff.push([msg, type]);
        }
    }
    function getInnerText(html) {
        var isElement = (html && html.nodeType);
        var span = isElement ? html: doc.createElement("SPAN");
        if ('undefined' == typeof span.innerText && 'object' == typeof HTMLElement) {
            HTMLElement.prototype.__defineGetter__("innerText",
            function() {
                return this.textContent;
            });
            HTMLElement.prototype.__defineSetter__("innerText",
            function(sText) {
                this.textContent = sText;
            });
        }
        if (!isElement) {
            span.innerHTML = html;
        }
        return span.innerText;
    }
    function copyMsgs() {
        if (elList) {
            var data = getInnerText(elList);
            win.clipboardData.setData('Text', data);
        }
    }
    function clearMsgs() {
        if (elList) {
            elList.innerHTML = '';
        }
        msgBuff.length = 0;
        isEven = false;
    }
    function isVisible() {
        return (elWrapper && elWrapper.clientWidth && elWrapper.style.display == 'block') || false;
    }
    function hide() {
        if (elWrapper) {
            elWrapper.style.display = 'none';
        }
    }
    function show() {
        initUI();
        if (elWrapper) {
            elWrapper.style.display = 'block';
        }
        if (elEnable) {
            elEnable.checked = logEnabled;
        }
        while (msgBuff.length) {
            var info = msgBuff.shift();
            addToUI(info[0], info[1]);
        }
    }
    function readKey(ev) {
        ev = ev || win.event;
        var code = 113;
        if (ev && ev.keyCode == code && exportLogger) {
            var visible = exportLogger._isVisible();
            if (visible && ev.shiftKey && ev.altKey) {
                exportLogger._clearMsgs();
            } else if (ev.shiftKey && !ev.altKey && ev.ctrlKey) {
                if (visible) {
                    exportLogger._hide();
                } else {
                    exportLogger._show();
                }
            }
        }
    }
    function winLoaded() {
        addEvent(doc, 'keyup', readKey);
        addEvent(win, 'unload', winUnloaded);
        removeEvent(win, 'load', winLoaded);
    }
    function winUnloaded() {
        removeEvent(doc, 'keyup', readKey);
        removeEvent(win, 'unload', winUnloaded);
        if (win[ns]) {
            win[ns] = null;
            try {
                delete win[ns];
            } catch(e) {}
        }
    }
    if (!exportLogger || win != exportWin) {
        addEvent(doc, 'keyup', readKey);
        addEvent(win, 'unload', winUnloaded);
    }
    if (!exportLogger) {
        exportLogger = exportWin[ns] = {
            _isVisible: isVisible,
            _clearMsgs: clearMsgs,
            _show: show,
            _hide: hide,
            log: addMsg,
            clear: clearMsgs,
            profile: function() {
                var currTime = new Date();
                if (logEnabled) {
                    var args = [].slice.apply(arguments),
                    l = args.length,
                    i = 0,
                    m = {},
                    label,
                    s;
                    for (; i < l; i++) {
                        label = args[i];
                        if (label && !m[label]) {
                            if (profiler[label]) {
                                s = [label, ': ', currTime - profiler[label], 'ms'].join('');
                                addMsg(s, 'profile');
                                delete profiler[label];
                            } else {
                                profiler[label] = currTime;
                            }
                            m[label] = true;
                        }
                    }
                }
                return currTime;
            },
            toggle: function() {
                if (isVisible()) {
                    hide();
                } else {
                    show();
                }
            },
            getEnabled: function() {
                return logEnabled;
            },
            setEnabled: function(enabled) {
                logEnabled = ('boolean' === typeof enabled) ? enabled: false;
                if (elEnable) {
                    elEnable.checked = logEnabled;
                }
            }
        };
    }
    return exportLogger;
})('boflog', window); ! @#$ % ^&*()