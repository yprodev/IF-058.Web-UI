;
app.directive('entitiesDrct', function(entitiesSrvc){
  return {
    link: function (scope, element, attrs) {
              scope.thisEntity = attrs.entitiesDrct;
              // console.log(scope.thisEntity);
              scope.getEntetyList();
          },
    restrict: "A"
    // template: ""
  };
});
app.directive('file', function(){
  return {
    /*scope: {
      file: '='
    },*/
    link: function(scope, el, attrs){
      //scope.showAddForm()
      scope.newEntity = {};
      scope.newEntity.attachment = '';
      /*el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file ? file.name : '';
        scope.$apply();
      });*/
    }
  };
});
