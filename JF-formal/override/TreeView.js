
var Module=jsloader.resolve("freequery.widget.Module");var util=jsloader.resolve("freequery.common.util");var TreeNode=jsloader.resolve("freequery.tree.TreeNode");var CustomEvent=jsloader.resolve("freequery.lang.CustomEvent");var eventutil=jsloader.resolve("freequery.lang.eventutil");var PopupMenu=null;var TreeView=function(parent){TreeView.superclass.constructor.call(this);this.CSS_NODEDIV="tree_nodediv";this.CSS_NODEDIV_SELECTED="tree_nodediv_Selected";this.CSS_TEXTSPAN="tree_textSpan";this.CSS_TEXTSPAN_SELECTED="tree_textSpan_Selected";this.multSelect=false;this.selected=new Array();this.rootPane=document.createElement("SPAN");this.container=parent;if(parent){parent.appendChild(this.rootPane);parent.style.MozUserSelect="none";}
this.nodes=new Array();this.rootNode=this.createTreeNode("",-1,true,this.rootPane);this.rootNode.initChildSpan(false);this.rootNode.tree=this;this.nodes[this.rootNode._id]=this.rootNode;this.rootPane.removeChild(this.rootNode.nodePane);this.rootPane.appendChild(this.rootNode.childSpan);this.searchCondition=null;this.searchNodeIdArray=[];this.needCheckedNodeIdList=[];this.addListener(this.rootPane,"mousedown",this.doOnMouseDown,this);this.addListener(this.rootPane,"mouseup",this.doOnMouseUp,this);this.addListener(this.rootPane,"contextmenu",this.doOnContextMenu,this);this.addListener(this.rootPane,"dblclick",this.doOnDblclick,this);this.addListener(this.rootPane,"keydown",this.doOnKeyDown,this);this.addListener(this.rootPane,"selectstart",this.doOnSelectStart,this);this.addListener(this.rootPane,"dragover",this.doOnDragOver,this);this.addListener(this.rootPane,"drop",this.doOnDrop,this);this.onSelectNode=new CustomEvent("selectNode",this);this.onDblClick=new CustomEvent("dblClick",this);this.onDragDrop=new CustomEvent("dragdrop",this);this.onCheckNode=new CustomEvent("checkNode",this);this.onSelectedNodeDown=new CustomEvent("selectedNodeDown",this);};lang.extend(TreeView,Module);TreeView.prototype.render=function(){};TreeView.prototype.createTreeNode=function(text,level,mayHasChild,parent,id){return new TreeNode(text,level,mayHasChild,parent,id);};TreeView.prototype.doOnSelectStart=function(e){if(!this._initSelection)
domutils.stopEvent(e);};TreeView.prototype.doOnDblclick=function(e){this.selectNode(this.getTreeNode(e.target));if(this.selectedNode){this.selectedNode.setExpanded(true);this.onDblClick.fire(this,this.selectedNode,e);}};TreeView.prototype.getTreeNode=function(target){var htmlNode=target;var nodeList=new Array();while(htmlNode!=null&&htmlNode!=this.rootPane){if(domutils.hasClassName(htmlNode,this.CSS_NODEDIV))
nodeList.push(htmlNode);htmlNode=htmlNode.parentNode;}
if(htmlNode==null)
return null;var node=this.rootNode.firstChild;for(var i=nodeList.length-1;i>=0;i--){while(node!=null){if(node.nodePane==nodeList[i])
break;node=node.nextSibling;}
if(node==null)
return null;if(i>0)
node=node.firstChild;}
return node;};TreeView.prototype.doOnMouseDown=function(e){var node=this.getTreeNode(e.target);if(node!=null)
node.doOnMouseDown(e,e.target);};TreeView.prototype.doOnMouseUp=function(e){var node=this.getTreeNode(e.target);if(node&&this.multSelect){this.doSelectedNodeUp(node);}}
TreeView.prototype.doOnContextMenu=function(e){if(this.popupMenu&&this.doOnPopupMenu)
if(this.doOnPopupMenu(e)){this.popupMenu.popup(e);}
domutils.stopEvent(e);if(domutils.isFirefox()){var node=this.getTreeNode(e.target);if(node!=null)
node.doOnTextSpanMouseDown(e);}}
TreeView.prototype.doOnKeyDown=function(e){var keyCode=e.keyCode;if(!this.selectedNode){if(!this.rootNode||!this.rootNode.hasChild())
return;this.selectNode(this.rootNode.firstChild);}
var match=true;switch(keyCode){case 37:if(this.selectedNode.hasChild()&&this.selectedNode.getExpanded())
this.selectedNode.setExpanded(false);else if(this.selectedNode.parentNode!=null&&this.selectedNode.parentNode!=this.rootNode)
this.selectNode(this.selectedNode.parentNode);break;case 39:if(this.selectedNode.hasChild()){if(this.selectedNode.getExpanded())
this.selectNode(this.selectedNode.firstChild);else
this.selectedNode.setExpanded(true);}
break;case 38:if(this.selectedNode.previousSibling!=null){var tmp=this.selectedNode.previousSibling;while(tmp!=null&&tmp.hasChild()&&tmp.getExpanded())
tmp=tmp.lastChild;if(tmp!=null){this.selectNode(tmp);}}else if(this.selectedNode.parentNode!=null&&this.selectedNode.parentNode!=this.rootNode)
this.selectNode(this.selectedNode.parentNode);break;case 40:if(this.selectedNode.hasChild()&&this.selectedNode.getExpanded()){this.selectNode(this.selectedNode.firstChild);}else{var tmp=this.selectedNode;while(tmp!=null&&tmp.nextSibling==null){tmp=tmp.parentNode;}
if(tmp!=null){this.selectNode(tmp.nextSibling);}}
break;default:match=false;}
if(match)
domutils.preventDefault(e);};TreeView.prototype.unrender=function(){};TreeView.prototype.destroy=function(){if(this.rootNode)
domutils.destroyNode(this.rootNode.nodePane);if(this.container&&this.container==this.rootPane.parentNode)
domutils.destroyNode(this.rootPane);this.rootPane=null;if(this.rootNode)
this.rootNode.destroy();this.rootNode=null;if(this.popupMenu)
this.popupMenu.destroy();TreeView.superclass.destroy.call(this);};TreeView.prototype.scrollIntoView=function(node){if(!node){return;}
var left=0;var top=0;var n=node.textSpan;var treeDiv=this.rootPane.parentNode;if(!treeDiv)
return;while(n&&n!=treeDiv){left+=n.offsetLeft;top+=n.offsetTop;n=n.offsetParent;}
if(treeDiv.scrollLeft+treeDiv.clientWidth<left){treeDiv.scrollLeft=left+node.textSpan.offsetWidth-treeDiv.clientWidth;}
if(treeDiv.scrollTop+treeDiv.clientHeight<top+node.textSpan.offsetHeight){treeDiv.scrollTop=top+node.textSpan.offsetHeight-treeDiv.clientHeight;}
if(treeDiv.scrollLeft>left){treeDiv.scrollLeft=left;}
if(treeDiv.scrollTop>top){treeDiv.scrollTop=top;}};TreeView.prototype.selectNode=function(node,notFocus){this.resetNodesStyle();var oldSelected=this.selectedNode;this.selectNodeWithoutFire(node,notFocus);this.onSelectNode.fire(this,this.selectedNode,oldSelected,this.selected);};TreeView.prototype.selectNodeWithoutFire=function(node,notFocus){if(this.selectedNode){domutils.replaceClassName(this.selectedNode.textSpan,this.CSS_TEXTSPAN,this.CSS_TEXTSPAN_SELECTED);domutils.removeClassName(this.selectedNode.nodePane,this.CSS_NODEDIV_SELECTED);}
this.selectedNode=node;if(node){domutils.replaceClassName(node.textSpan,this.CSS_TEXTSPAN_SELECTED,this.CSS_TEXTSPAN);domutils.addClassName(node.nodePane,this.CSS_NODEDIV_SELECTED);if(!notFocus){this.scrollIntoView(this.selectedNode);try{this.selectedNode.hiddenLink.focus();}catch(ex){}}}};TreeView.prototype.expandToNode=function(node){var nodeList=new Array();var tmp=node;while(tmp!=null){nodeList.push(tmp);tmp=tmp.parentNode;}
for(var i=nodeList.length-1;i>=0;i--){nodeList[i].setExpanded(true);}
this.selectNode(node);};TreeView.prototype.canDrag=function(node){return false;};TreeView.prototype.doOnDragOver=function(e){var node=this.getTreeNode(e.target);if(this.dragOverNode)
this.dragOverNode.textSpan.style.backgroundColor="";if(!this.canDrag(node))
return;node.textSpan.style.backgroundColor="gray";this.dragOverNode=node;domutils.stopEvent(e);};TreeView.prototype.onDragEnd=function(){if(this.dragOverNode)
this.dragOverNode.textSpan.style.backgroundColor="";util.transferData().clear();};TreeView.prototype.doOnDrop=function(e){if(this.dragOverNode){this.dragOverNode.textSpan.style.backgroundColor="";this.onDragDrop.fire(this,e,this.dragOverNode);domutils.stopEvent(e);}};TreeView.prototype.setCheckBoxType=function(type){this.rootNode.setCheckBoxType(type);};TreeView.prototype.getCheckedNodes=function(){var result=new Array();for(var id in this.nodes){var node=this.nodes[id];if(node&&node.checked)
result.push(node);}
return result;};TreeView.prototype.setMultSelect=function(isMult){this.multSelect=isMult;};TreeView.prototype.doSelectedNodeDown=function(node){var ev=eventutil.getEvent();if(node){var index=this.getSelectedIndex(node);if(index>=0&&!ev.ctrlKey&&!ev.shiftKey)
return;}
var oldSelectedNode=this.selectedNode;var oldSelected=this.selected;if(!(ev.ctrlKey)){this.resetNodesStyle();this.resetNodeStyle(oldSelectedNode);this.clearSelected();}
if(ev.shiftKey){this.resetNodesStyle();this.resetNodeStyle(oldSelectedNode);this.clearSelected();this.setNodesSelected(node);}else{var index=this.getSelectedIndex(node);if(index<0){this.selected.push(node);this.selectNodeEx(node);}else{var selectedNode=this.selected[index];this.resetNodeStyle(selectedNode);this.selected.splice(index,1);}}
this.onSelectedNodeDown.fire(this,this.selectedNode,oldSelected,this.selected);}
TreeView.prototype.doSelectedNodeUp=function(node){var ev=eventutil.getEvent();if(node){var index=this.getSelectedIndex(node);if(index>=0&&!ev.ctrlKey&&!ev.shiftKey){var oldSelectedNode=this.selectedNode;this.resetNodesStyle();this.resetNodeStyle(oldSelectedNode);this.clearSelected();if(this.getSelectedIndex(node)<0)
this.selected.push(node);this.selectNodeEx(node);}}}
TreeView.prototype.resetNodeStyle=function(node){if(node){domutils.replaceClassName(node.textSpan,this.CSS_TEXTSPAN,this.CSS_TEXTSPAN_SELECTED);domutils.removeClassName(node.nodePane,this.CSS_NODEDIV_SELECTED);}}
TreeView.prototype.clearSelected=function(){var len=this.selected.length;for(var i=0;i<len;i++){this.selected.pop();}};TreeView.prototype.resetNodesStyle=function(){var len=this.selected.length;for(var i=0;i<len;i++){this.resetNodeStyle(this.selected[i]);}};TreeView.prototype.setNodesSelected=function(node){var startNode=this.selectedNode;if(!startNode||(startNode.parentNode!=node.parentNode)){this.selectedNode=null;var newNode=node.parentNode.firstChild;while(newNode){if(newNode==node){this.selected.push(newNode)
newNode=null;}else{this.selected.push(newNode);newNode=newNode.nextSibling;}}}else if(startNode.parentNode==node.parentNode){var startFlag=0;var newNode=node.parentNode.firstChild;while(newNode){if(newNode==node||newNode==startNode){this.selected.push(newNode)
startFlag++;}else if(startFlag==1){this.selected.push(newNode);}else if(startFlag==2){newNode=null;break;}
newNode=newNode.nextSibling}}
for(var i=0;i<this.selected.length;i++){this.selectNodeEx(this.selected[i]);}
this.selectedNode=node;};TreeView.prototype.selectNodeEx=function(node,notFocus){var oldSelected=this.selectedNode;if(oldSelected){if(oldSelected.parentNode!=node.parentNode){this.resetNodesStyle();this.clearSelected();this.selected.push(node);}}
this.selectedNode=node;if(node){node.textSpan.className=this.CSS_TEXTSPAN_SELECTED;domutils.addClassName(node.nodePane,this.CSS_NODEDIV_SELECTED);if(!notFocus){this.scrollIntoView(this.selectedNode);try{this.selectedNode.hiddenLink.focus();}catch(e){}}}
this.onSelectNode.fire(this,this.selectedNode,oldSelected,this.selected);};TreeView.prototype.getSelectedIndex=function(node){var len=this.selected.length;for(var i=0;i<len;i++)
if(this.selected[i]==node)
return i;return-1;};TreeView.prototype.getSelected=function(){return this.selected;};