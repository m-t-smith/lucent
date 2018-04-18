function BaseObject( vertSize, numVert, colorSize, numColor, vertPosArr, vertColorArr){
	this.vs = vertSize;
	this.nv = numVert;
	this.cs = colorSize;
	this.nc = numColor;
	this.vpa = vertPosArr;
	this.vca = vertColorArr;
}

BaseObject.prototype.