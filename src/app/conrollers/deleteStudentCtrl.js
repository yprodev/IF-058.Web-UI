app.controller('deleteStudentCtrl', ['$scope', '$stateParams', 'entityObj', 'entitiesSrvc', '$timeout', function ($scope, $stateParams, entityObj, entitiesSrvc, $timeout) {


/*_________________________________________________
/*
/* DELETING STUDENT RECORDS
/*_________________________________________________
*/



	// Getting confirmation before deleting a student
	$scope.confirmDelete = function (student) {
		angular.element(document.querySelector('#deleteModalWin')).modal();


		$scope.curId = student.user_id; // id present

	};


	// Deleting student record
	$scope.deleteStudent = function () {

		var currentId = $scope.curId; //undefined

		entitiesSrvc.deleteEntity($scope.thisEntity, $scope.confirmedStud)
			.then(function (response) {
				console.log('everything is ok');
				// delRespHandler(response);
			}); //END .then
	}; // END deleteStudent


	function delRespHandler (resp) {
		switch (resp.data.response) {
			case 'ok':
				console.log('current student nema? ', currentStud);
				var index = $scope.students.indexOf(currentStud);
				console.log('index of the student? ', index);
				$scope.students.splice(index, 1);
				if ($scope.students.length === 0) {
					delete $scope.students;
				}
				break;
			case 'error 23000':
				console.log('Виникла помилка: ' + response.data.response + '. Неможливо видалити запис через наявні залежні об\'єкти.');
				break;
			default:
				console.log("Виникла помилка: " + response.data.response);
		}
	}

	}]);