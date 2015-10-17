app.controller('subjectCtrl', function($scope, subjectFctr){

        subjectFctr.getSubjects(function (resp) {
            if (resp.status == 200) {
                $scope.subjects = resp.data;
            } else {
                $scope.subjects = resp.status;
            }

            console.log($scope.subjects);
        });
    });