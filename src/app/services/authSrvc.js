app.factory('auth', function($http){
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
        return $http.get(baseURL + 'login/logout')
            .then(
            function(response) {
                return response.data;
            },
            function(error) {
                return error.data;
            }
        );
    };

    return service;
});