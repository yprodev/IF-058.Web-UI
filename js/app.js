(function() {
    angular.module('dtester', [])
        .controller('mainCtrl', function($scope){
            $scope.getError = function (error) {
                if (angular.isDefined(error)) {
                    if (error.required) {
                        return "Field can't be empty!";
                    } else if (error.minlength) {
                        return "No less than 4 characters!";

                    }
                }
            }
        })
})();