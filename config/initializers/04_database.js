module.exports = function() {
  var databaseserver  = process.env.databaseserver || 'localhost';
  var mongoose = require('mongoose');
  //uncomment if you are using mongodb on your local box
  //dbAddress = ['mongodb://localhost:27017/mymed'];
  //uncomment if you are using mongodb with docker
  //dbAddress = ['mongodb://mymedlookupdb:27017/mymed'];
  //uncomment for production deployment
  
  //console.log('databaseserver is - ' + databaseserver);
  dbAddress = ['mongodb://'+ databaseserver +':27017/mymed'];
  mongoose.connect(dbAddress);
}