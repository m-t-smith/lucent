class Cube extends baseObj {

	constructor(_name,_position,_vertices,_color,_drawType,_vertexIndices) {

	
		super(_name,_position,_vertices,_color,_drawType);
		
		this.vertexIndice=_vertexIndices;
		
		this.createBuffers();
		
	}

	createBuffers() {
		super.createBuffers();
		
		if(this.indexBuffer===undefined)
		{
			
			this.indexBuffer= gl.createBuffer()
			this.indexBufferItemSize=1;
			this.indexBufferNumItems=(this.vertexIndice.length)/(	this.indexBufferItemSize);
		}
	}
	
	getIndexBuffer() {
		
		return this.indexBuffer;
	}
	
	getIndexBufferNumItems() {
		return this.indexBufferNumItems;
	}
	
	getVertexIndice() {
		
		if(this.vertexIndice===undefined)
		{
			this.vertexIndice=[
			0, 1, 2,      0, 2, 3,    // Front face
			4, 5, 6,      4, 6, 7,    // Back face
			8, 9, 10,     8, 10, 11,  // Top face
			12, 13, 14,   12, 14, 15, // Bottom face
			16, 17, 18,   16, 18, 19, // Right face
			20, 21, 22,   20, 22, 23  // Left face
			];
		
			return this.vertexIndice
		}
		else
		{
			return this.vertexIndice;
		}
		
	}
	
	setVertexIndice(_vertIndi) {
		if(_vertIndi!==undefined && (_vertIndi.length==this.vertices.length/3))
		{
			this.vertexIndice=_vertIndi;
		}
	}
	
	
	
	
	
}