testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q','$timeout', function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
  $scope.beginTest = function(){
/*    if (!$scope.showTest){
    $scope.showTest = true;
    /!*angular.element(element.getElementsById(".multi-files"))*!/
    }*/
    var userId = localStorage.userId;
    var testId = localStorage.testId;
    function timer(testDuration) {
    $scope.counter = $rootScope.timeForTest * 60;

        //console.log($scope.counter, "77777777777777777777");

    $scope.onTimeout = function(){
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
      $scope.stop = function() {
      $timeout.cancel(mytimeout);
    }
}
    var data = '';
    var url = 'TestPlayer/getTimeStamp';
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      $scope.startTime = new Date(resp.data.unix_timestamp * 1000);
    });
timer();

    /*userSrvc.getTestInfo(userId, testId).then(function (resp) {
      $state.go('user.testPlayer');
    });*/
     /* var id = localStorage.userId + '/' + localStorage.testId
    var url = 'log/startTest/'
    userSrvc.getInfoForStudent(url, id).then(function (resp) {
      console.log(resp)
    })*/

      var questionArray = localStorage.questionList.split(",");
      var question;
      if ($stateParams.id) {
          question = +questionArray[$stateParams.id] ;
      } else {
          question = questionArray[0];
      }

      //$scope.nextQuestion(questNumber)
      $scope.chosenQuestion = function(questNumber){
          $scope.questNumber = questNumber;
          nextQuestion(questNumber);
      };
$scope.chosenQuestion(question);
function nextQuestion (data){
      var questionUrl = 'question/getRecords/';
      var answerUrl = 'SAnswer/getAnswersByQuestion/';
      //$scope.questList =
$q.all([
    userSrvc.getInfoForStudent(questionUrl, data),
    userSrvc.getInfoForStudent(answerUrl, data)
  ])
   .then(function (resp) {
      $scope.question = resp[0].data[0].question_text;
      $scope.answers = resp[1].data;
      $scope.type = resp[0].data[0].type == '1' ? 'radio' : 'checkbox';
   })
}




   var answerArray = [];

   $scope.submitQuestion = function(radioValue) {
       var answerObj = {}
       answerObj.selectedAnswers = radioValue;
       answerObj.selectedQuestion = $scope.questNumber;
       console.log(answerObj,"AO");
       answerArray.push(answerObj);
       console.log(answerArray,"AA");
   };
  
  }
  //наступний запит використовуємо щоб залогініти юзера
    $scope.beginTest();
}]);





