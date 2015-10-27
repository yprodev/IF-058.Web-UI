angular.module('app')
	.factory('addStudentSrvc', ['$http', function ($http) {
		var URL_BASE = 'http://dtapi.local/'
			, service = {};

		service.addStudent = function (studentRecordData) {

			console.log(studentRecordData);

			var studData = angular.toJson(studentRecordData);

			return $http({
				//Creating object with parameters
				method: 'POST',
				url: URL_BASE + 'student/insertData'
			}, studData)
				.then(addSuccess, addError);

			// Success Function for Promise
			function addSuccess (response) {
				condole.log('Everything is OK. Student record is added.');
				return response.data.response;
			}

			//Error Function for Promise
			function addError (response) {
				console.log('Something goes wrong. Student record was not added.');
				return response.data.response;
			}
		};

		return service;

	}]);