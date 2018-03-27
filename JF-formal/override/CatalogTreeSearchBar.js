
var Module2=jsloader.resolve("freequery.widget.Module2");var util=jsloader.resolve("freequery.common.util");var TreeResult3=jsloader.resolve("freequery.tree.TreeResult3");var ListResult=jsloader.resolve("freequery.tree.ListResult");var CatalogTreeSearchBar=function(treeObj,barParent){if(treeObj.needSearch)
{this.rawtree=treeObj;this.treeResultPanel=document.createElement("div");this.treeResultPanel.style.color='gray';this.treeResultPanel.style.display='none';this.listResultPanel=document.createElement("div");this.listResultPanel.style.color='gray';this.listResultPanel.style.display='none';this.busy=false;if(barParent)
this.searchPanel=barParent;else
this.searchPanel=treeObj.searchBarParent;if(!this.searchPanel)
return;this.treePanel=treeObj.rootPane;this.onSearchingPanel=null;this.buildOnSearchingPanel(treeObj.container);treeObj.container.style.position="relative";treeObj.container.appendChild(this.treeResultPanel);treeObj.container.appendChild(this.listResultPanel);this.init(this.searchPanel,__url);this.element.style.height="auto";this.active=true;this.showType="TREE";}};lang.extend(CatalogTreeSearchBar,Module2);CatalogTreeSearchBar.prototype.show=function()
{this.rawtree.container.appendChild(this.treeResultPanel);this.rawtree.container.appendChild(this.listResultPanel);this.rawtree.container.appendChild(this.onSearchingPanel);this.container.appendChild(this.element);}
CatalogTreeSearchBar.prototype.hide=function()
{domutils.destroyNode(this.element,true);domutils.destroyNode(this.listResultPanel,true);domutils.destroyNode(this.treeResultPanel,true);domutils.destroyNode(this.onSearchingPanel,true);}
CatalogTreeSearchBar.prototype.buildOnSearchingPanel=function(parentPanel)
{this.onSearchingPanel=document.createElement("div");this.onSearchingPanel.style.color='gray';this.onSearchingPanel.style.display='none';parentPanel.appendChild(this.onSearchingPanel);this.onSearchingPanel.style.position="absolute";this.onSearchingPanel.style.width="100%";this.onSearchingPanel.style.height="100%";this.onSearchingPanel.style.backgroundColor="#DEECF8";this.onSearchingPanel.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=80)";var textElem=document.createElement("span");textElem.style.color='#000';textElem.style.fontSize='12px';this.onSearchingPanel.appendChild(textElem);textElem.appendChild(document.createTextNode('正在搜索匹配的资源...'));}
CatalogTreeSearchBar.prototype.elemSearchBtn_click_handler=function(e){this.doSearch();}
CatalogTreeSearchBar.prototype.elemTreeBtn_click_handler=function(e){if(this.busy)
return;if(this.treePanel.style.display=="none")
{this.treeResultPanel.style.display="";this.listResultPanel.style.display="none";}}
CatalogTreeSearchBar.prototype.elemListBtn_click_handler=function(e){if(this.busy)
return;if(this.treePanel.style.display=="none")
{this.treeResultPanel.style.display="none";this.listResultPanel.style.display="";}}
CatalogTreeSearchBar.prototype.elemClearBtn_click_handler=function(e){this.elemCondition.value="";this.doSearch();this.elemClearBtn.style.display="none";}
CatalogTreeSearchBar.prototype.elemCondition_keypress_handler=function(e){if(e.keyCode==13)
{this.elemCondition.focus();this.doSearch();}}
CatalogTreeSearchBar.prototype.doSearch=function(){if(this.busy)
return;var conditionText=this.elemCondition.value;if(util.trim(conditionText)=="")
{this.treePanel.style.display="";this.listResultPanel.style.display="none";this.treeResultPanel.style.display="none";}
else
{this.busy=true;this.treePanel.style.display="none";this.listResultPanel.style.display="none";this.treeResultPanel.style.display="none";this.onSearchingPanel.style.display="";this.treeResultPanel.innerHTML="";this.listResultPanel.innerHTML="";if(this.treeresult)
this.treeresult.destroy();this.treeresult=new TreeResult3(this.treeResultPanel);this.treeresult.onSearchComplete.subscribe(this.afterSerch,this);this.treeresult.onDblClickNode.subscribe(this.handleDblclick,this);this.treeresult.render(this.rawtree);this.treeresult.search(conditionText);}}
CatalogTreeSearchBar.prototype.afterSerch=function(haveMore){this.busy=false;this.onSearchingPanel.style.display="none";if(this.listresult)
this.listresult.destroy();this.listresult=new ListResult(this.listResultPanel);this.listresult.onDblClickNode.subscribe(this.handleDblclick,this);this.data=this.treeresult.nodesandparent;this.listresult.doShowResult(this.data);if(this.showType=="TREE")
{this.treeResultPanel.style.display="";this.listResultPanel.style.display="none";}
else
{this.treeResultPanel.style.display="none";this.listResultPanel.style.display="";}
this.elemClearBtn.style.display="";}
CatalogTreeSearchBar.prototype.handleDblclick=function(tree,node){this.treePanel.style.display="";this.listResultPanel.style.display="none";this.treeResultPanel.style.display="none";this.rawtree.expandToId(node._id);}
CatalogTreeSearchBar.prototype.destroy=function(){this.treeResultPanel=null;this.listResultPanel=null;this.onSearchingPanel=null;if(this.treeresult)
this.treeresult.destroy();if(this.listresult)
this.listresult.destroy();CatalogTreeSearchBar.superclass.destroy.call(this);}