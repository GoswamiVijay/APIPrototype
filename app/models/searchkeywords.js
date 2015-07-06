module.exports = (function () {
	var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, _ = require('underscore')
	, SchemaTypes = mongoose.Schema.Types;   
	var searchkeywordsSchema = new Schema ({keyword: String, searchcount: Number },{strict: false}); 
    return mongoose.model('searchkeywords', searchkeywordsSchema);
}());