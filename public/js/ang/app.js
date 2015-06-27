


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
  'myApp.filters',
  'myApp.services',
  'myApp.controllers',
  'myApp.angulardirectives',
  'myApp.customedirectives'
  
]).
config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,uiGmapGoogleMapApiProvider) {
  //$urlRouterProvider.otherwise('index');
  $stateProvider
  // Pages Handled Ny HomeController
 
  .state('index', {
      url: "/:id",
      templateUrl: "/partials/home.html",
      controller : "MainCtrl"
  }) 
   .state('main', {
      url: "/main",
      templateUrl: "/partials/main.html",
      controller : "MainCtrl"
  })
    uiGmapGoogleMapApiProvider.configure({
        key: '',
        v: '3',
        libraries: 'weather,geometry,visualization'
    });




  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  
}).run(function ($rootScope, $location, $window) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
      //$location.path(next.url);
  });
});
