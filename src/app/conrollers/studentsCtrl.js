app.controller('studentsCtrl', ['$scope', '$stateParams', 'entityObj', 'entitiesSrvc', '$timeout', function ($scope, $stateParams, entityObj, entitiesSrvc, $timeout) {



/*_________________________________________________
/*
/* GETTING RECORDS BY GROUP ID
/*_________________________________________________
*/
	// Declares Entity parameters for getting records request
	$scope.thisEntity = 'student';
	$scope.thisEntParent = entityObj[$scope.thisEntity].by.parentEntity;
	$scope.idOfParent = $stateParams.id;


	$scope.imgStr = 'img/def-stud.jpg';

	// Getting records request

	entitiesSrvc.getEntByEnt($scope.thisEntity, $scope.thisEntParent, $scope.idOfParent)
	.then(function (resp) {
		gettingResponseHandler (resp);
	});

	// Getting records request handler

	function gettingResponseHandler (resp) {
		if (resp.response === null) {
			$scope.noData = 'Студенти відсутні в даній групі. Ви можете їх додати власноруч, натиснувши на кнопку "+" в правому верхньому кутку екрана. Якщо Ви потрапили не туди, використайте меню, щоб перейти в групу, яка Вам необхідна.';
		}
		$scope.students = resp.data;
	};




/*_________________________________________________
/*
/* ADDING RECORDS BY GROUP ID
/*_________________________________________________
*/

	//function shows and hides the form for creating new entity

	// $scope.showAddForm = function () {
	// 	if (!$scope.showingAdd) {
	// 		$scope.showingAdd = true;
	// 	} else {
	// 		$scope.showingAdd = false;
	// 		// $scope.resetEntity();
	// 	};
	// };


	// $scope.addNewStudent = function (recordData) {

	// 	function addIdOfParent (objData) {
	// 		if(!objData.group_id) {
	// 			objData.group_id = idOfParent;
	// 		}
	// 	}

	// 	function addRecordPhoto (objData) {
	// 		if(!objData.photo || objData.photo.src === undefined) {
	// 			objData.photo = '';
	// 		} else {
	// 			objData.photo = objData.photo.src;
	// 		}
	// 	}

	// 	function addPlainPass (objData) {
	// 		if (!objData.plain_password) {
	// 			objData.plain_password = objData.password_confirm;
	// 		}
	// 	}

	// 	addIdOfParent(recordData);
	// 	addRecordPhoto(recordData);
	// 	addPlainPass(recordData);

	// 	// Creating middle object

	// 	recordData = {
	// 		// User values
	// 		username: recordData.username,
	// 		password: recordData.password,
	// 		password_confirm: recordData.password_confirm,
	// 		email: recordData.email,
	// 		// Person values
	// 		gradebook_id: recordData.gradebook_id,
	// 		student_surname: recordData.student_surname,
	// 		student_name: recordData.student_name,
	// 		student_fname: recordData.student_fname,
	// 		group_id: recordData.group_id,
	// 		plain_password: recordData.plain_password,
	// 		photo: recordData.photo
	// 	};

	// 	var jsonData = JSON.stringify(recordData);
	// 	var newRecord = jsonData;

	// 	// Gives data to a service
	// 	entitiesSrvc.createEntity(thisEntity, newRecord)
	// 		.then(function (response) {
	// 			addRespHandler(response, newRecord);
	// 		});

	// 	//handing success and error response
	// 	function addRespHandler (resp, newRecord) {
	// 		if (resp.data.response === 'ok' && resp.status === 200) {
	// 			$scope.showingAdd = false;
	// 			okAddResponseHandler(resp, newRecord);
	// 			// $scope.resetEntity();
	// 		} else if (resp.data.response == 'orror 2300') {
	// 			console.log('Виникла наступна помилка: ' + resp.data.response + '. Такі дані вже наявні у базі даних.');
	// 		} else if (resp.data.response === 'Failed to validate array') {
	// 			console.log('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, введіть унікальні дані. Якщо дана помилка виникне вдруге, будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
	// 		} else {
	// 			console.log('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
	// 		}
	// 	}// END addRespHandler

	// 	function okAddResponseHandler (resp, newRecord) {
	// 		recordData.user_id = resp.data.id;
	// 		$scope.students.push(recordData);
	// 		$scope.newStudent = {};
	// 	};

	// }; // End $scope.addStudent














/*_________________________________________________
/*
/* EDITING RECORDS BY GROUP ID
/*_________________________________________________
*/


	// function getUserEntityByStudId (id) {
	// 	var userEntity = 'AdminUser';

	// 	// Gets data form AdminUser
	// 	entitiesSrvc.getUsersById(userEntity, id)
	// 		.then(function (response) {
	// 			if (response.length === 1) {
	// 				$scope.params = response[0];
	// 			}
	// 		});
	// }

	// function createComplexObj(obj) {

	// 	// $scope.editingObj = {};
	// 	getUserEntityByStudId(obj.user_id);
	// 	$scope.$watch('params', function (newValue, oldValue) {
	// 		if ($scope.params) {

	// 			$scope.editingObj = {
	// 				// User DATA
	// 				username: $scope.params.username,
	// 				email: $scope.params.email,
	// 				password: '',
	// 				password_confirm: '',
	// 				// Student DATA
	// 				gradebook_id: obj.gradebook_id,
	// 				student_surname: obj.student_surname,
	// 				student_name: obj.student_name,
	// 				student_fname: obj.student_fname,
	// 				group_id: obj.group_id,
	// 				plain_password: obj.plain_password,
	// 				photo: obj.photo
	// 			};

	// 		} //END if
	// 	});
	// }// END createEditingStorage

	// // Show edit panel for a student
	// $scope.showEditingForm = function (stud) {

	// 	if (stud !== null) {
	// 		$scope.actclass = 'active-student';
	// 		$scope.currId = stud.user_id;
	// 		createComplexObj(stud);
	// 	}

	// 	// remember here was an object editingObj
	// 	$scope.editingStudent = stud;
	// };



	// function editRecordPhoto (objData) {
	// 	if(!objData.photo || objData.photo.src === undefined) {
	// 		objData.photo = '';
	// 	} else {
	// 		objData.photo = objData.photo.src;
	// 	}
	// }

	// function truePassword (pass, passConf) {
	// 	if (pass !== passConf) {
	// 		passConfirmed = false;
	// 	} else {
	// 		passConfirmed = true;
	// 	}
	// 	return passConfirmed;
	// }


	// $timeout(function () {
	// 	console.log('gdzce fotka student? ', $scope.students);
	// 	console.log('gdzce fotka str? ', $scope.imgStr);
	// 	console.log('gdzce fotka edited? ', $scope.editingStudent.email);
	// 	console.log('gdzce fotka editingObj? ', $scope.editingObj);
	// }, 5000);


	// // Editing and updating student record functionality
	// $scope.editStud = function () {

	// 	var passConfirmed;

	// 	editRecordPhoto($scope.editingStudent);
	// 	passConfirmed = truePassword($scope.editingStudent.password, $scope.editingStudent.password_confirm);

	// 	var eStud = $scope.editingStudent;

	// 	// Creating an object we will pass to the backend
	// 	var editedDataStud = {
	// 		// User values
	// 		username: $scope.editingStudent.username,
	// 		password: $scope.editingStudent.password_confirm,
	// 		password_confirm: $scope.editingStudent.password_confirm,
	// 		email: $scope.editingStudent.email,
	// 		// Person values
	// 		gradebook_id: $scope.editingStudent.gradebook_id,
	// 		student_surname: $scope.editingStudent.student_surname,
	// 		student_name: $scope.editingStudent.student_name,
	// 		student_fname: $scope.editingStudent.student_fname,
	// 		group_id: $scope.editingStudent.group_id,
	// 		plain_password: $scope.editingStudent.plain_password,
	// 		photo: $scope.editingStudent.photo
	// 	};



	// 	// Create json data type data
	// 	var jsonDataEdited = JSON.stringify(editedDataStud);
	// 	var currId = $scope.currId;

	// 	if (passConfirmed) {
	// 		entitiesSrvc.updateEntity(thisEntity, currId, jsonDataEdited)
	// 			.then(function (response) {
	// 				if(response.data.response === 'ok') {
	// 					for (var i = 1; i < $scope.students.length; i++) {
	// 						if ($scope.students[i].user_id !== currId) {
	// 							// Need to say about error if it needed
	// 							throw new Error ($scope.students[i] + ' is different from ' + currId + ' id.. Try to solve this or, please, contact with your back-end administrator.');
	// 						}
	// 					} // END for loop
	// 				} else {
	// 					throw new Error ('Try to solve this or please, contact with your back-end administrator ' + response.data.response);
	// 				}
	// 			}); // END .then
	// 	}
	// };









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