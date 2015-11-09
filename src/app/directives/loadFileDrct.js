/*
app.directive('loadfileDrct', function() {
  return {
    template: '<input id="upload"  class="button" type="file" name="file" accept="image/!*" onchange="angular.element(this).scope().loadFile(this.files)"/> ' +
    '<img id="imageAttachment" ng-src="{{imagecontent}}" height="200px">',

    link: function(scope, el, attrs) {
      scope.newEntity = {
        attachment:''
      }
      scope.$watch('showingAdd', function (newValue, oldValue) {
        if (newValue == false) {
          console.log(scope.newEntity.attachment)
          angular.element(document.querySelector('#imagecontent'))[0].attributes["src"].value = "";
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
})*/

app.directive('loadfileDrct', function() {
  return {
    restrict: 'E',
    template: '<input type="file" class="button" loadfile-drct="customer.file" onchange="angular.element(this).scope().loadFile(this.files)"/>' +
    '<img id="imageAttachment" ng-src="{{newEntity.attachment}}" alt="" height="100px"/>',
    link:function(scope, element, attrs, ctrl){
      scope.newEntity = {
        attachment: ''
      }
      scope.loadFile = function(files){
        scope.files = files;
        var reader = new FileReader();
        reader.onload = function(e) {
          scope.$watch('showingAdd', function (newValue, oldValue) {
            if (newValue == true) {
              scope.newEntity.attachment = e.target.result
            }
          })
          scope.$watch('showingAdd', function (newValue, oldValue) {
            if (newValue == false) {
              scope.newEntity = {
                attachment: ''
              }
              console.log(scope.newEntity.attachment)
              angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";
            }
          })
        };
        reader.readAsDataURL(files[0]);
      }
    }}
})



app.directive('fileModel', function() {
  return {
    restrict: 'E',
    template: '<input type="file" class="button change navbar-btn" onchange="angular.element(this).scope().loadEditedFile(this.files)"/>',
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
})

