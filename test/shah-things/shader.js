//Shader module 

	
	"use strict";// specifies that we're using a subset of javascript that is slightly safer than vanilla js

	//fragment shader ,runz on all pixels between vertices
	var fShader =  (function () {
		
		var type = "fragment-shader";
		
		function getScript() {
			return `
			precision mediump float;

			varying vec4 vColor;

			void main(void) {
				gl_FragColor = vColor;
			}`
		};
		
		return {
			"type": function() {
				return type;
			},
			"getScript": function() {
				return getScript();
			}
		};
		
		
	}());	

//vertex shader ,runz on vertices
//attributes change per vertex
//uniform changes per object
//varying is for data that is i guess derived? made in vertex shader,read in frag shader
//This shader code also calculates the position of the vertices
	var vShader = (function() {
		
		var type = "vertex-shader";
		
	    function getScript(){
			return `
			
			mat4 rotationMatrix(vec3 axis, float angle)
			{
				axis = normalize(axis);
				float s = sin(angle);
				float c = cos(angle);
				float oc = 1.0 - c;
				
				return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
							oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
							oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
							0.0,                                0.0,                                0.0,                                1.0);
			}
			
			attribute vec3 aVertexPosition;
			attribute vec4 aVertexColor;

			uniform vec3 uRotationAxis;
			uniform float uRotationDegree;

			
			
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			



			varying vec4 vColor;

			void main(void) {
				
				
				gl_Position = uPMatrix * uMVMatrix*rotationMatrix(uRotationAxis, -uRotationDegree) *vec4(aVertexPosition, 1.0);
			
				vColor = aVertexColor;
			}`
		};
		
		return {
			"type": function() {
				return type;
			},
			"getScript": function() {
				return getScript();
			}
		};				
	}());

//shader code not too sure how it works
	function getShader(gl, id) {
			var shaderScript = "";
			var type = "";
			try {
				if (id === vShader.type()){ 
					shaderScript = vShader.getScript();
					type = id;
				} else if (id === fShader.type()){
					shaderScript = fShader.getScript();
					type = id;
				}
				
			} catch (e) {
				console.error(e);
			}

			if (!shaderScript) {
				console.log("shader script failed to load");
				return null;
			}

			var shader;
			if (type === "fragment-shader") {
				shader = gl.createShader(gl.FRAGMENT_SHADER);
			} else if (type === "vertex-shader") {
				shader = gl.createShader(gl.VERTEX_SHADER);
			} else {
				console.error("shader type not set");
				return null;
			}
			gl.shaderSource(shader, shaderScript);
			
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error(gl.getShaderInfoLog(shader));
				return null;
			}
			
			return shader;
			
		}

//initz shaders,enables which attributes are actually being used
    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "fragment-shader");
        var vertexShader = getShader(gl, "vertex-shader");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error("Could not initialize shader");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

		
	    
				shaderProgram.uniformRotationAxis = gl.getUniformLocation(shaderProgram, "uRotationAxis");
				shaderProgram.uniformRotationDegree = gl.getUniformLocation(shaderProgram, "uRotationDegree");
		
		
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		
		
		

		
		/*
        shaderProgram.degreeRotation = gl.getAttribLocation(shaderProgram, "aDegreeRotation");
		gl.enableVertexAttribArray(shaderProgram.degreeRotation);
		*/
    }
	
	
