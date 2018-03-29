 
 "use strict";
 
 
 
 var sceneObjectModule = (function () {
	 
	var mvMatrix = mat4.create();
	var pMatrix = mat4.create();
	/* var triangleVertexPositionBuffer;
	var triangleVertexColorBuffer; */
	
	var objArray = [];
	
	createObject("triangle");
	
	function createObject(objClass) {
		
		let obj = {};
		let pBuff = gl.createBuffer();
		let cBuff = gl.createBuffer();
		
		switch (objClass) {
			
			case "triangle" :
			
			
				pBuff.itemSize = 3;
				pBuff.numItems = 3;
				cBuff.itemSize = 4;
				cBuff.numItems = 3;
				
				let vertices = [
					0.0,  1.0,  0.0,
				   -1.0, -1.0,  0.0,
					1.0, -1.0,  0.0
				];
				
				let colors = [
					1.0, 0.0, 0.0, 1.0,
					0.0, 1.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0
					];
					
				obj.v = vertices;
				obj.c = colors;
				obj.pBuff = pBuff;
				obj.cBuff = cBuff;

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

        mat4.translate(mvMatrix, [-0.0, 0.0, -9.0]);
        
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.pBuff);
		
       
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, currObj.pBuff.itemSize, gl.FLOAT, false, 0, 0);
      
		gl.bindBuffer(gl.ARRAY_BUFFER, currObj.cBuff);
       
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, currObj.cBuff.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        
		gl.drawArrays(gl.TRIANGLES, 0, currObj.pBuff.numItems);
		
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
	