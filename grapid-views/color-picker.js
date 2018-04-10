// color input vue component modified (simplified) from 
// work by Florian Schulz (@getflourish)
// https://codepen.io/getflourish/pen/NbxByK

Vue.component("color-picker", {
	template: "#color-picker-template",
	props: ["change", "initial"],
	data: function () {
		return {
			isVisible: true,
			h: 200
		}
	},
	computed: {
		color: function() {
			var c = this.h + ", 80%, 80%";
			var s = "hsl(" + c + ")";
			this.change({
				color: s,
				hue: this.h
			});
			return s;
		},
		gradientH: function() {
			var stops = [];
			for (var i = 0; i < 7; i++) {
				var h = i * 60;
				stops.push("hsl(" + h + ", 80%, 80%)")
			}
			return {
				backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
			}
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
			this.h = parseInt(Math.random() * 360)
		}
})