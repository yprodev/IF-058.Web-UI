var testPlayerApp = angular.module('testPlayerApp', ['ui.router']);
//список вопросов
testPlayerApp.controller('prepareToTestCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout', function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {


  var testData = {
    counter: '',
    startTime: '',
    questionList: '',
    timeForTest: '',
    rate: []
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
        var url = 'question/getQuestionIdsByLevelRand/'
        var dataLevels = []
        for (var i = 0; i<resp.data.length; i++){
           dataLevels.push([id, resp.data[i].level, resp.data[i].tasks])
          testData.rate.push({'level': resp.data[i].level, 'rate': resp.data[i].rate})

           
        }
          function reqArr () {
            var newArr = []
            for (var k = 0; k<dataLevels.length; k++){
              newArr.push(userSrvc.getInfoForStudent(url, dataLevels[k]))
            }
            return newArr
          }
         return $q.all(
          reqArr()
          )
      }
    }).then(function (resp) {
      var questionList = []
     for (var i = 0; i<resp.length; i++){
        for (k in resp[i].data) {
          questionList.push(resp[i].data[k].question_id)
        }
      testData.questionList = questionList;
      $scope.questionsQuantity = questionList.length;
     }
    })
  }
  var data = '';
  var url = 'TestPlayer/getTimeStamp';
  userSrvc.getInfoForStudent(url, data).then(function (resp) {
    testData.startTime = resp.data.unix_timestamp
  });
  $scope.getRecordsByStudent()
  $scope.startTest = function () {
    function saveData (){
      var url = 'testPlayer/saveData';
      var data = testData;
      userSrvc.postInfoForStudent(url, data)
    }
    saveData()


  }


}]);





