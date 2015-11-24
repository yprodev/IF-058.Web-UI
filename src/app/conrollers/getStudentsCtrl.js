app.controller('getStudentsCtrl', ['$scope', '$stateParams', 'entityObj', 'entitiesSrvc', '$interval', function ($scope, $stateParams, entityObj, entitiesSrvc, $interval) {



/*_________________________________________________
/*
/* GETTING RECORDS BY GROUP ID
/*_________________________________________________
*/
	// Declares Entity parameters for getting records request
	var thisEntity = 'student'
		, thisEntParent = entityObj[thisEntity].by.parentEntity
		, idOfParent = $stateParams.id;

	// Getting records request
	entitiesSrvc.getEntitiesByEntity(thisEntity, thisEntParent, idOfParent)
	.then(function (resp) {
		gettingResponseHandler (resp);
	});

	// Getting records request handler
	function gettingResponseHandler (resp) {
		$scope.students = resp.data;
		$scope.noData = "Немає записів";
	};




/*_________________________________________________
/*
/* ADDING RECORDS BY GROUP ID
/*_________________________________________________
*/

	//function shows and hides the form for creating new entity
	$scope.showAddForm = function () {
		if (!$scope.showingAdd) {
			$scope.showingAdd = true;
		} else {
			$scope.showingAdd = false;
			// $scope.resetEntity();
		};
	};
/*
	$scope.resetEntity = function () {
		$scope.newEntity = {};
	};

*/


	$scope.addNewStudent = function (recordData) {

		function addIdOfParent (objData) {
			if(!objData.group_id) {
				objData.group_id = idOfParent;
			}
		}

		function addRecordPhoto (objData) {
			if(!objData.photo || objData.photo.src === undefined) {
				objData.photo = '';
			} else {
				objData.photo = objData.photo.src;
			}
		}

		function addPlainPass (objData) {
			if (!objData.plain_password) {
				objData.plain_password = objData.password_confirm;
			}
		}

		addIdOfParent(recordData);
		addRecordPhoto(recordData);
		addPlainPass(recordData);

		// Creating middle object

		recordData = {
			// User values
			username: recordData.username,
			password: recordData.password,
			password_confirm: recordData.password_confirm,
			email: recordData.email,
			// Person values
			gradebook_id: recordData.gradebook_id,
			student_surname: recordData.student_surname,
			student_name: recordData.student_name,
			student_fname: recordData.student_fname,
			group_id: recordData.group_id,
			plain_password: recordData.plain_password,
			photo: recordData.photo
		};

		var jsonData = JSON.stringify(recordData);
		var newRecord = jsonData;

		// Gives data to a service
		entitiesSrvc.createEntity(thisEntity, newRecord)
			.then(function (response) {
				console.log('adding student ', response);
				addRespHandler(response, newRecord);
			});

		//handing success and error response
		function addRespHandler (resp, newRecord) {
			if (resp.data.response === 'ok' && resp.status === 200) {
				$scope.showingAdd = false;
				okAddResponseHandler(resp, newRecord);
				// $scope.resetEntity();
			} else if (resp.data.response == 'orror 2300') {
				console.log('Виникла наступна помилка: ' + resp.data.response + '. Такі дані вже наявні у базі даних.');
			} else if (resp.data.response === 'Failed to validate array') {
				console.log('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, введіть унікальні дані. Якщо дана помилка виникне вдруге, будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
			} else {
				console.log('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
			}
		}// END addRespHandler

		function okAddResponseHandler (resp, newRecord) {
			recordData.user_id = resp.data.id;
			$scope.students.push(recordData);
		};

	}; // End $scope.addStudent














/*_________________________________________________
/*
/* EDITING RECORDS BY GROUP ID
/*_________________________________________________
*/


	// $scope.editingStudent = null;

	// //function opens a form for editing
	// scope.showEditForm = function (entity) {
	// 	if (scope.editingEntity != entity) {
	// 		scope.editingEntity = entity;
	// 		createEditedEntityStorage(entity);
	// 	} else {
	// 		scope.editingEntity = null;
	// 	};
	// };




////MINEMINEMINE

	// Show edit panel for a student
	$scope.showEditingForm = function (stud) {
		// if stud Object is not equal to null
		if (stud !== null) {
			$scope.currId = stud.user_id;
		}
			$scope.editingStudent = stud;
	};

	// Editing and updating student record functionality
	$scope.editStud = function () {

		// Put student data we need to update
		var editStudData = {
			user_id: $scope.editingStudent.user_id,
			// Students Values
			gradebook_id: $scope.editingStudent.gradebook_id,
			student_surname: $scope.editingStudent.student_surname,
			student_name: $scope.editingStudent.student_name,
			student_fname: $scope.editingStudent.student_fname,
			group_id: $scope.editingStudent.group_id,
			// plain_password: $scope.editingStudent.plain_password
			photo: ""
		};

		var eStud = $scope.editingStudent;

		// Need local variable for using in service
		// Then we will need to null the scope's same variable
		var currId = $scope.currId;

		entitiesSrvc.updateEntity($scope.thisEntity, currId, editStudData)
			.then(function (response) {
				if(response.data.response == 'ok') {
					for (var i = 1; i < $scope.students.list.length; i++) {
						if ($scope.students.list[i].user_id != currId) {
							// Need to say about error if it needed
							throw new Error ($scope.students.list[i] + ' is different from ' + currId + ' id.. Try to solve this or, please, contact with your back-end administrator.');
						}
					} // END for loop
				} else {
					throw new Error ('Server response was not "OK" - ' + response.data.response);
				}
			}); // END .then

			// 'Nulls' all scope variables
			$scope.editingStudent = null;
			$scope.currId = null;
	};



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