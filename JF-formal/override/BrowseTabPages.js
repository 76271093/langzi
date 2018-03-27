
var Module=jsloader.resolve("freequery.widget.Module");var CustomEvent=jsloader.resolve("freequery.lang.CustomEvent");var util=jsloader.resolve("freequery.common.util");var TabPages=jsloader.resolve("freequery.control.TabPages");var PopupMenu=jsloader.resolve("freequery.menu.PopupMenu");var BrowseTabPages=function(container,options,contextMenuDisabled){this.container=container;if("string"==typeof options){if(options=="OPTION1")
options=util.getClean(BrowseTabPages.Options[options]);}
this.options=options||{};this.classNames=this.options.classNames||{};if(this.options.tabPosition)
this.tabPosition=this.options.tabPosition.toUpperCase();else
this.tabPosition="TOP";this.tabPanel=domutils.createElement("div");if(this.classNames.tabPanel)
this.tabPanel.className=this.classNames.tabPanel;this.container.appendChild(this.tabPanel);this.tabPanelHeader=domutils.createElement("div");if(this.classNames.tabPanelHeader)
this.tabPanelHeader.className=this.classNames.tabPanelHeader;this.tabPanel.appendChild(this.tabPanelHeader);if(this.options.tabPanelHeaderWidth)
this.tabPanelHeader.style.width=this.options.tabPanelHeaderWidth;if(this.options.tabPanelHeaderHeight)
this.tabPanelHeader.style.height=this.options.tabPanelHeaderHeight;this.tabPanelBodyWrap=domutils.createElement("div");if(this.classNames.tabPanelBodyWrap)
this.tabPanelBodyWrap.className=this.classNames.tabPanelBodyWrap;if("BOTTOM"==this.tabPosition)
this.tabPanel.insertBefore(this.tabPanelBodyWrap,this.tabPanelHeader);else
this.tabPanel.appendChild(this.tabPanelBodyWrap);if(this.options.tabPanelBodyWidth){this.tabPanelBodyWrap.style.width=this.options.tabPanelBodyWidth;this.tabPanelHeader.style.width=this.options.tabPanelBodyWidth;}
if(this.options.tabPanelBodyHeight)
this.tabPanelBodyWrap.style.height=this.options.tabPanelBodyHeight;this.tabPanelBodyWrap.oldDisplay=this.tabPanelBodyWrap.style.display;this.tabPanelBodyWrap.style.display="none";this.tabStripSpacer=domutils.createElement("div");if(this.classNames.tabStripSpacer)
this.tabStripSpacer.className=this.classNames.tabStripSpacer;this.tabPanelHeader.appendChild(this.tabStripSpacer);this.tabStripWrap=domutils.createElement("div");if(this.classNames.tabStripWrap)
this.tabStripWrap.className=this.classNames.tabStripWrap;this.tabPanelHeader.appendChild(this.tabStripWrap);this.tabStrip=domutils.createElement("div");if(this.classNames.tabStrip)
this.tabStrip.className=this.classNames.tabStrip;this.tabStripWrap.appendChild(this.tabStrip);this.moreBtnDiv=domutils.createElement("div");if(this.classNames.tabScrollLeft)
this.moreBtnDiv.className=this.classNames.tabHeader;this.tabStrip.appendChild(this.moreBtnDiv);this.btnMore=domutils.createElement("span");this.btnMore.className=this.classNames.btnMore;this.moreBtnDiv.appendChild(this.btnMore);this.tabPanelBody=domutils.createElement("div");if(this.classNames.tabPanelBody)
this.tabPanelBody.className=this.classNames.tabPanelBody;this.tabPanelBodyWrap.appendChild(this.tabPanelBody);this.morePanelBody=domutils.createElement("div");this.morePanelBody.className=this.classNames.morePanelBody;this.container.parentNode.appendChild(this.morePanelBody);this.morePanelBody.style.display="none";this.addListener(this.morePanelBody,"click",this.openTab,this);this.tabObjs=new Array();this.hiddenTabObjs=new Array();if(!contextMenuDisabled){this.popupMenu=new PopupMenu(this.container,this);this.popupMenu.setWidth(90);this.popupMenu.maxMemu=this.popupMenu.createMenuItem("最大化","MAX");this.popupMenu.restoreMemu=this.popupMenu.createMenuItem("还原","RESTORE");this.popupMenu.closeMemu=this.popupMenu.createMenuItem("关闭","CLOSE");this.popupMenu.closeOtherMemu=this.popupMenu.createMenuItem("关闭其他","CLOSEOTHER");this.popupMenu.closeAllMemu=this.popupMenu.createMenuItem("关闭所有","CLOSEALL");this.addListener(this.tabStrip,"contextmenu",this.doOnContextMenu,this);}
this.onTabClick=new CustomEvent("onTabClick",this);this.onTabDClick=new CustomEvent("onTabDClick",this);this.onTabActive=new CustomEvent("onTabActive",this);this.onTabClose=new CustomEvent("onTabClose",this);this.onTabClose.terminateOnFalse=true;this.onTabCloseAll=new CustomEvent("onTabCloseAll",this);this.addListener(window,"resize",this.doWindowResize,this);this.addListener(this.btnMore,"click",this.onBtnMoreClick,this);this.tmpResized=false;this.docElement=document.getElementById('mainTable')||document.body;this.rigthContent_parent=document.getElementById('rigthContent_parent');this.tabsShareWorkspace=true;var config=util.getSystemConfig("TABS_SHARE_WORKSPACE");this.tabsShareWorkspace=!config||config=="true";if(this.rigthContent_parent){this.rigthContent=document.createElement("DIV");this.rigthContent.setAttribute("bofid","rigthContent");this.rigthContent.id="rigthContent";this.rigthContent_parent.appendChild(this.rigthContent);}else{this.rigthContent=this.rigthContent_parent=document.getElementById('rigthContent');}
var mainView=registry.get("MainView");if(mainView&&mainView.onMainViewResize){mainView.onMainViewResize.subscribe(this.autoFitResize,this);}}
lang.extend(BrowseTabPages,TabPages);BrowseTabPages.prototype.destroy=function(){if(this.btnMore){this.removeListener(this.btnMore,"click",this.onBtnMoreClick);this.removeListener(this.btnMax,"click",this.doMaxFrame);}
if(this.popupMenu){this.removeListener(this.container,"contextmenu",this.doOnContextMenu);this.popupMenu.destroy();this.popupMenu=null;}
this.bindDocMouseDown(false);BrowseTabPages.superclass.destroy.call(this);};BrowseTabPages.prototype.bindDocMouseDown=function(isAddListener){if(isAddListener){if(!this._isBoundDocMouseDown){this.addListener(this.docElement,"mousedown",this.doDocMouseDown,this,"bindDocMouseDown");var nl=document.getElementsByTagName("IFRAME");for(var i=0;i<nl.length;i++){try{if(nl[i]._isPopupMenu)
continue;var d=nl[i].contentWindow.document;this.addListener(d,"mousedown",this.doDocMouseDown,this,"bindDocMouseDown");}catch(e){}}
this._isBoundDocMouseDown=true;}}else{if(this._isBoundDocMouseDown){this.removeListenersByGroup("bindDocMouseDown");this._isBoundDocMouseDown=null;delete this._isBoundDocMouseDown;}}};BrowseTabPages.prototype.doDocMouseDown=function(e){var target=e.target,t=this;if(!t.elementInPanel(target,t.morePanelBody)){t.setMorePanelVisible(false);}};BrowseTabPages.prototype.doOnContextMenu=function(e){var target=e.target;if(!target||!this.popupMenu)
return;if(domutils.hasClassName(target,"morePanel")||domutils.hasClassName(target.parentNode,"morePanel"))
return;var activeTab=this.activeTab;var closeable=activeTab&&activeTab.closeable;this.popupMenu.closeMemu.setVisibility(closeable);var isMax=document.body.maximizing;this.popupMenu.maxMemu.setVisibility(!isMax);this.popupMenu.restoreMemu.setVisibility(isMax);if(this.tabsShareWorkspace)
this.popupMenu.closeOtherMemu.setEnabled(this.tabObjs.length>1);else{var CurrentManager=registry.get("CurrentManager");var len=0;for(var i=0;i<this.tabObjs.length;i++){if(this.tabObjs[i].CurrentManager==CurrentManager){if(++len>1)
break;}}
this.popupMenu.closeOtherMemu.setEnabled(len>1);}
this.popupMenu.popup(e);domutils.stopEvent(e);}
BrowseTabPages.prototype.elementInPanel=function(el,panel){if(panel){while(el!=null){if(el==panel){return true;}else{el=el.parentNode;}}}
return false;};BrowseTabPages.prototype.doCmd=function(cmd){switch(cmd){case"RESTORE":this.doTabDClick(this.activeTab,0);break;case"MAX":this.doTabDClick(this.activeTab,1);break;case"CLOSE":var activeTab=this.activeTab;if(activeTab&&activeTab.closeable)
activeTab.doClose();break;case"CLOSEOTHER":var activeTab=this.activeTab;var CurrentManager=registry.get("CurrentManager");for(var i=this.tabObjs.length-1;i>=0;i--){var tab=this.tabObjs[i];if(tab!=activeTab&&(this.tabsShareWorkspace||tab.CurrentManager==CurrentManager))
tab.doClose();}
break;case"CLOSEALL":this.doTabCloseAll();break;}}
BrowseTabPages.prototype.doTabClose=function(tab){var result=this.onTabClose.fire(tab);if(!result)
return false;tab.tabRightContent.parentNode.removeChild(tab.tabRightContent);for(var i=0,len=this.tabObjs.length;i<len;i++){if(this.tabObjs[i].id==tab.id){var tmp=this.tabObjs.splice(i,1)[0];var tmpEl=tmp.contentEl;if(tmpEl){if(tmpEl.dynamic){if(tmpEl.parentNode)
tmpEl.parentNode.removeChild(tmpEl);tmpEl=null;}else
tmpEl.style.display=tmpEl.oldDisplay;}
if(this.activeTab){if(this.activeTab.id==tab.id){this.activeTab=null;var CurrentManager=registry.get("CurrentManager");for(var j=i;j<len;j++){var tab=this.tabObjs[j];if(!tab)
continue;if(this.tabsShareWorkspace||tab&&tab.CurrentManager==CurrentManager){tab.setActive(true);this.activeTab=tab;break;}}
if(!this.activeTab){for(var j=i-1;j>=0;j--){var tab=this.tabObjs[j];if(!tab)
continue;if(this.tabsShareWorkspace||tab&&tab.CurrentManager==CurrentManager){tab.setActive(true);break;}}}}}
break;}}}
BrowseTabPages.prototype.doTabCloseAll=function(){for(var i=this.tabObjs.length-1;i>=0;i--){var tab=this.tabObjs[i];if(tab)
tab.__closing=true;}
var CurrentManager=registry.get("CurrentManager");for(var i=this.tabObjs.length-1;i>=0;i--){var tab=this.tabObjs[i];if(tab&&tab.closeable&&(this.tabsShareWorkspace||tab.CurrentManager==CurrentManager)){tab.doClose();}}
this.autoFitResize();this.onTabCloseAll.fire();}
BrowseTabPages.prototype.appendTab=function(tabTitle,imgSrc,closeable,tabOnly,contentElement){var contentEl=null;if(!tabOnly){contentEl=contentElement;if(contentEl==null||'object'!=typeof contentEl||contentEl.nodeType!=1){contentEl=domutils.createElement("div");contentEl.dynamic=true;if(this.classNames.tabBody){contentEl.className=this.classNames.tabBody;}else{contentEl.style.width="100%";contentEl.style.height="100%";}
if(this.tabPanelBodyWrap.style.display=="none")
this.tabPanelBodyWrap.style.display=this.tabPanelBodyWrap.oldDisplay;this.tabPanelBody.appendChild(contentEl);}else{if(this.classNames.tabBody)
contentEl.className=this.classNames.tabBody;}
contentEl.oldDisplay=contentEl.style.display;contentEl.style.display="none";}
var tabRightContent=document.createElement("DIV");tabRightContent.style.width=tabRightContent.style.height="100%";tabRightContent.setAttribute("bofid","rigthContent");tabRightContent.id="rigthContent";this.rigthContent_parent.appendChild(tabRightContent);this.rigthContent.setAttribute("bofid","rigthContent_hidden");this.rigthContent.id="rigthContent_hidden";var tab=new Tab(this.tabStrip,tabTitle,imgSrc,closeable,contentEl,this.options.tabOptions,this);tab.CurrentManager=registry.get("CurrentManager");tab.tabRightContent=tabRightContent;tab.onClick.subscribe(this.doTabClick,this);tab.onDClick.subscribe(this.doTabDClick,this);tab.onActive.subscribe(this.doTabActive,this);tab.onClose.subscribe(this.doTabClose,this);tab.onCloseAll.subscribe(this.doTabCloseAll,this);tab.onVisibleChanged.subscribe(this.doTabVisibleChanged,this);tab.onCaptionChanged.subscribe(this.doTabCaptionChanged,this);this.tabObjs.push(tab);if(!this.activeTab){tab.setActive(true);this.activeTab=tab;}
this.autoFitResize();return tab;}
BrowseTabPages.prototype.doTabDClick=function(tab,op){this.onTabDClick.fire(tab,op);}
BrowseTabPages.prototype.autoFitResize=function(){if(this.getSpareWidth()>0){if(this.hiddenTabObjs&&this.hiddenTabObjs.length>0){this.reshowHiddenTabs();}}
else{this.hideTabs();}
var show=this.hiddenTabObjs.length>0?true:this.getSpareWidth()<0?true:false;this.btnMore.style.display=show?"":"none";this.btnMore.innerHTML=this.hiddenTabObjs.length;}
BrowseTabPages.prototype.hideFirstVisibleTab=function(){var num=0;var tmpTab=null;for(var i=0,len=this.tabObjs.length;i<len;i++){var obj=this.tabObjs[i];if(obj.getVisible()){tmpTab=obj;if(obj.active)
continue;num++;obj.setVisibleOnly(false);var isExist=false;for(var j=0,leng=this.hiddenTabObjs.length;j<leng;j++){if(this.hiddenTabObjs[j].id==obj.id){isExist=true;break;}}
if(!isExist){this.hiddenTabObjs.push(obj);break;}}}
if(tmpTab)
tmpTab.setVisibleOnly(false);}
BrowseTabPages.prototype.hideLastVisibleTab=function(){for(var i=this.tabObjs.length-1;i>=0;i--){var obj=this.tabObjs[i];if(obj.getVisible()){obj.setVisibleOnly(false);var isExist=false;for(var j=0,leng=this.hiddenTabObjs.length;j<leng;j++){if(this.hiddenTabObjs[j].id==obj.id){isExist=true;break;}}
if(!isExist){this.hiddenTabObjs.push(obj);break;}}}}
BrowseTabPages.prototype.openTab=function(e){if(!e.target)
return;this.reshowTab(e.target.tabObj);this.setMorePanelVisible(false);}
BrowseTabPages.prototype.reshowTab=function(tab){if(!tab){this.autoFitResize();return;}
if(tab.getVisible()){tab.doClick();return;}
var spareWidth=this.getSpareWidth();while(spareWidth<tab.width&&this.hiddenTabObjs.length<this.tabObjs.length-1){this.hideFirstVisibleTab();spareWidth=this.getSpareWidth();}
tab.setVisibleOnly(true);tab.doClick();for(var i=0,len=this.hiddenTabObjs.length;i<len;i++){if(this.hiddenTabObjs[i].id==tab.id){this.hiddenTabObjs.splice(i,1)[0];break;}}
this.autoFitResize();}
BrowseTabPages.prototype.reshowHiddenTabs=function(){var hiddenTabList=new Array();for(var i=0,len=this.hiddenTabObjs.length;i<len;i++){hiddenTabList.push(this.hiddenTabObjs[i]);}
var num=0;var startIndex=0;for(var i=0,len=hiddenTabList.length;i<len;i++){if(this.getSpareWidth()>this.hiddenTabObjs[startIndex].width){this.hiddenTabObjs[startIndex].setVisibleOnly(true);this.hiddenTabObjs.splice(startIndex,1)[0];startIndex=0;}
else
startIndex++;}}
BrowseTabPages.prototype.hideTabs=function(){var spareWidth=this.getSpareWidth();while(spareWidth<0){this.hideFirstVisibleTab();spareWidth=this.getSpareWidth();}}
BrowseTabPages.prototype.onBtnMoreClick=function(e){if(this.morePanelBody.style.display=="none")
this.setMorePanelVisible(true);else
this.setMorePanelVisible(false);domutils.stopEvent(e);}
BrowseTabPages.prototype.setMorePanelVisible=function(visible){this.morePanelBody.style.display=(!!visible)?"":"none";if(!visible){this.bindDocMouseDown(false);return;}else{this.bindDocMouseDown(true);}
var child=this.morePanelBody.firstChild;while(child!=null){this.removeListener(child,"mouseover",this.handlePanelItemMouseOver,this);this.removeListener(child,"mouseout",this.handlePanelItemMouseOut,this);domutils.destroyNode(child,true);child=this.morePanelBody.firstChild;}
for(var i=0,len=this.hiddenTabObjs.length;i<len;i++){var tab=this.hiddenTabObjs[i];var div=domutils.createElement("div");div.className=this.classNames.morePanelHiddenItem;div.innerHTML=tab.name;div.title=tab.name;div.tabObj=tab;div.tabIndex=i;this.addListener(div,"mouseover",this.handlePanelItemMouseOver,this);this.addListener(div,"mouseout",this.handlePanelItemMouseOut,this);this.morePanelBody.appendChild(div);}
for(var i=0,len=this.tabObjs.length;i<len;i++){var tab=this.tabObjs[i];if(tab.getVisible()){var div=domutils.createElement("div");div.className=this.classNames.morePanelItem;div.innerHTML=tab.name;div.title=tab.name;div.tabObj=tab;div.tabIndex=i;this.addListener(div,"mouseover",this.handlePanelItemMouseOver,this);this.addListener(div,"mouseout",this.handlePanelItemMouseOut,this);this.morePanelBody.appendChild(div);}}}
BrowseTabPages.prototype.handlePanelItemMouseOver=function(e){var e=e||event;var target=e.target||e.srcElement;if(target){if(domutils.hasClassName(target,"morePanelItem-flat")){domutils.replaceClassName(target,"morePanelItem-flat-select","morePanelItem-flat");}
if(domutils.hasClassName(target,"morePanelItem-flat-hidden")){domutils.replaceClassName(target,"morePanelItem-flat-hidden-select","morePanelItem-flat-hidden");}}}
BrowseTabPages.prototype.handlePanelItemMouseOut=function(e){var e=e||event;var target=e.target||e.srcElement;if(target){if(domutils.hasClassName(target,"morePanelItem-flat-select")){domutils.replaceClassName(target,"morePanelItem-flat","morePanelItem-flat-select");}
if(domutils.hasClassName(target,"morePanelItem-flat-hidden-select")){domutils.replaceClassName(target,"morePanelItem-flat-hidden","morePanelItem-flat-hidden-select");}}}
BrowseTabPages.prototype.doMaxFrame=function(){var state=util.toggleMaximize();var maxBtn=domutils.findElementByClassName(this.activeTab?this.activeTab.tabRightContent:document.body,"_frameMaxButton");if(maxBtn)
maxBtn.src=state?"img/mainframe/original.png":"img/mainframe/max.png";this.autoFitResize();this.isMaxFrame=state;}
BrowseTabPages.prototype.getTabById=function(tabId){var len=this.tabObjs.length;for(var i=0;i<len;i++){if(this.tabObjs[i].id==tabId){return this.tabObjs[i];}}
return null;}
BrowseTabPages.prototype.getSpareWidth=function(){var tab=this.getFirstVisibleTab(true);if(!tab){return this.tabStripWrap.offsetWidth;}
var lastTabEl=tab.getElement();var visiableLength=this.container.parentNode.clientWidth;if(this.btnMore.style.display=="")
return visiableLength-(lastTabEl.offsetLeft+lastTabEl.offsetWidth)-20-12;else
return visiableLength-(lastTabEl.offsetLeft+lastTabEl.offsetWidth)-10-12;}
BrowseTabPages.prototype.doWindowResize=function(){if(!this.tmpResized){this.autoFitResize();this.tmpResized=true;}
var that=this;if(this.tmpResized==true){setTimeout(function(){that.tmpResized=false;},1000);}}
var Tab=function(container,caption,imgSrc,closeable,contentEl,options,tabPages){this.container=container;this.title=caption;this.imgSrc=imgSrc;this.contentEl=contentEl;this.options=options||{};this.tabPages=tabPages;this.classNames=this.options.classNames||{};this.closeable=!!closeable&&(this.options.closeImgSrc!=undefined);this.active=false;this.isMouseOver=false;this.parent=domutils.createElement("div");if(this.tabPages&&this.tabPages.classNames.tabHeader)
this.parent.className=this.tabPages.classNames.tabHeader;this.parent.oldDisplay=this.parent.style.display;this.container.insertBefore(this.parent,tabPages.moreBtnDiv);this.id=this.parent.id||domutils.generateId();this.spanL=domutils.createElement("span");this.parent.appendChild(this.spanL);this.spanM=domutils.createElement("span");this.parent.appendChild(this.spanM);if(this.imgSrc){this.icon=domutils.createElement("img");this.icon.src=this.imgSrc;this.icon.align="absmiddle";this.spanM.appendChild(this.icon);this.spanSpaceH=domutils.createElement("span");this.spanSpaceH.style.width="6px";this.spanM.appendChild(this.spanSpaceH);}
this.spanText=domutils.createElement("span");this.spanText.innerHTML=this.title;this.spanM.appendChild(this.spanText);if(this.closeable){this.spanSpaceT=domutils.createElement("span");this.spanSpaceT.style.width="5px";this.spanM.appendChild(this.spanSpaceT);this.btnClose=domutils.createElement("img");this.btnClose.src=this.options.closeImgSrc;this.btnClose.align="absmiddle";this.btnClose.title="关闭";this.spanM.appendChild(this.btnClose);this.addListener(this.btnClose,"click",this.doClose,this);if(this.options.closeImgOnSrc){this.addListener(this.btnClose,"mouseover",this.doBtnCloseMouseOver,this);this.addListener(this.btnClose,"mouseout",this.doBtnCloseMouseOut,this);}
this.btnClose.style.display="inline-block";this.btnClose.style.visibility="hidden";}
this.spanR=domutils.createElement("span");this.parent.appendChild(this.spanR);this.onClick=new CustomEvent("onClick",this);this.onActive=new CustomEvent("onActive",this);this.onClose=new CustomEvent("onClose",this);this.onClose.terminateOnFalse=true;this.onCloseAll=new CustomEvent("onCloseAll",this);this.onVisibleChanged=new CustomEvent("onVisibleChanged",this);this.onCaptionChanged=new CustomEvent("onCaptionChanged",this);this.onDClick=new CustomEvent("onDClick",this);this.addListener(this.parent,"click",this.doClick,this);this.addListener(this.parent,"dblclick",this.doDClick,this);this.addListener(this.parent,"mouseover",this.doMouseOver,this);this.addListener(this.parent,"mouseout",this.doMouseOut,this);this.addListener(this.parent,"mousedown",this.doMouseDown,this);this.updateClassName();this.width=this.getElement().offsetWidth;}
lang.extend(Tab,TabPages.Tab);Tab.prototype.removeTab=function(){if(this.container){if(this.parent){if(this.parent.parentNode)
this.parent.parentNode.removeChild(this.parent);this.parent=null;}
this.container=null;}};Tab.prototype.destroy=function(){if(this.btnClose){if(this.options.closeImgOnSrc){this.removeListener(this.btnClose,"mouseover",this.doBtnCloseMouseOver);this.removeListener(this.btnClose,"mouseout",this.doBtnCloseMouseOut);}
this.removeListener(this.btnClose,"click",this.doClose);}
this.removeListener(this.parent,"click",this.doClick);this.removeListener(this.parent,"dclick",this.doDClick);this.removeListener(this.parent,"mouseover",this.doMouseOver);this.removeListener(this.parent,"mouseout",this.doMouseOut);this.removeListener(this.parent,"mousedown",this.doMouseDown);this.onClick=null;this.onActive=null;this.onClose=null;this.onCloseAll=null;this.onVisibleChanged=null;this.onCaptionChanged=null;this.onDClick=null;if(this.container){this.removeTab();}
Tab.superclass.destroy.call(this);};Tab.prototype.doMouseDown=function(e){if(domutils.isRightButton(e.button)){this.doClick();}}
Tab.prototype.updateClassName=function(){if(this.active){if(this.classNames.btnSelectedLeft)
this.spanL.className=this.classNames.btnSelectedLeft;if(this.classNames.btnSelectedMiddle)
this.spanM.className=this.classNames.btnSelectedMiddle;if(this.classNames.btnSelectedRight)
this.spanR.className=this.classNames.btnSelectedRight;if(this.btnClose)
this.btnClose.style.visibility="visible";}else if(this.isMouseOver){if(this.classNames.btnMouseOverLeft)
this.spanL.className=this.classNames.btnMouseOverLeft;if(this.classNames.btnMouseOverMiddle)
this.spanM.className=this.classNames.btnMouseOverMiddle;if(this.classNames.btnMouseOverRight)
this.spanR.className=this.classNames.btnMouseOverRight;}else{if(this.classNames.btnNormalLeft)
this.spanL.className=this.classNames.btnNormalLeft;if(this.classNames.btnNormalMiddle)
this.spanM.className=this.classNames.btnNormalMiddle;if(this.classNames.btnNormalRight)
this.spanR.className=this.classNames.btnNormalRight;if(this.btnClose)
this.btnClose.style.visibility="hidden";}}
Tab.prototype.doClick=function(e){if(e&&e.button==1){this.doClose();}else{this.onClick.fire(this);if(!this.active)
this.setActive(true);}}
Tab.prototype.doDClick=function(op){this.onDClick.fire(this,op);}
Tab.prototype.setActive=function(value){Tab.superclass.setActive.call(this,value);if(this.active){var state=document.body.maximizing;var maxBtn=domutils.findElementByClassName(this.tabRightContent,"_frameMaxButton");if(maxBtn)
maxBtn.src=state?"img/mainframe/original.png":"img/mainframe/max.png";}}
Tab.prototype.doClose=function(){this.__closing=true;var result=this.onClose.fire(this);if(!result)
return;this.removeTab();this.onVisibleChanged.fire(this);this.destroy();}
Tab.prototype.doCloseAll=function(e){this.onCloseAll.fire(this);}
Tab.prototype.doMouseOver=function(){if(this.btnClose)
this.btnClose.style.visibility="visible";this.isMouseOver=true;if(this.active)
return;this.updateClassName();}
Tab.prototype.doMouseOut=function(){if(this.btnClose&&!this.active)
this.btnClose.style.visibility="hidden";this.isMouseOver=false;if(this.active)
return;this.updateClassName();}
Tab.prototype.doBtnCloseMouseOver=function(){this.btnClose.src=this.options.closeImgOnSrc;}
Tab.prototype.doBtnCloseMouseOut=function(){this.btnClose.src=this.options.closeImgSrc;}
Tab.prototype.setVisibleOnly=function(value){if(!this.parent)
return;var tmpDisplay=this.parent.style.display;this.parent.style.display=(!!value)?this.parent.oldDisplay:"none";}