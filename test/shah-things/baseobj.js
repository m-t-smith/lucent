class baseObj {
	

	constructor(_name,_position,_vertices,_color,_drawType)
	{

		this.name=_name;
		this.position=_position;
		this.vertices=_vertices;
		this.color=_color;
		this.drawType=_drawType;
		
		
		
	}
	
	//getters
	getColor()
	{
		return this.color;
	}
	
	getDrawType()
	{
		return this.drawType;
	}
	
	getName()
	{
		return this.name;
	}
	
	getPosition()
	{																									
		return this.position;
	}
	
	getVertices()						
	{
		return this.vertices;
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


