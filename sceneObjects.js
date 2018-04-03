 
"use strict";
	
 var sceneObjectModule = (function () {
	 
	
	var objArray = [];
	
	objArray.pBuff = gl.createBuffer();
	objArray.cBuff = gl.createBuffer();
	
	//createObject("triangle", { 'color' : 
	
	function createObject(objClass, options) {
		
		let obj = {};
		let index;
		obj.objClass = objClass;
	
			switch (objClass) {
				
				case "triangle" :
				
					
					obj.vertSize = 3;
					obj.numVert = 3;
					obj.colorSize = 4;
					obj.numColor = 3;
				
					obj.v = [
						0.0,  1.0,  0.0,
					   -1.0, -1.0,  0.0,
						1.0, -1.0,  0.0
					];
						
					//check if there are parameters for size and color, if not, use default values
					if (!options){  
						console.log("goodbye");
						obj.place = [0.0, 0.0, -7.0]; 
							
						obj.c = [
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0
							];
						
					} else {
					
						if (options.place && options.color) {
							obj.place = options.place;
							obj.c = options.color;
						} else if (options.color) {
							obj.place = [0.0, 0.0, -7.0];
							obj.c = options.color;
						} else if(options.place){
							obj.place = options.place;
							obj.c = [
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0
							];
						}
					}
					
					objArray.push(obj);
					index = objArray.length - 1;
					break;
					
				case "square" : 
					obj.vertSize = 3;
					obj.numVert = 4;
					obj.colorSize = 4;
					obj.numColor = 4;
					
					obj.v = [
						 1.0,  1.0,  0.0,
						-1.0,  1.0,  0.0,
						 1.0, -1.0,  0.0,
						-1.0, -1.0,  0.0
					];
					
					if (!options){  
						console.log("goodbye");
						obj.place = [0.0, 0.0, -7.0]; 
							
						obj.c = [
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 1.0, 1.0
							];
						
					} else {
					
						if (options.place && options.color) {
							obj.place = options.place;
							obj.c = options.color;
						} else if (options.color) {
							obj.place = [0.0, 0.0, -7.0];
							obj.c = options.color;
						} else if(options.place){
							obj.place = options.place;
							obj.c = [
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0	
							];
						}
					}
					
					objArray.push(obj);
					index = objArray.length - 1;
					break;
					
				default: console.log("createObject doesn't recognize input: " + objClass);
			}
			
			initBuffers(index);
	}


function setMatrixUniforms(pMatrix, mvMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	}


function initBuffers(index) {
	
	let currObj = objArray[index];
	gl.bindBuffer(gl.ARRAY_BUFFER, objArray.pBuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.v), gl.STATIC_DRAW);
		
	gl.bindBuffer(gl.ARRAY_BUFFER, objArray.cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.c), gl.STATIC_DRAW);
	//Need to develope some way to check whether objects are different
	//which will effect the buffers we need to use

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
			
			gl.bindBuffer(gl.ARRAY_BUFFER, objArray.pBuff);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, currObj.vertSize, gl.FLOAT, false, 0, 0);
		  
			gl.bindBuffer(gl.ARRAY_BUFFER, objArray.cBuff);
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

