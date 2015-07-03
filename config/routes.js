var applicationConfig = require('../config/applicationConfig');
module.exports = function routes() {
	this.get('/', function(req, res) {
    	res.sendfile('./public/home.html');
	});
  
  	this.get('/getSearchResults','api#getSearchResults');
  	this.get('/getData','api#getData');
  	this.post('/saveData','api#saveData');
	this.post('/validateCapcha','api#validateCapcha');
  	this.post('/updateData','api#updateData');

  	this.get('/applicationConfig', function(req, res){
    	var config = {captchaSiteKey:applicationConfig.captcha.siteKey,applicationMode:applicationConfig.application.mode};
        return res.json({success: true, applicationConfig:config});
	});

}
