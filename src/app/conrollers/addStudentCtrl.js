angular.module('app')
	.controller('addStudentCtrl', ['$scope', 'addStudentSrvc', function ($scope, addStudentSrvc) {

		$scope.addNewStudent = function (recordData) {
			// Put recordData Object into a variable
			var studentRecordData = recordData;

			// Gives data to a service file
			addStudentSrvc.addStudent(studentRecordData);
		}; // End $scope.addStudent

	}]);