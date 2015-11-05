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

