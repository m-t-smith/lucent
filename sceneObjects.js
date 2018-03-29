 
 "use strict";
 
 
 
 var sceneObjectModule = (function () {
	 
	var mvMatrix = mat4.create();
	var pMatrix = mat4.create();
	/* var triangleVertexPositionBuffer;
	var triangleVertexColorBuffer; */
	
	var objArray = [];
	
	createObject("triangle");
	
	function createObject(objClass, options) {
		
		let obj = {};
		let pBuff = gl.createBuffer();
		let cBuff = gl.createBuffer();
		let a = {'key' : [0, 1, 2]};
		console.log(a['key']);
		console.log([2, 1, 0]);
		
			switch (objClass) {
				
				case "triangle" :
				
					obj.vertSize = 3;
					obj.numVert = 3;
					obj.colorSize = 4;
					obj.numColor = 3;
					obj.pBuff = pBuff;
					obj.cBuff = cBuff;
					
					let vertices = [
						0.0,  1.0,  0.0,
					   -1.0, -1.0,  0.0,
						1.0, -1.0,  0.0
					];
						
					obj.v = vertices;
					
					if (!options){
						obj.place = [0.0, 0.0, -7.0];
						
						let colors = [
							1.0, 0.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 0.0, 1.0, 1.0
							];
							
						obj.c = colors;
						
					} else {
					
						if (options['place']) {
							obj.place = options['place'];
						}	
						if (options['color']) {
							obj.c = options['color'];
						} 
					}
					
					objArray.push(obj);
					break;
					
				default: console.log("createObject doesn't recognize the classification (objClass) of your object");
			}
	}

function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	}


function initBuffers() {
		var currObj = objArray[0];
	
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.pBuff);
       
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.v), gl.STATIC_DRAW);
    
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.cBuff);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currObj.c), gl.STATIC_DRAW);
       
}

function drawScene() {
		let currObj = objArray[0];
		
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, currObj.place);
        
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.pBuff);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, currObj.vertSize, gl.FLOAT, false, 0, 0);
      
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.cBuff);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, currObj.colorSize, gl.FLOAT, false, 0, 0);
        
		setMatrixUniforms();
        
		gl.drawArrays(gl.TRIANGLES, 0, currObj.numVert);
		
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
		}
		
	};

 }());

sceneObjectModule.initBuffers();
sceneObjectModule.drawScene();
	