/**
 * Created by Серёга on 15.11.2015.
 */
var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);


testPlayerApp.controller('userTestListCtrl', ['$scope', 'userSrvc', function ($scope, userSrvc) {
  $scope.get = function () {
    var url = 'student/getRecords/';
    var data = localStorage.userId
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      url = 'timeTable/getTimeTablesForGroup/'
      data = resp.data[0].group_id;
      console.log('группа: ' + data)
      return userSrvc.getInfoForStudent(url, data)
    }).then(function (groupInfo) {
      url = 'test/getTestsBySubject/'
      data = groupInfo.data[0].subject_id
      console.log('предмет: ' + data)
      return userSrvc.getInfoForStudent(url, data)
    }).then(function (subjectInfo) {
      console.log('тести: ', subjectInfo);
      $scope.entities = subjectInfo.data;
      console.log('тести: ', $scope.entities);
    });
  };
  $scope.get();
}]);

testPlayerApp.factory('userSrvc', ['$http', 'baseUrl', function ($http, baseUrl) {
  return {
    getInfoForStudent: function (url, data) {
      return $http.get(baseUrl + url + data)
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