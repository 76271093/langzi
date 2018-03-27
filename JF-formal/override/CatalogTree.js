
var TreeView=jsloader.resolve("freequery.tree.TreeView");var CatalogTreeNode=jsloader.resolve("freequery.tree.CatalogTreeNode");var util=jsloader.resolve("freequery.common.util");var CustomEvent=jsloader.resolve("freequery.lang.CustomEvent");var modalWindow=jsloader.resolve("freequery.common.modalWindow");var PopupMenu=null;var dialogFactory=null;var Configuration=imports("Configuration").getInstance();var CatalogTree=function(parent){CatalogTree.superclass.constructor.call(this,parent);this.rootNode._id="";this.dynamicLoad=true;this.dragEnabled=true;this.checkHiddenFilter=true;this.onNodeInitComplete=new CustomEvent("nodeInitComplete",this);this.onDblClick.subscribe(this.doOnNodeDblClick,this);this.onDragDrop.subscribe(this.doOnCatalogDragDrop,this);this.onDblClickNode=new CustomEvent("dblClick",this);this.addListener(this.rootPane,"keydown",this.doOnCatalogTreeKeyDown,this);};lang.extend(CatalogTree,TreeView);CatalogTree.prototype.doOnCatalogTreeKeyDown=function(e){if(e.keyCode==67&&e.ctrlKey){var node=this.getTreeNode(e.target);if(Configuration.extensionPoints.CatalogTree.copyableTypes&&node&&Configuration.extensionPoints.CatalogTree.copyableTypes[node._type]){this.doCmd("COPY");}}
if(e.keyCode==86&&e.ctrlKey){var node=this.getTreeNode(e.target);if(Configuration.extensionPoints.CatalogTree.copyableTypes&&node&&this.copyedNode){var acceptTypes=Configuration.extensionPoints.CatalogTree.copyableTypes[node.tree.copyedNode._type];if(acceptTypes){if(acceptTypes===true){var srcParentType=null;var srcType=node.tree.copyedNode._type;if(node.tree.copyedNode.parentNode)
srcParentType=node.tree.copyedNode.parentNode._type;var destType=node._type;if(srcParentType==destType||(srcType=="PAGE"&&destType=="PAGE")||(srcParentType=="DEFAULT_TREENODE"&&destType=="SELF_TREENODE")||(srcParentType=="SELF_TREENODE"&&destType=="DEFAULT_TREENODE")||(srcParentType=="PUBLIC_PAGES"&&destType=="SELF_PAGES")||(srcParentType=="SELF_PAGES"&&destType=="PUBLIC_PAGES"))
{this.doCmd("PASTE");}}}}}}
CatalogTree.prototype.destroy=function(){if(this.popupMenu&&this.popupMenu.__handlers){for(var i=0;i<this.popupMenu.__handlers.length;i++)
this.popupMenu.__handlers[i].destroy();this.popupMenu.__handlers=null;}
if(this.__dragDropHandlers){for(var i=0;i<this.__dragDropHandlers.length;i++)
this.__dragDropHandlers[i].destroy();this.__dragDropHandlers=null;}
CatalogTree.superclass.destroy.call(this);}
CatalogTree.prototype.createTreeNode=function(text,level,mayHasChild,parent,id){return new CatalogTreeNode(text,level,mayHasChild,parent,id);};CatalogTree.prototype.render=function(id){if(!this._isInit){if(!id)
this.rootNode.setExpanded(true);else{var result=util.remoteInvoke("CatalogService","getCatalogElementById",[id]);if(result.succeeded){this.rootNode.removeAllChildren();this.rootNode.addCatalogTreeNode(result.result);this.rootNode._isInitChild=true;this.rootNode._id=id;this.rootNode.setExpanded(true);}else
modalWindow.showServerError(result);}
this._isInit=true;}};CatalogTree.prototype.expandToId=function(id){var ret=util.remoteInvoke("CatalogService","getCatalogElementPath",[id]);if(ret.succeeded){var oldDynamicLoad=this.dynamicLoad;this.dynamicLoad=false;var node=this.rootNode;var fromIndex=0;if(ret.result===undefined){return null;}
if(this.rootNode._id){var found=false;for(fromIndex=0;fromIndex<ret.result.length&&!found;fromIndex++)
if(this.rootNode._id==ret.result[fromIndex].id){found=true;}}
if(found==false)
fromIndex=0;for(var i=fromIndex;i<ret.result.length;i++){var tmp=node.getChildNodeByNodeId(ret.result[i].id);if(tmp==null)
continue;node.setExpanded(true);node=tmp;}
this.selectNode(node);this.dynamicLoad=oldDynamicLoad;return node;}
return null;};CatalogTree.prototype.refreshNode=function(id){if(this.nodes[id]!=null){this.nodes[id].refreshChildren();this.nodes[id].setExpanded(true);return;}
var ret=util.remoteInvoke("CatalogService","getCatalogElementPath",[id]);if(ret.succeeded&&ret.result){var oldDynamicLoad=this.dynamicLoad;this.dynamicLoad=false;var node=this.rootNode;var fromIndex=0;if(this.rootNode._id){var found=false;for(fromIndex=0;fromIndex<ret.result.length&&!found;fromIndex++)
if(this.rootNode._id==ret.result[fromIndex].id){found=true;}}
for(var i=fromIndex;i<ret.result.length-1;i++){var tmp=node.getChildNodeByNodeId(ret.result[i].id);if(tmp==null)
return;node.setExpanded(true);node=tmp;}
node.refreshChildren();node.setExpanded(true);this.dynamicLoad=oldDynamicLoad;}};CatalogTree.prototype.getMenuHandlers=function(){return Configuration.extensionPoints.CatalogTree.popupMenuHandler;}
CatalogTree.prototype.initMenuHandlers=function(){this.initPopupMenu();if(this.popupMenu&&!this.popupMenu.__handlers){var handlerList=this.getMenuHandlers()||[];var __handlers=new Array();for(var i=0,len=handlerList.length;i<len;i++){var clz=jsloader.resolve(handlerList[i].className);var handler=new clz(this.popupMenu);__handlers.push(handler);handler.initMenu();}
this.popupMenu.__handlers=__handlers;}}
CatalogTree.prototype.doOnContextMenu=function(e){this.initPopupMenu();if(this.popupMenu&&this.doOnPopupMenu){if(this.doOnPopupMenu(e)){this.popupMenu.popup(e);}}
domutils.stopEvent(e);if(domutils.isFirefox()){var node=this.getTreeNode(e.target);if(node!=null)
node.doOnTextSpanMouseDown(e);}}
CatalogTree.prototype.initPopupMenu=function(){if(!PopupMenu){PopupMenu=jsloader.resolve("freequery.menu.PopupMenu");}
if(!this.popupMenu){this.popupMenu=new PopupMenu(document.body,this);}}
CatalogTree.prototype.doOnPopupMenu=function(){if(!this.selectedNode)
return false;this.initMenuHandlers();if(this.popupMenu&&this.popupMenu.__handlers){for(var i=0;i<this.popupMenu.__handlers.length;i++){if(this.popupMenu.__handlers[i].clearMenuState)
this.popupMenu.__handlers[i].clearMenuState();}
for(var i=0;i<this.popupMenu.__handlers.length;i++){this.popupMenu.__handlers[i].resetMenuState(this.selectedNode);}}
if(this.popupMenu.changeManagerM){this.selectedNode.aliaseditable=this.popupMenu.changeManagerM.getVisibility();this.popupMenu.changeManagerM.setVisibility(false);}else{this.selectedNode.aliaseditable=false;}
this.selectedNode.aliaseditable=true;return true;};CatalogTree.prototype.deleteSelectedNode=function(cmd){};CatalogTree.prototype.doCheckFolderDelete=function(node){if(!node.parentNode)
return false;if(node._type=="DEFAULT_TREENODE"){if(this.isBusinessView(node.parentNode._type)||this.isTable(node.parentNode._type))
return true;}
if(node.parentNode._type!=node._type)
return false;return true;};CatalogTree.prototype.canDeleteBussinessViewFolder=function(node){if(node._type=="DEFAULT_TREENODE"){if(!node.parentNode)
return false;if(this.isBusinessView(node.parentNode._type)){var childNode=node.firstChild;if(childNode){return false;}else{var ret=result=util.remoteInvoke("CatalogService","getChildElements",[node._id]);if(ret&&ret.succeeded){if(ret.result&&ret.result.length>0){return false;}}}}}
return true;};CatalogTree.prototype.doDelete=function(node,functionType){switch(node._type){case"PARAMS":case"CALC_FIELDS":case"BUSINESS_THEMES":case"SELF_TREENODE":case"JUMPRULES":case"SCHEDULETASKS":case"MACROS":case"TRANSFORMRULES":case"ORDERRULES":case"USER_PROPERTIES":case"DATAFORMATS":case"DEFAULT_TREENODE":if(!this.doCheckFolderDelete(node)){alert("内置节点不允许删除");return false;}
if(!this.canDeleteBussinessViewFolder(node)){alert("请先将该文件夹下的该字段移除!");return false;}}
var ret=util.remoteInvokeEx("CatalogService","isCatalogElementAccessible",[node._id,"DELETE"]);if(!ret)return;if(!ret.result){alert("您对该资源没有\"删除\"拥有的权限！");return;}
if(functionType!=null){var ret=util.remoteInvoke("UserService","isCurUserFuncTypeAccessible",[functionType]);if(ret.succeeded){if(!ret.result){alert("您无使用该功能的权限！");return false;}}else{modalWindow.showServerError(ret);return false;}}
var showRelative=false;var ret=util.remoteInvokeEx("MetadataService","getIndexStatus",[]);if(ret&&ret.succeeded){if(ret.result!="INVALID"){if(ret.result=="EMPTY"){alert("索引信息为空，找不到影响资源，请联系管理员重建索引！");}else
showRelative=true;}else{alert("索引服务状态不正常！\n请确认索引保存目录是否正确设置，或尝试重启服务器！");}}
if(node._type=="FILE_RESOURCE")
showRelative=false;if(showRelative){if(!dialogFactory)
dialogFactory=jsloader.resolve("freequery.dialog.dialogFactory");var dialogConfig={};dialogConfig.title="删除资源";dialogConfig.size=dialogFactory.size.LARGE;dialogConfig.fullName="bof.metadata.RefResourceDialog";dialogFactory.showDialog(dialogConfig,[node],this.doDeleteCallback,this);return false;}else if(modalWindow.open("确认要删除 '"+node.text+"' 吗？","资源树",modalWindow.MB_YESNO|modalWindow.MB_ICONQUESTION)!=modalWindow.ID_YES)
return false;var ret=util.remoteInvoke("CatalogService","deleteCatalogElement",[node._id]);if(ret.succeeded){return true;}else{if(ret.retCode=="UNKOWN_ERROR"){modalWindow.showServerError("无法删除该资源");}else{modalWindow.showServerError(ret);}
return false;}};CatalogTree.prototype.doDeleteCallback=function(flag,node){if(flag){var ret=util.remoteInvoke("CatalogService","deleteCatalogElement",[node._id]);if(ret.succeeded){node.parentNode.refreshChildren();return true;}else{if(ret.retCode=="UNKOWN_ERROR"){modalWindow.showServerError("无法删除该资源");}else{modalWindow.showServerError(ret);}
return false;}}}
CatalogTree.prototype.doCmd=function(cmd){if(!this.commandFactory)
this.commandFactory=this.getCommandFactory();this.initMenuHandlers();if(this.popupMenu&&this.popupMenu.__handlers){for(var i=0;i<this.popupMenu.__handlers.length;i++)
this.popupMenu.__handlers[i].doCmd(this.selectedNode,cmd);}};CatalogTree.prototype.getCommandFactory=function(){return null;};CatalogTree.prototype.doOnNodeDblClick=function(tree,node){this.onDblClickNode.fire(tree,node);this.initMenuHandlers();this.doCmd("OPEN");};CatalogTree.prototype.getDragDropHandler=function(){var Configuration=imports("Configuration").getInstance();return Configuration.extensionPoints.CatalogTree.dragDropHandler;}
CatalogTree.prototype.canDrag=function(node){if(!this.dragEnabled)
return false;if(util.transferData().srcType!="node"||util.transferData().srcElement!=this||util.transferData().dataNodes.length!=1)
return false;if(util.transferData().dataNodes[0].id==node._id)
return false;var childNode=node.firstChild;while(childNode){if(childNode._id==util.transferData().dataNodes[0].id)
return false;childNode=childNode.nextSibling;}
if(!this.__dragDropHandlers){var h=new Array();var handler=this.getDragDropHandler();if(handler){for(var i=0;i<handler.length;i++){var clz=jsloader.resolve(handler[i].className);h[i]=new clz(this);}}
this.__dragDropHandlers=h;}
for(var i=0;i<this.__dragDropHandlers.length;i++){var ret=this.__dragDropHandlers[i].canDrag(node);if(typeof ret!="undefined"){return ret;}}
if(node._type!="USER_PROPERTIES"&&node._type!="USER_PROPERTIE"&&node._type!="CALC_FIELDS"&&node._type!="PARAMS"&&node._type!="FILTERS"&&node._type!="BUSINESS_THEMES"&&node._type!="JUMPRULES"&&node._type!="MACROS"&&node._type!="TRANSFORMRULES"&&node._type!="DEFAULT_TREENODE"&&node._type!="SELF_TREENODE"&&node._type!="PUBLIC_PAGES"&&node._type!="SELF_PAGES"&&node._type!="PAGE"&&node._type!="PAGE_INTERACTS"&&node._type!="TASKS"&&node._type!="SCHEDULES"&&node._type!="AP_WARNING_STYLE_SETTTING"&&node._type!="CUBECUSTOMMEMBERS"&&node._type!="CUBENAMEDSETS"&&node._type!="ORDERRULES"&&node._type!="DATASOURCES"&&node._type!="PUBLISH_THEMES")
return false;var type=util.transferData().dataNodes[0].type;var id=util.transferData().dataNodes[0].id;if(type=="DATASOURCE"||type=="JAVA_DATASOURCE"||type=="UNIONDATASOURCE"||type=="METRICDATASOURCE"||type=="OLAP_DATASOURCE")
return node._type=="DATASOURCES";if(type=="PARAM"||type=="OLAP_PARAM")
return node._type=="PARAMS";if(type=="CALC_FIELD")
return node._type=="CALC_FIELDS";if(type=="FILTER")
return node._type=="FILTERS";if(type=="BUSINESS_THEME")
return node._type=="BUSINESS_THEMES";if(type=="CALC_FIELDS"||type=="PARAMS"||type=="FILTERS"||type=="BUSINESS_THEMES"||type=="JUMPRULES"||type=="MACROS"||type=="TRANSFORMRULES"||type=="USER_PROPERTIES"||type=="TASKS"||type=="SCHEDULES"||type=="CUBECUSTOMMEMBERS"||type=="CUBENAMEDSETS"||type=="DEFAULT_TREENODE"||type=="SELF_TREENODE"||type=="AP_WARNING_STYLE_SETTTING"||type=="ORDERRULES"){return node._type==type;}
if(type=="USER_PROPERTY")
return node._type=="USER_PROPERTIES";if(type=="JUMPRULE")
return node._type=="JUMPRULES";if(type=="MACRO")
return node._type=="MACROS";if(type=="TRANSFORMRULE")
return node._type=="TRANSFORMRULES";if(type=="ORDERRULE")
return node._type=="ORDERRULES";if(type=="PUBLISH_THEME")
return node._type=="PUBLISH_THEMES"&&node._id!="PUBLISH_THEMES";if(type=="BUSINESS_VIEW"||type=="TEXT_BUSINESS_VIEW"||type=="JAVA_BUSINESS_VIEW"||type=="RAWSQL_BUSINESS_VIEW"||type=="SIMPLE_REPORT"||type=="PROC_BUSINESS_VIEW"||type=="URL"||type=="FILE_RESOURCE"||type=="BI3OLAP_REPORT"||type=="METRIC_REPORT"||type=="FREE_REPORT"||type=="Dashboard"||type=="DashboardMap"||type=="OLAP_REPORT"||type=="SPREADSHEET_REPORT"||type=="INSIGHT"||type=="COMBINED_QUERY"||type=="OFFICE_REPORT"||type=="PAGE"){var dragNodeParentNode=this.nodes[util.transferData().dataNodes[0].id];if(dragNodeParentNode&&dragNodeParentNode.parentNode){if(node._type=="DEFAULT_TREENODE"||node._type=="SELF_TREENODE"){return(dragNodeParentNode.parentNode._type=="DEFAULT_TREENODE"||dragNodeParentNode.parentNode._type=="SELF_TREENODE");}else{return node._type==dragNodeParentNode.parentNode._type;}}}
if(type=="SCHEDULE")
return node._type=="SCHEDULES";if(type=="TASK")
return node._type=="TASKS";if(type=="OLAP_WARNING_STYLE"){return node._type=="AP_WARNING_STYLE_SETTTING";}
if(type=="CUSTOMMEMBER"){return node._type=="CUBECUSTOMMEMBERS";}
if(type=="NAMEDSET"){return node._type=="CUBENAMEDSETS";}
return false;}
CatalogTree.prototype.doOnCatalogDragDrop=function(tree,e,node){var type=util.transferData().dataNodes[0].type;var srcNodeId=util.transferData().dataNodes[0].id;if(type=="CALC_FIELDS"||type=="CALC_FIELD"||type=="FILTERS"||type=="FILTER"){if(util.getDataSourceIdByNodeId(srcNodeId)!=util.getDataSourceIdByNodeId(node._id)){alert("源节点与目标节点不在同一个数据库中");return false;}}
if(type=="CUBECUSTOMMEMBERS"||type=="CUSTOMMEMBER"||type=="CUBENAMEDSETS"||type=="NAMEDSET"){if(this.getCubeIdByNodeId(srcNodeId)!=this.getCubeIdByNodeId(node._id)){alert("源节点与目标节点不在同一个CUBE中");return false;}}
if(modalWindow.open("确认要将\""+util.transferData().dataNodes[0].label+"\"移动到\""+node.text+"\"中吗","资源树",modalWindow.MB_YESNO|modalWindow.MB_ICONQUESTION)!=modalWindow.ID_YES)
return false;var transferData=util.transferData();if(transferData.srcType=="node"&&transferData.srcElement==this){var oldDynamicLoad=this.dynamicLoad;this.dynamicLoad=false;for(var i=0;i<transferData.dataNodes.length;i++){var nodeIdToMove=transferData.dataNodes[i].id;var nodeToMove=this.nodes[nodeIdToMove];var ret=util.remoteInvoke("CatalogService","moveCatalogElement",[nodeIdToMove,node._id]);if(!ret.succeeded)
modalWindow.showServerError(ret);else
nodeToMove.parentNode.refreshChildren();}
var tmpNode=this.nodes[node._id];if(tmpNode)
tmpNode.refreshChildren();this.dynamicLoad=oldDynamicLoad;domutils.preventDefault(e);}};CatalogTree.prototype.changeNodeAlias=function(succeed,node,alias,desc){if(!succeed)
return;var result=util.remoteInvokeEx("CatalogService","changeAlias",[node._id,alias,desc]);if(result){node.setText(alias?alias:node._name);node._alias=alias;node._desc=desc;}};CatalogTree.prototype.getCubeIdByNodeId=function(id){var ret=util.remoteInvoke("OlapMetadataService","getCubeIdByTreeId",[id]);if(!ret.succeeded){return null;}else if(ret.result){return ret.result;}else{return null;}};CatalogTree.prototype.isBusinessView=function(type){if(type!="BUSINESS_VIEW"&&type!="RAWSQL_BUSINESS_VIEW"&&type!="TEXT_BUSINESS_VIEW"&&type!="PROC_BUSINESS_VIEW"&&type!="JAVA_BUSINESS_VIEW")
return false;else
return true;}
CatalogTree.prototype.isTable=function(type){if(type!="BASETABLE"&&type!="BASEVIEW"&&type!="BASEPROCEDURE")
return false;else
return true;}