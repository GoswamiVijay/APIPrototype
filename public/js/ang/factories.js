'use strict';

angular.module('myApp')
  .animation('.slide', function() {
      var NG_HIDE_CLASS = 'ng-hide';
      return {
            beforeAddClass: function(element, className, done) {
                  if(className === NG_HIDE_CLASS) {
                        element.slideUp(done);
                  }
            },
            removeClass: function(element, className, done) {
                  if(className === NG_HIDE_CLASS) {
                        element.hide().slideDown(done);
                  }
            }
      }
  })
  .factory('Auth', function Auth($location, $rootScope, $http) {
    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
       
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
       
      changePassword: function(oldPassword, newPassword, callback) {
        
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {

      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {

      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        cb(false);
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        
      },

      /**
       * Get auth token
       */
      getToken: function() {
        
      }
    };
  });
