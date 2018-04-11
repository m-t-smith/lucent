//canvas view

Vue.component("canvas-view", {
	template: "#canvas-view-template",
	props: ["objArray"],
	data: function () {
		return {
			isVisible: true,
			message: "",
			height: 800,
			width: 800,
			context: null
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
			}
		},
		
		mounted: function() {
			this.message = "I am a canvas";
		}
})