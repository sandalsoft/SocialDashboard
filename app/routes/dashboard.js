/*jshint -W117 */
var DashboardRoute = Ember.Route.extend({
  actions: {
    setupController: function(controller) {
      // Get data
      this.getXboxProfile(controller);
      this.getInstagramFeed(controller);
    },

    // Methods to get data for each module
    getXboxProfile: function(controller) {
      App.Xboxprofile.find(localStorage.gamertag).then(function(xboxprofile) {
        controller.set('xbox', xboxprofile);
      });
    },
    getInstagramFeed: function(controller) {
      App.Instagram.find(localStorage.instagram_username).then(function(instagram_feed) {
        controller.set('instagram', instagram_feed);
      });
    },
    openConfig: function() {
      this.render('modal', {
        into: 'dashboard',
        outlet: 'modal'
      });

      dashbaordCon = this.controllerFor('dashboard');
      dashbaordCon.set('gamertag_prev', dashbaordCon.get('gamertag'));
      dashbaordCon.set('instagram_username_prev', dashbaordCon.get('instagram_username'));

    },
    close: function() {
      this.render('nothing', {
        into: 'dashboard',
        outlet: 'modal'
      });
    },
    validateConfig: function() {

      // *TODO Add validation of usernames

      this.send('saveConfig', "tits");
    },
    saveConfig: function(params) {
      // Get DashboardController
      dashbaordCon = this.controllerFor('dashboard');

      // Update data feeds if usernames in config change
      // Pass dashboardController to the methods so they stuff their return values into 
      //  properites of the dashboardController

      // Xbox check
      if (dashbaordCon.get('gamertag') !== dashbaordCon.get('gamertag_prev')) {
        this.xbox = null;
        this.getXboxProfile(dashbaordCon);
      }
      // Instagram check
      if (dashbaordCon.get('instagram_username') !== dashbaordCon.get('instagram_username_prev')) {
        this.instagram = null;
        this.getInstagramFeed(dashbaordCon);
      }

      // close modal
      this.render('nothing', {
        into: 'dashboard',
        outlet: 'modal'
      });
    }, //saveConfig()
  }, //acitons:
}); //DashboardRoute

export default DashboardRoute;