var locomotive = require('locomotive'), 
Controller = locomotive.Controller;
var request = require('request');
var mymed = require('../models/mymed');
var searchKeywords = require('../models/searchkeywords');
var applicationConfig = require('../../config/applicationConfig');
var ObjectId = require('mongoose').Types.ObjectId;
var apiController = new Controller();
var uuid = require('uuid');

apiController.getSearchResults = function(res,req) {
  var th = this;
  var query = th.req.param('q');
  query = query.toLowerCase();
  var url = applicationConfig.openFDA.url+query+"&limit="+applicationConfig.openFDA.searchResultLimit;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var d = JSON.parse(body);

      //find if tag already exists in database
      searchKeywords.findOne({tag: query}, function(err,sk){
        if(err) return th.res.json({success:false, data : []});
        if(sk){
          var count = parseInt(sk.searchcount);
          count+=1;          
          //increase the search count
          searchKeywords.update({_id: ObjectId(sk._id)}, {searchcount: count}, function(e,r){
            if(e) return th.res.json({success:false, data : []});
            if(r){
              return th.res.json({success:true, data : d.results});
            }
          });
        }
        else{
          //create new tag record in database 
          var sk = new searchKeywords({"tag": query, "searchcount" : 1}); 
          sk.save(function (err) {
            if(err){
              return th.res.json({success:false, data : []});
            }
            else{
              return th.res.json({success:true, data : d.results});
            }
          });
        }
      });
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
            return th.res.json({success: true});
        }else
        {
            return th.res.json({success: false});
        }
    }
  );    
}
/*
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
*/


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


apiController.saveData = function(res,req) {
  var th = this;
  
  var recordId = apiController.generateUniqueId();
  var saveResult = apiController.saveDataToDb(recordId, th.req.body, function(result) {
  if(result) {
    th.res.json({success: true, id: recordId});    
  }
  else{
    th.res.json({success: false, id: ''});
  }
  });
}

  apiController.saveDataToDb = function(recordId, data, callback) {
  
  var newmymed = new mymed({"recordId": recordId, "drugJson" : data}); 
  newmymed.save(function (err) {
      if(err) {
          callback(false);
      } else {
        callback(true);
      }
    });

}

apiController.generateUniqueId = function() {
  var uniqueId = uuid.v4();
  return uniqueId;
}


apiController.getData = function(res,req) {
  var th = this;
  var id = th.req.param('id');
  var saveResult = apiController.getDatafromDb(id,  function(result, r) {
  if(result) {
    th.res.json({success: true, result: r});
  }
  else{
    th.res.json({success: false, result: []});
  }
  });
}

apiController.getDatafromDb = function(id, callback) {
  mymed.findOne({"recordId": id}, function(e,r){
    if(r){
      callback(true, r);      
    }
    else{
      callback(false);      
    }
  });
}

apiController.getTopSearchKeywords = function(res,req) {
  var th = this;

  var saveResult = apiController.getTopSearchKeywordsFromDb(function(result, r) {
  if(result) {
    th.res.json({success: true, result: r});
  }
  else{
    th.res.json({success: false, result: []});
  }
  });
}

apiController.getTopSearchKeywordsFromDb = function(callback) {
searchKeywords.find().sort({searchcount: -1}).limit(5).exec(function(e,r){
    if(r){
      callback(true, r);
    }
    else{
      callback(false, null);
    }
  });
}


module.exports = apiController;