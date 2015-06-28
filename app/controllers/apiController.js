var locomotive = require('locomotive'), 
Controller = locomotive.Controller;
var request = require('request');
var mymed = require('../models/mymed');
var settings = require('../../config/settings.json');
var ObjectId = require('mongoose').Types.ObjectId;
var apiController = new Controller();

apiController.getSearchResults = function(res,req) {
  var th = this;
  var query = th.req.param('q');
  var url = settings.apiurl+query+"&limit="+settings.limit;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var d = JSON.parse(body);
      th.res.json({success:true, data : d.results});
    }
    else{
      th.res.json({success:false, data : []});
    }
  });
}

apiController.saveData = function(res,req) {
  var th = this;
  var data = th.req.body.data;
  var newmymed = new mymed(th.req.body); 
  newmymed.save(function (err) {
      if(err) {
          return th.res.json({success: false, id: ''});
      } else {
        th.res.json({success: true, id: newmymed._id});
      }
    });
}

apiController.updateData = function(res,req) {
  var th = this;
  var id = th.req.body.id;
  var data = th.req.body.data;
  mymed.update({_id: ObjectId(id)}, {$set: {data: data}}, function(e,r){
    if(r){
      return th.res.json({success: true});      
    } else {
      return th.res.json({success: false});     
    }
  });
}

apiController.getData = function(res,req) {
  var th = this;
  var id = th.req.param('id');
  mymed.findOne({_id: ObjectId(id)}, function(e,r){
    if(r){
      th.res.json({success: true, result: r});
    }
    else{
      th.res.json({success: false, result: []});
    }
  });
}
module.exports = apiController;