/*jshint -W117 */
import Xboxprofile from 'appkit/models/xboxprofile';
import Instagram from 'appkit/models/instagram';

var DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Get data
    var _this = this;
      Em.run.next(function(){
        // _this.send('getStuff');
        _this.send('getXboxProfile', controller);
        _this.send('getInstagramFeed', controller);
      });
  },

  actions: {
    // Methods to get data for each module
    getXboxProfile: function(controller) {
      Xboxprofile.find(localStorage.gamertag).then(function(xboxprofile) {
        controller.set('xbox', xboxprofile);
      });
    },
    getInstagramFeed: function(controller) {
      Instagram.find(localStorage.instagram_username).then(function(instagram_feed) {
        controller.set('instagram', instagram_feed);
      });
    },

    openConfig: function() {
      this.render('modal', {
        into: 'dashboard',
        outlet: 'modal'
      });

      var dashbaordCon = this.controllerFor('dashboard');
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
      var dashbaordCon = this.controllerFor('dashboard');

      // Update data feeds if usernames in config change
      // Pass dashboardController to the methods so they stuff their return values into 
      //  properites of the dashboardController

      // Xbox check
      if (dashbaordCon.get('gamertag') !== dashbaordCon.get('gamertag_prev')) {
        this.xbox = null;
        this.send('getXboxProfile', dashbaordCon);
      }
      // Instagram check
      if (dashbaordCon.get('instagram_username') !== dashbaordCon.get('instagram_username_prev')) {
        this.instagram = null;
        this.send('getInstagramFeed', dashbaordCon);
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