app.controller('updateStudentCtrl', ['$scope', '$stateParams', 'entityObj', 'entitiesSrvc', '$timeout', function ($scope, $stateParams, entityObj, entitiesSrvc, $timeout) {

/*_________________________________________________
/*
/* EDITING RECORDS BY GROUP ID
/*_________________________________________________
*/










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