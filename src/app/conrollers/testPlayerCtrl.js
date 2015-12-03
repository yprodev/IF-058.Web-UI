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



                    //var questionArray = savedTestData.questionList;
                    var quest;
                    $scope.choosenQuestion = function (quest, index) {
                        $scope.selected = index-1;
                        //СѓСЃС‚СЂР°РЅРёС‚СЊ Р±Р°Рі РїСЂРё РїРѕРІС‚РѕСЂРЅРѕРј РєР»РёРєРµ РєСЂР°СЃРЅС‹Рј РіРѕСЂРёС‚ РїСЂРµРґС‹РґСѓС‰РёР№ РІРѕРїСЂРѕСЃ

                        nextQuestion(quest);
                    }
                    if ($stateParams.id !== '1') {

                        quest = +questionArray[$stateParams.id-1];
                        console.log('quest', quest)
                        $scope.choosenQuestion(quest, $stateParams.id);
                    } else {

                        quest = questionArray[0];
                        console.log('quest', quest)
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
                                //console.log($scope.questNumberSubmit);
                            })
                    };

                    var questionQuantity = $scope.questionList.length;

                    $scope.submitQuestion = function (questNumber, radioValue) {
                        //console.log('questNumber', $scope.questNumberSubmit)
                        answerObj.selectedAnswers = radioValue;
                        answerObj.selectedQuestion = questNumber;
                        answerArray.push(answerObj);
                        //console.log('answerObj', answerObj)
                        var nextQuest = +$stateParams.id + 1;
                        if (nextQuest <= questionQuantity) {
                            $state.go('user.testPlayer', {'id': nextQuest});
                        } else {
                            alert('finish');
                        }
                    }
                });
            };

            getSavedData();
        };
        $scope.beginTest();
    }]);





