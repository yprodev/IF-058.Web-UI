app.factory('authSrvc', function($http, $state){
    var baseURL = 'http://dtapi.local/';
    var toAuth = function() {
        $state.go('login');
    };
    return {
        enterLogin : function (data) {
        return $http.post(baseURL + 'login/index', data)
            .then(fulfilled, rejected);
        },

        logOut: function(){
            return $http.get(baseURL + 'login/logout')
                .then(
                function() {
                    return toAuth();
                },
                function() {
                    return toAuth();
                }
            );
        }
    };
    function fulfilled(response) {
        return response;
    };

    function rejected(error) {
        return error;
    };
});
