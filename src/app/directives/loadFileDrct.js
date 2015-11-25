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
    template: '<label class="btn btn-default btn-sm navbar-btn" for="photo">' +
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
            scope.newEntity.attachment = e.target.result;
          });
          scope.$watch('showingAdd', function (newValue, oldValue) {
            if (newValue == false) {
              if (scope.newEntity.attachment){
                angular.element(document.querySelector('#imageAttachment'))[0].attributes["src"].value = "";  
              } 
            }
          })
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
    }
  }
})


app.directive('editfileDrct', function () {
  function fileCutName(str, slength) {
    if (str.length >= 15) {
      return '... ' + str.slice(slength);
    }
    return str;
  }
  return {
    restrict: 'E',
    template: '<label class="btn btn-default btn-sm navbar-btn" for="photo1">' +
    '<span class="glyphicon glyphicon-cloud-upload"></span> <span class="file-name">Оберіть картинку</span></label>' +
    '<input type="file" id="photo1" class="form-control inputfile" />',
    link: function (scope, element, attrs) {
      element.bind('change', function (changeEvent) {
        var fileNam = changeEvent.target.files[0].name;
        scope.cutNam = fileCutName(fileNam, -15);
        var el = element.parent().find('.file-name')
        el.text(scope.cutNam);
        var reader = new FileReader();
        reader.onload = function (e) {
          scope.$apply(function () {
            scope.editedEntity.new_attachment = e.target.result
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
      scope.closePicture = function () {
        scope.editedEntity.new_attachment = ''
        scope.entity.attachment = ''
      }
    }
  }
})
/*app.directive('attachmentPopover', function () {
return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
          console.log('kokoko')
          console.log(el)
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
  })*/



