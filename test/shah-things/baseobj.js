class baseObj {


	constructor(_name,_position,_vertices,_colors,_drawType)
	{

		this.name=_name;
		this.position=_position;
		this.vertices=_vertices;
		this.color=_colors;
		this.drawType=_drawType;
		
		
	}
	
	
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
	
	
	setColor(_color)
	{
		if(this.vertices!==undefined)
		{
			if(typeof _color=="number" && _color.length/4==this.vertices.length/3)
			{
				this.color=_color;
			}
		}
	}
}	


