function baseobject(_name,_position,_vertices,_colors,_drawType) {
	this.name=_name;
	this.position=_position;
	this.vertices=_vertices;
	this.color=_colors;
	this.drawType=_drawType;
}



function setRotationAxis (_rot)
{
	if(_rot<10)
	{
		return _rot;
		
	}
	else
	{
		
		console.log("ur shit ");
		return -1;
	}
	
	

}