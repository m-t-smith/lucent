function BaseObject(vertSize, numVert, colorSize, numColor, vertPosArr, vertColorArr){
	this.vs = vertSize;
	this.nv = numVert;
	this.cs = colorSize;
	this.nc = numColor;
	this.vpa = vertPosArr;
	this.vca = vertColorArr;
}

BaseObject.prototype.setMatrixUniforms = function(pM, mvM) {
	
	console.log("Uniform matricies set");
	
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