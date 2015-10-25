/**
 * Created by Ñåð¸ãà on 09.10.2015.
 */
app.controller('specialitiesCtrl', function($scope, specialitiesSrvc, $location) {

//ïîêàçàòè ïîëÿ ðåäàãóâàííÿ ôàéëó
  $scope.showAdd = function () {
    $scope.addSpec = !$scope.addSpec
    console.log($scope.addSpec)
  }

  //ïîêàçàòè âñ³ ñïåö³àüíîñò³
  specialitiesSrvc.getSpecialities().then(function (response) {
    $scope.specialities = response.data;
  });
  //ôóíêö³ÿ îíîâëåííÿ ñïèñêó ñïåö³àëüíîñòåé
  function update () {
    specialitiesSrvc.getSpecialities().then(function (response) {
      $scope.specialities = response.data;
    })
  }

  //äîäàòè ñïåö³àëüí³ñòü
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
//âèäàëèòè ñïåö³àëüí³ñòü
  $scope.delete = function (speciality) {
    console.log(speciality.speciality_id)
    specialitiesSrvc.delSpeciality(speciality.speciality_id)
    console.log(specialitiesSrvc.delSpeciality(speciality.speciality_id))
    update()
  }

  //ðåäàãóâàòè ñïåö³àëüí³ñòü
  $scope.edit = function (speciality) {
    var name = prompt('Âêàæ³òü íàçâó (Write speciality name)', speciality.speciality_name);
    var code = prompt('Âêàæ³òü êîä (Write speciality code)', speciality.speciality_code)

    var newData = {
      speciality_name: name,
      speciality_code: code
    }
    var id = speciality.speciality_id
    update(specialitiesSrvc.editSpeciality(id, newData))
  }
});
//ôûóàôûàôûà




/*







*/


