
var TreeNode=jsloader.resolve("freequery.tree.TreeNode");var util=jsloader.resolve("freequery.common.util");var modalWindow=jsloader.resolve("freequery.common.modalWindow");var TransferDataNode=null;var CatalogTreeNode=function(text,level,mayHasChild,parent,id){CatalogTreeNode.superclass.constructor.call(this,text,level,mayHasChild,parent,id);};lang.extend(CatalogTreeNode,TreeNode);CatalogTreeNode.prototype.isTypeMatch=function(type){var tmpDenyTypes=[];tmpDenyTypes.push("DATATYPE_REF_PARAM");if(util.licenses){if(!util.licenses.Query){tmpDenyTypes.push("SIMPLE_REPORT");}
if(!util.licenses.MetricReport){tmpDenyTypes.push("METRIC_REPORT");tmpDenyTypes.push("METRICDATASOURCE");}
if(!util.licenses.ComplexReport){tmpDenyTypes.push("FREE_REPORT");}
if(!util.licenses.Chart){tmpDenyTypes.push("Dashboard");}
if(!util.licenses.Map){tmpDenyTypes.push("DashboardMap");tmpDenyTypes.push("MAPAREA_MANAGE");tmpDenyTypes.push("MAP_INTERVALCOLORS");}
tmpDenyTypes.push("PUBLIC_PAGES");tmpDenyTypes.push("SELF_PAGES");if(!util.licenses.Page){tmpDenyTypes.push("PAGE_THEMES");}
if(!util.licenses.BI3Insight){tmpDenyTypes.push("BI3OLAP_REPORT");}
if(!util.licenses.Analysis){tmpDenyTypes.push("OLAP_DATASOURCE");tmpDenyTypes.push("OLAP_REPORT");tmpDenyTypes.push("OLAP_PARAM");tmpDenyTypes.push("MDXTEMPLATES");tmpDenyTypes.push("MDXTEMPLATE");}
if(!util.licenses.Analysis&&!util.licenses.Insight){tmpDenyTypes.push("AP_WARNING_STYLE_SETTTING");tmpDenyTypes.push("OLAP_WARNING_STYLE");}
if(!util.licenses.JavaQuery){tmpDenyTypes.push("JAVA_DATASOURCE");tmpDenyTypes.push("JAVA_QUERY_DEFINE");tmpDenyTypes.push("JAVA_QUERY_DEFINE_FIELD");tmpDenyTypes.push("JAVA_BUSINESS_VIEW");}
if(!util.licenses.VisualQuery){tmpDenyTypes.push("BUSINESS_VIEW");}
if(!util.licenses.Metadata){tmpDenyTypes.push("BUSINESS_THEMES");tmpDenyTypes.push("BUSINESS_THEME");tmpDenyTypes.push("BUSINESS_OBJECT");tmpDenyTypes.push("BUSINESS_ATTRIBUTE");tmpDenyTypes.push("DATATYPE_REF_PARAM");}
if(!util.licenses.FileManager){tmpDenyTypes.push("FILE_RESOURCE");}
if(!util.licenses.ScheduleTask){tmpDenyTypes.push("SCHEDULETASK");tmpDenyTypes.push("UNIONDATASOURCE");}
if(!util.licenses.UserManager){tmpDenyTypes.push("ROW_PERMISSION");tmpDenyTypes.push("SECURITY_MANAGER");}
if(!util.licenses.Macro){tmpDenyTypes.push("MACRO_PACKAGE");tmpDenyTypes.push("RESOURCE_PACKS");}
for(var x in tmpDenyTypes)
if(tmpDenyTypes[x]==type)
return false;}
if(this.tree.filterTypes){if(typeof this.tree.filterTypes=="string"){if(type==this.tree.resType)
return true;return type==this.tree.filterTypes;}
else{for(var x in this.tree.filterTypes)
if(this.tree.filterTypes[x]==type)
return true;return false;}}
if(this.tree.denyTypes){if(typeof this.tree.denyTypes=="string")
return type!=this.tree.denyTypes;else{for(var x in this.tree.denyTypes)
if(this.tree.denyTypes[x]==type)
return false;return true;}}
return true;};CatalogTreeNode.prototype.isHiddenNode=function(catalog){var ret=(!!catalog.hiddenInBrowse)&&this.tree.checkHiddenInBrowse;if(!ret&&catalog.type=='FILTER'&&this.tree.checkHiddenFilter){var rtn=util.remoteInvokeEx("FilterService","isHiddenFilter",[catalog.id]);if(rtn&&rtn.succeeded){ret=rtn.result;}}
return ret;}
CatalogTreeNode.prototype.isShowNode=function(id){if(!util.hasLicense("SessionManager")){if(id=="I2c94ea9f2567c7ec012567ef00b40046"){return false;}}
if(!util.hasLicense("UserManager")){if(id=="I2c94ea86298cbe6c01298cfd9ba900fa"||id=="I2c94ea86296db80801296dd20f12005a"){return false;}}
return true;}
CatalogTreeNode.prototype.addCatalogTreeNode=function(catalog){if(!catalog)return;if(!this.isTypeMatch(catalog.type))
return;if(!this.isShowNode(catalog.id))
return;if(this.isHiddenNode(catalog))
return;if(this.tree.dsSetting)
{if(!this.dsFilter(catalog))
return;}
var alias=catalog.alias;if(alias==null||alias=="")
alias=catalog.name;var node=this.addChild(alias,catalog.hasChild,catalog.id);node.setCatalogInfo(catalog);return node;};CatalogTreeNode.prototype.dsFilter=function(catalog){if(catalog.type=="BUSINESS_THEME"&&this.tree.dsSetting)
{var nodeId=catalog.id;var dsId=this.tree.dsSetting.id;var ret=util.remoteInvokeEx("BusinessThemeService","isAccessibleThemeNode2",[nodeId,dsId]);return ret&&ret.result;}
return true;}
CatalogTreeNode.prototype.setCatalogInfo=function(catalog){this.catalog=catalog;this._id=catalog.id;this._name=catalog.name;this._alias=catalog.alias;this._desc=catalog.desc;this._type=catalog.type;this._hiddenInBrowse=!!catalog.hiddenInBrowse;this._customImage=catalog.customImage;this._customMobileImage=catalog.customMobileImage;this._hasChild=catalog.hasChild;this._extended=catalog.extended;this._detectChild=catalog.detectChild;this._showOnPC=catalog.showOnPC;this._showOnPad=catalog.showOnPad;this._showOnPhone=catalog.showOnPhone;if(catalog.extended==""||(catalog.extended&&catalog.extended.indexOf("showOnPC")==-1)){this._showOnPC=true;}
var alias=catalog.alias;if(alias==null||alias=="")
alias=catalog.name;this.setText(alias);this.updateHintInfo();var R_DEF_ICON=new RegExp("img/catalogtree/"+catalog.type+".png","i");switch(catalog.type)
{case"BUSINESS_ATTRIBUTE":if(this._customImage!=null&&this._customImage!=""){this.setIcon("img/catalogtree/"+this._customImage);this.icon.onerror=function(ev){if(R_DEF_ICON.test(this.src)){return;}
this.src="img/catalogtree/"+catalog.type+".png";}}else{var result=util.remoteInvoke("BusinessThemeService","getBusinessAttributeByID",[catalog.id]).result;if(result.dataType=="DOUBLE"||result.dataType=="INTEGER"){this.setIcon("img/catalogtree/"+catalog.type+"_NUMBER.png");this._refParam=true;}else{this.setIcon("img/catalogtree/"+catalog.type+".png");this._refParam=false;}}
break;default:if(this._hiddenInBrowse==true){this.setIcon("img/catalogtree/DEFAULT_TREENODE_HIDDEN.png");}
else if(this._customImage!=null&&this._customImage!=""){var pic=this._customImage||catalog.icon||this._icon;if((this._type=='FILE_RESOURCE'||"OFFICE_REPORT"==this._type)&&pic.indexOf(".gif")!=-1){pic=pic.replace(".gif",".png");}
if(pic.indexOf("img/catalogtree/")==0){this.setIcon(pic);}else{if(pic.indexOf(".")!=-1){this.setIcon("img/catalogtree/"+pic);}else{this.setIcon("UploadImageServlet?type=view&downloadId="+pic);}}
if(this._type=='FILE_RESOURCE'){this.icon.onerror=function(ev){if(/UNKNOWN_FILE_TYPE\.png/.test(this.src)){return;}
this.src="img/catalogtree/UNKNOWN_FILE_TYPE.png";}}else{this.icon.onerror=function(ev){if(R_DEF_ICON.test(this.src)){return;}
this.src="img/catalogtree/"+catalog.type+".png";}}}else
this.setIcon("img/catalogtree/"+catalog.type+".png");}};CatalogTreeNode.prototype.updateHintInfo=function(){var title="名字："+(this.longText||this.text);if(this._desc)
title+="\n描述："+this._desc;if(this._hiddenInBrowse==true){title+="\n此目录在仪表盘界面隐藏";}
this.textSpan.title=title;}
CatalogTreeNode.prototype.remoteCallback=function(result){result=this.reInitChildren(result);if(result.succeeded){for(var i=0;i<result.result.length;i++){if(this.tree.searchCondition){if(this.tree.searchNodeIdArray[result.result[i].id]){this.addCatalogTreeNode(result.result[i]);}}else{this.addCatalogTreeNode(result.result[i]);}}}else{modalWindow.showServerError(result);}
this.isLoading=false;this.initExpanderImg();this.tree.onNodeInitComplete.fire(this.tree,this);};CatalogTreeNode.prototype.reInitChildren=function(result){return result;};CatalogTreeNode.prototype.initChildren=function(){if(this._mayHasChild===false){this._isInitChild=true;return;}
this.isLoading=true;this.removeAllChildren();if(this.tree.dynamicLoad){if(this.tree.treePurview)
util.remoteInvoke("CatalogService","getChildElementsWithPurviewType",[this._id,this.tree.treePurview],this.remoteCallback,this);else
util.remoteInvoke("CatalogService","getChildElements",[this._id],this.remoteCallback,this);}else{var result=null
if(this.tree.treePurview)
result=util.remoteInvoke("CatalogService","getChildElementsWithPurviewType",[this._id,this.tree.treePurview]);else
result=util.remoteInvoke("CatalogService","getChildElements",[this._id]);this.remoteCallback(result);this.isLoading=false;this.initExpanderImg();}
this._isInitChild=true;};CatalogTreeNode.prototype.refreshChildren=function(){var result=util.remoteInvoke("CatalogService","getCatalogElementById",[this._id]);if(result.succeeded){if(result.result)
this.setCatalogInfo(result.result);}else
modalWindow.showServerError(result);this.initChildren();};CatalogTreeNode.prototype.createTransferData=function(){if(!TransferDataNode){TransferDataNode=jsloader.resolve("freequery.common.TransferDataNode");}
var transferNode=new TransferDataNode();transferNode.id=this._id;transferNode.type=this._type;transferNode.name=this._name;transferNode.label=(this._alias==null||this._alias=="")?this._name:this._alias;transferNode.alias=this._alias;transferNode.parentName=this.parentNode._name;transferNode.parentID=this.parentNode._id;util.transferData().srcElement=this.tree;util.transferData().srcType="node";util.transferData().dataNodes=[transferNode];return true;};CatalogTreeNode.prototype.createTransferDatas=function(){if(!TransferDataNode){TransferDataNode=jsloader.resolve("freequery.common.TransferDataNode");}
dataNodes=[];for(var i=0;i<this.tree.selected.length;i++){var node=this.tree.selected[i];var transferNode=new TransferDataNode();transferNode.id=node._id;transferNode.type=node._type;transferNode.name=node._name;transferNode.label=(node._alias==null||node._alias=="")?node._name:node._alias;transferNode.alias=node._alias;　　　transferNode.parentName=this.parentNode._name;　　　transferNode.parentID=this.parentNode._id;util.transferData().srcElement=node.tree;util.transferData().srcType="node";dataNodes.push(transferNode);}
util.transferData().dataNodes=dataNodes;return true;}
CatalogTreeNode.prototype.getFullAliasPath=function(){var nodeList=this.getFullNodePath();if(nodeList&&nodeList instanceof Array){var arr=[];for(var i=0;i<nodeList.length;i++){arr.push(nodeList[i].alias||nodeList[i].name);}
return arr;}}
CatalogTreeNode.prototype.getFullNodePath=function(){result=util.remoteInvoke("CatalogService","getCatalogElementPath",[this._id]);if(result.succeeded){if(result.result)
return result.result;}else{modalWindow.showServerError(result);}}
CatalogTreeNode.prototype.destroy=function(){this.icon.onerror=null;CatalogTreeNode.superclass.destroy.call(this);}
CatalogTreeNode.prototype._daq_isTypeMatch=CatalogTreeNode.prototype.isTypeMatch;CatalogTreeNode.prototype.isTypeMatch=function(type){if(type=='DAQ'&&!util.hasLicense("DataImport")){return false;}
return this._daq_isTypeMatch(type);}