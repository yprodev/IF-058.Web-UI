/**
 * Created by Серёга on 15.11.2015.
 */
var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);

//список предметов
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

//список тестов
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
testPlayerApp.controller('userQuestionListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  var data = /*localStorage.userId*/'4'//захардкоджено, внести в базу нужне значення і поміняти
  var url = 'result/getRecordsByStudent/'
  $scope.getRecordsByStudent = function () {
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      console.log(resp)
      function unique(resp) {
        for (var i = 0; i < resp.data.length; i++) {
          //var result = resp.data[i].test_id
          for (var j = 0; j < resp.data.length; j++) {
            var repeatedTest_id = {
              test_id: resp.data[i].test_id,
              result: ''
            }
            if (resp.data[i].test_id === resp.data[j].test_id) {
              repeatedTest_id.result++;
            }
          }
        }
        console.log(repeatedTest_id)//відправити запит на отримання кілкості спроб складання тестів
      }

      unique(resp)
    })
  }
  $scope.getRecordsByStudent()


}]);


/*for (var i = 0; i < arr.length; i++) {
 var str = arr[i]; // для каждого элемента
 for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
 if (result[j] == str) continue nextInput; // если да, то следующий
 }
 result.push(str);
 }

 return result;
 }*/

/*


 student_id: studentId,
 test_id: testId,
 session_date: tpServices.getSessionDate(),
 start_time: '',
 end_time: '',
 result: $scope.scoreForTest,
 questions: tpServices.serializeArray(allResults.questions),
 true_answers: tpServices.serializeArray(trueAnswers),
 answers: tpServices.serializeArray(allResults.answers)


 */

// список результатов студентов
testPlayerApp.controller('userResultListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentResults = function () {
    var url = 'result/getRecordsByStudent/'
    var data = '4'//захардкоджено, потім внести в базу данних і поміняти
    /*localStorage.userId*/
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      return resp.data
    }).then(function (resp) {
      var entities = []
      var entitiesView = {
        result: '',
        session_date: '',
        subject_name: ''
      }
      for (var i = 0; i < resp.length; i++) {

        entities.push(resp[i].result)//вывести во вью
        entities.push(resp[i].session_date)
        idArr = []
        idArr.push(resp[i].test_id)
      }
      url = 'EntityManager/getEntityValues'
      postData = {entity: "Test", ids: idArr}
      console.log('entities', entities)
      $scope.tempEntities = entities
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        idArr = []
        idArr.push(resp.data[0].subject_id)
      }
      postData = {entity: "Subject", ids: idArr}
      //console.log('postdata', postData)
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i = 0; i < resp.data.length; i++) {
        console.log('resp[i].data.subject_name', resp.data[i].subject_name)
        $scope.tempEntities.push(resp.data[i].subject_name)
        console.log($scope.tempEntities)//создать массив объектов и присвоить его $scope enteties  после добавления  в БД нескольких строк
      }
      console.log('$scope.entities',$scope.entities)
    })
  }
  $scope.getStudentResults()
}]);

//сервис студентов
testPlayerApp.factory('userSrvc', ['$http', 'baseUrl', function ($http, baseUrl) {
  return {
    getInfoForStudent: function (url, data) {
      return $http.get(baseUrl + url + data)
        .then(fulfilled, rejected);
    },
    postInfoForStudent: function (url, postData) {
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