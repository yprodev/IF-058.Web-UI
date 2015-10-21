/**
 * Created by Серёга on 09.10.2015.
 */
app.controller('specialitiesCtrl', function($scope, specialitiesSrvc, $location) {

//показати поля редагування файлу
  $scope.showAdd = function () {
    $scope.addSpec = !$scope.addSpec
    console.log($scope.addSpec)
  }

  //показати всі спеціаьності
  specialitiesSrvc.getSpecialities().then(function (response) {
    $scope.specialities = response.data;
  });
  //функція оновлення списку спеціальностей
  function update () {
    specialitiesSrvc.getSpecialities().then(function (response) {
      $scope.specialities = response.data;
    })
  }

  //додати спеціальність
  $scope.add = function () {
    var data = {
      speciality_name: $scope.name,
      speciality_code: $scope.code
    };
    specialitiesSrvc.createSpeciality(data)
    update()
    $scope.name = '';
    $scope.code = '';
    console.log($location)
    console.log('add made')
    console.log($scope)
  }
//видалити спеціальність
  $scope.delete = function (speciality) {
    console.log(speciality.speciality_id)
    specialitiesSrvc.delSpeciality(speciality.speciality_id)
    console.log(specialitiesSrvc.delSpeciality(speciality.speciality_id))
    update()
  }

  //редагувати спеціальність
  $scope.edit = function (speciality) {
    var name = prompt('Вкажіть назву (Write speciality name)', speciality.speciality_name);
    var code = prompt('Вкажіть код (Write speciality code)', speciality.speciality_code)

    var newData = {
      speciality_name: name,
      speciality_code: code
    }
    var id = speciality.speciality_id
    update(specialitiesSrvc.editSpeciality(id, newData))
  }
});
//фыуафыафыа
ыфвфыв



/*







*/


