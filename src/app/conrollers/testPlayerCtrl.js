testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout',
    function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
        $scope.beginTest = function () {
            var url = 'testPlayer/getData';
            var data = '';
            userSrvc.getInfoForStudent(url, data).then(function (resp) {
                var savedTestData = resp.data;
                console.log(savedTestData, 'savedTestData');
                var questionArray = savedTestData.questionList;
                $scope.questionList = questionArray;
                console.log('$scope.questionList', $scope.questionList);

                function timer() {
                    var data = '';
                    var url = 'TestPlayer/getTimeStamp';
                    $scope.onTimeout = function () {
                        userSrvc.getInfoForStudent(url, data).then(function (resp) {
                            var timeDifference = new Date((resp.data.unix_timestamp - savedTestData.timeForTest * 60) * 1000);
                            var timeStart = new Date(savedTestData.startTime * 1000);
                            var remeinedTime = (timeStart - timeDifference);
                            $scope.counter = (remeinedTime / 1000);
                            //console.log($scope.counter);
                            $scope.mytimeout = $timeout($scope.onTimeout, 1000);
                            if ($scope.counter === 0) {
                                timeIsOut();
                            }
                        })
                    };
                    $scope.mytimeout = $timeout($scope.onTimeout, 1000);
                }

                timer();
                function timeIsOut() {
                    $scope.counter = 0;
                    $timeout.cancel($scope.mytimeout);
                    //$state.go('user.testResult');
                }

                var userId = localStorage.userId;
                var testId = localStorage.testId;
                var answerObj = {};
                var answerArray = [];
                $scope.checklistValue = [];
                var userAnswers = [];
                answerObj.answer_ids = [];

                //var questionArray = savedTestData.questionList;
                var quest;
                $scope.choosenQuestion = function (quest, index) {
                    $scope.selected = index - 1;
                    console.log('quest', quest);
                    $scope.quest = quest;
                    nextQuestion(quest);
                };
                if ($stateParams.id !== '1') {

                    quest = +questionArray[$stateParams.id - 1];
                    $scope.choosenQuestion(quest, $stateParams.id);
                } else {
                    quest = questionArray[0];
                    $scope.choosenQuestion(quest, '1');
                    $scope.selected = 0;
                }

                var levelsArr = [];

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
                            if (localStorage.getItem('levelsArr')) {
                                levelsArr = JSON.parse(localStorage.getItem('levelsArr'))
                            }

                            console.log('savedTestData.rate', savedTestData.rate);
                            levelsArr.push({id: resp[0].data[0].question_id, level: resp[0].data[0].level});
                           /* for (var i = 0; i< levelsArr.length; i++){

                                for (var j = 0; j<savedTestData.rate.length; j++){

                                    if (levelsArr[i].level == savedTestData.rate[j].level){

                                        levelsArr.push({'id': resp[0].data[0].question_id,
                                            'level': resp[0].data[0].level,
                                            'rate':savedTestData.rate[j].rate
                                        });
                                    }
                                }
                            }
                            console.log('levelsArr', levelsArr)
*/
                            localStorage.setItem('levelsArr', JSON.stringify(levelsArr));
                            $scope.levelsArr = levelsArr;
                            console.log('levelsArr', levelsArr);


                        })
                }


                if (!localStorage.getItem('userAnswers')) {
                    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
                }
                $scope.submitQuestion = function (radioValue) {
                    userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
                    answerObj.question_id = $scope.quest;
                    if ($scope.type === 'radio') {
                        answerObj.answer_ids.push(radioValue)
                    } else {
                        answerObj.answer_ids = $scope.checklistValue
                    }
                    userAnswers.push(answerObj);
                    /*$scope.allAnswers = userAnswers*/
                    console.log('$scope.allAnswers', $scope.allAnswers);
                    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
                    console.log('userAnswers', userAnswers);
                    var nextState = +$stateParams.id + 1;
                    $state.go('user.testPlayer', {id: nextState});
                };

                var countResultArr = []
                $scope.finishTest = function () {
                    var url = 'SAnswer/checkAnswers';
                    var data = localStorage.getItem('userAnswers');
                    console.log('data', data);
                    userSrvc.postInfoForStudent(url, data).then(function (resp) {
                        $scope.testResult = resp.data;
                        console.log($scope.testResult, '$scope.testResult');
                        for (var i = 0; i < $scope.testResult.length; i++) {
                            console.log('$scope.testResult[i].question_id', $scope.testResult[i].question_id)
                            for (var j = 0; j < $scope.levelsArr.length; j++) {
                                console.log('$scope.levelsArr[j].id', $scope.levelsArr[j].id)
                                if ($scope.testResult[i].question_id == $scope.levelsArr[j].id) {
                                    countResultArr.push({
                                        'id': $scope.testResult[i].question_id,
                                        'level': $scope.levelsArr[j].level,
                                        'true': $scope.testResult[i].true
                                    })

                                    console.log('countResultArr', countResultArr)
                                }
                                //console.log(data, 'data$$$$$$$$$$$$$$$$$$$$')
                            }
                        }
                        timeIsOut();
                    });
                    //localStorage.removeItem('userAnswers');
                    //console.log('local', localStorage.getItem('userAnswers'));
                }
            });
        };
        $scope.beginTest();
    }]);
