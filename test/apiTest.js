var express = require('express')
	, assert  = require("assert")
    , apiController
    , chai = require('chai')
    , should = chai.should()
    , httpMocks = require('node-mocks-http')
    , mongoose = require('mongoose'),
	  mockgoose = require('mockgoose');

var sinon = require('sinon');
var fs = require('fs');
var path = require('path');
var expect  = require("chai").expect;
var app = express();
var nock = require('nock');
var applicationConfig = require('../config/applicationConfig');

describe("ConfigController", function(){
	before( function(done) {
    	mockgoose(mongoose);
    	mongoose.connect('mongodb://localhost/mymed');
    	apiController = require("../app/controllers/apiController.js")
    	done();
	});

	after( function() {
    	mockgoose.reset();
    	mongoose.connection.close();
    	apiController = null;
	});

    

	

	describe("testGetTopKeywords", function() {
      it("returns false for keyword search result", function(done) {
       var th = this;
        apiController.getTopSearchKeywordsFromDb(function(result, r) {
        	expect(result).to.be.true;
        	done();
		  });
      });     
  });



describe("testUniqueId", function() {
      it("should return unique id", function(done) {
      	var uniqueId = apiController.generateUniqueId();
      	expect(uniqueId).not.to.be.eql('sometext');
        done();
      });     
  });

  describe("testSaveData", function() {
      it("should return record id", function(done) {
       var th = this;
        var medicationList = '';
        var fileName = path.join(__dirname, 'medication-list.json');
				fs.exists(fileName, function(exists) {
				  if (exists) {
				    fs.stat(fileName, function(error, stats) {
				      fs.open(fileName, "r", function(error, fd) {
				        var buffer = new Buffer(stats.size);
				 
				        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
				          var data = buffer.toString("utf8", 0, buffer.length);
				 
				          medicationList = data;
				          fs.close(fd);
				        });
				      });
				    });
				  }
				});


		var uniqueId = apiController.generateUniqueId();

        apiController.saveDataToDb(uniqueId, medicationList, function(result) {
        	expect(result).to.be.true;
        	done();
  		});
        
      });     
  });

describe("testGetData", function() {
      it("should return record", function(done) {
       var th = this;
        var medicationList = '';
        var fileName = path.join(__dirname, 'medication-list.json');
				fs.exists(fileName, function(exists) {
				  if (exists) {
				    fs.stat(fileName, function(error, stats) {
				      fs.open(fileName, "r", function(error, fd) {
				        var buffer = new Buffer(stats.size);
				 
				        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
				          var data = buffer.toString("utf8", 0, buffer.length);
				 
				          medicationList = data;
				          fs.close(fd);
				        });
				      });
				    });
				  }
				});


		var uniqueId = apiController.generateUniqueId();

        apiController.saveDataToDb(uniqueId, medicationList, function(result) {
        	expect(result).to.be.true;

        	apiController.getDatafromDb(uniqueId, function(result, r) {
        		expect(result).to.be.true;
        		done();
        	});

  		});
        
      });     
  });

		
		describe("APIController", function()
{
    var MyMedications = [];
    describe.skip("GetMedicationTest", function() 
    {
    	//Need to use mock api access
        it("Getting medications for query field ", function (done) 
        {
            this.timeout(6000*10);
            var options = {
                url: 'http://104.236.122.61:4000/getSearchResults?q=HYDROCHLORIDE',
            };
            request.get(options, function (err, res, body) 
            {
                expect(res.statusCode).to.equal(200);
                //console.log(body)
                if(body)
                {
                    var Response = JSON.parse(body);
                    var AllMedications = Response.data;
                    if(AllMedications.length > 0)
                    {
                        //This pushed medication will be used for Save Medication API
                        MyMedications.push(AllMedications[0]);    
                    }
                }
                done();
            });
        }); 
    });

    describe.skip("SaveMedicationTest", function() 
    {
    	//Need to use mock api access
        it("Saving medications in database ", function (done) 
        {
            this.timeout(6000*10);
            //console.log(MyMedications);
            var url = 'http://104.236.122.61:4000/saveData';
            request.post(
                url,
                { form: { data:MyMedications} },
                function (error, response, body) 
                {
                    if (!error && response.statusCode == 200) 
                    {
                        console.log(body)
                        expect(response.statusCode).to.equal(200);
                        done();
                    }else
                    {
                        console.log(error)
                        done();
                    }
                }   
            );  
        }); 
    });

});
});

