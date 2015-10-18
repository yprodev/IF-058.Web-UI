/**
 * Created by Серёга on 09.10.2015.
 */
var app = angular.module('app', []);
app.controller('mainCtrl', function ($scope, specialitySrvc, $http) {

//показати поля редагування файлу
  $scope.showAdd = function () {
    $scope.addSpec = !$scope.addSpec
    console.log($scope.addSpec)
  }

  //показати всі спеціаьності
  specialitySrvc.getSpecialities().then(function (response) {
    $scope.specialities = response.data;
  });

  //додати спеціальність
  $scope.add = function () {
    var data = {
      speciality_name: $scope.name,
      speciality_code: $scope.code
    }
    specialitySrvc.createGroup(data);
  }
  //видалити спеціальність
  $scope.delete = function (speciality) {
    console.log(speciality.speciality_id)
    specialitySrvc.delGroup(speciality.speciality_id)
  }
  //редагування
  $scope.edit = function (speciality) {
    var name = prompt('Вкажіть назву', speciality.speciality_name);
    var code = prompt('Вкажіть код', speciality.speciality_code)
    var newData = {
      speciality_name: name,
      speciality_code: code
    }
    var id = speciality.speciality_id
    specialitySrvc.editGroup(id, newData)
  }

});


