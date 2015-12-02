var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);
//список вопросов
testPlayerApp.controller('prepareToTestCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout', function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {


  var testData = {
    counter: '',
    startTime: '',
    questionList: '',
    timeForTest: ''
  }

  var data = localStorage.userId
  var url = 'result/getRecordsByStudent/'
  var id = $stateParams.id

  function unique(resp) {
    var repeatedTest_id = {
      test_id: '',
      result: ''
    }
    for (var i = 0; i < resp.data.length; i++) {
      if (resp.data[i].test_id == id) {
        repeatedTest_id.test_id = resp.data[i].test_id;
        repeatedTest_id.result++;
      }
    }
    return repeatedTest_id
  }

  $scope.showInformModal = function (infMsg) {
    $scope.infMsg = infMsg;
    angular.element(document.querySelector('#informModal')).modal();
  };
  $scope.getRecordsByStudent = function () {
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      var data = unique(resp).test_id
      var result = unique(resp).result
      var url = 'test/getRecords/'
      return userSrvc.getInfoForStudent(url, data, result)
    }).then(function (test) {
      //$scope.timeForTest = test[0].data[0].time_for_test;
      testData.timeForTest = test[0].data[0].time_for_test;
      if (test[0].data[0].attempts < test[1]) {
        alert('Немає предметів з доступними тестами для вашої групи')//убрати коли запрацює модалка
        //$scope.showInformModal("Немає предметів з доступними тестами для вашої групи");
      }

      var data = $stateParams.id
      var url = 'TestDetail/getTestDetailsByTest/'
      return userSrvc.getInfoForStudent(url, data)
    }).then(function (resp) {
      if (!resp.data[0].id) {
        alert('Немає деталей тесту')
        return
        //$scope.showInformModal("Немає деталей тесту");
        //дописати щоб запрацювала модалка
      } else {
        var id = $stateParams.id
        localStorage.testId = id;
        var data = [id, resp.data[0].level, resp.data[0].tasks]
        var url = 'question/getQuestionIdsByLevelRand/'
        return userSrvc.getInfoForStudent(url, data)
      }
    }).then(function (resp) {
      var questionList = []
      for (i in resp.data) {
        questionList.push(resp.data[i].question_id)
      }
      //localStorage.questionList = questionList;
      testData.questionList = questionList;
      $scope.questionsQuantity = questionList.length;
    })
  }
  var data = '';
  var url = 'TestPlayer/getTimeStamp';
  userSrvc.getInfoForStudent(url, data).then(function (resp) {
    testData.startTime = resp.data.unix_timestamp
    console.log(testData.startTime, 'testData.startTime')
  });
  $scope.getRecordsByStudent()
  $scope.startTest = function () {
   /* function timer(testDuration) {
      testData.counter = $scope.timeForTest * 60;
      $scope.onTimeout = function () {
        testData.counter--;
        $rootScope.counter = testData.counter
        mytimeout = $timeout($scope.onTimeout, 1000);
      }
      var mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.stop = function () {
        $timeout.cancel(mytimeout);
      }
    }*/

    //timer();
    function saveData (){
      var url = 'testPlayer/saveData';
      var data = testData;
      userSrvc.postInfoForStudent(url, data).then(function (resp) {
      })
    }
    saveData()


  }


}]);





