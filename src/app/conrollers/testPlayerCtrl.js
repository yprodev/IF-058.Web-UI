testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout', 
    function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
        $scope.beginTest = function () {    
                var url = 'testPlayer/getData'
                var data = ''
                userSrvc.getInfoForStudent(url, data).then(function (resp) {
                    var savedTestData = resp.data;
                    var questionArray = savedTestData.questionList;
                    $scope.questionList = questionArray 
                    console.log('$scope.questionList', $scope.questionList)

                    function timer (){
                         var data = '';
                          var url = 'TestPlayer/getTimeStamp';
                          $scope.onTimeout = function(){
                            userSrvc.getInfoForStudent(url, data).then(function (resp) {
                            var timeDifference = new Date((resp.data.unix_timestamp - savedTestData.timeForTest*60) * 1000);
                            var timeStart = new Date(savedTestData.startTime*1000)
                            var remeinedTime = (timeStart - timeDifference)
                            $scope.counter = (remeinedTime/1000)
                            mytimeout = $timeout($scope.onTimeout, 1000);
                          })
                          }
                          var mytimeout = $timeout($scope.onTimeout, 1000);
                          
                    }
                    timer()
                    var userId = localStorage.userId;
                    var testId = localStorage.testId;
                    var answerObj = {};
                    var answerArray = [];
                    $scope.checklistValue = []
                    



                    //var questionArray = savedTestData.questionList;
                    var quest;
                    $scope.choosenQuestion = function (quest, index) {
                        $scope.selected = index-1;
                        console.log('quest', quest)
                        $scope.quest = quest
                        nextQuestion(quest);
                    }
                    if ($stateParams.id !== '1') {

                        quest = +questionArray[$stateParams.id-1];
                        $scope.choosenQuestion(quest, $stateParams.id);
                    } else {
                        quest = questionArray[0];
                        $scope.choosenQuestion(quest, '1');
                        $scope.selected = 0;
                    };

                    function nextQuestion(data) {
                        var questionUrl = 'question/getRecords/';
                        var answerUrl = 'SAnswer/getAnswersByQuestion/';
                        $q.all([
                            userSrvc.getInfoForStudent(questionUrl, data),
                            userSrvc.getInfoForStudent(answerUrl, data)
                        ])
                            .then(function (resp) {
                                $scope.question = resp[0].data[0].question_text;
                                //console.log('$scope.question', $scope.question)
                                $scope.answers = resp[1].data;
                                $scope.type = resp[0].data[0].type == '1' ? 'radio' : 'checkbox';
                                // console.log($scope.answers);
                            })
                    };
                        
                    $scope.submitQuestion = function (radioValue) {
                        answerObj.selectedQuestion = $scope.quest;
                        answerObj.selectedAnswer = radioValue
                        answerObj.selectedAnswer = $scope.checklistValue
                        console.log('answerObj.selectedAnswer', answerObj.selectedAnswer)
                        answerArray.push(answerObj);
                        console.log('answerArray', answerArray)
                        var nextState = +$stateParams.id + 1
                        $state.go('user.testPlayer', {id:nextState});
                    }

                    $scope.finishTest = function () {
                        console.log('answerArray', answerArray)
                    }


                });
                    
          
        };
        $scope.beginTest();
    }]);





