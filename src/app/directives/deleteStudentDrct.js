app.directive('deleteStudent', ['entitiesSrvc', function (entitiesSrvc){


	function link (scope, element, attrs) {

		/*_________________________________________________
		/*
		/* DELETING STUDENT RECORDS
		/*_________________________________________________
		*/



		// Getting confirmation before deleting a student
		scope.confirmDelete = function (student) {
			angular.element(document.querySelector('#deleteModalWin')).modal();

			scope.curId = student.user_id; // id present

		};


		// Deleting student record
		scope.deleteStudent = function () {

			var currentId = scope.curId; //undefined

			entitiesSrvc.deleteEntity(scope.thisEntity, currentId)
				.then(function (response) {
					delRespHandler(response);
				}); //END .then
		}; // END deleteStudent


		function delRespHandler (resp) {
			switch (resp.data.response) {
				case 'ok':
					var index = scope.students.indexOf(scope.curId);
					scope.students.splice(index, 1);
					if (scope.students.length === 0) {
						delete scope.students;
					}
					break;
				case 'error 23000':

					console.log('Виникла помилка: ' + response.data.response + '. Неможливо видалити запис через наявні залежні об\'єкти.');

					break;
				default:

					console.log("Виникла помилка: " + response.data.response);

			}
		}

	}//END of the link function

	return {
		// templateUrl: 'app/views/_addStudentTemplate.html',
		link: link
	};


}]);


