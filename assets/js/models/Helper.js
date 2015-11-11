var m = require('mithril');

var Helper = module.exports = {
  events:m.prop([]),
  query: function(email, password){
    return m.request({
      method: 'GET',
      url: '/v1/event',
     
      unwrapSuccess: function(res) {
         
        return res;
      }
    })
    .then(this.events);
  }

}