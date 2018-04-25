//shape-adder vue component constructor

	/* This is a vue component constructor, where we define the data 
				and methods that belong to our shape-adder component */

Vue.component('shape-adder', {
						template: "#shape-adder-template",
						// Props is short for 'properties inhereted from parent components'
						// In this case, hue is inherited from the color-picker component
						props: ["hue"],
						data: function () {
							return {
								message: "Add a shape",
								//the selected data property stores the desired object class 
								//that the user selects through the select element 
								selected: '',
							}
						},
						methods: {
							//the shape-adder component's draw method is called on click user events. 
							
							draw: function (event) {
								let options = {};
								options.color = [];
								let vColor = this.rgba;
								
								if (this.selected === "triangle"){
									for (let i = 0; i < 3; i++) {
										options.color = options.color.concat(vColor);
									}
								} else if (this.selected === "square"){
									for (let i = 0; i < 4; i++) {
										options.color = options.color.concat(vColor);
										options.place = [-1, 0, -7]; 
									}
								} else if (this.selected === "square-pyramid"){
									for (let i = 0; i < 12; i++) {
										options.color = options.color.concat(vColor);
									}
								} else if (this.selected === "cube"){
										for (let i = 0; i < 24; i++) {
										options.color = options.color.concat(vColor);
									}
									options.vertexIndices = [];
								}
								//draw calls the sceneObjectModule function createObject, which can currently accept up to two parameters; the class
								//of the object to be created (selected), and a JavaScript object literal instance we assign to the variable 'options'
								//that has two possible key-value pairs: color (for the object vertex colors), and place (for the
								//object vertex positions with respect to the global coordinate system)
								sceneObjectModule.createObject(this.selected, options);
								//It then calls the drawScene function, which draws objects in the objArray to the canvas
								sceneObjectModule.drawScene();
								this.spin();
							}
						},
						computed: {
							rgba: function () {
								let arr = utilityModule.hslToRgb(this.hue/360, 0.8, 0.8);
								for(let i = 0; i < arr.length; i++){
									arr[i] /= 255;
								}
								arr.push(1.0);
								return arr;
							}
						}
					})