angular.module('app')
	.controller('getStudentsCtrl', ['$scope', 'entitiesSrvc', function ($scope, entitiesSrvc) {

		$scope.thisEntity = 'student';

		entitiesSrvc.getEntities($scope.thisEntity)
			.then(function (response) {
				$scope.students = response;
				$scope.noData = "There is no entities here.";
				$scope.list = $scope.students.list;
				console.log($scope.list);
			});

		// Show edit panel for a student
		$scope.showEditingForm = function (studentId) {
			$scope.editingStudent = studentId;
		};

		// Editing student record functionality
		// HERE WE ARE STOPPED



		// Getting confirmation before deleting a student
		$scope.confirmDelete = function (studentId) {
			if ( $scope.confirmedStud != studentId ) {
				$scope.confirmedStud = studentId;
			} else {
				$scope.confirmedStud = null;
			}
		};

		// Deleting student record
		$scope.deleteStudent = function () {
			var currentId = $scope.confirmedStud,
					currentStud = $scope.confirmedStud;

			entitiesSrvc.deleteEntity($scope.thisEntity, currentId)
				.then(function (response) {
					if (response.data.response == 'ok') {

						// Place currentStud into index variable ..
						var index = $scope.students.list.indexOf(currentStud);
						// .. to splice it in the list of students
						$scope.students.list.splice(index, 1);
					} else {
						alert('Error ' + response.data.response);
					}
				}); //END .then
			$scope.confirmDelete();
		}; // END deleteStudent


		// Basic approach to get entities from backend
		// getStudentsSrvc.getStudents().then(function (response) {
		// 	$scope.students = response;
		// 	console.log($scope.students);
		// });

	}]);