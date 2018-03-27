
var CatalogTree=jsloader.resolve("freequery.tree.CatalogTree");var util=jsloader.resolve("freequery.common.util");var CatalogDisplayCommandFactory=jsloader.resolve("freequery.catalogdisplay.CatalogDisplayCommandFactory");var Configuration=imports("Configuration").getInstance();var CatalogDisplayTree=function(parent){CatalogDisplayTree.superclass.constructor.call(this,parent);this.filterTypes=["DEFAULT_TREENODE","SELF_TREENODE","SIMPLE_REPORT","METRIC_REPORT","URL","FILE_RESOURCE","BI3OLAP_REPORT","FREE_REPORT","Dashboard","DashboardMap","OLAP_REPORT"];var conf=app.getPatchedConfiguration();if(conf.extensionPoints.Browse.catalogDisplayTreeFilterTypes)
this.filterTypes=this.filterTypes.concat(conf.extensionPoints.Browse.catalogDisplayTreeFilterTypes);var result=util.remoteInvokeEx("ConfigClientService","getConfigValue",["QUERY_BROWSER_TREE_PURVIEW"]);if(result&&result.result)
this.treePurview=result.result;this.checkHiddenInBrowse=true;this.needSearch=true;this.addListener(this.rootPane,"contextmenu",this.doOnCatalogDisplayTreeContextMenu,this);};lang.extend(CatalogDisplayTree,CatalogTree);CatalogDisplayTree.prototype.render=function(rootNodeId){this.actionId=rootNodeId;if(!this._isInit){this.rootNode.removeAllChildren();this.rootPane.setAttribute('bofClassName','freequery.catalogdisplay.CatalogDisplayTree');var method,params,rootId=rootNodeId||"";if(this.treePurview){method="getChildElementsWithPurviewType";params=[rootId,this.treePurview];}else{method="getChildElements";params=[rootId];}
var ret=util.remoteInvokeEx("CatalogService",method,params);if(ret&&ret.succeeded&&ret.result){for(var i=0;i<ret.result.length;i++){if(this.isTypeMatch(ret.result[i].type)&&!!ret.result[i].showOnPC)
this.rootNode.addCatalogTreeNode(ret.result[i]);}
this.rootNode._id=rootId;this.rootNode._isInitChild=true;}
if(this.rootNode&&this.rootNode.firstChild){this.selectNode(this.rootNode.firstChild,true);}
this._isInit=true;}};CatalogDisplayTree.prototype.getMenuHandlers=function(){return Configuration.extensionPoints.CatalogTree.catalogDisplayHandler;}
CatalogDisplayTree.prototype.getCommandFactory=function(){return new CatalogDisplayCommandFactory(this.actionId);};CatalogDisplayTree.prototype.isTypeMatch=function(type){if(this.filterTypes){if(typeof this.filterTypes=="string"){if(type==this.resType)
return true;return type==this.filterTypes;}
else{for(var x in this.filterTypes)
if(this.filterTypes[x]==type)
return true;return false;}}
if(this.denyTypes){if(typeof this.denyTypes=="string")
return type!=this.denyTypes;else{for(var x in this.denyTypes)
if(this.denyTypes[x]==type)
return false;return true;}}
return true;};CatalogDisplayTree.prototype.canDrag=function(node){return false;};CatalogDisplayTree.prototype.doOnCatalogDisplayTreeContextMenu=function(e){var e=window.event||e;var srcElem=e&&(e.srcElement||e.target);if(srcElem&&srcElem.firstChild){var bofClassName='freequery.catalogdisplay.CatalogDisplayTree';var rootPane=srcElem.getElementsByTagName('span')[0];if(!rootPane||rootPane.getAttribute('bofClassName')!=bofClassName)
return;}else{return;}
if(this.popupMenu){this.initMenuHandlers();if(this.popupMenu.__handlers){for(var i=0;i<this.popupMenu.__handlers.length;i++){if(this.popupMenu.__handlers[i].clearMenuState)
this.popupMenu.__handlers[i].clearMenuState();}
var node={_id:this.actionId,_type:'PUBLISH_ROOT_TREE_NODE'};for(var i=0;i<this.popupMenu.__handlers.length;i++){this.popupMenu.__handlers[i].resetMenuState(node);}
this.popupMenu.popup(e);}}
domutils.stopEvent(e);};