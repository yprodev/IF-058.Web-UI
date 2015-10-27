angular.module('app')
	.controller('getStudentsCtrl', ['$scope', 'getStudentsSrvc', function ($scope, getStudentsSrvc) {

		getStudentsSrvc.getStudents().then(function (response) {
			$scope.students = response;
			console.log($scope.students);
		});

	}]);