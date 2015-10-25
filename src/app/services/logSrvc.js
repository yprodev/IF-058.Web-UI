app.factory('logSrvc', ['auth', '$state', function(auth, $state) {
    var logged = false;
    var toAuth = function() {
        logged = false;
        $state.go('login');
    };
    return {
        logOut: function(){
            auth.logOut().then(
                function() {
                    logged = false;
                    toAuth();
                },
                function() {
                    logged = false;
                    toAuth();
                }
            );
        },
    }
}]);