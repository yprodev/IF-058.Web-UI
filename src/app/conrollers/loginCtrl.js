app.controller('loginCtrl', function($scope, $state, $rootScope, auth, logSrvc){
    $scope.getError = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Field can't be empty!";
            } else if (error.minlength) {
                return "No less than 4 characters!";

            }
        }
    };

    $scope.enter = function(){
        console.log('enter works');
        $scope.wrongCredentials = false;
        var user = {
            username: $scope.username,
            password: $scope.password
        };
        auth.enterLogin(function(response){
            console.log(response);
            if (response.data.response === "ok" && response.data.roles[1] === 'admin') {
                localStorage.adminName = response.data.username;
                localStorage.adminId = response.data.id;
                console.log(response.data.response);
                $state.go('admin.groups');
            } else if (response.data.response === "ok" && response.data.roles[1] === 'student') {
                localStorage.userName = response.data.username;
                localStorage.userId = response.data.id;
                console.log(response.data.response);
                $state.go('user');
            } else {
                console.log("wrong credentials");
                $scope.wrongCredentials = true;
            };

        }, user);
    };

    $scope.exit = function() {
        logSrvc.logOut();
        console.log('exit');
    };

});
