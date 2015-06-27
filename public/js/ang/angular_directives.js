'use strict';

/* Directives */


angular.module('myApp.angulardirectives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive("scrollTo", ["$window", function($window){
    return {
      restrict : "AC",
      compile : function(){

        var document = $window.document;
        
        function scrollInto(idOrName) {//find element with the give id of name and scroll to the first element it finds
          if(!idOrName)
            $window.scrollTo(0, 0);
          //check if an element can be found with id attribute
          var el = document.getElementById(idOrName);
          if(!el) {//check if an element can be found with name attribute if there is no such id
            el = document.getElementsByName(idOrName);

            if(el && el.length)
              el = el[0];
            else
              el = null;
          }

          if(el) //if an element is found, scroll to the element
            el.scrollIntoView();
          //otherwise, ignore
        }

        return function(scope, element, attr) {
          element.bind("click", function(event){
            scrollInto(attr.scrollTo);
          });
        };
      }
    };
  }])
	.directive('scrollToBookmark', function() {
    return {
      link: function(scope, element, attrs) {
        var value = attrs.scrollToBookmark;
        element.click(function() {
          scope.$apply(function() {
            var selector = "[scroll-bookmark='"+ value +"']";
            var element = $(selector);
            if(element.length)
              $('html, body').animate({scrollTop: (element.offset().top)-40}, 1000);  // Don't want the top to be the exact element, -100 will go to the top for a little bit more
          });
        });
      }
    };
	})
  .directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  })
  .directive('ngConfirmClick', [
      function(){
          return {
              priority: 1,
              terminal: true,
              link: function (scope, element, attr) {
                  var msg = attr.ngConfirmClick || "Are you sure want to delete?";
                  var clickAction = attr.ngClick;
                  element.bind('click',function (event) {
                      if ( window.confirm(msg) ) {
                          scope.$eval(clickAction)
                      }
                  });
              }
          };
  }])
  .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        console.log("hi");
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
            scope.$apply(attr.whenScrolled);
        });
    };
})
.directive('scrollTrigger', function($window) {
  return {
      link : function(scope, element, attrs) {
          var offset = parseInt(attrs.threshold) || 0;
          var e = jQuery(element[0]);
          var doc = jQuery(document);
          angular.element(document).bind('scroll', function() {
              if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                  scope.$apply(attrs.scrollTrigger);
              }
          });
      }
  };
})
.directive("ngFileSelect",function(){

  return {
    link: function($scope,el,attr){
      
      el.bind("change", function(e){
        console.log(attr.id);
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFileQuestionOption($scope.file,attr.id);
      })
      
    }
    
  }
})
// .directive("ngFileSelectBusiness",function(){

//   return {
//     link: function($scope,el){      
//       el.bind("change", function(e){
//         $scope.file = (e.srcElement || e.target).files[0];
//         $scope.getFileQuestion($scope.file);        
//       })
      
//     }
    
//   }
// })
;


