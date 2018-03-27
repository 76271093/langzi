
﻿
var BaseCommandFactory=function(){this.cmd=new Array();this.prevCommand=null;this.currentCommand=null;};BaseCommandFactory.prototype.getCommandOnly=function(command){var cmd=this.cmd[command];if(cmd)
return cmd;else{var mappingClassName=this.cmdMapping[command];if(mappingClassName==null)
return null;var mappingClass=jsloader.resolve(mappingClassName);var cmd=new mappingClass();this.cmd[command]=cmd;cmd.commandFactory=this;if(this.commandFactoryName&&cmd.setCommandFactoryName)
cmd.setCommandFactoryName(this.commandFactoryName);if(cmd.onClose)
cmd.onClose.subscribe(this.doOnCommandClose,this);if(cmd.needRefresh)
cmd.needRefresh.subscribe(this.doNeedRefresh,this);return cmd;}};BaseCommandFactory.prototype.getCommand=function(command){this.prevCommand=this.currentCommand;this.onGetCommand=true;if(this.prevCommand){if(this.prevCommand.confirmClose){if(this.prevCommand.confirmClose()){this.prevCommand.close();}else{this.onGetCommand=false;return null;}}
this.prevCommand.close();}
this.onGetCommand=false;if(this.cmd[command]){this.currentCommand=this.cmd[command];return this.cmd[command];}else{var mappingClassName=this.cmdMapping[command];if(mappingClassName==null)
return null;var mappingClass=jsloader.resolve(mappingClassName);this.cmd[command]=new mappingClass();this.cmd[command].commandFactory=this;if(this.commandFactoryName&&this.cmd[command].setCommandFactoryName)
this.cmd[command].setCommandFactoryName(this.commandFactoryName);this.currentCommand=this.cmd[command];if(this.currentCommand.onClose)
this.currentCommand.onClose.subscribe(this.doOnCommandClose,this);if(this.currentCommand.needRefresh)
this.currentCommand.needRefresh.subscribe(this.doNeedRefresh,this);return this.currentCommand;}};BaseCommandFactory.prototype.doOnCommandClose=function(cmd){if(this.onGetCommand)
return;cmd.close();this.getCommand(this.defaultCommandName).execute();};BaseCommandFactory.prototype.doNeedRefresh=function(cmd,id){var tree=registry.get(this.treeName);if(tree)
tree.refreshNode(id);};BaseCommandFactory.prototype.destroy=function(){for(var key in this.cmd){this.cmd[key].destroy();delete this.cmd[key];}};BaseCommandFactory.prototype.destroy=function(){for(var key in this.cmd){if(this.cmd[key].destroy){this.cmd[key].destroy();}
delete this.cmd[key];}};