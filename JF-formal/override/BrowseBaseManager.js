
var BaseManager=jsloader.resolve("freequery.resourcemanager.BaseManager");var BrowseTabPages=jsloader.resolve("freequery.control.BrowseTabPages");var TabPages=jsloader.resolve("freequery.control.TabPages");var BrowseBaseManager=function(treeSlot,toolbarSlot,viewSlot,leftPane,splitter,tabSlot,locationSlot){this.mainPane=viewSlot||document.getElementById('rigthContent');this.treePane=treeSlot||document.getElementById('leftCatalogTree');this.commandFactory=this.getCommandFactory();this.tabElements=[];this.init();};lang.extend(BrowseBaseManager,BaseManager);BrowseBaseManager.prototype.init=function(){if(!this.tabControl){if(this.action.parentAction){this.elemTabTr=this.action.parentAction.elemTabTr;this.elemTabDiv=this.action.parentAction.elemTabDiv;this.tabControl=this.action.parentAction.tabControl;}else{this.elemTabTr=document.getElementById("tabTr");this.elemTabDiv=document.getElementById("tabDiv");if(this.elemTabDiv){var options=TabPages.getOptions('CMNB');options.classNames.tabPanelHeader='';options.classNames.tabStrip='tab-strip-option1';options.classNames.btnMore='btn-more';options.classNames.morePanelBody='morePanel';options.classNames.morePanelItem='morePanelItem';options.classNames.morePanelHiddenItem='morePanelItem-hidden';options.classNames.maxDiv='maxDiv';options.tabOptions.closeImgSrc='img/button/button_close_gray.gif';options.tabOptions.closeImgOnSrc='img/button/button_close.gif';options.tabOptions.classNames.btnNormalLeft='tab-btn-normal-left-option2';options.tabOptions.classNames.btnNormalMiddle='tab-btn-normal-middle-option2';options.tabOptions.classNames.btnNormalRight='tab-btn-normal-right-option2';options.tabOptions.classNames.btnSelectedLeft='tab-btn-selected-left-option2';options.tabOptions.classNames.btnSelectedMiddle='tab-btn-selected-middle-option2';options.tabOptions.classNames.btnSelectedRight='tab-btn-selected-right-option2';options.tabOptions.classNames.btnMouseOverLeft='tab-btn-mouse-over-left-option2';options.tabOptions.classNames.btnMouseOverMiddle='tab-btn-mouse-over-middle-option2';options.tabOptions.classNames.btnMouseOverRight='tab-btn-mouse-over-right-option2';this.tabControl=new BrowseTabPages(this.elemTabDiv,options);}}
if(this.tabControl){this.tabControl.onTabActive.subscribe(this.onTabActive,this);this.tabControl.onTabClick.subscribe(this.onTabClick,this);this.tabControl.onTabClose.subscribe(this.onTabClose,this);this.tabControl.onTabDClick.subscribe(this.onTabDClick,this);this.tabControl.onTabCloseAll.subscribe(this.onTabCloseAll,this);this.addListener(this.mainPane,"click",this.setMorePanelVisible,this);}}}
BrowseBaseManager.prototype.createTab=function(id,name,closeable,command){if(this.tabControl&&this.tabControl.tabObjs.length>20){alert("打开的页面太多，请先关闭一些页面！");return null;}
this.setTabTrVisible(true);var tab=this.getTabById(id);if(tab!=null){if(!tab.getVisible())
this.tabControl.reshowTab(tab);else
tab.doClick();return null;}
if(this.tabControl&&this.tabControl.activeTab)
this.hideTabPanel(this.tabControl.activeTab.id);else if(!this.tabControl||this.tabControl.tabObjs.length==0||!this.tabControl.activeTab)
this.hideTabPanel("DEFUALT");if("undefined"===typeof closeable)
closeable=true;if(!name){var ret=util.remoteInvokeEx("CatalogService","getCatalogElementById",[id]);if(ret&&ret.result){name=ret.result.name;}}
var pageTab=this.tabControl.appendTab(name,"",closeable,true);pageTab.id=id;pageTab.name=name;pageTab.setActive(true);return pageTab;};BrowseBaseManager.prototype.setCommand=function(tab,command){tab.command=command;tab.command.tabClosed=false;this.hideLocationBar();if(command&&command.frame&&command.frame.locationBar){command.frame.locationBar.onMaxFrame.subscribe(this.autoFitResize,this);command.frame.locationBar.onMinFrame.subscribe(this.autoFitResize,this);}}
BrowseBaseManager.prototype.show=function(){if(!this.mainPane)
this.mainPane=document.getElementById('rigthContent_parent').firstChild;registry.put("CurrentManager",this);this.showTreeView();var matchActive=false;var nextActive=null;var prevActive=null;for(var i=0;i<this.tabControl.tabObjs.length;i++){var tab=this.tabControl.tabObjs[i];if(this.tabControl.tabsShareWorkspace){if(tab==this.tabControl.activeTab)
matchActive=true;}else{if(tab==this.__activeTab)
matchActive=true;}
if(this.tabControl.tabsShareWorkspace||tab.CurrentManager==this){if(matchActive){if(!nextActive)
nextActive=tab;}else
prevActive=tab;tab.parent.style.display="";}}
this.tabControl.hiddenTabObjs=[];this.tabControl.activeTab=nextActive||prevActive;if(this.tabControl.activeTab){this.setTabTrVisible(true);this.showTabPanel(this.tabControl.activeTab.id);}else{this.setTabTrVisible(false);this.tabControl.activeTab=null;this.showTabPanel("DEFUALT");}
this.autoFitResize();this.isShow=true;};BrowseBaseManager.prototype.hide=function(){this.__activeTab=this.tabControl.activeTab
this.hideTreeView();for(var i=this.tabControl.tabObjs.length-1;i>=0;i--){var tab=this.tabControl.tabObjs[i];this.hideTabPanel(tab.id);tab.parent.style.display="none";}
this.hideTabPanel("DEFUALT");this.setTabTrVisible(false);this.autoFitResize();this.isShow=false;};BrowseBaseManager.prototype.setLeftViewVisible=function(visible){var mainView=registry.get("MainView");if(visible==true){mainView.showLeftView(true);}
else
mainView.hideLeftView(true);};BrowseBaseManager.prototype.showTreeView=function(){if(this.leftViewStatus){var leftVisible=registry.get(this.leftViewStatus);if(typeof leftVisible=="undefined"){this.setLeftViewVisible(true);}else if(leftVisible==true){this.setLeftViewVisible(true);}else{this.setLeftViewVisible(false);}}
this.currentTreeWrapper.showTree();}
BrowseBaseManager.prototype.hideTreeView=function(){var mainView=registry.get("MainView");if(this.leftViewStatus){registry.put(this.leftViewStatus,mainView.getLeftViewVisible());}
mainView.hideLeftView();this.currentTreeWrapper.hideTree();};BrowseBaseManager.prototype.getTabVisible=function(){return this.elemTabTr.style.display=="none"?false:true;};BrowseBaseManager.prototype.setTabTrVisible=function(visible){if(!this.elemTabTr)
return;if(!visible)
this.elemTabTr.style.display="none";else
this.elemTabTr.style.display="";};BrowseBaseManager.prototype.showTab=function(){this.setTabTrVisible(this.tabVisible);if(this.tabElements){for(var i=0;i<this.tabElements.length;i++){this.elemTabDiv.appendChild(this.tabElements[i]);}}};BrowseBaseManager.prototype.hideTab=function(){this.tabVisible=this.getTabVisible();this.setTabTrVisible(false);for(var child=this.elemTabDiv.firstChild;child;child=child.nextSibling){this.tabElements.push(child);}
for(var i=0;i<this.tabElements.length;i++){domutils.destroyNode(this.tabElements[i],true);}}
BrowseBaseManager.prototype.showTabPanel=function(id){var tab=this.tabControl.getTabById(id);var tabRightContent;if(!tab){tabRightContent=this.tabControl.rigthContent;if(tabRightContent.id=="rigthContent_parent"){tabRightContent=tabRightContent.firstChild;this.tabControl.rigthContent=tabRightContent;}}else
tabRightContent=tab.tabRightContent;if(!tabRightContent)
return;if(!(tab&&tab.__closing)){tabRightContent.style.display="";}
tabRightContent.setAttribute("bofid","rigthContent");tabRightContent.id="rigthContent";};BrowseBaseManager.prototype.hideTabPanel=function(id){var tab=this.tabControl.getTabById(id);var tabRightContent;if(!tab){tabRightContent=this.tabControl.rigthContent;if(tabRightContent.id=="rigthContent_parent"){tabRightContent=tabRightContent.firstChild;this.tabControl.rigthContent=tabRightContent;}}else
tabRightContent=tab.tabRightContent;if(!tabRightContent)
return;tabRightContent.style.display="none";tabRightContent.setAttribute("bofid","rigthContent_hidden");tabRightContent.id="rigthContent_hidden";};BrowseBaseManager.prototype.getTabById=function(tabId){return this.tabControl.getTabById(tabId);};BrowseBaseManager.prototype.removeTabPanel=function(id){var elems=this.browseMainElements&&this.browseMainElements[id];if(elems){for(var i=elems.length-1;i>=0;i--){domutils.destroyNode(elems[i],true);}
this.browseMainElements[id]=null;delete this.browseMainElements[id];}};BrowseBaseManager.prototype.onTabClose=function(tab){var tmpTab=this.tabControl.activeTab;if(tmpTab&&tmpTab.id!=tab.id){tab.__closing=true;tab.doClick();if(tab.command&&!tab.command.tabClosed){try{if(tab.command.confirmClose()){tab.command.tabClosed=true;tab.command.close();tab.command.destroy();}
else{tmpTab.setActive(true);return false;}}catch(e){tab.command.tabClosed=true;tab.command.close();tab.command.destroy();}}
tmpTab.setActive(true);}
else{if(tab.command&&!tab.command.tabClosed){try{if(tab.command.confirmClose()){tab.command.tabClosed=true;tab.command.close();tab.command.destroy();}
else
return false;}catch(e){tab.command.tabClosed=true;tab.command.close();tab.command.destroy();}}}
this.removeTabPanel(tab.id);if(this.tabControl){var showDefault;if(!this.tabControl.tabsShareWorkspace){var c=0;for(var i=0;i<this.tabControl.tabObjs.length;i++){if(this.tabControl.tabObjs[i].CurrentManager==this)
c++;}
showDefault=c==1;}else{showDefault=this.tabControl.tabObjs.length==1}
if(showDefault&&this.isShow){this.doResize();this.setTabTrVisible(false);this.showTabPanel("DEFUALT");}}
return true;}
BrowseBaseManager.prototype.onTabActive=function(tab){this.showTabPanel(tab.id);}
BrowseBaseManager.prototype.onTabClick=function(tab){if(this.tabControl.activeTab.id==tab.id)
return;if(this.tabControl.activeTab)
this.hideTabPanel(this.tabControl.activeTab.id);}
BrowseBaseManager.prototype.doResize=function(){this.setLeftViewVisible(true);if(this.tabControl&&(this.tabControl.isMaxFrame||document.body.maximizing))
this.tabControl.doMaxFrame();};BrowseBaseManager.prototype.autoFitResize=function(){this.tabControl.autoFitResize();};BaseManager.prototype.onTabDClick=function(tab,op){if(tab.CurrentManager!=this)
return;if(this.tabControl)
this.tabControl.doMaxFrame();}
BaseManager.prototype.onTabCloseAll=function(){this.doResize();this.setTabTrVisible(false);this.showTabPanel("DEFUALT");};BaseManager.prototype.setMorePanelVisible=function(){this.tabControl.setMorePanelVisible(false);};BaseManager.prototype.hideLocationBar=function(){var rigthContent=document.getElementById('rigthContent');if(!rigthContent)
return;var closeBtn=domutils.findElementByClassName(rigthContent,"_frameCloseButton");if(closeBtn)
closeBtn.style.display="none";};