(function() {
    angular.module('dtester', [])
        .controller('mainCtrl', function($scope, $http, $location){
            $scope.getError = function (error) {
                if (angular.isDefined(error)) {
                    if (error.required) {
                        return "Field can't be empty!";
                    } else if (error.minlength) {
                        return "No less than 4 characters!";

                    }
                }
            }
            $scope.enter = function(user) {
                $http.post('http://dtapi.local/login/index', {username: user.username, password: user.password})
                    .then(function (response) {
                        console.log(user.username);
                        console.log(user.password);
                        console.log(response.data);
                        /*if (response.data.login != -1 && response.data.password != -1) {
                            $location.path('/' + response.data.login);
                        } else {
                            console.log('Login failed');
                        }*/
                    },
                    function () {
                        console.log('error')
                    });
            }
    })
})();