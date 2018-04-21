//So this basicly 'creates' all objects that are going to be display on start
	function initBuffers() {
			
			//These two variables are here  for when I tried to put
			//all objects in a single array the old way, aka non object orientated way.
				var pyramid;
				var cube;
			
			//creates an empty array object, for which I can set properties and abuse the way
			//javascript just allows you to add fields to any object,
			//because that totaly makes sense. Also note position buffer is later craeted
				pyramid=[];
			
			//give the object a name,we give humans names so why not.
				pyramid.name="pyramid 1";
			
			//position of the object relative to the 'eye' which happens to be at [0,0,0]
				pyramid.position=[-1.5,0,-8.0];
			
			//the vertices of the this pyramid, not this pyramid has no square base, all points are relative to where the position is
				pyramid.vertices= [
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
			

			
			//the colors of the faces,which match up with ^^^^^^^^^^^^
				pyramid.colors= [
					// Front face
					1.0, 0.0, 0.0, 1.0,
					0.0, 1.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0,

					// Right face
					1.0, 0.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0,
					0.0, 1.0, 0.0, 1.0,

					// Back face
					1.0, 0.0, 0.0, 1.0,
					0.0, 1.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0,

					// Left face
					1.0, 0.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0,
					0.0, 1.0, 0.0, 1.0
				];
			
			
			

		
			
			//--------------------------CUBE------------------------ basicly a repeat of the triangle pyramid uptop butttt with a few editions ofc
			
			//javascript object owo
				cube=[];
			
			//give it a name
				cube.name="cube 1";
			
			//position relatvie to eye
				cube.position=[1.5,0,-8.0];
			
			//cube vertices
				cube.vertices=[
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
			
			
			
			
			//not gonna lie this part of making the colors of the cube kinda of confuses me :(
				colors = [
					[1.0, 0.0, 0.0, 1.0], // Front face-RED=RED
					[1.0, 1.0, 0.0, 1.0], // Back face-RED+GREEN=yellow?
					[0.0, 1.0, 0.0, 1.0], // Top face-GREEN=GREEN
					[1.0, 0.5, 0.5, 1.0], // Bottom face-idk
					[1.0, 0.0, 1.0, 1.0], // Right face-RED+BLUE=purple?
					[0.0, 0.0, 1.0, 1.0]  // Left face-BLUE=BLUE
				];
			
			//okay so 6 colors in colors array
			//6*4=24
			//concat removes the [] so 
			//24*6=96 numbers
				var unpackedColors = [];
				for (var i in colors) {
					var color = colors[i];
					//after for loop adds 24 numbers to unpacked
					for (var j=0; j < 4; j++) {
						unpackedColors = unpackedColors.concat(color);
					}
				}
			
			//keeps the color array in mind
				cube.colors=unpackedColors;
			
		
			
			//k so when drawing the cube you draw each face as two triangles
			//this tells you which vertices make up a triangle
			//like ABC is triangle 1,  and CAS is the next triangle and so on
				cube.indexBuffer= gl.createBuffer()
				cube.vertexIndices= [
					0, 1, 2,      0, 2, 3,    // Front face
					4, 5, 6,      4, 6, 7,    // Back face
					8, 9, 10,     8, 10, 11,  // Top face
					12, 13, 14,   12, 14, 15, // Bottom face
					16, 17, 18,   16, 18, 19, // Right face
					20, 21, 22,   20, 22, 23  // Left face
				];
			
			
			
			//----------object creation end ------
			
			
			//now create the objects by passing in needed parameters. beacuse ik that these two objects will rotate
			//im going to specify their rotation properties
				var cubeTest=new Cube("cube 1",cube.position,cube.vertices,unpackedColors,cube.vertexIndices,gl.TRIANGLE_STRIP);
				cubeTest.setRotationAxis([1,1,1]);
				cubeTest.setRotationDegree(0);
				cubeTest.setRotationSpeed(-75);
				
				var pyramidTest = new SquarePyramid("pyramid test 1",pyramid.position,pyramid.vertices,pyramid.colors,gl.TRIANGLES)
				pyramidTest.setRotationAxis([0,1,0]);
				pyramidTest.setRotationDegree(0);
				pyramidTest.setRotationSpeed(90);
			
		
			var testOb=new baseObj("dank",pyramid.position,pyramid.vertices,pyramid.colors,gl.TRIANGLES);
			testOb.setDrawType(gl.TRIANGLES);
		
			//console.log(linerAlge.color+" -------"+linerAlge.name+" ------"+ linerAlge.rot);
			
			//adds them to the grand ole list of rendable objects
				objectsToRender.push(pyramidTest);
				objectsToRender.push(cubeTest);
			
			
			//This here assings the vertex and color attributes to the shader so that the shaders know what data to us
			//in the case of the cube the if statement area tells to store a element based array that will then call the 
			//index values from the position buffer that is first defined
				for(var i=0;i<objectsToRender.length;i++)
				{
					var initObj=objectsToRender[i];
					
					
					gl.bindBuffer(gl.ARRAY_BUFFER, initObj.positionBuffer);		
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initObj.vertices), gl.STATIC_DRAW);
				   
				   
					gl.bindBuffer(gl.ARRAY_BUFFER, initObj.colorBuffer);			   
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initObj.colors), gl.STATIC_DRAW);
					
				
					
					
				
				
				
					if(!(initObj.vertexIndices===undefined))
					{
						console.log("happens for square pyramid too");
						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, initObj.indexBuffer);
					
						gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(initObj.vertexIndices), gl.STATIC_DRAW);
					}
		 
				
				
				}
			
		}