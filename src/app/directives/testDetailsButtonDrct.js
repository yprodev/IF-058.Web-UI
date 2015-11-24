;
app.directive('testDetailsButtonDrct', ['$stateParams', function($stateParams) {
  return {
    template: '<button class="btn btn-primary pull-right" ui-sref="admin.testDetails({id:test_id})" ng-click="">Параметри тесту</button>',
    link: function (scope, element, attrs) {
      console.log($stateParams.id);
      scope.test_id = $stateParams.id;
    }
  };
}]);
