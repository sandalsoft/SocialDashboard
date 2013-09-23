/*jshint -W117 */
import Instagramactivity from 'appkit/models/instagramactivity';

var Instagram = Ember.Object.extend({});
// "348191526.0bc1b88.913be5df5fa145f7a06de980d086592e"
Instagram.reopenClass({
  access_token: localStorage.instagramtoken,

  isAuthorized: function() {
    return (Instagram.access_token) ? true : false;
  },
  getUserid: function(username) {
    var promise = null;
    return promise = new Ember.RSVP.Promise(function(resolve, reject) {

      // Check local storage for userid.
      // if (/^\d+$/.test(localStorage.instagram_userid)) {
      if (false) {
        resolve(localStorage.instagram_userid);
      } //if{}

      // not in localStorage, hit the API with the passed in username
      else {
        resolve($.ajax({
            url: 'https://api.instagram.com/v1/users/search?q=' + username + '&access_token=' + localStorage.instagramtoken,
            type: 'GET',
            dataType: 'JSONP',
            timeout: 5000,
          }).then(function(json) {
            if (json.meta.code !== 200) {
              console.log('json: ' + JSON.stringify(json));
              // handleInstagramError(json.meta);
              // return json.meta;
            }
            if (json.data.length === 0) {
              console.log('ERROR: No Instagram Username: ' + JSON.stringify(json));
            }
            var userid = json.data[0].id;
            // console.log('userid: ' + userid);
            // Save user to localStorage
            localStorage.instagram_userid = userid;
            return userid;
          }).fail(function(error) {
            // return 
            console.log("ERROR: Instagram getUserId- " + JSON.stringify(error));
          }) //ajax()
        ); //resolve
      } // else{}
    }); // promise
  }, // getUserid

  find: function(userid) {
    var promise = null;
    return promise = new Ember.RSVP.Promise(function(resolve, reject) {
      console.log('Insta getting feed');
      App.Instagram.getUserid(localStorage.instagram_username).then(function(userid) {
        var feed = Em.A();
        resolve($.ajax({
            url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent?access_token=' + localStorage.instagramtoken,
            type: 'GET',
            dataType: 'JSONP',
          }).fail(function(error) {
            // return 
            console.log(JSON.stringify(error));
          }).then(function(json) {
            if (json.meta.code !== 200) {
              console.log('ERROR: Instagram ' + JSON.stringify(json));
              // handleInstagramError(json.meta);
              // return json.meta;
            } // if{} 

            json.data.forEach(function(activity) {
              // console.log('entry: ' + JSON.stringify(entry.images.thumbnail.url));
              var entry = Instagramactivity.create(activity);
              feed.addObject(entry);
            });
            console.log('Insta done');
            return feed;
          }) // .ajaxs
        ); //resolve
      }); //getUserId()
    }); // promise
  }, //find()
});

export default Instagram;