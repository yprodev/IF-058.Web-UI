app.directive('loadfiledesignDrct', function () {
  function fileCutName(str, slength) {
    if (str.length >= 15) {
      return '... ' + str.slice(slength);
    }
    return str;
  }

})

app.directive('loadfileDrct', function () {
  function fileCutName(str, slength) {
    if (str.length >= 15) {
      return '... ' + str.slice(slength);
    }
    return str;
  }
  return {
    restrict: 'E',
    template: '<label class="btn btn-default btn-sm" for="photo">' +
    '<span class="glyphicon glyphicon-cloud-upload"></span> <span class="file-name">Оберіть картинку</span></label>' +
    '<input type="file" id="photo" class="form-control inputfile"/>',
    link: function (scope, element, attrs) {
      scope.newEntity.attachment = '';
        element.bind('change', function (changeEvent) {
        var fileName = changeEvent.target.files[0].name;
        scope.cutName = fileCutName(fileName, -15);
        var el = element.parent().find('.file-name')
        el.text(scope.cutName);
        var reader = new FileReader();
        reader.onload = function (e) {
          scope.$apply(function () {
            scope.newEntity.attachment = e.target.result;
          });
          scope.$watch('showingAdd', function (newValue, oldValue) {
            if (newValue == false) {
              angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";
            }
          })

        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
    }
  }
})


app.directive('fileModel', function () {
  function fileCutName(str, slength) {
    if (str.length >= 15) {
      return '... ' + str.slice(slength);
    }
    return str;
  }
  return {
    restrict: 'E',
    template: '<label class="btn btn-default btn-sm" for="photo">' +
    '<span class="glyphicon glyphicon-cloud-upload"></span> <span class="file-name">Оберіть картинку</span></label>' +
    '<input type="file" id="photo" class="form-control inputfile"/>',
    link: function (scope, element, attrs) {
      element.bind('change', function (changeEvent) {
        var fileName = changeEvent.target.files[0].name;
        scope.cutName = fileCutName(fileName, -15);
        var el = element.parent().find('.file-name')
        el.text(scope.cutName);
        var reader = new FileReader();
        reader.onload = function (e) {
          scope.$apply(function () {
            scope.editedEntity.new_attachment = e.target.result
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
      scope.closePicture = function () {
        console.log('asdasd')
        scope.editedEntity.new_attachment = ''
        scope.entity.attachment = ''
      }
    }
  }
  /*return {
    restrict: 'E',
    template: '<input type="file" class="button change navbar-btn" onchange="angular.element(this).scope().loadEditedFile(this.files)"/>',
    link: function (scope, element, attrs) {
      scope.loadEditedFile = function (files) {
        scope.files = files;
        var reader = new FileReader();
        reader.onload = function (e) {
          scope.$apply(function () {
            scope.editedEntity.new_attachment = e.target.result
          });
        };
        reader.readAsDataURL(files[0]);
      }
      scope.closePicture = function () {
        console.log('asdasd')
        scope.editedEntity.new_attachment = ''
        scope.entity.attachment = ''
      }
    }
  }*/
})

