testPlayerApp.factory('userSrvc', ['$http', 'baseUrl', function ($http, baseUrl) {
  return {
    getInfoForStudent: function (url, data, result) {
      if (Array.isArray(data)){
        var sum = ''
        for (i=0; i<data.length; i++){
          sum = sum + data[i]+'/'
        }
        data = sum
      }
      if (url == 'test/getRecords/'){
        return $http.get(baseUrl + url + data)
        .then(function(response){
            return [response, result];
        }, rejected);
      } else {
        return $http.get(baseUrl + url + data)
          .then(fulfilled, rejected);
      }
    },
    getTestInfo: function(userId, testId) {
     return $http.get(baseUrl + 'Log/startTest' + '/' + userId + '/' + testId)
       .then(fulfilled, rejected);
   },
    postInfoForStudent: function (url, postData) {
      return $http.post(baseUrl + url, postData)
        .then(fulfilled, rejected);

    }
  }
  function fulfilled(response) {
    return response;
  };
  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };
}]);