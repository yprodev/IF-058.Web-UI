app.controller('updateStudentCtrl', ['$scope', '$stateParams', 'entityObj', 'entitiesSrvc', '$timeout', function ($scope, $stateParams, entityObj, entitiesSrvc, $timeout) {

/*_________________________________________________
/*
/* EDITING RECORDS BY GROUP ID
/*_________________________________________________
*/


	function getUserEntityByStudId (id) {
		var userEntity = 'AdminUser';

		// Gets data form AdminUser
		entitiesSrvc.getUsersById(userEntity, id)
			.then(function (response) {
				if (response.length === 1) {
					$scope.params = response[0];
				}
			});
	}


	function createComplexObj(obj) {
		// Seperate scope variable
		$scope.editingObj = {};

		getUserEntityByStudId(obj.user_id);
		$scope.$watch('params', function (newValue, oldValue) {
			if ($scope.params) {

				$scope.editingObj = {
					// User DATA
					username: $scope.params.username,
					email: $scope.params.email,
					password: $scope.params.password,
					password_confirm: $scope.params.password,
					// Student DATA
					gradebook_id: obj.gradebook_id,
					student_surname: obj.student_surname,
					student_name: obj.student_name,
					student_fname: obj.student_fname,
					group_id: obj.group_id,
					plain_password: obj.plain_password,
					photo: obj.photo
				};

			} //END if

			// We need to do this because of the link data type
			$scope.editingStudent = {
				// User DATA
				username: $scope.editingObj.username,
				email: $scope.editingObj.email,
				password: '',
				password_confirm: '',
				// Student DATA
				gradebook_id: $scope.editingObj.gradebook_id,
				student_surname: $scope.editingObj.student_surname,
				student_name: $scope.editingObj.student_name,
				student_fname: $scope.editingObj.student_fname,
				group_id: $scope.editingObj.group_id,
				plain_password: $scope.editingObj.plain_password,
				photo: $scope.editingObj.photo
			};

		});
	}// END createEditingStorage

	// Show edit panel for a student
	$scope.editStudent = null;

	$scope.showEditingForm = function (stud) {

		if ($scope.editStudent != stud) {
			$scope.editStudent = stud;
			$scope.actclass = 'active-student';
			$scope.currId = stud.user_id;
			createComplexObj(stud);
		} else {
			$scope.editStudent = null;
		}
	};

	function editRecordPhoto (objData) {
		if (objData.photo && ((objData.photo !== '') || (objData.photo === undefined))) {
			objData.photo = objData.photo;
		} else {
			objData.photo = '';
		}
	}

	function isPassword (obj) {

		if ((obj.password === '') && (obj.password_confirm === '')) {
			obj.password = $scope.editingObj.password;
			obj.password_confirm = $scope.editingObj.password_confirm;
			passConfirmed = true;
		} else if ((obj.password_confirm !== '') && (obj.password !== obj.password_confirm)) {
			passConfirmed = false;
		} else {
			obj.plain_password = obj.password_confirm;
			passConfirmed = true;
		}
		return passConfirmed;
	}


	// Editing and updating student record functionality
	$scope.editStud = function () {
		var passConfirmed;
		editRecordPhoto($scope.editingStudent);

		// var eStud = $scope.editingStudent;

		var editedDataStud = {
			// User DATA
			username: $scope.editingStudent.username,
			email: $scope.editingStudent.email,
			password: $scope.editingStudent.password,
			password_confirm: $scope.editingStudent.password_confirm,
			// Student DATA
			gradebook_id: $scope.editingStudent.gradebook_id,
			student_surname: $scope.editingStudent.student_surname,
			student_name: $scope.editingStudent.student_name,
			student_fname: $scope.editingStudent.student_fname,
			group_id: $scope.editingStudent.group_id,
			plain_password: $scope.editingStudent.plain_password,
			photo: $scope.editingStudent.photo
		};

		passConfirmed = isPassword(editedDataStud);

		var jsonDataEdited = JSON.stringify(editedDataStud); // Create json data type data
		var currId = $scope.currId;

		if (passConfirmed) {
			entitiesSrvc.updateEntity($scope.thisEntity, currId, jsonDataEdited)
				.then(function (response) {
					if(response.data.response === 'ok') {
						for (var i = 0; i < $scope.students.length; i++) {
							if ($scope.students[i].user_id === currId) {
								for (prop in editedDataStud) {
									$scope.students[i][prop] = editedDataStud[prop];
								}
							}
						} // END for loop
					$scope.editStudent = null; // Close editing form
					} else {
						throw new Error ('Try to solve this or please, contact with your back-end administrator ' + response.data.response);
					}
				}); // END .then
		} else {
			console.log('there is no pass');
		}
	};









/*_________________________________________________
/*
/* DELETING STUDENT RECORDS
/*_________________________________________________
*/

	// // Getting confirmation before deleting a student
	// $scope.confirmDelete = function (studentId) {
	// 	angular.element(document.querySelector('#deleteModalWin')).modal();
	// 	$scope.confirmedStud = studentId;
	// };

	// // Deleting student record
	// $scope.deleteStudent = function () {
	// 	var currentId = $scope.confirmedStud;

	// 	entitiesSrvc.deleteEntity(thisEntity, $scope.confirmedStud)
	// 		.then(function (response) {
	// 			delRespHandler(response, thisEntity);
	// 		}); //END .then
	// }; // END deleteStudent


	// function delRespHandler (resp, entity) {
	// 	switch (resp.data.response) {
	// 		case 'ok':
	// 			var index = $scope.students.indexOf(currentStud);
	// 			$scope.students.splice(index, 1);
	// 			if ($scope.students.length === 0) {
	// 				delete $scope.students;
	// 			}
	// 			break;
	// 		case 'error 23000':
	// 			console.log('Виникла помилка: ' + response.data.response + '. Неможливо видалити запис через наявні залежні об\'єкти.');
	// 			break;
	// 		default:
	// 			console.log("Виникла помилка: " + response.data.response);
	// 	}
	// }

	}]);