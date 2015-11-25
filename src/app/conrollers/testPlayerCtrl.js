testPlayerApp.controller('userQuestionListCtrl', ['$scope', '$rootScope', 'userSrvc', '$stateParams', '$state', '$q', '$timeout',
    function ($scope, $rootScope, userSrvc, $stateParams, $state, $q, $timeout) {
        $scope.beginTest = function () {
            var userId = localStorage.userId;
            var testId = localStorage.testId;

            var questionArray = $rootScope.testData.questionList;
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
                var answerObj = {};
                var answerArray = [];
                answerObj.selectedAnswers = radioValue;
                answerObj.selectedQuestion = $scope.questNumber;
                answerArray.push(answerObj);
            };
        };
        $scope.beginTest();
    }]);





