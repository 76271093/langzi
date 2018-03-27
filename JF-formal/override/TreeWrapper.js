
var CatalogTreeSearchBar=jsloader.resolve("freequery.tree.CatalogTreeSearchBar");var TreeWrapper=function(treeInfo,arg1,arg2){this.treeInfo=treeInfo;var Tree=null;if(treeInfo.className)
Tree=jsloader.resolve(treeInfo.className);this.treePane=treeInfo.treePane||document.getElementById('leftCatalogTree');this.leftBanner=treeInfo.bannerPane||document.getElementById('leftBannerDiv');this.searchBannerTr=document.getElementById('SearchBannerTr');this.searchBanner=document.getElementById('SearchBanner');if(Tree){this.tree=new Tree(this.treePane);if(this.searchBannerTr){if(this.tree.needSearch)
this.searchBannerTr.style.display="";else
this.searchBannerTr.style.display="none";}
if(this.searchBanner){this.searchbar=new CatalogTreeSearchBar(this.tree,this.searchBanner);if(!this.searchbar.active)
this.searchbar=null;}
this.arg1=arg1;this.arg2=arg2;if(this.tree.treeName){registry.put(this.tree.treeName,this.tree);}}};TreeWrapper.prototype.showTree=function(){if(!this.rendered){this.tree.render(this.arg1,this.arg2);this.rendered=true;}
if(this.tree.rootPane.parentNode!=this.treePane)
this.treePane.appendChild(this.tree.rootPane);if(this.searchbar)
{this.searchBannerTr.style.display="";this.searchbar.show();}
if(this.leftBanner)
{this.leftBanner.style.backgroundImage="url(img/tree/treetitlebg.jpg)";if(this.treeInfo.image)
{this.leftBanner.style.backgroundImage="url("+this.treeInfo.image+")";}
this.leftBanner.style.textAlign="center";this.leftBanner.style.fontSize="12px";this.leftBanner.valign="center";this.treeTitle="资源目录";if(this.treeInfo.title)
{this.treeTitle=this.treeInfo.title;}
this.leftBanner.innerHTML="<span>"+this.treeTitle+"</span>";}
if(this.treeInfo.backgroundColor)
this.treePane.style.backgroundColor=this.treeInfo.backgroundColor;else
this.treePane.style.backgroundColor="transparent";};TreeWrapper.prototype.hideTree=function(){if(this.searchbar)
{this.searchBannerTr.style.display="none";this.searchbar.hide();}
if(this.tree.rootPane.parentNode==this.treePane)
this.treePane.removeChild(this.tree.rootPane);};TreeWrapper.prototype.destroyTree=function(){if(this.searchbar)
this.searchbar.destroy();if(this.tree){if(this.tree.treeName)
registry.put(this.tree.treeName,null);this.tree.destroy();this.tree=null;}
this.treePane=null;this.leftBanner=null;this.searchBannerTr=null;this.searchBanner=null;};