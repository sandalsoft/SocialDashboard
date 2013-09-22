/*jshint -W117 */

var DashboardController = Em.ObjectController.extend({
  actions: {
    // // Methods to get data for each module
    // getXboxProfile: function(controller) {
    //   console.log('DashboardController.actions.getXboxProfile')
    //   Xboxprofile.find(localStorage.gamertag).then(function(xboxprofile) {
    //     controller.set('xbox', xboxprofile);
    //   });
    // },
    // getInstagramFeed: function(controller) {
    //   Instagram.find(localStorage.instagram_username).then(function(instagram_feed) {
    //     controller.set('instagram', instagram_feed);
    //   });
    // },
  },
  content: [],
  momentUpdateFormat: 'h:mm a',
  xbox_last_updated: function() {
    return moment().format(this.get('momentUpdateFormat'));
  }.property(),

  instagram_last_updated: function() {
    return moment().format(this.get('momentUpdateFormat'));
  }.property(),

  gamertag: localStorage.gamertag,
  gamertagChanged: function() {
    localStorage.gamertag = this.get('gamertag');
  }.observes('gamertag'),

  instagram_username: localStorage.instagram_username,
  instagram_usernameChanged: function() {
    localStorage.instagram_username = this.get('instagram_username');
  }.observes('instagram_username'),

  instagram_userid: localStorage.instagram_userid,
  instagram_useridChanged: function() {
    localStorage.instagram_userid = this.get('instagram_userid');
  }.observes('instagram_userid'),

});

export default DashboardController;