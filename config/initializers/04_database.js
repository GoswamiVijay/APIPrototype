module.exports = function() {
  var mongoose = require('mongoose'),
  //uncomment if you are using mongodb on your local box
  //dbAddress = ['mongodb://localhost:27017/mymed'];
  //uncomment if you are using mongodb with docker
  //dbAddress = ['mongodb://mymedlookupdb:27017/mymed'];
  //uncomment for production deployment
  dbAddress = ['mongodb://70.0.0.234:27017/mymed'];
  mongoose.connect(dbAddress);

}