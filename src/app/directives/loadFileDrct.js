

app.directive('loadfileDrct', function() {
  return {
    template: '<input id="fileInput" class="pull-left btn" type="file" name="file" accept="image/*" onchange="angular.element(this).scope().loadFile(this.files)"/>' +
    '<img id="imageAttachment" ng-src="{{imagecontent}}" height="200px">',

    link: function(scope, el, attrs) {
      scope.newEntity = {
        attachment: ''
      }
      scope.$watch('showingAdd', function (newValue, oldValue) {
        if (newValue == false) {
          console.log(angular.element(document.querySelector('#imageAttachment'))[0].attributes);
          angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";
        }
      })
    }}
})


