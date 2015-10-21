;
app.factory('facultiesSrvc', function ($http) {

//отримання обєктів (факультетів) із сервера
  var service = {};
  service.getFaculties = function (callback) {
    var baseURL = 'http://dtapi.local/';
    $http({
      method: 'GET',
      url: baseURL + 'faculty/getRecords'
    }).then(function successCallback (response) {
        callback (response);
      }, function errorCallback (response) {
        callback (response);
      });
  };

//створення нового обєкта (факультету) на сервері
  service.createFaculty = function (callback, data) {
    var baseURL = 'http://dtapi.local/';
    $http({
      method: 'POST',
      url: baseURL + 'faculty/insertData',
      data: data
    }).then(
    function successCallback (response) {
      callback(response);
      }, function errorCallback (response) {
        callback(response);
      }
      );
  };

//видалення обєкта на сервері за переданим id
  service.deleteFaculty = function (callback,id) {
    var baseURL = 'http://dtapi.local/';
    $http({
      method: 'DELETE',
      url: baseURL + 'faculty/del/' + id,
    }).then(
    function successCallback (response) {
      callback(response);
      }, function errorCallback (response) {
        callback(response);
      }
      );
  };

//створення нового обєкта (факультету) на сервері
  service.updateFaculty = function (callback, id, data) {
    var baseURL = 'http://dtapi.local/';
    $http({
      method: 'POST',
      url: baseURL + 'faculty/update/' + id,
      data: data
    }).then(
    function successCallback (response) {
      callback(response);
      }, function errorCallback (response) {
        callback(response);
      }
      );
  };

  return service;
});
