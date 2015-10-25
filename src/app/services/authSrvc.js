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
    return service;
});
