var Instagramactivity = Em.Object.extend({
  createdTime: function() {
    return moment.unix(this.get('created_time')).fromNow();
  }.property('created_time'),
  caption: function() {
    return this.get('caption.text');
  }.property('caption.text'),
  locationUrl: function() {
    return "http://maps.google.com/maps?z=9&t=h&q=loc:" + this.get('location.longitude') + "+" + this.get('location.latitude');
  }.property('location'),
});

export default Instagramactivity;