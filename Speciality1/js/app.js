/**
 * Created by Серёга on 09.10.2015.
 */
var app  = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      template: '<h1>Hello</h1>',
      controller: 'mainCtrl'
    }).when('/faculties', {
      templateUrl: 'Faculties.html',
      controller: 'mainCtrl'
    })
    .otherwise({
      template: '<h1>404 no such page</h1>'
    })
})
