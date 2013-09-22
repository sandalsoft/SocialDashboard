/*jshint -W117 */
var Xboxactivity = Em.Object.extend({
  infoUrl: function() {
    return "http://www.google.com/search?q=" + this.get('title') + "&btnI";
  }.property('title'),
  lastPlayed: function() {
    return moment.unix(this.get('lastplayed')).fromNow();
  }.property('lastplayed'),
  titleEscaped: function() {
    return unescape(this.get('title'));
  }.property('title'),
});

export default Xboxactivity;