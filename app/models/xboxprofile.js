/*jshint -W117 */

import Xboxactivity from 'appkit/models/xboxactivity';

var Xboxprofile = Ember.Object.extend();

Xboxprofile.reopenClass({
  find: function(gamertag) {
    var promise;
    return promise = new Ember.RSVP.Promise(function(resolve, reject) {
      console.log('xboxprofile find()');
      resolve($.ajax({
          url: 'https://www.xboxleaders.com/api/2.0/profile.json?gamertag=' + gamertag,
          type: 'GET',
          dataType: 'JSON',
          timeout: 7500,
        }).fail(function(error) {
          // getJSON.fail()
          console.log("ERROR: Xbox getProfile " + JSON.stringify(error));
        }).then(function(json) {
          // getJSON Success
          var profile = Xboxprofile.create(json.data);
          var recentactivities = Em.A();
          profile.recentactivity.forEach(function(activity) {
            var recentactivity = Xboxactivity.create(activity);
            recentactivities.pushObject(recentactivity);
          }); //forEach()
          profile.recentactivities = recentactivities;
          // console.log('profile; ' + JSON.stringify(profile));
          console.log('xboxprofile done');
          return profile;
        }) //ajax()
      ); //resolve
    }); //promise
  }, //getProfile()
}); //Xboxprofile   

export default Xboxprofile;