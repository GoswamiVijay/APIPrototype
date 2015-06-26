module.exports = (function () {
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')
    , SchemaTypes = mongoose.Schema.Types;   
   var mymedSchema = new Schema ({},{strict: false}); 

    return mongoose.model('mymeddata', mymedSchema);

}());