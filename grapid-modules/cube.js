//constructoor
	//name of the object
	//position of the obj w.r.t origin
	//all the vertices *note should add size check*
	//color *note add size check*
	//vertexIndices for the vertices of the triangles *note add size check
	//@@@@@ variables inside the constructor here have values,but outside they are undefined,aka in the setters down below
	var positionBufferNumItems;

		function Cube(name,position,vertices,colors,vertexIndices,drawType)
		{
			var thisObject=this;

			//setter functions
				
				//sets colors,defaults to black if invalid size or nothing is passed
					thisObject.setColor = function (color)
					{	
						
						if((color===undefined)|| ((color.length/4)!=thisObject.positionBufferNumItems))
						{
							console.log("invalid color,defaulting to no color and alpha=0");
							
							
							var unpackedColors = [];
							for (var i in colors) {
								var color = colors[i];
								for (var j=0; j < 4; j++) {
									unpackedColors = unpackedColors.concat([0.0,0.0,0.0,1.0]);
								}
							}
							
							thisObject.colors=unpackedColors;
						}
						else
						{
							thisObject.colors=color;
						}
					}

				//sets name of object
					thisObject.setName = function (name)
					{
						if(name===undefined)
						{
							thisObject.name="cube"+ Math.floor(Math.random() * 2000);
						}
						else
						{
							thisObject.name=name;
						}
					}
					
				//sets position of object,defaults to [0,0,0] if invalid or no input given
					thisObject.setPosition = function (pos)
					{
						if((pos===undefined) || (pos.length!=3))
						{
							console.log("defaulting position vector");
							thisObject.position=[0,0,0];
						}
						else
						{
							thisObject.position=pos;
						}
					}

				//sets rotation axis, defaults to no rotation if invalid or no input given
					thisObject.setRotationAxis = function (rotAxis)
					{
						if((rotAxis===undefined) || (rotAxis.length!=3))
						{
							thisObject.rotationAxis=[0,0,0];
							console.log("defaulting to no rotation axis");
						}
						else
						{
							thisObject.rotationAxis=rotAxis;
						}
						
					};
					
				//sets degree to rotate by, if no or invalid input defaults to 0	
					thisObject.setRotationDegree = function (rotDeg)
					{
						if((rotDeg===undefined) || (typeof rotDeg != 'number'))
						{
							thisObject.rotationDegree=0;
							console.log("defaulting to no rotation degree");
						}
						else
						{
							thisObject.rotationDegree=rotDeg;
						}
						
					}
					
				//sets speed to rotate by, if no or invalid input defaults to 0	
					thisObject.setRotationSpeed= function (rotSpeed)
					{
						if((rotSpeed===undefined) || (typeof rotSpeed != 'number'))
						{
							thisObject.rotSpeed=0;
							console.log("defaulting to no rotation degree");
						}
						else
						{
							thisObject.rotationSpeed=rotSpeed;
						}
						
					}

				//sets vertices,defaults if invalid or no input given to 1x1x1 cube
					thisObject.setVertices = function (vertices)
					{
						if((vertices===undefined))
						{
							console.log("defaulting to 1x1x1 cube");
							thisObject.vertices=[
								// Front face
								-1.0, -1.0,  1.0,
								 1.0, -1.0,  1.0,
								 1.0,  1.0,  1.0,
								-1.0,  1.0,  1.0,

								// Back face
								-1.0, -1.0, -1.0,
								-1.0,  1.0, -1.0,
								 1.0,  1.0, -1.0,
								 1.0, -1.0, -1.0,

								// Top face
								-1.0,  1.0, -1.0,
								-1.0,  1.0,  1.0,
								 1.0,  1.0,  1.0,
								 1.0,  1.0, -1.0,

								// Bottom face
								-1.0, -1.0, -1.0,
								 1.0, -1.0, -1.0,
								 1.0, -1.0,  1.0,
								-1.0, -1.0,  1.0,

								// Right face
								 1.0, -1.0, -1.0,
								 1.0,  1.0, -1.0,
								 1.0,  1.0,  1.0,
								 1.0, -1.0,  1.0,

								// Left face
								-1.0, -1.0, -1.0,
								-1.0, -1.0,  1.0,
								-1.0,  1.0,  1.0,
								-1.0,  1.0, -1.0
							];
						}
						else
						{
							thisObject.vertices=vertices;
						}
					}

				//sets the vertex indicies,aka the triangles of a square's face and which vertex is part of wat triangle, defaults to default one???
					thisObject.setVertexIndices = function (vertIndi)
					{
						if((vertIndi===undefined))
						{
							console.log("defaulting vertex indicies");
							thisObject.vertexIndices=[
								0, 1, 2,      0, 2, 3,    // Front face
								4, 5, 6,      4, 6, 7,    // Back face
								8, 9, 10,     8, 10, 11,  // Top face
								12, 13, 14,   12, 14, 15, // Bottom face
								16, 17, 18,   16, 18, 19, // Right face
								20, 21, 22,   20, 22, 23  // Left face
							];
						}
						else
						{
							thisObject.vertexIndices=vertIndi;
						}
					}

			//end setter functions
			
			//constructors

				thisObject.name=name;
				thisObject.position=position;
				thisObject.vertices=vertices;
				thisObject.colors=colors;
		
				thisObject.vertexIndices=vertexIndices;
				thisObject.drawType=drawType;
				
				//check to see if valid name is passed
					thisObject.setName(thisObject.name);
				
				//first check to see if given position is valid and if given vertices are also valid
					thisObject.setPosition(thisObject.position);
					thisObject.setVertices(thisObject.vertices);
				
				//based off above
				
				//obtain buffer, and number of items from position array once it has been confirmed valid
					thisObject.positionBuffer=gl.createBuffer();
					thisObject.positionBufferItemSize=3;
					thisObject.positionBufferNumItems=(thisObject.vertices.length)/(thisObject.positionBufferItemSize);
				

				//check to see if the colors are valid,also dependent on the positionBuffer values hence why its under them
					thisObject.setColor(thisObject.colors);
				
				thisObject.colorBuffer= gl.createBuffer();
				thisObject.colorBufferItemSize=4;
				thisObject.colorBufferNumItems=(thisObject.colors.length)/(thisObject.colorBufferItemSize);
				
				thisObject.indexBuffer= gl.createBuffer()
				thisObject.indexBufferItemSize=1;
				thisObject.indexBufferNumItems=(thisObject.vertexIndices.length)/(	thisObject.indexBufferItemSize);
				
				thisObject.rotationAxis=[0,0,0];
				thisObject.rotationDegree=0;
				thisObject.rotationSpeed=0;
				
			//end constructor

		}