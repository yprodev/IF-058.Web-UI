;
app.factory('facultiesSrvc', function ($http, baseUrl) {

  var service = {};
  // var baseUrl = 'http://dtapi.local/';

//отримання обєктів (факультетів) із сервера
  service.getFaculties = function () {
    return $http.get(baseUrl + 'faculty/getRecords')
      .then(fulfilled, rejected);
    };

    //створення нового обєкта (факультету) на сервері
  service.createFaculty = function (data) {
    return $http.post(baseUrl + 'faculty/insertData', data)
      .then(fulfilled, rejected);
  };

  //видалення обєкта на сервері за переданим id
  service.deleteFaculty = function (id) {
    return $http.delete(baseUrl + 'faculty/del/' + id)
      .then(fulfilled, rejected);
  };

//створення нового обєкта (факультету) на сервері
  service.updateFaculty = function (id, data) {
    return $http.post(baseUrl + 'faculty/update/' + id, data)
    .then(fulfilled, rejected);
  };

  function fulfilled(response) {
    return response;
  };

  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };

  return service;
});
