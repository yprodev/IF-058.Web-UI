app.factory('authSrvc', function($http){
    var service = {};
    var baseURL = 'http://dtapi.local/';

    service.enterLogin = function (callback, data) {
        $http({
            method: 'POST',
            url: baseURL + 'login/index',
            data: data
        }).then(function successCallback (response) {
            callback(response);
        }, function errorCallback (response) {
            callback(response);
        });
    };

    service.logOut = function(){
        console.log('logout srvc!!!!!!!!!!!!!!');
        return $http.get(baseURL + 'login/logout')
            .then(
            function(response) {
                return response.data;
                console.log(response);
            },
            function(error) {
                return error.data;
                console.log(error);
            }
        );
    };

    return service;
});