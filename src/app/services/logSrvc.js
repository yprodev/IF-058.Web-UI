app.factory('logSrvc', ['authSrvc', '$state', function(authSrvc, $state) {
    //var logged = false;
    var toAuth = function() {
        console.log('toAuth!!!!!!!!!!!!!!');
        //logged = false;
        $state.go('login');
    };
    return {
        logOut: function(){
            authSrvc.logOut().then(
                function() {
                    console.log('logout1!!!!!!!!!!!!');
                    //logged = false;
                    toAuth();
                },
                function() {
                    console.log('logout2!!!!!!!!!!!!!!!!');
                    //logged = false;
                    toAuth();
                }
            );
        },
    }
}]);