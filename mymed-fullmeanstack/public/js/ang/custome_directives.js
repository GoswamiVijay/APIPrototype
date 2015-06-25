'use strict';

/* Directives */


angular.module('myApp.customedirectives', []).
  directive('xyz', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])  
  .directive("animateDiv", function(){
    return {
      link : function($scope, ele, attrs) {
        $(ele).hide().fadeIn(1000);
      }
    }
  }) 
  .directive("scrolltotop", function(){
    return {
      link: function($scope, ele, attrs){
        ele.bind('click', function(e){
          setTimeout(function(){$('html, body').animate({scrollTop: 0}, 1000);},100);
        });               
      }
    }
  })
  .directive('timeslotpicker', function() {
    return {
      link: function($scope, elm, attrs){
        elm.on('click', function(){
          if($(this).hasClass('active')){
            $(this).removeClass('active');
            $scope.setChosenTimeSlot('');
          }
          else{
            $(".btn.fdbkk-1.active").removeClass('active');
            $(this).addClass('active');
            var date = $(".available.available-time").html().replace('Available Sessions on ', '');
            $scope.setChosenTimeSlot($(this).attr('time'), date);
          }
        });
      }
    }
  })
  .directive('inlinedatepicker', function($document) {
    return {
      link: function($scope, elm, attrs){
        elm.datepicker({
          startDate: attrs['startdate'],
          endDate: attrs['enddate'],
          scope : $scope
        });        
      }
    }
  })
  .directive('datepicker', function() {
    return function(scope, elm, attr) {
      var options = {pickTime: false};

      if(attr['date'] && attr['date']!='')
        options.defaultDate = attr['date'];

      elm.datetimepicker(options);
      // elm.data("DateTimePicker").setMinDate(new Date("-0d"));
      // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
    }
  })
  .directive('rangedatepicker', function() {
    return {
      link:function(scope, elm, attr) {
     $.getScript("http://www.urimalo.com/assets/admin/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js", function(){
        var startDate = new Date();
        var ToEndDate = new Date();
        ToEndDate.setDate(ToEndDate.getDate()+7);
        startDate.setDate(startDate.getDate()-1);
        elm.datepicker({
            startDate: startDate,
            endDate: ToEndDate, 
            scope : scope
        });
        setTimeout(function(){
          elm.on('change', function(ee, val){
            scope.bms.time = "";
            scope.$apply();
          });
        },100);
      });
    }
    }
  })
  .directive('timepicker', function(){
    return function(scope, elm, attr) {
        elm.datetimepicker({pickDate: false});
    };
  })
  .directive('datetimepicker', function(){
    return function(scope, elm, attr) {
        elm.datetimepicker({pickDate: true,pickTime: true});
    };
  })
  .directive('checktime', function(){
    return function(scope,elm, attr){
        var $elm = $(elm);
        setTimeout(function(){
          $elm.on('change', function (ee, aa){
            var d = new Date();
            if(scope.bms.date){
              if(!((Date.parse(scope.bms.date + " " + $elm.val())) >= Date.parse(d))){
                scope.bms.time = "";
                scope.$apply();
                alert("Please select valid date and time. You can not choose past date.");
              }
            } else {
              alert("Please select message date");
            }
          });
        }, 10);
      }
    
  })
  .directive('timepicker10mindiff', function(){
    return {
      link: function($scope, elm, attrs){
        elm.on('click', function(){
          var options = {pickDate: false};
          var momentOfTime = new Date(); 
          var myTimeSpan = 10*60*1000; // 10 minutes in milliseconds
          momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
          options.defaultDate = momentOfTime;
          $(this).datetimepicker(options);
        });
      }
    }
  })
  .directive('simplecropper', function() {
    return function(scope, element, attrs) {
      element.simplecropper(scope);
    }
  })
  .directive('raty', function() {
    return function(scope, element, attrs) {
      setTimeout(function(){
          element.raty({
            readOnly  : attrs['cancel']?false:true,
            score     : attrs['value']?attrs['value']:0,
            scoreName : attrs['name']?attrs['name']:"score",
            path      : '/demo/images',
            cancel    : false,
            cancelOff : 'cancel-off.png',
            cancelOn  : 'cancel-on.png',
            half      : false,
            size      : 24,
            starHalf  : 'star-half.png',
            starOff   : 'star-off.png',
            starOn    : 'star-on.png',
          });
        }
    ,300);
    }
  })
  .directive('carousel', function() {
    return function(scope, element, attrs) {
      element.owlCarousel({
        items : attrs['items']?attrs['items']:4,
        lazyLoad : true,
        navigation : attrs['navigation']?attrs['navigation']:false,
        navigationText: [
          "<i class='fa fa-angle-left fa-5x'></i>",
          "<i class='fa fa-angle-right fa-5x'></i>"
        ],
        pagination : attrs['pagination']?attrs['pagination']:false,
        autoPlay : true,
        mouseDrag : attrs['mouseDrag']?attrs['mouseDrag']:false,
      });
    }
  })
  .directive('showhideslotshtml', function() {
    return {
      link: function($scope, elm, attrs){
        elm.on('change', function(){
          $(".filterhide"+$(this).attr('id')).hide();
          var session = $("#"+$(this).attr('id')+"-"+$(this).val());
          $("#nosession-"+$(this).attr('id')).show();
          if(session.attr('style')=="display: none;" || session.attr('style')=="display:none"){
            session.show();
            $("#nosession-"+$(this).attr('id')).hide();
            $("#fnosession-"+$(this).attr('id')).hide();
          }else{
            $("#fnosession-"+$(this).attr('id')).show();
          }
        });
      }
    }
  })
  ;