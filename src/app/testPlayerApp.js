/**
 * Created by Серёга on 15.11.2015.
 */
var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);


testPlayerApp.controller('userSubjectListCtrl', ['$scope', 'userSrvc','$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.enterToEntity = function(to, entityId) {
    $state.go(to ,{'id': entityId});
  };
  $scope.showInformModal = function(infMsg) {
    $scope.infMsg = infMsg;
    angular.element(document.querySelector('#informModal')).modal();
  };
  $scope.getStudentSubjects = function () {
    var url = 'student/getRecords/';
    var data = localStorage.userId
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      url = 'timeTable/getTimeTablesForGroup/'
      data = resp.data[0].group_id;
      //console.log('группа: ' + data)
      return userSrvc.getInfoForStudent(url, data)
    }).then(function (groupInfo) {
      url = 'subject/getRecords/'
      data = groupInfo.data[0].subject_id
      if (!data){
        //console.log('no data')
        $scope.showInformModal("Немає предметів з доступними тестами для вашої групи");
      } else {
        //console.log('ID предметa: ', groupInfo.data[0])
        for (i in groupInfo.data){
          return userSrvc.getInfoForStudent(url, data)
        }
      }
    }).then(function(subjectInfo){
      //console.log('предмети опис:', subjectInfo.data[0])
      data = subjectInfo.data
      $scope.entities = data
      //console.log($scope.enteties)
    })

    /*.then(function (groupInfo) {
      url = 'test/getTestsBySubject/'
      data = groupInfo.data[0].subject_id
      console.log('предмет: ' + data)
      return userSrvc.getInfoForStudent(url, data)
      //$scope.enteties = data
    }).then(function (subjectInfo) {
      console.log('тести: ', subjectInfo);
      $scope.entities = subjectInfo.data;
      console.log('тести: ', $scope.entities);
    });*/
  };
  $scope.getStudentSubjects();
}]);

testPlayerApp.controller('userTestListCtrl', ['$scope', 'userSrvc','$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentTests = function () {
    var url = 'test/getTestsBySubject/';
    var data = $stateParams.id
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      console.log('response', resp.data)
      $scope.entities = resp.data
    })
  }
  $scope.getStudentTests();
}]);

testPlayerApp.factory('userSrvc', ['$http', 'baseUrl', function ($http, baseUrl) {
  return {
    getInfoForStudent: function (url, data) {
      return $http.get(baseUrl + url + data)
        .then(fulfilled, rejected);
    }
  }
  function fulfilled(response) {
    console.log('hello')
    return response;
  };
  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };

}]);