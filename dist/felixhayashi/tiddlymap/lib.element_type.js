/*\

title: $:/plugins/felixhayashi/tiddlymap/js/ElementType
type: application/javascript
module-type: library

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var t=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var i=function(i,e,s){if(typeof i!=="string"){throw"Cannot create type"}this.opt=$tw.tmap.opt;this.logger=$tw.tmap.logger;this.type=i;this.allowedFields=["description","style","modified","created"].concat(s||[]);this.root=e;this.data=t.getDataMap();this.id=t.getWithoutPrefix(i,this.root+"/");this.loadDataFromType(this.id)};i.prototype.getPath=function(){return this.root+"/"+this.id};i.prototype.exists=function(){return t.tiddlerExists(this.getPath())};i.prototype.getId=function(){return this.id};i.prototype.getData=function(i){if(i){var e=this["get"+t.ucFirst(i)];return typeof e==="function"?e.call(this):this.data[i]}return this.data};i.prototype.setData=function(){var i=arguments;if(i.length===2){var e=i[0];var s=i[1];if(typeof e==="string"){if(s&&t.inArray(e,this.allowedFields)){if(typeof s==="string"){s=s.replace(/[\n\r]/g," ")}var a=this["set"+t.ucFirst(e)];if(typeof a==="function"){a.call(this,s)}else{this.data[e]=s}}else{delete this.data[e]}}}else if(i.length===1&&typeof i[0]==="object"){for(var o in i[0]){this.setData(o,i[0][o])}}return this};i.prototype.setStyle=function(i,e){if(typeof i==="string"){i=t.parseJSON(i)}if(typeof i==="object"){if(e){t.merge(this.data.style,i)}else{this.data.style=i}}return this};i.prototype.persist=function(i,e){if(!i){i=this.getPath()}if(typeof i==="string"){var s={title:i};if(!t.startsWith(i,this.root)){s.id=this.id}else{$tw.utils.extend(s,$tw.wiki.getModificationFields());if(!this.exists()){$tw.utils.extend(s,$tw.wiki.getCreationFields())}}var a=e?$tw.config.preferences.jsonSpaces:null;this.data.style=JSON.stringify(this.data.style,null,a);$tw.wiki.addTiddler(new $tw.Tiddler(this.data,s))}};i.prototype.loadDataFromType=function(e){if(e instanceof i){this.setData(e.getData())}else{if(e instanceof $tw.Tiddler){e=e.fields.title}if(typeof e==="string"){if(!t.startsWith(e,this.root)){e=this.root+"/"+e}this.loadDataFromTiddler($tw.wiki.getTiddler(e),false)}}};i.prototype.isShipped=function(){return $tw.wiki.getSubTiddler(this.opt.path.pluginRoot,this.getPath())};i.prototype.loadDataFromTiddler=function(i){var e=t.getTiddler(i);if(e){var s=$tw.wiki.getSubTiddler(this.opt.path.pluginRoot,this.getPath())||{};var a=$tw.utils.extend({},s.fields,e.fields);this.setData(a)}};exports.ElementType=i})();