if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('query', '');
  Session.setDefault('SearchResult', []);
  Session.setDefault('ResultToSave', []);
  Template.main.helpers({
    search: function () {
      if(Session.get('query') != ""){
        var q = Session.get('query');
        console.log('query', q);        
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
    Session.setDefault('query', '');
    Session.setDefault('SearchResult', []);
    Session.setDefault('ResultToSave', []);
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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    getSearchResults: function(term){
      this.unblock();
      var url = "https://api.fda.gov/drug/label.json?search=effective_time:[20090601+TO+20140731]+AND+openfda.substance_name:"+term+"&limit=10";
      return Meteor.http.call("GET", url);
    }
  });
}
