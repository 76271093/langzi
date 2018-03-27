
var Module2=jsloader.resolve("freequery.widget.Module2");var TransferDataNode=jsloader.resolve("freequery.common.TransferDataNode");var util=jsloader.resolve("freequery.common.util");var catalogElementType=jsloader.resolve("freequery.tree.catalogElementType");var eventutil=jsloader.resolve("freequery.lang.eventutil");var ListResult=function(parentObj){this.init(parentObj,__url);this.contentTable=this.elemContentTable;this.onDblClickNode=new CustomEvent("dblClick",this);};lang.extend(ListResult,Module2);ListResult.prototype.clearContentTable=function(){var tBody=this.contentTable.firstChild;var rows=tBody.childNodes;for(var i=rows.length-1;i>=0;i--){if(domutils.hasClassName(rows[i],"searchTitle")||domutils.hasClassName(rows[i],"searchTail")){}else{domutils.destroyNode(rows[i]);};}}
ListResult.prototype.doShowResult=function(data){if(!data||data.lenght==0)
return;for(var i=0,c=0;i<data.length;i++)
{if(!data[i].fineshed)
continue;var row=this.contentTable.insertRow(1);row.className=(++c&1)?"searchResultRow-odd":"searchResultRow";var elemlist=data[i];var endelem=data[i][data[i].length-1];var cell=row.insertCell(-1);row.hiddenLink=document.createElement("A");cell.appendChild(row.hiddenLink);row.fakeSpan=document.createElement("SPAN");cell.appendChild(row.fakeSpan);row.fakeSpan.style.visibility="hidden";row.fakeSpan.appendChild(document.createTextNode(' '));cell=row.insertCell(-1);var img=document.createElement("IMG");if(endelem.customImage&&""!=endelem.customImage){if(endelem.customImage.indexOf("img/catalogtree/")==0)
img.src=endelem.customImage;else
img.src="img/catalogtree/"+endelem.customImage;}else
img.src="img/catalogtree/"+endelem.type+".png";cell.appendChild(img);cell=row.insertCell(-1);var alias=endelem.alias;if(alias==null||alias.length==0)
alias=endelem.name;cell.appendChild(document.createTextNode(alias));cell.style.cursor="default";row.title=catalogElementType[endelem.type]+":"+this.buildPath(elemlist);row.bindelem=endelem;this.addListener(row,"mousedown",this.doOnMouseDown,this);this.addListener(row,"dblclick",this.doOnDblClick,this);}
var tempRow=this.contentTable.insertRow(-1);tempRow.insertCell(-1);};ListResult.prototype.buildPath=function(elemlist){var str="";for(var i=0;i<elemlist.length;i++){str+=elemlist[i].alias+"\\";}
return str;};ListResult.prototype.doOnDblClick=function(e){e=eventutil.getEvent();var row,target=e.target;if(target.tagName=="TD")
row=target.parentElement;else
row=target;var fadeNode={};fadeNode._id=row.bindelem.id;this.onDblClickNode.fire(null,fadeNode);}
ListResult.prototype.doOnMouseDown=function(e){var obj=e.target;while(obj!=null&&!obj.bindelem)
{obj=obj.parentNode;}
this.curtr=obj;this.selectTr(obj);if(domutils.isIE()){this.lastClientX=e.clientX;this.lastClientY=e.clientY;this.addListener(document,"mousemove",this.doOnMouseMove,this);this.addListener(document,"mouseup",this.doOnMouseUp,this);}}
ListResult.prototype.doOnMouseUp=function(e){this.removeListener(document,"mousemove",this.doOnMouseMove);this.removeListener(document,"mouseup",this.doOnMouseUp);};ListResult.prototype.doOnMouseMove=function(e){var obj=this.curtr;var elem=obj.bindelem;this.createTransferData(elem)
if(this.lastClientX!=e.clientX||this.lastClientY!=e.clientY)
{var r=document.body.createTextRange();r.moveToElementText(obj.fakeSpan);r.select();obj.hiddenLink.dragDrop();this.removeListener(document,"mousemove",this.doOnMouseMove);this.removeListener(document,"mouseup",this.doOnMouseUp);}};ListResult.prototype.createTransferData=function(elem){if(elem)
{var transferNode=new TransferDataNode();transferNode.id=elem.id;transferNode.type=elem.type;transferNode.name=elem.name;transferNode.label=(elem.alias==null||elem.alias=="")?elem.name:elem.alias;transferNode.alias=elem.alias;util.transferData().srcElement=this;util.transferData().srcType="node";util.transferData().dataNodes=[transferNode];}};ListResult.prototype.selectTr=function(obj){if(obj){if(this.previousRow&&domutils.hasClassName(this.previousRow,"table-grid-row-select"))
domutils.removeClassName(this.previousRow,"table-grid-row-select");domutils.addClassName(obj,"table-grid-row-select");this.previousRow=obj;}};