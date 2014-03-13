module.exports = function(/*module dependencies*/) {
	return Backbone.Router.extend({
		initialize: function() {
			Backbone.history.start();
		},
	    routes: {
			// create any routes required and handle with this.select function
	        "home": "select"
	    },
	    select: function() {
	    	// do something with Backbone.history.fragment value
	    }
	});
};