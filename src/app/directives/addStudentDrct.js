app.directive('addStudent', ['entitiesSrvc', function (entitiesSrvc){


	function link (scope, element, attrs) {

		/*_________________________________________________
		/*
		/* ADDING RECORDS BY GROUP ID
		/*_________________________________________________
		*/

		//function shows and hides the form for creating new entity
		scope.showAddForm = function () {
			if (!scope.showingAdd) {
				scope.showingAdd = true;
			} else {
				scope.showingAdd = false;
			};
		};


		scope.addNewStudent = function (recordData) {

			function addIdOfParent (objData) {
				if(!objData.group_id) {
					objData.group_id = scope.idOfParent;
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
			entitiesSrvc.createEntity(scope.thisEntity, newRecord)
				.then(function (response) {
					addRespHandler(response, newRecord);
				});

			//handing success and error response
			function addRespHandler (resp, newRecord) {
				if (resp.data.response === 'ok' && resp.status === 200) {
					scope.showingAdd = false;
					okAddResponseHandler(resp, newRecord);
				} else if (resp.data.response == 'error 23000') {
					throw new Error('Виникла наступна помилка: ' + resp.data.response + '. Такі дані вже наявні у базі даних.');
				} else if (resp.data.response === 'Failed to validate array') {
					throw new Error('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, введіть унікальні дані. Якщо дана помилка виникне вдруге, будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
				} else {
					throw new Error('Виникла наступна помилка: ' + resp.data.response + '. Будь-ласка, зверніться до системного адміністратора, відправивши листа за поштовою адресою: somewhere@nowhere.net');
				}
			}// END addRespHandler

			function okAddResponseHandler (resp, newRecord) {
				recordData.user_id = resp.data.id;
				scope.students.push(recordData);
				scope.newStudent = {};
			};

		}; // End $scope.addStudent

	}//END of the link function

	return {
		templateUrl: 'app/views/_addStudentTemplate.html',
		link: link
	};


}]);


