/* Controllers */

var app=angular.module('myApp.controllers', ['uiGmapgoogle-maps','ui-rangeSlider']) 

.controller('MainCtrl', function ($rootScope, $scope, $window, $location, $http, $anchorScroll, sharedProperties, uiGmapGoogleMapApi, uiGmapIsReady,$http,$filter,$document,$compile) 
{
    $scope.model = {
        key: '6Lf3GgkTAAAAAM-KwKq3KxS4-7g40bbLA7jWEyBv'
    };

//capcah codes 
    $scope.AppDevelopmentMode = false;
    $scope.TopSearchedMedications = [];
    
    $scope.gRecaptchaResponse = '';
    $scope.$watch('gRecaptchaResponse', function (){
        $scope.expired = false;
    });
    $scope.expiredCallback = function expiredCallback(){
        $scope.expired = true;
    };
    
    $scope.captchaControl = {};
    $scope.resetCaptcha = function(){
        if($scope.captchaControl.reset){
          $scope.captchaControl.reset();  
        }
    };
        //Get App settings 
    $scope.GetApplicationConfig = function()
    {
        $http.get('/applicationConfig')
        .success(function(data)
        {
          console.log(data);    
          if(data.success)
          {
            $scope.AppDevelopmentMode = (data.applicationConfig.applicationMode === 'develop') ? false : true ;
            $scope.model.key = data.applicationConfig.captchaSiteKey;
            if($scope.AppDevelopmentMode)
            {
                var html = "<no-captcha site-key="+$scope.model.key+" theme='light' g-recaptcha-response='gRecaptchaResponse'   control='captchaControl'></no-captcha>";
              
                var element = angular.element($document[0].getElementById('capchaElement'));
                element.append(html);
                $compile( element.contents() )($scope);  
            }
          }
        }).error(function(err){ console.log(err); });       
    };
    $scope.GetApplicationConfig();

    //Get Top Medications 
    $scope.GetTopSearchedMedications = function()
    {
        $http.get('/getTopSearchKeywords')
        .success(function(data)
        {
          console.log(data);    
          if(data.success)
          {
            $scope.TopSearchedMedications = data.result;
          }
        }).error(function(err){ console.log(err); }); 
    };
    $scope.GetTopSearchedMedications();
    
    
    $scope.submitCapcha = function () 
    {
        var valid;
        if($scope.selectedresults.length == 0)
        {
            alert('Please add some medications.');
            return;
        }
        if($scope.AppDevelopmentMode)
        {
            if($scope.gRecaptchaResponse)
            {
                $http.post('/validateCapcha',{data: $scope.gRecaptchaResponse})
                .success(function(data){
                    if(data.success) { $scope.saveData(); }
                    else{ 
                        $scope.resetCaptcha();
                    }
                }).error(function(err)
                {
                    console.log(err);
                    $scope.resetCaptcha();
                });
            }else
            {
                alert('Please confirm.You are not a robot?');    
            }
        }else
        {
            $scope.saveData();
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
        $scope.results = [];  
        $scope.AllResults = [];
        $scope.paginateResults();
        $scope.message = "No matching results found.";
        $rootScope.showLoading = false;
      }
    })
    .error(function(err){
      console.log(err);
    });
  }
  
  $scope.TotalPages =function()
  {
    return Math.ceil($scope.AllResults.length/$scope.NumberOfRecords);                
  }
  
  $scope.NextRecord = function()
  {
      $('#searchContainer').scrollTop(0);
      if($scope.pageNumber >= $scope.TotalPages())
      {
          return;
      }
      $scope.pageNumber = $scope.pageNumber + 1;
      $scope.paginateResults();
  };
    
  $scope.PreviousRecord = function()
  {
      $('#searchContainer').scrollTop(0);
      if($scope.pageNumber < 1){
          return;
      }
      
      $scope.pageNumber = $scope.pageNumber - 1;
      $scope.paginateResults();
  };
    
  //Paginate the medications  
  $scope.paginateResults = function()
  {
      $scope.results = [];
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
          setTimeout(function()
          { 
            $scope.$apply();  
         }, 500);
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
    if(resultToSave.length > 0)
    {
      var newArray = resultToSave.filter(function (el) {
        return el.id !== obj.id;
      });
      oldResult.push(obj);
      $scope.results = oldResult;
      $scope.selectedresults = newArray;
    }
    if(oldResult.length > 0)
    {
        $scope.message = "";
    }
  }

  $scope.saveData = function(){
    $http.post('/saveData',{data: $scope.selectedresults})
    .success(function(data){
      if(data.success){
        $scope.hostname = $window.location.host;
        $scope.protocol = $window.location.protocol;
        var url = $scope.protocol+"//"+$scope.hostname+"/?"+data.id;
        $("#mymedurl").attr('href', url);
        $("#mymedurl").text(url);

        $scope.AllResults = [];
        $scope.paginateResults();  
        $scope.search.query = '';
         setTimeout(function()
        { 
            alert('Data saved successfully');
         }, 500);
          
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
      //$scope.pageNumber = $scope.pageNumber + 1;    
      //$scope.paginateResults();
    }
  });

  $scope.selectedMedication = {};    
  $scope.showMedicationInfo = function(medication)    
  {
      $scope.selectedMedication = medication;
  };
  
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
