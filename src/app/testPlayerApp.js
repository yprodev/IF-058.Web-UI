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
      //console.log($scope.entities)
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
      //console.log('response', resp.data)
      $scope.entities = resp.data
    })
  }
  $scope.getStudentTests();
}]);

testPlayerApp.controller('userResultListCtrl', ['$scope', 'userSrvc','$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentResults = function () {
    var url = 'result/getRecordsByStudent/'
    var data = '4'
    /*localStorage.userId*/
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      console.log('response', resp.data[0])
      console.log('resp.data', resp.data)
      return resp.data
    }).then(function (resp) {
      console.log('resp',resp)
      var entities = []
      for (var i=0; i<resp.length; i++){
        entities.push(resp[i].result)//вывести во вью
        entities.push(resp[i].session_date)
        idArr = []
        idArr.push(resp[i].test_id)
      }
      url = 'EntityManager/getEntityValues'
      postData = {entity: "Test", ids: idArr}
      $scope.entities = entities
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i=0; i<resp.length; i++){
        idArr=[]
        idArr.push(resp.data[0].subject_id)
      }
      console.log('idArr',idArr)
      postData = {entity: "Subject", ids: idArr}
      //console.log('postdata', postData)
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      console.log('resp', resp)
      for (var i=0; i<resp.data.length; i++) {
        console.log('resp[i].data.subject_name',resp.data[i].subject_name)
        $scope.entities.push(resp.data[i].subject_name)
      }
      console.log($scope.entities)
      console.log('lastresp', resp)
      console.log('$scope.entities[0]')
    })
    }
  $scope.getStudentResults()
}]);

testPlayerApp.factory('userSrvc', ['$http', 'baseUrl', function ($http, baseUrl) {
  return {
    getInfoForStudent: function (url, data) {
      return $http.get(baseUrl + url + data)
        .then(fulfilled, rejected);
    },
      postInfoForStudent: function(url, postData){
        return $http.post(baseUrl + url, postData)
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