app.directive('loadfileDrct', [function () {
  return {
    restrict: 'E',
    template: '<label class="btn btn-default btn-sm navbar-btn" for="loadAttachment">' +
    '<span class="glyphicon glyphicon-cloud-upload"></span> <span class="file-name">Оберіть картинку</span></label>' +
    '<input type="file" id="loadAttachment" class="form-control inputfile" data-max-size="2048000"/>',
    link: function (scope, element, attrs) {
      scope.cutName = function (str, slength) {
    if (str.length >= 15) {
      return '... ' + str.slice(slength);
    }
    return str;
  }
  scope.limitfileSize = function (fileInput, maxSize){
        if(fileInput.get(0).files.length){
            var fileSize = fileInput.get(0).files[0].size;
            console.log('fileSize', fileSize)
            console.log('max', maxSize) // in bytes
            if(fileSize>maxSize){
              console.log('hello')
                return false

            }
        }
  }
        element.bind('change', function (changeEvent) {
        var fileName = changeEvent.target.files[0].name;
        var el = element.parent().find('.file-name')
        el.text(scope.cutName(fileName, -15));
        var fileInput = angular.element(document.querySelector("#loadAttachment"));
        var maxSize = fileInput.data('max-size');
        var reader = new FileReader();
        reader.onload = function (e) {
          if (scope.limitfileSize(fileInput, maxSize) != false){
            scope.$apply(function () {
            scope.newEntity.attachment = e.target.result;
          });
          } else {
              /*scope.showInformModal("Розмір файла перевищує"  + maxSize + "байта, оберіть будь ласка файл меньшого розміру" );*/
               alert("Розмір файла перевищує"  + maxSize + "байта, оберіть будь ласка файл меньшого розміру")
          }
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
}])


app.directive('editfileDrct', [function () {
  return {
    restrict: 'E',
    template: '<label class="btn btn-default btn-sm navbar-btn" for="editAttachment">' +
    '<span class="glyphicon glyphicon-cloud-upload"></span> <span class="file-name">Оберіть картинку</span></label>' +
    '<input type="file" id="editAttachment" class="form-control inputfile" data-max-size="2048000"/>',
    link: function (scope, element, attrs) {
      element.bind('change', function (changeEvent) {
        var fileName = changeEvent.target.files[0].name;
        var el = element.parent().find('.file-name')
        el.text(scope.cutName(fileName, -15));
        var reader = new FileReader();
        var fileInput = angular.element(document.querySelector("#editAttachment"));
        var maxSize = fileInput.data('max-size');
        reader.onload = function (e) {
          if (scope.limitfileSize(fileInput, maxSize) != false){
            scope.$apply(function () {
            scope.editedEntity.new_attachment = e.target.result;
          });
          } else {
              console.log(scope.getCurrentDate)
              /*scope.showInformModal("Розмір файла перевищує"  + maxSize + "байта, оберіть будь ласка файл меньшого розміру" );*/
              alert("Розмір файла перевищує"  + maxSize + "байта, оберіть будь ласка файл меньшого розміру")
          }
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
      scope.closePicture = function () {
        scope.editedEntity.new_attachment = ''
        scope.entity.attachment = ''
      }
    }
  }
}])

app.directive('customPopover', [function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
          console.log(attrs.ngSrc)
          scope.sourc = attrs.ngSrc
            $(el).popover({
                trigger: 'click',
                html: true,
                content:  '<img class="img-popover" data-ng-src="{{sourc}}" />', /*function () {
           /* return '<img class="img-popover" src="attrs.ngSrc" />';
          },*/
                placement: attrs.popoverPlacement
            });
        }
    };
}]);


