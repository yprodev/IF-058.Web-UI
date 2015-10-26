;
app.controller('specialitiesCtrl', function($scope, entitiesSrvc){


  $scope.thisEntity = "speciality";
//function gets a list of entities
  function getSpecialityList () {
    entitiesSrvc.getEntities($scope.thisEntity).then(function (resp) {
      $scope.specialities = resp.data;
      $scope.noData = "Немає записів";
    });
  };




//function shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
    } else {
      $scope.showingAdd = false;
      $scope.newCode = "";
      $scope.newName = "";
    };
  };
//function creates new element of array and sends new entity on server
  $scope.addSpeciality = function () {
    var newData = {
      speciality_code: $scope.newCode,
      speciality_name: $scope.newName
    };
    // console.log(newData);
    entitiesSrvc.createEntity($scope.thisEntity, newData).then(function (resp) {
      if (resp.data.response == "ok") {
        newData.speciality_id = resp.data.id;
        // console.log(resp);
        $scope.specialities.push(newData);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.showAddForm();
  };




  //function opens a form for editing
    $scope.showEditForm = function (speciality) {
      if ($scope.editingSpeciality != speciality) {
        $scope.editingSpeciality = speciality;
        $scope.editingData = {};
        $scope.editingData.editingCode = speciality.speciality_code;
        $scope.editingData.editingName = speciality.speciality_name;
        $scope.currentId = speciality.speciality_id;
      } else {
        $scope.editingSpeciality = null;
      };
    };
  //function updates an element of array and send updating of entity to server
    $scope.editSpeciality = function () {
      var editedData = {
        speciality_code: $scope.editingData.editingCode,
        speciality_name: $scope.editingData.editingName
      };
      // console.log($scope.editingData, $scope.currentId);
      entitiesSrvc.updateEntity($scope.thisEntity, $scope.currentId, editedData).then(function (resp) {
      if (resp.data.response == "ok") {
        for (var i = 1; i < $scope.specialities.length; i++) {
          if ($scope.specialities[i].speciality_id == $scope.currentId) {
            $scope.specialities[i].speciality_code = editedData.speciality_code;
            $scope.specialities[i].speciality_name = editedData.speciality_name;
          } ;
        };
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });;
    $scope.editingSpeciality = null;
    };




//function for initiate of entity for delete in modal
    $scope.activateSpeciality = function (speciality) {
      if ($scope.activeSpeciality != speciality) {
        $scope.activeSpeciality = speciality;
      } else {
        $scope.activeSpeciality = null;
      };
    };
//function removes an entity from array and from server
  $scope.removeSpeciality = function () {
    var currentSpeciality = $scope.activeSpeciality;
    var currentId = $scope.activeSpeciality.speciality_id;
    entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
      if (resp.data.response == "ok") {
            var index = $scope.specialities.indexOf(currentSpeciality);
            $scope.specialities.splice(index, 1);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.activateSpeciality();
  };




  getSpecialityList();
});
