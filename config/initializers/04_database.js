module.exports = function() {
  var mongoose = require('mongoose'),
  dbAddress = ['mongodb://mymedlookupdb:27017/mymed'];
  mongoose.connect(dbAddress);

}