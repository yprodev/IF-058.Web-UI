;
app.factory('subjectsSrvc', ['$http', function ($http) {
  var service = {};
  var URL = 'http://dtapi.local/subject/';
// список предметів
  service.getSubjects = function () {
    return $http.get(URL + 'getRecords')
      .success(function (result) {
        return result
      })
      .error(function (result) {
        console.log('error')
      });
  }
  // створення нового предмету
  service.createSubject = function(data) {
    return $http.post(URL + 'insertData', data)
      .then(function(response) {
        return response.data.response;
      });
  }

 // видалення предмету
 service.delSubject = function(data) {
  return $http.get(URL +'del/' + data)
    .then(function(response) {
     return response.data.response;
    });
 }
//редагування предметів
  service.editSubject = function(id, newData) {
    console.log(id, newData)
    return $http.post(URL +'update/'+ id, newData)
      .then(function(response) {
        return response.data.response;
      });
  }
 return service
}]);
