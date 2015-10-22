var app = angular.module('app', ['ui.router']);

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
    state('admin.groups', {
      url: '/groups',
      templateUrl: 'app/views/listGroups.html',
      controller: 'groupsCtrl'
    }).
    state('admin.addGroup', {//not work
      url:'/addGroup',
      templateUrl: 'app/views/addGroup.html',
      controller: 'addGroupsCtrl'
    }).
    state('admin.editGroup/:group_id', {//not work
    url:'/editGroup',
      templateUrl: 'app/views/editGroup.html',
      controller: 'editGroupsCtrl'
    }).
    state('admin.faculties', {
      url:'/faculties',
      templateUrl: 'app/views/facultyList.html',
      controller: 'facultiesCtrl'
    }).
    state('admin.specialities', {
      url:'/specialities',
      templateUrl: 'app/views/specialitiesList.html',
      controller: 'specialitiesCtrl'
    }).
    state('admin.subjects', {
    url:'/subjects',
      templateUrl: 'app/views/subjectsList.html',
      controller: 'subjectsCtrl'
  })

    $urlRouterProvider.otherwise('/');
});


