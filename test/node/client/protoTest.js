/*
Package: Models
Authors: Matt Smitherman, Shah Nafis Rafique, Yoonah Lee
Last Updated: 4/21/2018
*/

//The BaseObject class is the base/super class of all shape and scene object types

class BaseObject {


  constructor(_name, _position, _vertices, _color, _drawType, _vertSize, _colorSize) {

		this.name = _name;
		this.position = _position;
		this.vertices = _vertices;
		this.color = _color;
		this.drawType = _drawType;
    this.vertSize = _vertSize;
    this.colorSize = _colorSize;
    this.numVert = _vertices.length/_vertSize;
    this.numColor = _color.length/_colorSize;

	}


  setUniforms(_projectiveMatrix, _modelViewMatrix) {

    try {

      gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, _projectiveMatrix);
      gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, _modelViewMatrix);

      console.log("shader uniforms set");

    } catch(e) {

      console.error(e);

    }
  }


  initBuffers(_positionBuff, _colorBuff, _positionArray, _colorArray) {

    gl.bindBuffer(gl.ARRAY_BUFFER, _positionBuff);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_positionArray), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, _colorBuff);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_colorArray), gl.STATIC_DRAW);

    console.log(this.name + " object buffers are initialized");

  }


  setAttributes(_positionBuff, _colorBuff) {

    gl.bindBuffer(gl.ARRAY_BUFFER, _positionBuff);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, _colorBuff);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.colorSize, gl.FLOAT, false, 0, 0);

    console.log(this.name + " position and color attributes are set");
  }
}







/*
  Same "class" written without ECMA15 class syntactic sugar

  function BaseObject(vertSize, numVert, colorSize, numColor, vertPosArr, vertColorArr){
	this.vs = vertSize;
	this.nv = numVert;
	this.cs = colorSize;
	this.nc = numColor;
	this.vpa = vertPosArr;
	this.vca = vertColorArr;
}

BaseObject.prototype.setMatrixUniforms = function(pM, mvM) {

	console.log("Uniform matrices set");

	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pM);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvM);
};

BaseObject.prototype.initBuffers = function(pbuff, cbuff, pArr, cArr) {

	console.log("buffers are bound");

	gl.bindBuffer(gl.ARRAY_BUFFER, pbuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pArr), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, cbuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cArr), gl.STATIC_DRAW);
};

BaseObject.prototype.bindBuffSetAttrib = function(pbuff, cbuff) {

	gl.bindBuffer(gl.ARRAY_BUFFER, pbuff);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vs, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cbuff);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.cs, gl.FLOAT, false, 0, 0);
};

 */