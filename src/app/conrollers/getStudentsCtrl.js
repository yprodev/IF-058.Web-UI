angular.module('app')
	.controller('getStudentsCtrl', ['$scope', 'entitiesSrvc', function ($scope, entitiesSrvc) {

		$scope.thisEntity = 'student';

		entitiesSrvc.getEntities($scope.thisEntity)
			.then(function (response) {
				$scope.students = response;
				$scope.noData = "There is no entities here.";
			});

		// Show edit panel for a student
		$scope.showEditingForm = function (stud) {
			console.log(stud);
			if (stud !== null) {
				$scope.currId = stud.user_id;
			}
				$scope.editingStudent = stud;
			// $scope.editingStudent = stud.user_id;

		};

		// Editing and updating student record functionality
		// $scope.editStud = function () {

		// 	// Put student data we need to update
		// 	var editStudData = {
		// 		// Students Values
		// 		gradebook_id: $scope.editingStudent.gradebook_id,
		// 		student_surname: $scope.editingStudent.student_surname,
		// 		student_name: $scope.editingStudent.student_name,
		// 		student_fname: $scope.editingStudent.student_fname,
		// 		group_id: $scope.editingStudent.group_id,
		// 		plain_password: $scope.editingStudent.plain_password
		// 	};

		// 	var editingData = $scope.editingStudent;

		// 	editingData.student_fname = $scope.students.student_fname[editingData.user_id];
		// 	editingData.student_name = $scope.students.student_name[editingData.user_id];
		// 	editingData.student_surname = $scope.students.student_surname[editingData.user_id];
		// 	editingData.gradebook_id = $scope.students.student_gradebook[editingData.user_id];
		// 	editingData.plain_password = $scope.students.plain_password[editingData.user_id];
		// 	editingData.group_name = $scope.students.group_name[editingData.group_id];

		// 	var currId = $scope.currId;

		// 	entitiesSrvc.updateEntity($scope.thisEntity, currId, editStudData)
		// 		.then(function (response) {
		// 			if(response.data.response == 'ok') {
		// 				for (var i = 1; i < $scope.students.list.length; i++) {
		// 					if ($scope.students.list[i].user_id == currId) {
		// 						$scope.students.list[i] = editingData;
		// 					}
		// 				} // END for loop
		// 			} // END if statement for status 'OK'
		// 		}); // END .then
		// };



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

	}]);