 
"use strict";
	
 var sceneObjectModule = (function () {
	 
	
	var objArray = [];
	
	objArray.activeClasses = {};
	
	function createBuffers(obj) {
		var buffer_name;
		if(!objArray.activeClasses[obj.objClass]){
			let property_names = Object.keys(obj.properties);
			for(let i = 0; i < property_names.length; i++){
				buffer_name = obj.objClass + "_" + property_names[i] + "_buffer";
				objArray[buffer_name] = gl.createBuffer();
			}
			
		}
		objArray.activeClasses[obj.objClass] = obj.objClass;
	}
	
	function createObject(objClass, options) {
		
		let obj = {};
		obj.objClass = objClass;
		obj.properties = {
			"position" : [],
			"color" : []
		};
		
		createBuffers(obj);
	
			switch (objClass) {
				
				case "triangle" : {
				
					
					obj.vertSize = 3;
					obj.numVert = 3;
					obj.colorSize = 4;
					obj.numColor = 3;
				
					obj.properties.position = [
						0.0,  1.0,  0.0,
					   -1.0, -1.0,  0.0,
						1.0, -1.0,  0.0
					];
						
					//check if there are parameters for size and color, if not, use default values
					if (!options){  
				
						obj.place = [0.0, 0.0, -7.0]; 
							
						obj.properties.color = [
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0
							];
						
					} else {
					
						if (options.place && options.color) {
							obj.place = options.place;
							obj.properties.color = options.color;
						} else if (options.color) {
							obj.place = [0.0, 0.0, -7.0];
							obj.properties.color = options.color;
						} else if(options.place){
							obj.place = options.place;
							obj.properties.color = [
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0
							];
						}
					}
					
					objArray.push(obj);
					let index = objArray.length - 1;
					initBuffers(index);
					break;
					
				}
					
				case "square" : {
					obj.vertSize = 3;
					obj.numVert = 4;
					obj.colorSize = 4;
					obj.numColor = 4;
					
					obj.properties.position = [
						 1.0,  1.0,  0.0,
						-1.0,  1.0,  0.0,
						 1.0, -1.0,  0.0,
						-1.0, -1.0,  0.0
					];
					
					if (!options){  
	
						obj.place = [0.0, 0.0, -7.0]; 
							
						obj.properties.color = [
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0
							];
						
					} else {
					
						if (options.place && options.color) {
							obj.place = options.place;
							obj.properties.color = options.color;
						} else if (options.color) {
							obj.place = [0.0, 0.0, -7.0];
							obj.properties.color = options.color;
						} else if(options.place){
							obj.place = options.place;
							obj.properties.color = [
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0	
							];
						}
					}
					
					objArray.push(obj);
					let index = objArray.length - 1;
					initBuffers(index);
					break;
				}	
				
				default: console.log("createObject doesn't recognize input: " + objClass);
				
			}
	}


function setMatrixUniforms(pMatrix, mvMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	}


function initBuffers(index) {
	
	let currObj = objArray[index];
	let bufferRef = currObj.objClass + "_position_buffer";
	gl.bindBuffer(gl.ARRAY_BUFFER, objArray[bufferRef]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.properties.position), gl.STATIC_DRAW);
	
	bufferRef = currObj.objClass + "_color_buffer";
	gl.bindBuffer(gl.ARRAY_BUFFER, objArray[bufferRef]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.properties.color), gl.STATIC_DRAW);

}

function drawScene() {
		
		let mvMatrix = mat4.create();
		let pMatrix = mat4.create();
	
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);        
		
		for (let i = 0; i < objArray.length; i++){
			
			let currObj = objArray[i];
			
			mat4.identity(mvMatrix);
			mat4.translate(mvMatrix, currObj.place);
			
			let bufferRef = currObj.objClass + "_position_buffer";
			
			gl.bindBuffer(gl.ARRAY_BUFFER, objArray[bufferRef]);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, currObj.vertSize, gl.FLOAT, false, 0, 0);
		  
			bufferRef = currObj.objClass + "_color_buffer";
		  
			gl.bindBuffer(gl.ARRAY_BUFFER, objArray[bufferRef]);
			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, currObj.colorSize, gl.FLOAT, false, 0, 0);
			
			setMatrixUniforms(pMatrix, mvMatrix);
		
			switch (currObj.objClass) {
				case "triangle" : 
					gl.drawArrays(gl.TRIANGLES, 0, currObj.numVert); 
					break;
				case "square" :
			
					gl.drawArrays(gl.TRIANGLE_STRIP, 0, currObj.numVert);
					break;
				default : 
					console.log("objectClass not recognized in drawScene");
			}
		}
		
}

	return {
		
		"setMatrixUniforms" : function() {
			return setMatrixUniforms();
		},
		
		"initBuffers" : function() {
			return initBuffers();
		},
		
		"drawScene" : function() {
			return drawScene();
		},
		
		"createObject" : function(objClass, options) {
			return createObject(objClass, options);
		}
		
	};

 }());

