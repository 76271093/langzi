
var CatalogTree=jsloader.resolve("freequery.tree.CatalogTree");var util=jsloader.resolve("freequery.common.util");var TreeResult3=function(parent){TreeResult3.superclass.constructor.call(this,parent);this.denyTypes=null;this.filterTypes=null;this.treePurview=null;this.dsSetting=null;this.checkHiddenInBrowse=false;this.onSearchComplete=new CustomEvent("searchComplete",this);this.MAXRESULTCOUNT=200;this.finishedItem=0;};lang.extend(TreeResult3,CatalogTree);TreeResult3.prototype.render=function(treeObj){if(treeObj.denyTypes)
this.denyTypes=treeObj.denyTypes;if(treeObj.filterTypes)
this.filterTypes=treeObj.filterTypes;if(treeObj.treePurview)
this.treePurview=treeObj.treePurview;else
this.treePurview="REF";if(treeObj.dsSetting)
this.dsSetting=treeObj.dsSetting;if(treeObj.checkHiddenInBrowse)
this.checkHiddenInBrowse=treeObj.checkHiddenInBrowse;this.rootNode.removeAllChildren();if(treeObj.rootNode.firstChild)
{var tempnode=treeObj.rootNode.firstChild;do
{var newsubnode=this.rootNode.addCatalogTreeNode(tempnode.catalog);tempnode=tempnode.nextSibling;}while(tempnode)}
this.rootNode._isInitChild=true;this._isInit=true;};TreeResult3.prototype.doOnPopupMenu=function(){};TreeResult3.prototype.search=function(condition){this.nodesandparent=new Array();if(condition)
{var ret=util.remoteInvokeEx("CatalogService","getNodesAndParent",[condition,this.treePurview,-1],this.afterSerch,this);}};TreeResult3.prototype.afterSerch=function(ret){var haveMore=false;if(ret&&ret.succeeded&&ret.result.length>0)
{this.nodesandparent=ret.result;if(this.rootNode.firstChild)
{var tempnode=this.rootNode.firstChild;do
{var pointer=this.checkroot(tempnode);if(pointer.i<0)
{this.rootNode.removeChild(tempnode);}
tempnode=tempnode.nextSibling;}while(tempnode)}
this.cutNodeWithoutSearchMark(this.rootNode);if(ret.result.length>0&&this.nodesandparent[ret.result.length-1].length==0)
haveMore=true;}
else
{this.rootNode.removeAllChildren();}
if(this.rootNode.childCount==0)
{this.container.appendChild(document.createTextNode("无符合条件的资源"));}
this.onSearchComplete.fire(haveMore);}
TreeResult3.prototype.checkleaf=function(node,pointer){if(this.finishedItem>=this.MAXRESULTCOUNT)
return;var p={i:0,j:0};p.i=pointer.i;p.j=pointer.j+1;node._isInitChild=true;if(p.j==this.nodesandparent[p.i].length)
{this.nodesandparent[p.i].fineshed=true;this.finishedItem++;node.setExpanded(true);node.searchMark=true;parentNodes=node.getParentNodes();for(var k=0;k<parentNodes.length;k++)
{parentNodes[k].searchMark=true;}
return;}
var tempnode=node.getChildNodeByNodeId(this.nodesandparent[p.i][p.j].id);if(tempnode==null)
tempnode=node.addCatalogTreeNode(this.nodesandparent[p.i][p.j]);node.setExpanded(true);while(tempnode)
{p.j++;if(p.j==this.nodesandparent[p.i].length)
{this.nodesandparent[p.i].fineshed=true;this.finishedItem++;tempnode._isInitChild=true;tempnode.setExpanded(true);tempnode.searchMark=true;parentNodes=tempnode.getParentNodes();for(var k=0;k<parentNodes.length;k++)
{parentNodes[k].searchMark=true;}
return;}
else
{tempnode._isInitChild=true;var tn=tempnode.getChildNodeByNodeId(this.nodesandparent[p.i][p.j].id);if(tn==null)
tn=tempnode.addCatalogTreeNode(this.nodesandparent[p.i][p.j]);tempnode.setExpanded(true);tempnode=tn;}}}
TreeResult3.prototype.checkroot=function(node){var pointer={i:-1,j:-1};for(var i=0;i<this.nodesandparent.length;i++)
{for(var j=0;j<this.nodesandparent[i].length;j++)
{if(this.nodesandparent[i][j].id==node._id)
{pointer.i=i;pointer.j=j;this.checkleaf(node,pointer);break;}}}
return pointer;}
TreeResult3.prototype.stringFilter=function(str){return str.replace(/\*/g,"[*]").replace(/_/g,"[_]").replace(/%/g,"[%]");}
TreeResult3.prototype.cutNodeWithoutSearchMark=function(node){if(node.firstChild)
{var tempnode=node.firstChild;do
{if(!tempnode.searchMark)
{node.removeChild(tempnode);}
else
{this.cutNodeWithoutSearchMark(tempnode);}
tempnode=tempnode.nextSibling;}while(tempnode)}}