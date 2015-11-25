;
app.directive('timeTableButtonDrct', ['$stateParams', function($stateParams) {
  return {
    template: '<button class="btn btn-primary pull-right" '
              +'ui-sref="admin.timeTable({id:subject_id})" '
              +'ng-click="">Розклад</button>',
    link: function (scope, element, attrs) {
      scope.subject_id = $stateParams.id;
    }
  };
}]);
