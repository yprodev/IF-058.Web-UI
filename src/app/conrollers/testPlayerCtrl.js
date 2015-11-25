testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q','$timeout', function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
  $scope.beginTest = function(){
    console.log('testData', $rootScope.testData)
/*    if (!$scope.showTest){
    $scope.showTest = true;
    /!*angular.element(element.getElementsById(".multi-files"))*!/
    }*/
    var userId = localStorage.userId;
    var testId = localStorage.testId;


    /*userSrvc.getTestInfo(userId, testId).then(function (resp) {
      $state.go('user.testPlayer');
    });*/
     /* var id = localStorage.userId + '/' + localStorage.testId
    var url = 'log/startTest/'
    userSrvc.getInfoForStudent(url, id).then(function (resp) {
      console.log(resp)
    })*/
      
      var questionArray = $rootScope.testData.questionList
      var question;
      if ($stateParams.id) {
          question = +questionArray[$stateParams.id] ;
      } else {
          question = questionArray[0];
          $scope.selected = 0;
      }

      //$scope.nextQuestion(questNumber)
      $scope.chosenQuestion = function(questNumber, index){
          $scope.selected = index;
          console.log($scope.selected, "%%%%%%%%%%%%%%%%%%%%%%");
          $scope.questNumber = questNumber;
          nextQuestion(questNumber);
      };
//$scope.chosenQuestion(question);

      $scope.firstQuestion = function(question) {
          nextQuestion(question);
      }

      $scope.firstQuestion(question);

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





