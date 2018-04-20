//The file where all calculations are performed
	var lastTime = 0;
	
	//where all calculations are done
		function calculations() 
		{
			//get system time? aka current time
				var timeNow = new Date().getTime();
			
			//any time based calculations done here
				if (lastTime != 0) {
					var elapsed = timeNow - lastTime;
					
					//if rotation is enabled aka rotation speed is not 0. Rotation is done based off time so that even slow or fast computers will display the same rotation
					//objectsToRender[i].rotationSpeed!=0
					//@@@@@btw this returns a error if(!(objectsToRender[i].rotationSpeed==0)) of undefined
						for(var i=0;i<objectsToRender.length;i++)
						{
							var currentObj=objectsToRender[i];
							currentObj.setRotationDegree(currentObj.rotationDegree+(currentObj.rotationSpeed*elapsed)/1000);
							
						}
						

				  
				}
			
			//update last time this method was ran
				lastTime = timeNow;
		}


    function tick() {
		//magical part that calls it self.
        requestAnimFrame(tick);
		
		//draw scene.
        drawScene();
		
		//calculate whats gonna be on the next scene.
        calculations();
    }