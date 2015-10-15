var app = angular.module('app', []);

// app.controller('mainCtrl', ['$scope', 'mainFctr', function($scope, mainFctr) {
// 		mainFctr.group2().then(function(httpData) {
//          	$scope.test = httpData.faculty;
//          	console.log($scope.test);
//         });

//         mainFctr.group1(function(httpData) {
//          	$scope.test2 = httpData;
         	
//         });

// }]);
// app.factory('mainFctr', ['$http',  function($http){
// 	var test = {};
// 	var promise;
	
// 	test.faculty = function(callBack) {
// 		$http.get('http://dtapi.local/faculty/getRecords')
// 			.then(function(response) {
// 					var result = {};
// 					data = response.data; //тут херачим якусь обробку
// 					result.faculty = data;
// 					//callBack(data);
// 					return result;
// 				}, function() {console.error('Error')})
// 			.then(function(data) {
// 				callBack(data.faculty);
// 			}, function() {console.error('Error')});
// 	},
// 	test.groups = function(callBack) {
// 		var data1, data2;
// 		$http.get('http://dtapi.local/group/getRecords').success(function(data) {
// 			data1 = data;
// 				calback(data1, data2);
// 		});
// 		$http.get('http://dtapi.local/faculty/getRecords').success(function(faculty) {
// 			data2 = faculty;
// 				calback(data1, data2);	
// 			});
			
// 		function calback(data, faculty) {
// 			if(data2 !== undefined || data1 !== undefined) {
// 				return;
// 			}
// 			var facultyArray = [];
// 				for (row in faculty) {
// 					facultyArray[+faculty[row].faculty_id] = faculty[row].faculty_name;
// 				}
// 				for (row in data_group) {
// 				 	var id = parseInt(data_group[row].faculty_id);
// 				 	data_group[row].faculty_name = facultyArray[id];
// 				};
// 				callBack(data_group);
// 		}	
			
// 	},
// 	test.group1 = function(callBack) {
// 		Promise.all([
// 			$http.get('http://dtapi.local/group/getRecords'),
// 			$http.get('http://dtapi.local/faculty/getRecords')
// 		])
// 		.then(function(responce) {
// 				var facultyArray = [];
// 				var data_group = responce[0].data;
// 				var faculty = responce[1].data;
// 				for (row in faculty) {
// 					facultyArray[+faculty[row].faculty_id] = faculty[row].faculty_name;
// 				}
// 				for (row in data_group) {
// 				 	var id = parseInt(data_group[row].faculty_id);
// 				 	data_group[row].faculty_name = facultyArray[id];
// 				};
// 			callBack(data_group);
// 			return null;
// 		}, function() {console.error('Error')})

// 	},
// 	test.group2 = function(callBack) {
// 		var all_responce = {};

// 		return $http.get('http://dtapi.local/group/getRecords')
// 		.then(function(responce) {
// 			all_responce.groups = responce.data;
// 			//callBack(data);
// 			return $http.get('http://dtapi.local/faculty/getRecords');
// 		}, null)
// 		.then(function(responce) {
// 			all_responce.faculty = responce.data;
// 			return all_responce;
// 		}, null);
// 	}

	
// 	return test;

// }])
