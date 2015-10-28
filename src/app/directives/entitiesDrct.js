;
app.directive('entitiesDrct', function(entitiesSrvc){
  return {
    link: function (scope, element, attrs) {

              console.log("drct work", attrs.entitiesDrct);
              scope.thisEntity = attrs.entitiesDrct;
          },
    restrict: "A",
    template: ""
  };
});
