var app = angular.module('app', ['ui.router']);

app.constant("baseUrl", "http://dtapi.local/");

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.
		state('login', {
			url: '/',
			templateUrl: 'app/views/login.html',
			controller: 'loginCtrl'
		}).
		state('admin', {
			url: '/admin',
			templateUrl: 'app/views/admin.html'
		}).
		state('user', {
			url: '/user',
			templateUrl: 'app/views/user.html'
		}).
		state('admin.educationInfo', {
			url: '/educationInfo',
			templateUrl: 'app/views/educationInfo.html'
		}).
		state('admin.educationInfo.groups', {
			url: '/groups',
			templateUrl: 'app/views/listGroups.html',
			controller: 'groupsCtrl'
		}).
		state('admin.educationInfo.faculties', {
			url:'/faculties',
			templateUrl: 'app/views/facultyList.html',
			controller: 'facultiesCtrl'
		}).
		state('admin.educationInfo.specialities', {
			url:'/specialities',
			templateUrl: 'app/views/specialitiesList.html',
			controller: 'specialitiesCtrl'
		}).
		state('admin.subjects', {
		url:'/subjects',
			templateUrl: 'app/views/subjectsList.html',
			controller: 'subjectsCtrl'
		}).
		state('admin.students', {
			url: '/students/addStudent',
			templateUrl: 'app/views/addStudentRecord.html',
			controller: 'addStudentCtrl'
		}).
		state('admin.addAdmin', {
			url: '/addAdmin',
			templateUrl: 'app/views/addAdmin.html',
			controller: 'addAdminCtrl'
	});

		$urlRouterProvider.otherwise('/');
});
