angular.module('app')
	.controller('addStudentCtrl', ['$scope', 'addStudentSrvc', function ($scope, addStudentSrvc) {

		$scope.addNewStudent = function (recordData) {
			console.log(recordData);

			var studentRecordData = recordData;

			// User Data
			// studentRecordData.username = recordData.username;
			// studentRecordData.password = recordData.password;
			// studentRecordData.password_confirm = recordData.password_confirm;
			// studentRecordData.email = recordData.email;
			// // Student Data
			// studentRecordData.gradebook_id = recordData.gradebook_id;
			// studentRecordData.student_surname = recordData.student_surname;
			// studentRecordData.student_name = recordData.student_name;
			// studentRecordData.student_fname = recordData.student_fname;
			// studentRecordData.group_id = recordData.group_id;
			// studentRecordData.plain_password = recordData.plain_password;
			// studentRecordData.photo = recordData.photo;


			// $scope.studentRecordData = {
			// 	// User Data
			// 	username: recordData.username,
			// 	password: recordData.password,
			// 	password_confirm: recordData.password_confirm,
			// 	email: recordData.email,
			// 	// Student Data
			// 	gradebook_id: recordData.gradebook_id, // "AU-0203044"
			// 	student_surname: recordData.student_surname,
			// 	student_name: recordData.student_name,
			// 	student_fname: recordData.student_fname,
			// 	group_id: recordData.group_id, // '1'
			// 	plain_password: recordData.plain_password,
			// 	photo: "" // '' REMEMBER to add functionality for adding photo
			// };

			// Gives data to a service file
			addStudentSrvc.addStudent(studentRecordData);
		}; // End $scope.addStudent

	}]);