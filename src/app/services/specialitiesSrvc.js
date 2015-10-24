/**
 * Created by Серёга on 09.10.2015.
 */

app.factory('specialitiesSrvc', ['$http', function ($http) {
  var service = {};
  var URL = 'http://dtapi.local/speciality/';

// список груп
  service.getSpecialities = function () {
    return $http.get(URL + 'getRecords')
      .success(function (result) {
        return result
        console.log(result)
      })
      .error(function (result) {
        console.log('error')
      })
  }

  // створення
  service.createSpeciality = function(data) {
    return $http.post(URL + 'insertData', data)
      .then(function(response) {
        return response.data.response;
        console.log(response.data.response)
      });
  }

 // видалення
 service.delSpeciality = function(data) {
  return $http.get(URL +'del/' + data)
    .then(function(response) {
     return response.data.response;
    });
 }
//редагування
  service.editSpeciality = function(id, newData) {
    console.log(id, newData)
    return $http.post(URL +'update/'+ id, newData)
      .then(function(response) {
        return response.data.response;
      });
  }
 return service
}]);

