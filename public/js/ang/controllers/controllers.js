/* Controllers */

var app=angular.module('myApp.controllers', ['uiGmapgoogle-maps','ui-rangeSlider']) 

.controller('MainCtrl', function ($rootScope, $scope, $window, $location, $http, $anchorScroll, sharedProperties, uiGmapGoogleMapApi, uiGmapIsReady,$http,$filter,vcRecaptchaService) 
{

//capcah codes 
    $scope.response = null;
    $scope.widgetId = null;
    $scope.model = {
        key: '6LefEgkTAAAAANWgeebwDLZIchd09jL21MvFIn4C'
    };
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.submitCapcha = function () 
    {
        var valid;
        /**
         * SERVER SIDE VALIDATION
         *
         * You need to implement your server side validation here.
         * Send the reCaptcha response to the server and use some of the server side APIs to validate it
         * See https://developers.google.com/recaptcha/docs/verify
         */
        if($scope.selectedresults.length == 0)
        {
            alert('Please add some medications.');
            return;
        }
        //validateCapcha
        if($scope.response)
        {
            $http.post('/validateCapcha',{data: $scope.response})
            .success(function(data){
            if(data.success)
            {
                //alert('Sucess');
                $scope.saveData();
            }
            else
            {
                //alert('Error occured');
                vcRecaptchaService.reload($scope.widgetId);
            }
        })
        .error(function(err)
        {
            console.log(err);
            vcRecaptchaService.reload($scope.widgetId);    
        });
        }else
        {
            alert('Please confirm.You are not a robot?');    
        }
    };
    

  $rootScope.showLoading = false;
  $scope.search = {}; 
  $scope.results = [];
  $scope.AllResults = []; 
  $scope.pageNumber = 0;
  $scope.TotalPages = 0;  
  $scope.NumberOfRecords = 10;    
    
  $scope.selectedresults = [];
  $scope.currentid = '';
  $scope.message = '';
  $scope.hostname = $window.location.host;
  $scope.protocol = $window.location.protocol;
  $scope.init = function(){
    var id = $scope.getParameterID();
    if(id){
      $http.get('/getData?id='+id)
      .success(function(data){
        if (data.success){
          $scope.selectedresults = data.result.drugJson.data;
        }
      })
      .error(function(error){
        console.log(error)
      });
    }
  }

  $scope.getParameterID = function () {
    var url = window.location.href;
    var id = url.split('?')[1];
    return id;
  }
   
  $scope.performsearch = function(){
    $rootScope.showLoading = true;
    $scope.message = "";
    $http.get('/getSearchResults?q='+$scope.search.query)
    .success(function(data){
      if(data.success)
      {
        var response = data.data;
        $rootScope.showLoading = false;
        $scope.AllResults = response;
        $scope.message = '';
        $scope.pageNumber = 0;  
        $scope.paginateResults();
      }
      else
      {
        $scope.pageNumber = 0;  
        $scope.AllResults = [];
        $scope.message = "No matching results found.";
        $rootScope.showLoading = false;
      }
    })
    .error(function(err){
      console.log(err);
    });
  }
  
  //Paginate the medications  
  $scope.paginateResults = function()
  {
      if($scope.results.length < $scope.AllResults.length)
      {
          var recordStart = $scope.pageNumber * $scope.NumberOfRecords;
          var iTemsToLookUp = recordStart + $scope.NumberOfRecords;
          if(iTemsToLookUp > $scope.AllResults.length)
          {
              iTemsToLookUp = $scope.AllResults.length;
          }
          for(; recordStart < iTemsToLookUp; recordStart++ )
          {
              $scope.results.push($scope.AllResults[recordStart]);
          }
          $scope.$apply();
      }
  };
  
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
    $http.post('/saveData',{data: $scope.selectedresults})
    .success(function(data){
      if(data.success){
        $scope.results = [];
        $scope.search.query = '';
        $scope.hostname = $window.location.host;
        $scope.protocol = $window.location.protocol;
        var url = $scope.protocol+"//"+$scope.hostname+"/?"+data.id;
        $("#mymedurl").attr('href', url);
        $("#mymedurl").text(url);
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
  
  //Grab Scroll events 
  $('#searchContainer').bind('scroll', function() {
    var scrollPosition = $(this).scrollTop() + $(this).outerHeight();
    var divTotalHeight = $(this)[0].scrollHeight 
                          + parseInt($(this).css('padding-top'), 10) 
                          + parseInt($(this).css('padding-bottom'), 10)
                          + parseInt($(this).css('border-top-width'), 10)
                          + parseInt($(this).css('border-bottom-width'), 10);

    if( scrollPosition == divTotalHeight )
    {
      $scope.pageNumber = $scope.pageNumber + 1;    
      $scope.paginateResults();
    }
  });
  
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
