module.exports = (function () {
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')
    , SchemaTypes = mongoose.Schema.Types;   
   var mymedSchema = new Schema ({recordId: String, drugJson: Object },{strict: false}); 

    return mongoose.model('mymeddata', mymedSchema);

}());