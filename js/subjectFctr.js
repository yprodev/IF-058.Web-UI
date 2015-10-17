app.factory('subjectFctr', function ($http) {
    var service = {};
    service.getSubjects = function (callback) {
        var baseURL = 'http://dtapi.local/';
        $http({
            method: 'GET',
            url: baseURL + 'subject/getRecords'
        }).then(function successCallback (response) {
            callback (response);
        }, function errorCallback (response) {
            callback (response);
        });
    };
    return service;
});
