'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.value('version', '0.1')
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){   
        var fd = new FormData();
        fd.append('files', files);
        
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])
.service('sharedProperties', function($rootScope) {
    var properties = {};
    var menuType = 'default'
    return {
        getSharedProperty: function(key) {
            return properties[key];
        },
        setSharedProperty: function(key, value) {
            properties[key] = value;
        },
        getAllSharedProperty: function(key) {
            return properties;
        },
        deleteSharedProperty: function(key) {
            delete properties[key];
            return true;
        },
        setMenuType : function(menuType) {
            menuType = menuType;
            $rootScope.$broadcast('handlePublish');
        },
        getMenuType : function(){
            return menuType;
        }        
    }
})
;
