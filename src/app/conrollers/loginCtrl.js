app.controller('loginCtrl', function($scope, $location, $rootScope, auth){
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
                console.log("hello admin");
                $location.path('/admin');
            } else if (response.data.response === "ok" && response.data.roles[1] === 'student') {
                console.log("hello student");
                $location.path('/user');
            } else {
                console.log("wrong credentials");
                $scope.wrongCredentials = true;
            };

        }, user);
    };

});
