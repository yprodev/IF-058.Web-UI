angular.module('app')
	.controller('addStudentCtrl', ['$scope', 'addStudentSrvc' function ($scope, addStudentSrvc) {

		$scope.addStudent = function (studentRecordData) {
			

			$scope.studentRecordData = {
				username: 'peter',
				password: ,
				password_confirm: ,
				email: ,
				student_fname: ,
				student_name: ,
				studnet_surname: ,
				plain_password: ,
				gradebook_id: ,
				group_id: ,
				photo: 
			};
			addStudentSrvc.addStudent(studentRecordData);
		}; // End $scope.addStudent

	}]);