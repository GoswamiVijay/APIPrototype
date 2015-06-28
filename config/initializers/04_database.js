module.exports = function() {
  var mongoose = require('mongoose'),
  dbAddress = ['mongodb://52.6.196.227:27017/mymed'];
  mongoose.connect(dbAddress);

}