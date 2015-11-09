
app.directive('entitiesDrct', ['entitiesSrvc', function(entitiesSrvc){
  return {
    link: function (scope, element, attrs) {
              scope.thisEntity = attrs.entitiesDrct;
              scope.getEntityList();
          },
    restrict: "A"
  };
}])


