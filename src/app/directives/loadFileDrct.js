

app.directive('loadfileDrct', function() {
  return {
    template: '<input id="fileInput" class="btn btn-default navbar-btn" type="file" name="file" accept="image/*" onchange="angular.element(this).scope().loadFile(this.files)"/>' +
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
      scope.$watch(scope.resetEntity(), function (newValue, oldValue) {
        console.log('asdasdas')
        if (newValue == false) {
          console.log(angular.element(document.querySelector('#imageAttachment'))[0].attributes);
          angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";
        }
      })
    }}
})

app.directive('fileModel',['$parse', function($parse) {
  return {
    restrict: 'A',
    link:function(scope, element, attrs){
      scope.loadEditedFile = function(files){
        scope.files = files;
        console.log(files)
        var reader = new FileReader();
        reader.onload = function(e) {
          scope.editedEntity.new_attachment = e.target.result
          console.log(e.target)
        };
        reader.readAsDataURL(files[0]);
      }
    }}
}])

