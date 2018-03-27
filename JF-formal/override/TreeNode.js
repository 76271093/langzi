
﻿﻿var Module=jsloader.resolve("freequery.widget.Module");var util=jsloader.resolve("freequery.common.util");var treeNodeId=0;var checkBoxUnCheckedImg="img/tree/CheckBoxUnChecked.gif";var checkBoxCheckedImg="img/tree/CheckBoxChecked.gif";var checkBoxGrayedImg="img/tree/CheckBoxGrayed.gif";var m1="img/tree/M1.png";var m2="img/tree/M2.png";var p1="img/tree/P1.png";var p2="img/tree/P2.png";var l1="img/tree/L1.png";var l2="img/tree/L2.png";var l4="img/tree/L4.png";var l5="img/tree/L5.png"
var loadingImg="img/tree/loading.gif";var TreeNode=function(text,level,mayHasChild,parent,id,disableShortTip){TreeNode.superclass.constructor.call(this);this.CSS_NODEDIV="tree_nodediv";this.CSS_NODEDIV_PARENT="tree_nodediv_parent";this.CSS_PREFIX="tree_prefix";this.CSS_EXPANDER="tree_expander";this.CSS_TEXTSPAN="tree_textSpan";this.CSS_ICON="tree_icon";this.CSS_CHECKBOX="tree_checkbox";this.CSS_ROW_HIGHLIGHT="row_highlight";this._id=id;if(!this._id)
this._id=treeNodeId++;this.level=level;this.childCount=0;this._isInitChild=!mayHasChild;this._mayHasChild=mayHasChild;this.text=text;this.disableShortTip=!!disableShortTip;this.nodePane=document.createElement("TABLE");this.nodePane.className=this.CSS_NODEDIV;if(domutils.isChrome()||domutils.isSafari()){this.nodePane.style.tableLayout='fixed';}
this.nodePane.style.width="100%";this.nodePane.cellPadding=0;this.nodePane.cellSpacing=0;if(parent){parent.appendChild(this.nodePane);if(domutils.isIE()){domutils.addClassName(parent,this.CSS_NODEDIV_PARENT);}}
var tr=this.nodePane.insertRow(-1);this.td=tr.insertCell(-1);this.td.vAlign="top";this.td.style.cssText="word-break : break-all";this.td.noWrap=true;this.prefixSpan=document.createElement("SPAN");this.td.appendChild(this.prefixSpan);for(var i=0;i<this.level;i++){var prefix=document.createElement("IMG");prefix.className=this.CSS_PREFIX;prefix.align="absMiddle";this.prefixSpan.appendChild(prefix);}
this.expander=document.createElement("IMG");this.expander.className=this.CSS_EXPANDER;this.expander.align="absMiddle";this.td.appendChild(this.expander);this.icon=document.createElement("IMG");this.icon.className=this.CSS_ICON;this.icon.align="absMiddle";this.icon.style.display="none";this.td.appendChild(this.icon);this.textSpan=document.createElement("SPAN");this.textSpan.className=this.CSS_TEXTSPAN;this.td.appendChild(this.textSpan);if(!this.disableShortTip&&util.getCharLength(text)>TreeNode.NODE_NAME_MAX_LENGTH){this.longText=text;text=util.getShortString(text,TreeNode.NODE_NAME_MAX_LENGTH,"...");}else{this.longText=undefined;}
if(domutils.isIE()){this.hiddenLink=document.createElement("A");this.textSpan.appendChild(this.hiddenLink);var textNode=document.createTextNode(text);this.textSpan.appendChild(textNode);}else{this.hiddenLink=document.createElement("A");this.hiddenLink.style.color="#000000";this.hiddenLink.style.textDecoration="none";this.hiddenLink.style.cursor="default";this.hiddenLink.href="openresource.jsp?resid="+this._id;this.hiddenLink.target="_blank";this.hiddenLink.innerHTML=text;this.addListener(this.hiddenLink,"click",this.handleHiddeLinkClick,this);this.textSpan.appendChild(this.hiddenLink);}
this.fakeSpan=document.createElement("SPAN");this.textSpan.appendChild(this.fakeSpan);this.fakeSpan.style.visibility="hidden";this.fakeSpan.appendChild(document.createTextNode(' '));this.addListener(this.prefixSpan,"mouseover",this.doOnMouseover,this);this.addListener(this.prefixSpan,"mouseout",this.doOnMouseout,this);this.addListener(this.expander,"mouseover",this.doOnMouseover,this);this.addListener(this.expander,"mouseout",this.doOnMouseout,this);this.addListener(this.icon,"mouseover",this.doOnMouseover,this);this.addListener(this.icon,"mouseout",this.doOnMouseout,this);this.addListener(this.textSpan,"mouseover",this.doOnMouseover,this);this.addListener(this.textSpan,"mouseout",this.doOnMouseout,this);};lang.extend(TreeNode,Module);TreeNode.CHECKBOX_NO=0;TreeNode.CHECKBOX_YES=1;TreeNode.CHECKBOX_YES_GRAYABLE=2;TreeNode.NODE_NAME_MAX_LENGTH=40;TreeNode.prototype.handleHiddeLinkClick=function(e){domutils.preventDefault(e);}
TreeNode.prototype.addChild=function(text,mayHasChild,id){if(!this.childSpan){this.initChildSpan(true);}
var childId=id;if(!childId)
childId=treeNodeId++;var newNode=this.tree.createTreeNode(text,this.level+1,mayHasChild,this.childSpan,childId);if(this.checkBox)
newNode.setCheckBoxType(this.checkBoxType);this.tree.nodes[childId]=newNode;newNode.tree=this.tree;newNode.parentNode=this;newNode.initExpanderImg();if(this.firstChild){this.childCount++;var lastChild=this.lastChild;this.lastChild.nextSibling=newNode;newNode.previousSibling=this.lastChild;this.lastChild.initExpanderImg();this.lastChild=newNode;lastChild.refreshPrefix();}else{if(!this.childSpan){this.initChildSpan(true);}
this.childCount++;this.firstChild=newNode;this.lastChild=newNode;this.initExpanderImg();}
for(var i=0;i<this.level;i++){newNode.prefixSpan.childNodes[i].src=this.prefixSpan.childNodes[i].src;}
if(newNode.level>0){if(this.nextSibling)
newNode.prefixSpan.childNodes[newNode.level-1].src=l4;else
newNode.prefixSpan.childNodes[newNode.level-1].src=l5;}
return newNode;};TreeNode.prototype.removeChild=function(indexOrNode){if(this.childCount==0)
return false;var obj=null;if(typeof indexOrNode=="number"){if(indexOrNode<0||indexOrNode>=this.childCount)
return false;var child=this.firstChild;var i=0;while(i++<indexOrNode)
child=child.nextSibling;obj=child;}else if(typeof indexOrNode=="object"){obj=indexOrNode;}
if(!obj)
return false;if(obj.previousSibling)
obj.previousSibling.nextSibling=obj.nextSibling;if(obj.nextSibling)
obj.nextSibling.previousSibling=obj.previousSibling;domutils.destroyNode(obj.nodePane);this.childCount--;if(obj.previousSibling&&!obj.nextSibling){obj.previousSibling.initExpanderImg();obj.previousSibling.refreshPrefix();}
if(!obj.previousSibling&&!obj.nextSibling)
obj.parentNode.initExpanderImg();if(this.firstChild==obj)
this.firstChild=obj.nextSibling;if(this.lastChild==obj)
this.lastChild=obj.previousSibling;obj.destroy();return true;};TreeNode.prototype.removeAllChildren=function(){var node=this.firstChild;while(node!=null){domutils.destroyNode(node.nodePane);node.destroy();node=node.nextSibling;}
this.childCount=0;this.firstChild=null;};TreeNode.prototype.initChildSpan=function(hidden){this.childSpan=document.createElement("SPAN");if(hidden)
this.childSpan.style.display="none";this.td.appendChild(this.childSpan);};TreeNode.prototype.initExpanderImg=function(){if(this.isLoading){this.expander.src=loadingImg;}else if(this.hasChild()){if(this.getExpanded()){if(this.nextSibling)
this.expander.src=m1;else
this.expander.src=m2;}else{if(this.nextSibling)
this.expander.src=p1;else
this.expander.src=p2;}}else{if(this.nextSibling)
this.expander.src=l1;else
this.expander.src=l2;}};TreeNode.prototype.setText=function(text){var child=this.textSpan.firstChild;while(child!=null){if(child.nodeType==3){domutils.destroyNode(child);}
child=child.nextSibling;}
if(!this.disableShortTip&&util.getCharLength(text)>TreeNode.NODE_NAME_MAX_LENGTH){this.longText=text;text=util.getShortString(text,TreeNode.NODE_NAME_MAX_LENGTH,"...");}else{this.longText=undefined;}
if(domutils.isIE()){var textNode=document.createTextNode(text);this.textSpan.insertBefore(textNode,this.hiddenLink);}else{this.hiddenLink.innerHTML=text;this.text=text;}};TreeNode.prototype.getExpanded=function(){return this.childSpan&&this.childSpan.style.display!="none";};TreeNode.prototype.setExpanded=function(expanded){if(!this._isInitChild&&expanded){this.initChildren();}
if(this.childSpan){this.childSpan.style.display=expanded?"":"none";}else
this.initChildSpan(!expanded);this.initExpanderImg();};TreeNode.prototype.hasChild=function(){return!this._isInitChild||this.childCount>0;};TreeNode.prototype.setIcon=function(icon){if(icon==null)
this.icon.style.display="none";this.icon.style.display="";this.icon.src=icon;}
TreeNode.prototype.destroy=function(){if(this.tree.selectedNode==this)
this.tree.selectedNode=null;delete this.tree.nodes[this._id];this.parentNode=null;this.tree=null;var child=this.firstChild;while(child!=null){var next=child.nextSibling;child.destroy();child=next;}
TreeNode.superclass.destroy.call(this);};TreeNode.prototype.refreshPrefixInternal=function(level,src){if(this.prefixSpan&&this.prefixSpan.childNodes[level])
this.prefixSpan.childNodes[level].src=src;var child=this.firstChild;while(child!=null){child.refreshPrefixInternal(level,src);child=child.nextSibling;}};TreeNode.prototype.refreshPrefix=function(){this.refreshPrefixInternal(this.level,this.nextSibling?"img/tree/L4.gif":"img/tree/L5.gif");};TreeNode.prototype.doOnMouseDown=function(e,target){if(target==this.expander){this.doOnExpanderMouseDown(e);}else if(target==this.textSpan||target==this.icon||target==this.hiddenLink){this.doOnTextSpanMouseDown(e);}else if(this.checkBox&&target==this.checkBox){this.doOnCheckBox(e);}
this.lastClientX=e.clientX;this.lastClientY=e.clientY;this.addListener(document,"mousemove",this.doOnMouseMove,this);this.addListener(document,"mouseup",this.doOnMouseUp,this);};TreeNode.prototype.doOnTextSpanMouseDown=function(e){if(this.tree.multSelect){this.tree.doSelectedNodeDown(this);}else{this.tree.selectNode(this);}};TreeNode.prototype.initChildren=function(extraFunc){this._isInitChild=true;};TreeNode.prototype.doOnExpanderMouseDown=function(e){if(domutils.isLeftButton(e.button)){this.setExpanded(!this.getExpanded());}
if(this.tree&&this.tree.bofClassName&&e.which===2){alert('Tree:\n'+this.tree.bofClassName+'\n\nTreeNode:\n'+this.bofClassName);}};TreeNode.prototype.getChildNodeByNodeId=function(id){if(!this._isInitChild)
this.initChildren();var child=this.firstChild;while(child!=null){if(child._id==id)
return child;child=child.nextSibling;}
return null;};TreeNode.prototype.refreshChildren=function(increment){};TreeNode.prototype.doOnMouseUp=function(e){this.removeListener(document,"mousemove",this.doOnMouseMove);this.removeListener(document,"mouseup",this.doOnMouseUp);};TreeNode.prototype.createTransferData=function(){return false;};TreeNode.prototype.createTransferDatas=function(){return false;}
TreeNode.prototype.doOnMouseMove=function(e){if(!this.tree)
return;if((!this.tree.multSelect&&domutils.isLeftButton(e.button)&&this.createTransferData())||(this.tree.multSelect&&domutils.isLeftButton(e.button)&&this.createTransferDatas())){if(this.lastClientX!=e.clientX||this.lastClientY!=e.clientY){this.tree._initSelection=true;this.tree.rootPane.style.MozUserSelect="";if(domutils.isIE()){var r=document.body.createTextRange();r.moveToElementText(this.fakeSpan);try{r.select();}catch(e){}}else{}
this.tree._initSelection=false;this.tree.rootPane.style.MozUserSelect="none";if(domutils.isIE()){this.hiddenLink.dragDrop();}else{dragDropEvt=document.createEvent("HTMLEvents");dragDropEvt.initEvent("dragstart",true,false);this.hiddenLink.dispatchEvent(dragDropEvt);}
if(this.tree){this.removeListener(document,"mousemove",this.doOnMouseMove);}}}};TreeNode.prototype.moveTo=function(parent,before){if(!this.tree)
return;if(this==before)
return;if(parent){var orginalParent=this.parentNode;if(this.previousSibling)
this.previousSibling.nextSibling=this.nextSibling;else
orginalParent.firstChild=this.nextSibling;if(this.nextSibling)
this.nextSibling.previousSibling=this.previousSibling;else{orginalParent.lastChild=this.previousSibling;if(orginalParent.lastChild){orginalParent.lastChild.initExpanderImg();}}
orginalParent.childCount--;domutils.destroyNode(this.nodePane,true);orginalParent.initExpanderImg();}else{parent=this.parentNode;parent.childCount--;if(this.previousSibling)
this.previousSibling.nextSibling=this.nextSibling;else
parent.firstChild=this.nextSibling;if(this.nextSibling)
this.nextSibling.previousSibling=this.previousSibling;else
parent.lastChild=this.previousSibling;}
if(!parent.childSpan)
parent.initChildSpan();parent.childSpan.insertBefore(this.nodePane,before?before.nodePane:null);this.parentNode=parent;if(before){this.nextSibling=before;this.previousSibling=before.previousSibling;if(this.previousSibling)
this.previousSibling.nextSibling=this;else
parent.firstChild=this;if(this.nextSibling)
this.nextSibling.previousSibling=this;else
parent.lastChild=this;}else{this.previousSibling=parent.lastChild;this.nextSibling=null;if(parent.lastChild){parent.lastChild.nextSibling=this;parent.lastChild.initExpanderImg();}
parent.lastChild=this;if(!parent.firstChild)
parent.firstChild=this;}
this.initExpanderImg();parent.childCount++;parent.initExpanderImg();};TreeNode.prototype.setCheckBoxType=function(checkBoxType){this.checkBoxType=checkBoxType;if(checkBoxType==TreeNode.CHECKBOX_NO&&this.checkBox){this.checkBox.style.display="none";this.checked=false;}
if(checkBoxType!=TreeNode.CHECKBOX_NO&&!this.checkBox){this.checkBox=document.createElement("IMG");this.checkBox.className=this.CSS_CHECKBOX;this.checkBox.align="absMiddle";this.checkBox.src=checkBoxUnCheckedImg;this.checked=TreeNode.CHECKBOX_NO;this.td.insertBefore(this.checkBox,this.icon);}};TreeNode.prototype.doOnCheckBox=function(e){if(this.checked==TreeNode.CHECKBOX_YES){this.checked=TreeNode.CHECKBOX_NO;this.checkBox.src=checkBoxUnCheckedImg;}else if(this.checked==TreeNode.CHECKBOX_NO){if(this.checkBoxType==TreeNode.CHECKBOX_YES_GRAYABLE){this.checked=TreeNode.CHECKBOX_YES_GRAYABLE;this.checkBox.src=checkBoxGrayedImg;}else{this.checked=TreeNode.CHECKBOX_YES;this.checkBox.src=checkBoxCheckedImg;}}else{this.checked=TreeNode.CHECKBOX_YES;this.checkBox.src=checkBoxCheckedImg;}
this.tree.onCheckNode.fire(this,this.checked);};TreeNode.prototype.setChecked=function(checked){this.checked=checked;if(this.checkBox){switch(checked){case TreeNode.CHECKBOX_NO:this.checkBox.src=checkBoxUnCheckedImg;break;case TreeNode.CHECKBOX_YES:this.checkBox.src=checkBoxCheckedImg;break;case TreeNode.CHECKBOX_YES_GRAYABLE:this.checkBox.src=checkBoxGrayedImg;break;}}};TreeNode.prototype.getParentNodes=function(){var nodes=new Array();var node=this.parentNode;while(node){nodes.push(node);node=node.parentNode;}
return nodes;};TreeNode.prototype.getNodePath=function(){var nodes=this.getParentNodes();var path="";for(var i=nodes.length-1;i>=0;i--){if(path=="")
path=nodes[i].text;else
path=path+" > "+nodes[i].text;}
if(path!="")path=path+" > "
return path;}
TreeNode.prototype.setExpanderImg=function(hasChild){if(hasChild){if(this.getExpanded()){if(this.nextSibling)
this.expander.src="img/tree/M1.gif";else
this.expander.src="img/tree/M2.gif";}else{if(this.nextSibling)
this.expander.src="img/tree/P1.gif";else
this.expander.src="img/tree/P2.gif";}}else{if(this.nextSibling)
this.expander.src="img/tree/L1.gif";else
this.expander.src="img/tree/L2.gif";}}
TreeNode.prototype.doOnMouseover=function(){domutils.addClassName(this.nodePane,this.CSS_ROW_HIGHLIGHT);};TreeNode.prototype.doOnMouseout=function(){domutils.removeClassName(this.nodePane,this.CSS_ROW_HIGHLIGHT);};