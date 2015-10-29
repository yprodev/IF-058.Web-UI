;
app.directive('entitiesDrct', function(entitiesSrvc){
  return {
    link: function (scope, element, attrs) {
              scope.thisEntity = attrs.entitiesDrct;
              scope.getEntetyList();
          },
    restrict: "A",
    // template: ""
  };
});
