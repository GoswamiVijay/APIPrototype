var applicationConfig = require('../config/applicationConfig');
module.exports = function routes() 
{
  	this.get('/getSearchResults','api#getSearchResults');
  	this.get('/getData','api#getData');
    this.get('/getTopSearchKeywords','api#getTopSearchKeywords');
  	this.post('/saveData','api#saveData');
	  this.post('/validateCapcha','api#validateCapcha');
  	this.post('/updateData','api#updateData');
    this.get('/testApplicationConfig', 'api#testApplicationConfig');
    
  	this.get('/applicationConfig', function(req, res){
    	var config = {enableCaptcha:applicationConfig.application.enableCaptcha,captchaSiteKey:applicationConfig.captcha.siteKey,applicationMode:applicationConfig.application.mode};
        return res.json({success: true, applicationConfig:config});
	});

    this.get('/help', function(req, res) {
    	res.sendfile('./public/partials/help.html');
	});

	this.get('/', function(req, res) {
    	res.sendfile('./public/home.html');
	});
	this.get('/*', function(req, res){
	    if(res.status(404))
        {
            res.sendfile('./public/partials/error.html');    
        }
	});
}
