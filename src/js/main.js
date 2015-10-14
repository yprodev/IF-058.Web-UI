var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', 'mainFctr', function($scope, mainFctr) {
		mainFctr.group2(function(httpData) {
         	$scope.test = httpData;
         	console.log($scope.test);
        });
}]);
app.factory('mainFctr', ['$http',  function($http){
	var test = {};
	
	test.faculty = function(callBack) {
		$http.get('http://dtapi.local/faculty/getRecords')
			.then(function(response) {
					var result = {};
					data = response.data; //тут херачим якусь обробку
					result.faculty = data;
					//callBack(data);
					return result;
				}, function() {console.error('Error')})
			.then(function(data) {
				callBack(data.faculty);
			}, function() {console.error('Error')});
	},
	test.groups = function(callBack) {
		$http.get('http://dtapi.local/group/getRecords').success(function(data) {
			data_group = data;
			$http.get('http://dtapi.local/faculty/getRecords').success(function(faculty) {
				var facultyArray = [];
				for (row in faculty) {
					facultyArray[+faculty[row].faculty_id] = faculty[row].faculty_name;
				}
				for (row in data_group) {
				 	var id = parseInt(data_group[row].faculty_id);
				 	data_group[row].faculty_name = facultyArray[id];
				};
				callBack(data_group);
			});
		});
	},
	test.group1 = function(callBack) {
		Promise.all([
			$http.get('http://dtapi.local/group/getRecords'),
			$http.get('http://dtapi.local/faculty/getRecords')
		])
		.then(function(responce) {

			//console.log(callBack());
			//console.log(responce[0].data);
			var data = responce[1].data;
			callBack(data);
		}, function() {console.error('Error')})

	},
	test.group2 = function(callBack) {
		var all_responce = {};

		$http.get('http://dtapi.local/group/getRecords')
		.then(function(responce) {
			all_responce.groups = responce.data;
			//callBack(data);
			return $http.get('http://dtapi.local/faculty/getRecords');
		}, null)
		.then(function(responce) {
			all_responce.faculty = responce.data;
			console.log(all_responce);
		}, null)
		.then(function() {
			callBack(all_responce);
		}, null)


	}

	
	return test;

}])