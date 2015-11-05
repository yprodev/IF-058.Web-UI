/**
 * Created by Серёга on 05.11.2015.
 */

app.directive('loadfileDrct', function() {
  return {
    //restrict: 'E',
    template: '<input class="pull-left" type="file" name="file" accept="image/*" onchange="angular.element(this).scope().loadFile(this.files)"/>' +
    '<img ng-src="{{imagecontent}}" height="200px">',

    link: function(scope, el, attrs) {

      scope.newEntity = {
        attachment: ''
      }

      el.bind('change', function(event){
        var reader = new FileReader();
        var files = event.target.files;
        scope.newEntity = {
          attachment: files
        }
        console.log(files)
        reader.readAsDataURL(el);
        console.log(reader.readAsDataURL(files))
      });

    }

  }
  })



/*
app.directive('exampleDirective1', function() {
  return {
    restrict: 'E',
    template: '<span>sdgsdgfsdhfedshgdfhsd</span>'
    //replace: true
  };
});*/





app.directive('file', function() {
  return {
    require:"ngModel",
    restrict: 'A',
    link: function($scope, el, attrs, ngModel){
      scope.newEntity = {
        attachment: ''
      }
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.newEntity = {
          attachment: file
        }
        ngModel.$setViewValue(file);
        $scope.$apply();
      });
    }
  };
});

