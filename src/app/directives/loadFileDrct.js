/**
 * Created by ����� on 05.11.2015.
 */

app.directive('loadfileDrct', function() {
  return {
    //restrict: 'E',
    template: '<input id="fileInput" class="pull-left btn" type="file" name="file" accept="image/*" onchange="angular.element(this).scope().loadFile(this.files)"/>' +
    '<img id="imageAttachment" ng-src="{{imagecontent}}" height="200px">',

    link: function(scope, el, attrs) {
      scope.newEntity = {
        attachment: ''
      }
      scope.$watch('showingAdd', function(newValue, oldValue){
        if (newValue == false){
          console.log(angular.element(document.querySelector('#imageAttachment'))[0].attributes);
          angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";
        }
      })

      /*var openFile = function(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('output');
          output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
      };*/

/*

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
*/

    }

  }
  })

