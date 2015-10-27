angular.module('app')
	.factory('addStudentSrvc', ['$http', function ($http) {
		var URL_BASE = 'http://dtapi.local/'
			, service = {};

		service.addStudent = function (studentRecordData) {

			console.log(studentRecordData);

			var jsonData = JSON.stringify(studentRecordData);

			return $http.post(URL_BASE + 'student/insertData', jsonData)
				.then(addSuccess, addError);

			// Success Function for Promise
			function addSuccess (response) {
				var result = response.data.response;
				console.log('Everything is OK. Student record is added.');
				return result;
			}

			//Error Function for Promise
			function addError (response) {
				var result = response.data.response;
				console.log('Something goes wrong. Student record was not added.');
				return result;
			}
		};

		return service;

	}]);