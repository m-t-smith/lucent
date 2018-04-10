//canvas view

Vue.component("canvas-view", {
	template: "#canvas-view-template",
	props: ["objArray"],
	data: function () {
		return {
			isVisible: true,
			message: "",
			height: 800,
			width: 800
		}
	},
	computed: {
		update: function() {
			
		}
	}, 
		methods: {
			show: function() {
				this.isVisible = true;
			},
			hide: function() {
				this.isVisible = false;
			},
			toggle: function() {
				this.isVisible = !this.isVisible;
			},
			resize: function(){
				let canvas = this.$refs['grapid-canvas'];
				canvas.width = this.width;
				canvas.height = this.height;
			}
		},
		
		mounted: function() {
			this.resize();
			init.startWebGL(this.$refs['grapid-canvas']);
			initShaders();
		}
})

	var grapidApp = new Vue({
		el: "#grapid-app",
		data: {
			color: "",
			hue : 200
		},
		methods: {
			updateColor: function(event) {
				this.color = event.color
				this.hue = event.hue
			}
		}
	})