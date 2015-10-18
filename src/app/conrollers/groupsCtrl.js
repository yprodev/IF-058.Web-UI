app.controller('groupsCtrl', ['$scope', 'groupsSrvc', function($scope, groupsSrvc) {

		groupsSrvc.getGroups().then(function(httpData) {
          	$scope.groups = httpData;
        });

		// groupsSrvc.getGroup(5).then(function(httpData) {
  //         	$scope.group = httpData;
  //       });

		// var new_group = {
		// 	group_name:"ІВТ-97",
		// 	speciality_id:1,
		// 	faculty_id:1
		// }


        // groupsSrvc.setGroup(new_group).then(function(httpData) {
        //   	$scope.change = httpData;
        // });
        //groupsSrvc.createGroup(new_group).then(function(httpData) {
        //   	$scope.add = httpData;
        // });
        $scope.delGroupAction = function(id) {
        	groupsSrvc.delGroup(id).then(function(httpData) {
          		$scope.del = httpData;
        	});
        	for (row in $scope.groups) {
        		if ($scope.groups[row].group_id == id) {
        			$scope.groups.splice(row,1);
        		};
        	}
        	
        }
}]);

app.controller('addGroupsCtrl', ['$scope', 'groupsSrvc', '$location', function($scope, groupsSrvc, $location) {
	
	groupsSrvc.getFacultys().then(function(httpData) {
       	$scope.facultys = httpData;
    });	

	$scope.addGroupAction = function() {
		var new_group = {};
		new_group.group_name = $scope.groupName;
		new_group.speciality_id = 1;
		new_group.faculty_id = +$scope.facultyId;
		console.log(new_group);
		groupsSrvc.createGroup(new_group).then(function(httpData) {
          	$scope.add = httpData;
          	$location.path("/groups");
        });
	}
}]);

app.controller('editGroupsCtrl', ['$scope', 'groupsSrvc', '$routeParams', '$location',
	function($scope, groupsSrvc, $routeParams, $location) {
		var id = $routeParams.group_id;

		groupsSrvc.getGroup(id).then(function(httpData) {
	        $scope.groupName = httpData[0].group_name;
	    	$scope.facultyId = httpData[0].faculty_id;
	    });

		groupsSrvc.getFacultys().then(function(httpData) {
	       	$scope.facultys = httpData;
	    });

		$scope.editGroupAction = function() {
			var new_group = {};
			new_group.group_name = $scope.groupName;
			new_group.speciality_id = 1;
			new_group.faculty_id = +$scope.facultyId;
			console.log(new_group);
			groupsSrvc.setGroup(id, new_group).then(function(httpData) {
	          	$scope.add = httpData;
	          	$location.path("/groups");
	        });
		}
}]);