//Main body of code for lucent 

"use strict";

var gl;

function initGL(canvas) {
	try {
		gl = canvas.getContext("webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
		console.error(e);
	}
			
	if (!gl) {
		console.error("WebGL was not initialized");
	}
}

function webGLStart() {
	var canvas = document.getElementById("glCanvas");
	initGL(canvas);
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}



webGLStart();

//document.write("hello, page");

