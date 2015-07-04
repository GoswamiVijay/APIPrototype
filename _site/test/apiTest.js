var expect   = require("chai").expect;
var request = require('request');

describe("APIController", function()
{
    var MyMedications = [];
    describe("GetMedicationTest", function() 
    {
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

    describe("SaveMedicationTest", function() 
    {
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