var router = Ember.Router.map(function(){
  this.resource("dashboard");
  this.resource("xboxprofile");
  this.resource("twitter");
  this.resource("instagram");
});

export default router;
