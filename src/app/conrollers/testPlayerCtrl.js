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
                           /* console.log('timer')*/
                            userSrvc.getInfoForStudent(url, data).then(function (resp) {
                            /*console.log(resp.data.unix_timestamp, 'time1')
                            console.log(savedTestData.startTime, 'savedTestData.startTime')*/
                            //console.log('savedTestData.timeForTest', savedTestData.timeForTest)
                            console.log(resp.data.unix_timestamp - savedTestData.timeForTest*60*1000, 'time2')
                            var remainedTime = savedTestData.startTime - (resp.data.unix_timestamp - savedTestData.timeForTest*60)
                            console.log('remainedTime', remainedTime)
                            //$scope.counter = new Date(remainedTime * 1000);
                            console.log('$scope.counter', remainedTime)

                            var date1 = new Date(resp.data.unix_timestamp*1000)
                            var date2 = new Date((resp.data.unix_timestamp - savedTestData.timeForTest*60) * 1000);
                            var date3 = new Date(savedTestData.startTime*1000)
                            var rem = (date3 - date2)
                            $scope.counter = (rem)
                            console.log('rem', Math.floor(rem/6000))

                            /*

                            console.log('timeForTest, milliseconds', savedTestData.timeForTest*60*1000)
                            console.log('date1', date1)
                            console.log('date2', date2)
                            console.log('date3', date3)*/
                            /*console.log(savedTestData.timeForTest, 'timeForTest')
                            console.log($scope.counter, '$scope.counter')
                            console.log($scope.counter-savedTestData.timeForTest, '$scope.counter2')*/

                            mytimeout = $timeout($scope.onTimeout, 1000);
                          })
                          }
                          var mytimeout = $timeout($scope.onTimeout, 1000);
                          
                    }
                    timer()


                    /*function timer(testDuration) {
                      testData.counter = $scope.timeForTest * 60;
                      var mytimeout = $timeout($scope.onTimeout, 1000);
                      $scope.onTimeout = function () {
                        testData.counter--;
                        $rootScope.counter = testData.counter
                        mytimeout = $timeout($scope.onTimeout, 1000);
                      }
                      
                      $scope.stop = function () {
                        $timeout.cancel(mytimeout);
                      }
                    }*/


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





