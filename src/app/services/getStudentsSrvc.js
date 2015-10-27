angular.module('app')
	.factory('getStudentsSrvc', ['$http', function ($http) {
		var URL_BASE = 'http://dtapi.local/'
			, service = {};

		service.getStudents = function () {

			// Returns promise with students records
			return $http.get(URL_BASE + 'student/getRecords')
				.then(fulfield, rejected);

			// Success Function for Promise
			function fulfield (response) {
				return response.data;
			}

			//Error Function for Promise
			function rejected (response) {
				alert("Error" + error.status + " " + error.statusText);
			}
		};

		// Returns all service
		return service;

	}]);