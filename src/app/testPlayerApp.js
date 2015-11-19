/**
 * Created by Серёга on 15.11.2015.
 */
var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);


testPlayerApp.controller('userSubjectListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.enterToEntity = function (to, entityId) {
    $state.go(to, {'id': entityId});
  };
  $scope.showInformModal = function (infMsg) {
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
      if (!data) {
        $scope.showInformModal("Немає предметів з доступними тестами для вашої групи");
      } else {
        for (i in groupInfo.data) {
          return userSrvc.getInfoForStudent(url, data)
        }
      }
    }).then(function (subjectInfo) {
      data = subjectInfo.data
      $scope.entities = data;
    })
  };
  $scope.getStudentSubjects();
}]);

testPlayerApp.controller('userTestListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentTests = function () {
    var url = 'test/getTestsBySubject/';
    var data = $stateParams.id
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      //console.log('response', resp.data)
      $scope.entities = resp.data
    })
  }
  $scope.getStudentTests();
  $scope.enterToEntity = function (to, entityId) {
    $state.go(to, {'id': entityId});
  };
}]);

//список вопросов
testPlayerApp.controller('userQuestionListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', '$q', function ($scope, userSrvc, $stateParams, $state, $q) {
  var data = /*localStorage.userId*/'4'//захардкоджено, внести в базу нужне значення і поміняти
  var url = 'result/getRecordsByStudent/'
  var id = $stateParams.id
  function unique(resp) {
    var repeatedTest_id = {
      test_id: '',
      result: ''
    }
    /*var parsed = resp.data
     var parsedTest_Id = []
     for (var i = 0; i < parsed.length; i++) {
     parsedTest_Id.push(parsed[i].test_id)
     }
     for (var i = 0; i < parsedTest_Id.length; i++) {
     repeatedTest_id[parsedTest_Id[i]] = 1
     //console.log('repeatedTest_id[resp.data[i',repeatedTest_id[parsed[i]])
     for(var j = 0; j<parsedTest_Id.length; j++){
     if (i!==j){
     if (parsedTest_Id[i] == parsedTest_Id[j]){
     repeatedTest_id[parsedTest_Id[i]] = repeatedTest_id[parsedTest_Id[i]]+1
     //console.log('repeatedTest_id[resp.data[i]]', repeatedTest_id[parsedTest_Id[i]])
     }
     }
     }*/
    for (var i = 0; i < resp.data.length; i++) {
      if (resp.data[i].test_id == id){
        repeatedTest_id.test_id = resp.data[i].test_id;
        repeatedTest_id.result++;
      }
    }
    console.log('repeatedTest_id', repeatedTest_id)
    return repeatedTest_id
  }
  $scope.showInformModal = function (infMsg) {
    $scope.infMsg = infMsg;
    angular.element(document.querySelector('#informModal')).modal();
    console.log('informal')
  };
  $scope.getRecordsByStudent = function () {
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      var data = unique(resp).test_id
      var result = unique(resp).result
      var url = 'test/getRecords/'
      return userSrvc.getInfoForStudent(url, data, result)
    }).then(function(test){
      if (test[0].data[0].attempts < test[1]){
        alert('Немає предметів з доступними тестами для вашої групи')//убрати коли запрацює модалка
     $scope.showInformModal("Немає предметів з доступними тестами для вашої групи");
      }
      var data =  $stateParams.id
      var url = 'TestDetail/getTestDetailsByTest/'
      return userSrvc.getInfoForStudent(url, data)
    }).then(function(resp){
      console.log('resp',resp)
     // в разы выдсутності деталей тесту написати обробку 
      var id = $stateParams.id
      localStorage.testId = id;
      var data = [id, resp.data[0].level, resp.data[0].tasks]
      var url = 'question/getQuestionIdsByLevelRand/'
      return userSrvc.getInfoForStudent(url, data)
    }).then(function(resp){
      var questionList = []
      for (i in resp.data){
        questionList.push(resp.data[i].question_id)
      }
      localStorage.questionList = questionList
      $scope.questionsQuantity = questionList.length
    })
    
  }
  $scope.getRecordsByStudent()

  $scope.beginTest = function(){
    var userId = localStorage.userId;
    var testId = localStorage.testId;
    userSrvc.getTestInfo(userId, testId).then(function (resp) {
      $state.go('user.testPlayer');
    });
  }

}]);




testPlayerApp.controller('userResultListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentResults = function () {
    var url = 'result/getRecordsByStudent/'
    var data = '69'//захардкоджено, потім внести в базу данних і поміняти
    /*localStorage.userId*/
    
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      console.log('response', resp.data[0])
      console.log('resp.data', resp.data)
      return resp.data
    }).then(function (resp) {
      console.log('resp', resp)
      var entities = []
      for (var i = 0; i < resp.length; i++) {
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
      for (var i = 0; i < resp.length; i++) {
        idArr = []
        idArr.push(resp.data[0].subject_id)
      }
      //console.log('idArr', idArr)
      postData = {entity: "Subject", ids: idArr}
      //console.log('postdata', postData)
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      console.log('resp', resp)
      for (var i = 0; i < resp.data.length; i++) {
        console.log('resp[i].data.subject_name', resp.data[i].subject_name)
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
      console.log('serviceData',data)
      if (Array.isArray(data)){
        console.log('is Array')
        var sum = ''
        for (i=0; i<data.length; i++){
          sum = sum + data[i]+'/'
        }
        data = sum
      }
      return $http.get(baseUrl + url + data)
        .then(fulfilled, rejected);
    },
    postInfoForStudent: function (url, postData) {
      return $http.post(baseUrl + url, postData)
        .then(fulfilled, rejected);

    },
    getTestInfo: function(userId, testId) {
      return $http.get(baseUrl + 'Log/startTest' + '/' + userId + '/' + testId)
        .then(fulfilled, rejected);
    }
  }
  function fulfilled(response) {
    console.log('hello', 'testInfo');
    return response;
  };
  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };

}]);
