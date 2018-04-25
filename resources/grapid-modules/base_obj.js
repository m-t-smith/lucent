class baseObj {
	

	constructor(_name,_position,_vertices,_color,_drawType) {

		this.name=_name;
		this.position=_position;
		this.vertices=_vertices;
		this.color=_color;
		this.drawType=_drawType;
		
		this.hasTexture=false;
		this.hasColor=true;
		
		
	}
	
	createBuffers() {
		if(this.positionBuffer ===undefined &&  this.vertices !==undefined)
		{
			this.positionBuffer=gl.createBuffer();
			this.positionBufferItemSize=3;
			this.positionBufferNumItems=(this.vertices.length)/(this.positionBufferItemSize);
	
		}
		
		if(this.colorBuffer===undefined)
		{
			this.colorBuffer= gl.createBuffer();
			this.colorBufferItemSize=4;
			this.colorBufferNumItems=(this.color.length)/(this.colorBufferItemSize);
		}
	}
	
	createTextureBuffer() {
		if(this.textureBuffer===undefined)
		{
			this.textureBuffer=gl.createBuffer();
		}
		
	}
	
	//getters
	getColor() {
		return this.color;
	}
	
	getColorBuffer() {
		return this.colorBuffer;
	}
	
	getColorBufferNumItems() {
		return this.colorBufferNumItems;
	}
	
	getDrawType() {
		return this.drawType;
	}
	
	getHasColor()
	{
		return this.hasColor;
	}
	
	getHasTexture() {
		return this.hasTexture;
	}
	
	getIndexBuffer() {
		
		return undefined;
	}
	
	getIndexBufferNumItems() {
		return undefined;
	}
	
	getName(){
		return this.name;
	}
	
	getPosition() {																									
		return this.position;
	}
	
	getPositionBuffer() {
		return this.positionBuffer;
	}
	
	getPositionBufferNumItems() {
		return this.positionBufferNumItems;
	}
	
	getRotationAxis() {
		if(this.rotationAxis===undefined)
		{
			this.rotationAxis=[1,0,0];
			return this.rotationAxis;
		}
		
		return this.rotationAxis;
	}
	
	getRotationDegree() {
		if( this.rotationDegree===undefined)
		{
			
			 this.rotationDegree=0;
			 return  this.rotationDegree;
		}
		
		return this.rotationDegree;
	}
	
	getRotationSpeed() {
		if(this.rotationSpeed===undefined)
		{
			this.rotationSpeed=0;
			return this.rotationSpeed;
		}
		
		return this.rotationSpeed;
	}
	
	getTexture() {
		if(this.hasTexture)
		{
			return this.texture;
		}
		return undefined;
	}
	
	getTextureBuffer() {
		return this.textureBuffer;
		
	}
	
	getTextureBufferItemSize() {
		return this.textureBufferItemSize;
	}
	
	getTextureCoordinate() {
		if(this.hasTexture)
		{
			return this.textureCoordinate;
		}
		
		return undefined;
	}
	
	getVertices() {
		return this.vertices;
	}
	
	getVertexIndice() {
		return undefined;
	}
	
	setColor(_color) {
		
		
		//if vertices are undefined then default to a square baseless pyramid,
		if(this.vertices===undefined){
			
			
			
			this.vertices=[
			
			// Front face
			 0.0,  1.0,  0.0,
			-1.0, -1.0,  1.0,
			 1.0, -1.0,  1.0,

			// Right face
			 0.0,  1.0,  0.0,
			 1.0, -1.0,  1.0,
			 1.0, -1.0, -1.0,

			// Back face
			 0.0,  1.0,  0.0,
			 1.0, -1.0, -1.0,
			-1.0, -1.0, -1.0,

			// Left face
			 0.0,  1.0,  0.0,
			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0
			];
		}
		
		//if any of these are false,default to white 
		if((this.vertices!==undefined)&& ((_color.length/4)==(this.vertices.length/3)) && (isCorrectArrayType(_color,"number")) ) {
			console.log("color set");
			this.color=_color;
		}
		else {
			console.log("defaulting colour to black");
							
							
			var unpackedColors = [];
		
			for (var j=0; j < (this.vertices.length/3); j++) {
				unpackedColors = unpackedColors.concat([0.0,0.0,0.0,0.0]);
			}
			
			
			this.color=unpackedColors;
			
		}																											
		
	}//end set color	

	setDrawType(_drawType){
		if((_drawType == gl.POINTS) || (_drawType == gl.LINES) || (_drawType == gl.LINE_STRIP) || (_drawType == gl.LINE_LOOP) || (_drawType ==gl.TRIANGLES) || (_drawType ==gl.TRIANGLE_STRIP) || (_drawType ==gl.TRIANGLE_FAN))
		{
			this.drawType=_drawType;
		}
		else
		{
			this.drawType=gl.POINTS;								
		}
	}
	
	setName(_name) {
		
		this.name=_name;
	}
	
	setPosition(_pos) {
	
		if((this._pos!==undefined)&& ((_pos.length)==3) && (isCorrectArrayType(_pos,"number")) ) {
			
			this.position=_pos;
		}
		else {
			this.position[0,0,0];
		}
	}
	
	setRotationAxis(_rotAxi) {
		
		if(_rotAxi.length==3)
		{
			this.rotationAxis=_rotAxi;
		}
		else
		{
			this.rotationAxis=[0,0,0];
		}
	}
	
	setRotationDegree(_rotDeg) {
		
		
		if(typeof _rotDeg=="number")
		{
			this.rotationDegree=_rotDeg
		}
		else
		{
			//console.log("deg error");
			this.rotationDegree=0;
		}
	}
	
	setRotationSpeed(_speed) {
		
		if(typeof _speed=="number")
		{
			this.rotationSpeed=_speed;
		}
		else
		{
			this.rotationSpeed=0;
		}
	}
	
	//find away to check input
	setTexture(_tex) {
		this.texture=_tex;
		this.hasTexture=true;
	}
	
	//find away to check input
	setTextureCoordinate(_texCoord) {
		this.textureCoordinate=_texCoord;
		this.textureBuffer=gl.createBuffer();
		this.textureBufferItemSize=2;
		this.textureBufferNumItem=24;
		this.hasTexture=true;
	}
	
	
	setVertices(_vert){
		
		if(_vert===undefined)
		{
			this.vertices=[
			// Front face
			 0.0,  1.0,  0.0,
			-1.0, -1.0,  1.0,
			 1.0, -1.0,  1.0,

			// Right face
			 0.0,  1.0,  0.0,
			 1.0, -1.0,  1.0,
			 1.0, -1.0, -1.0,

			// Back face
			 0.0,  1.0,  0.0,
			 1.0, -1.0, -1.0,
			-1.0, -1.0, -1.0,

			// Left face
			 0.0,  1.0,  0.0,
			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0
		];
		}
		else {
			this.vertices=_vert;
		}
	}
}	


