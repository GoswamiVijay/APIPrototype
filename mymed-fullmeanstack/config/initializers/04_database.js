module.exports = function() {
  var mongoose = require('mongoose'),
  dbAddress = ['mongodb://localhost:27017/mymed'];
  mongoose.connect(dbAddress);

}