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


	}]);