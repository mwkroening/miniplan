"use strict";

App.AcolytesRoute = Ember.Route.extend({
  model: function() {
		return EmberFire.Array.create({
			ref: new Firebase("https://miniplan.firebaseio.com/acolytes")
		});
  }
});

