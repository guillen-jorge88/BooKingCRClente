angular.module('bookinApp.app.services', [])

/*.service('services', function($http,$q){
    var deferred = $q.defer();
    var url = 'data/services.json';
    this.get = function(){
        $http.get(url).success(function(data, status,headers,config){
            console.log(data);
            return data;
        }).error(function(data, status) {
            deferred.reject(data);
        });
        
    };
    
})*/;