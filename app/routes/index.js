/*jshint -W117 */
var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('dashboard');
  }
});

export default IndexRoute;