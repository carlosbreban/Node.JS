// PHOTOSHOP: Export symbol layers/groups as PNG 
// By Carlos Breban
// Usage: 
//  1. Add layers of groups of layers in a "FINAL" group
//	2. Run script
// NOTE: PNGs Images will be saved to a "PNG" folder at the same level as the open scene's parent folder.
(
function (){
	
	"use strict";
	
	var fs = require('fs'),
	path = require('path'),
	Q = require('./node_modules/q');
	
	var generator;
	var paddedBounds;
	var finalLayerID;
	var finalLayerIDx;
	var layerNames = [];
	var croppedToNearest = false;
	

	function init(gen){
		generator = gen;
		generator.addMenuItem("export_symbols", "Export Symbols", true, false)
		generator.onPhotoshopEvent("generatorMenuChanged", menuClicked);	
		}
	
	
	function menuClicked(e){
		if(e.generatorMenuChanged.name == "export_symbols") {
			PngFilePath();
			}
		}
		
	
	function PngFilePath(){
		generator.getOpenDocumentIDs()
			.then(
				function(id){
					return generator.getDocumentInfo(id[0]);
					}
				)
			.then(
				function(info){					
					var pixMapArray = [];					
					var docPath = info.file;
					var pngPath = docPath.substr(0,docPath.lastIndexOf('\\')-3) + 'PNG\\';	
					
					var psdName = docPath.substr(docPath.lastIndexOf('\\')+1,docPath.length);
					var gameName = psdName.substr(0,psdName.lastIndexOf('.'));
					
					//find FINAL layer				
					for(var i=0;i<info.layers.length;i++){
						if(info.layers[i].name == "FINAL"){
							finalLayerID = info.layers[i].id;
							finalLayerIDx = i;
							}
						}

					for(var i=0;i<info.layers[finalLayerIDx].layers.length;i++){
						//calculate padding pixels	
						if(croppedToNearest == false){		
							var docBounds = info.bounds;
							var layerBounds = info.layers[finalLayerIDx].layers[i].bounds;
							paddedBounds = {top:(layerBounds.top),left:(layerBounds.left),bottom:(docBounds.bottom - layerBounds.bottom),right:(docBounds.right - layerBounds.right)} ;
							}
						else paddedBounds = {top:0,left:0,bottom:0,right:0} ; 
						
						//store pixmap and layer names in arrays
						pixMapArray.push(generator.getPixmap(info.id, info.layers[finalLayerIDx].layers[i].id, {}));
						layerNames.push(info.layers[finalLayerIDx].layers[i].name);
						}
						Q.all(pixMapArray)
						.then(
							function(pixmap){	
								for(var i=0;i<pixmap.length;i++){
									var exportPath =(pngPath + "sym_" + layerNames[i] + ".png");
									//save PNG8									
									generator.savePixmap(pixmap[i],exportPath,{format:"png",quality:8,ppi:72,padding:paddedBounds});
									}
								}
							);		
					}	
				)
		}
	exports.init = init;
	}()
);