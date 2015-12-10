app.directive('students', ['entitiesSrvc', function (entitiesSrvc){


	function link ($scope, $element, $attrs) {

	// Getting records request
		entitiesSrvc.getEntByEnt($scope.thisEntity, $scope.thisEntParent, $scope.idOfParent)
		.then(function (resp) {
			gettingResponseHandler(resp);
		});

		// Getting records request handler
		function gettingResponseHandler (resp) {
			if (resp.response === null) {
				$scope.noData = 'Студенти відсутні в даній групі. Ви можете їх додати власноруч, натиснувши на кнопку "+" в правому верхньому кутку екрана. Якщо Ви потрапили не туди, використайте меню, щоб перейти в групу, яка Вам необхідна.';
			}
			$scope.students = resp.data;
		};

	}//END of the link function


	return {
		template: ['<div>',
									'<add-student></add-student>',
									'<update-student></update-student>',
									'<delete-student></delete-student>',
							 '</div>'].join('\n'),
		link: link
	};
}]);


