var locomotive = require('locomotive'), 
Controller = locomotive.Controller;
var request = require('request');
var mymed = require('../models/mymed');
var applicationConfig = require('../../config/applicationConfig');
var ObjectId = require('mongoose').Types.ObjectId;
var apiController = new Controller();
var uuid = require('uuid');

apiController.getSearchResults = function(res,req) {
  var th = this;
  var query = th.req.param('q');
  var url = applicationConfig.openFDA.url+query+"&limit="+applicationConfig.openFDA.searchResultLimit;
  console.log(url);
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

apiController.validateCapcha = function(res,req) 
{
  var th = this;
  var data = th.req.body.data;

//https://www.google.com/recaptcha/api/siteverify
//secret 	Required. The shared key between your site and ReCAPTCHA.
//response 	Required. The user response token provided by the reCAPTCHA to the user and provided to your site on.
//remoteip 	Optional. The user's IP address.

  request.post(
    applicationConfig.captcha.url,
    { form: { secret: applicationConfig.captcha.secretKey,response:data,remoteip:''} },
    function (error, response, body) 
      {
        if (!error && response.statusCode == 200) 
        {
            console.log(body)
            return th.res.json({success: true});
        }else
        {
            console.log(error)
            return th.res.json({success: false});
        }
    }
  );    
}

apiController.saveData = function(res,req) {
  var th = this;
  var data = th.req.body.data;
  var recordId = uuid.v4();
  var newmymed = new mymed({"recordId": recordId, "drugJson" : th.req.body}); 
  newmymed.save(function (err) {
      if(err) {
          return th.res.json({success: false, id: ''});
      } else {
        th.res.json({success: true, id: recordId});
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
  mymed.findOne({"recordId": id}, function(e,r){
    if(r){
      th.res.json({success: true, result: r});
    }
    else{
      th.res.json({success: false, result: []});
    }
  });
}
module.exports = apiController;