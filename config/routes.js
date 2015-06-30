module.exports = function routes() {
	this.get('/', function(req, res) {
    	res.sendfile('./public/home.html');
	});
  
  	this.get('/getSearchResults','api#getSearchResults');
  	this.get('/getData','api#getData');
  	this.post('/saveData','api#saveData');
	this.post('/validateCapcha','api#validateCapcha');
  	this.post('/updateData','api#updateData');
}
