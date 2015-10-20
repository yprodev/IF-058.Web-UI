var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'app/views/main.html',
		controller: ''
	}).
	when('/groups', {
		templateUrl: 'app/views/listGroups.html',
		controller: 'groupsCtrl'
	}).
	when('/addGroup', {
		templateUrl: 'app/views/addGroup.html',
		controller: 'addGroupsCtrl'
	}).
	when('/editGroup/:group_id', {
		templateUrl: 'app/views/editGroup.html',
		controller: 'editGroupsCtrl'
	}).
	when('/faculties', {
		templateUrl: 'app/views/facultyList.html',
		controller: 'facultiesCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
});


