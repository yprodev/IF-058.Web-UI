testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout',
    function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
        $scope.beginTest = function () {    
            
                    /*$timeout(timer, 1000)*/
            var savedTestData;



            function getSavedData() {
                var url = 'testPlayer/getData'
                var data = ''
                userSrvc.getInfoForStudent(url, data).then(function (resp) {
                    savedTestData = resp.data;
                    var questionArray = savedTestData.questionList;
                    $scope.questionList = questionArray 

                    
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

                    //var questionArray = savedTestData.questionList;
                    var question;
                    if ($stateParams.id) {
                        question = +questionArray[$stateParams.id];
                    } else {
                        question = questionArray[0];

                        $scope.selected = 0;
                    };

                    $scope.chosenQuestion = function (questNumber, index) {
                        $scope.selected = index;
                        $scope.questNumber = questNumber;
                        //answerObj.selectedQuestion = $scope.questNumber;
                        nextQuestion(questNumber);

                    };
                    $scope.firstQuestion = function (question) {
                        nextQuestion(question);
                    }

                    $scope.firstQuestion(question);

                    function nextQuestion(data) {
                        var questionUrl = 'question/getRecords/';
                        var answerUrl = 'SAnswer/getAnswersByQuestion/';
                        $q.all([
                            userSrvc.getInfoForStudent(questionUrl, data),
                            userSrvc.getInfoForStudent(answerUrl, data)
                        ])
                            .then(function (resp) {
                                $scope.question = resp[0].data[0].question_text;
                                $scope.answers = resp[1].data;
                                $scope.type = resp[0].data[0].type == '1' ? 'radio' : 'checkbox';
                            })
                    };

                    $scope.submitQuestion = function (radioValue) {
                        answerObj.selectedAnswers = radioValue;
                        answerArray.push(answerObj);
                    }
                });
            };

            getSavedData();
        };
        $scope.beginTest();
    }]);





