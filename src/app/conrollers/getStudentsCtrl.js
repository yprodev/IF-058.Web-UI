angular.module('app')
	.controller('getStudentsCtrl', ['$scope', 'entitiesSrvc', function ($scope, entitiesSrvc) {

		$scope.thisEntity = 'student';

		entitiesSrvc.getEntities($scope.thisEntity)
			.then(function (response) {
				$scope.students = response;
				$scope.noData = "There is no entities here.";
				console.log(response);
			});

		// 
		$scope.showEditingForm = function (studentId) {
			$scope.editingStudent = studentId;
		};

		// Basic approach to get entities from backend
		// getStudentsSrvc.getStudents().then(function (response) {
		// 	$scope.students = response;
		// 	console.log($scope.students);
		// });

	}]);