mymeddata = new Meteor.Collection('mymeddata');
if (Meteor.isClient) {
  //All the code related to client goes here
  var code = '';
  Session.setDefault('query', '');
  Session.setDefault('SearchResult', []);
  Session.setDefault('ResultToSave', []);
  Template.main.helpers({
    search: function () {
      var id = getParameterID();
      if(id){
        var mdata = mymeddata.findOne({_id: id});
        if(mdata){
          Session.set('ResultToSave', mdata.data);
        }
      }
      if(Session.get('query') != ""){
        var q = Session.get('query');
        Meteor.apply("getSearchResults", [q], true, function(err,response){
          if(response && response.data && response.data.results.length > 0){
            Session.set('SearchResult', response.data.results);
          }
          else{
            Session.set('SearchResult', []);
          }
        });
      }
    },
    SearchResult: function(){
      return Session.get('SearchResult');
    },
    SelectedResult: function(){
      return Session.get('ResultToSave');
    }
  });

  Template.main.created = function(){
    code = '';
    Session.setDefault('query', '');
    Session.setDefault('SearchResult', []);
    Session.setDefault('ResultToSave', []);
  };

  Template.main.rendered = function(){
    code = '';
    var id = getParameterID();   
    var resultToSave = []; 
    var protocol = window.location.protocol;
    var hostname = window.location.host;
    var mmurl = protocol +"//" + hostname + "/";
    if(!id){
      Meteor.apply('saveMyMedData', [resultToSave], true, function(e,r){
        if(r){
          code = r;
          mmurl = mmurl + code;
          $("#mymedurl").attr('href', mmurl);
          $("#mymedurl").text(mmurl);
        }
      })
    }
    else{
      code = id;
      mmurl = mmurl + code;
      $("#mymedurl").attr('href', mmurl);
      $("#mymedurl").text(mmurl);
    }
  };

  Template.main.events({
    'click #btnSearch': function(event, template) {
      event.preventDefault();
      var search = template.find("#input-search").value;
      Session.set('query', search);
    },
    'click #btnReset': function(event, template) {
      event.preventDefault();
      Session.set('query', '');
      Session.set('SearchResult', []);
      Session.set('ResultToSave', []);
    },
    'click .hladd': function(event, template){
      var obj = this;
      var oldResult = Session.get('SearchResult');
      var resultToSave = Session.get('ResultToSave');
      if(oldResult.length > 0){
        var newArray = oldResult.filter(function (el) {
                          return el.id !== obj.id;
                       });
        resultToSave.push(obj);
        Session.set('SearchResult', newArray);
        Session.set('ResultToSave', resultToSave)
      }
    },
    'click .hlremove': function(event, template){
      var obj = this;
      var oldResult = Session.get('SearchResult');
      var resultToSave = Session.get('ResultToSave');
      if(resultToSave.length > 0){
        var newArray = resultToSave.filter(function (el) {
                          return el.id !== obj.id;
                       });
        oldResult.push(obj);
        Session.set('SearchResult', oldResult);
        Session.set('ResultToSave', newArray)
      }
    },
    'click #btnSave': function(event, template) {
      event.preventDefault();
      var resultToSave = Session.get('ResultToSave');
      var id = code;
      if(id){
        Meteor.apply('updateMyMedData', [id, resultToSave], true, function(e,r){
          if(r){
            Session.set('SearchResult', '');
            Session.set('query', '');
            alert('Data saved successfully');
          }
          else{
            alert('Error in processing the request. Please try again!');
          }
        })
      }
      else
      {
        Meteor.apply('saveMyMedData', [resultToSave], true, function(e,r){
          if(r){
            Session.set('SearchResult', '');
            alert('Data saved successfully');
          }
          else{
            alert('Error in processing the request. Please try again!');
          }
        })
      }
    }
  });

  function getParameterID() {
    var url = window.location.href;
    var id = url.split('/')[3];
    return id;
  }
}

if (Meteor.isServer) {
  //All the code related to server goes here
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    //to get the data as per the search term from third party api
    getSearchResults: function(term){
      this.unblock();
      var url = "https://api.fda.gov/drug/label.json?search=effective_time:[20090601+TO+20140731]+AND+openfda.substance_name:"+term+"&limit=10";
      return Meteor.http.call("GET", url);
    },
    //to save data in mongodb
    saveMyMedData: function(data){
      return mymeddata.insert({data: data});
    },
    //to update existing data in mongodb
    updateMyMedData: function(id, data){
      return mymeddata.update({_id: id},{data: data});
    }
  });
}
