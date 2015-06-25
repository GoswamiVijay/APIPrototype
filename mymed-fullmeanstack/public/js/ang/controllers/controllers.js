/* Controllers */

var app=angular.module('myApp.controllers', ['uiGmapgoogle-maps','ui-rangeSlider']) 

.controller('MainCtrl', function ($rootScope, $scope, $window, $location, $http, $anchorScroll, sharedProperties, uiGmapGoogleMapApi, uiGmapIsReady,$http,$filter) {
  $rootScope.showLoading = false;
  $scope.search = {}; 
  $scope.results = [];
  $scope.selectedresults = [];
  $scope.currentid = '';
  $scope.hostname = $window.location.host;
  $scope.protocol = $window.location.protocol;
  $scope.init = function(){
    var id = $scope.getParameterID();
    if(id){
      $http.get('/getData?id='+id)
      .success(function(data){
        if (data.success){
          $scope.selectedresults = data.result.data;
        }
      })
      .error(function(error){
        console.log(error)
      });
    }
    $http.post('/saveData',{data : []})
    .success(function(data){
      if (data.success){
        $scope.currentid = data.id;
        var url = $scope.protocol+"//"+$scope.hostname+"/?"+data.id;
        $("#mymedurl").attr('href', url);
        $("#mymedurl").text(url);
      }
    })
    .error(function(error){
      console.log(error)
    });
  }

  $scope.getParameterID = function () {
    var url = window.location.href;
    var id = url.split('?')[1];
    return id;
  }
   
  $scope.performsearch = function(){
     $rootScope.showLoading = true;
    $http.get('/getSearchResults?q='+$scope.search.query)
    .success(function(data){
      if(data.success){
        var response = data.data;
         $rootScope.showLoading = false;
        $scope.results = response;
      }
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.add = function(obj){
    var oldResult = $scope.results;
    var resultToSave = $scope.selectedresults;
    if(oldResult.length > 0){
      var r = $.grep(resultToSave, function (e) {
        return e.id === obj.id;
      });
      if(r.length == 0){
        var newArray = oldResult.filter(function (el) {
          return el.id !== obj.id;
        });
        resultToSave.push(obj);
        $scope.results = newArray;
        $scope.selectedresults = resultToSave;
      }
    }
  }

  $scope.remove = function(obj){
    var oldResult = ($scope.results ? $scope.results : []);
    var resultToSave =  ($scope.selectedresults ? $scope.selectedresults : []);
    if(resultToSave.length > 0){
      var newArray = resultToSave.filter(function (el) {
        return el.id !== obj.id;
      });
      oldResult.push(obj);
      $scope.results = oldResult;
      $scope.selectedresults = newArray;
    }
  }

  $scope.saveData = function(){
    $http.post('/updateData',{id: $scope.currentid, data: $scope.selectedresults})
    .success(function(data){
      if(data.success){
        $scope.results = [];
        $scope.search.query = '';
        alert('Data saved successfully');
      }
      else{
        alert('Error occured');
      }
    })
    .error(function(err){
      console.log(err);
    });
  }
}); 


app.filter('rangeFilter', function() {
  return function(items,rangeInfo) {
    var filtered = [];
    var runMin = parseInt(rangeInfo.userMin);
    var runMax = parseInt(rangeInfo.userMax);
    angular.forEach(items,function(item) {
      if((item.LowRate >= runMin && item.LowRate<= runMax)) {
        filtered.push(item);
      }
    });
    
    return filtered;
  };
});
