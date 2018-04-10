//shape-adder vue component constructor

	/* This is a vue component constructor, where we define the data 
				and methods that belong to our shape-adder component */

Vue.component('shape-adder', {
						template: "#shape-adder-template",
						// Props is short for 'properties inhereted from parent components'
						props: ["hue"],
						data: function () {
							return {
								message: "Add a shape",
								selected: '',
							}
						},
						methods: {
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
									}
								}
								sceneObjectModule.createObject(this.selected, options);
								sceneObjectModule.drawScene();
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