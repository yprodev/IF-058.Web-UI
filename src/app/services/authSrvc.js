app.factory('authSrvc', function($http, $state){
    var baseURL = 'http://dtapi.local/';
    var toAuth = function() {
        console.log('toAuth!!!!!!!!!!!!!!');
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
                    console.log('logout1!!!!!!!!!!!!');
                    return toAuth();
                },
                function() {
                    console.log('logout2!!!!!!!!!!!!!!!!');
                    return toAuth();
                }
            );
        }
    };
    function fulfilled(response) {
        return response;
        console.log(response);
    };

    function rejected(error) {
        return error;
        console.log(error);
    };
});
