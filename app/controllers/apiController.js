var locomotive = require('locomotive'), 
Controller = locomotive.Controller;
var request = require('request');
var mymed = require('../models/mymed');
var ObjectId = require('mongoose').Types.ObjectId;
var apiController = new Controller();

apiController.getSearchResults = function(res,req) {
  var th = this;
  var query = th.req.param('q');
  var url = "https://api.fda.gov/drug/label.json?search=effective_time:[20090601+TO+20140731]+AND+openfda.substance_name:"+query+"&limit=10";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var d = JSON.parse(body);
      th.res.json({success:true, data : d.results});
    }
  });
}

apiController.saveData = function(res,req) {
 var th = this;
  var data = th.req.body.data;
  var newmymed = new mymed(th.req.body); 
  th.res.json({success: true, id: "test - update"});
  return;
  newmymed.save(function (err, medListObject) {
      if(err) {
          return th.res.json({success: false, id: ''});

      } else {
        th.res.json({success: true, id: medListObject._id});
      }
    });

}

apiController.updateData = function(res,req) {
  var th = this;
  var data = th.req.body.data;
  var newmymed = new mymed(th.req.body); 
  

  newmymed.save(function (err, medListObject) {
      if(err) {
          return th.res.json({success: false, id: ''});

      } else {
        th.res.json({success: true, id: medListObject._id});
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