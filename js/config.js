app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html'
        })
        .when('/user', {
            templateUrl: 'views/user.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
