var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('dashboard');
  }
});

export default IndexRoute;