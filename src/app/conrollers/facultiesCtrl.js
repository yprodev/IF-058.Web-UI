;
app.controller('facultiesCtrl', function($scope, entitiesSrvc){


  $scope.thisEntity = "faculty";
//function gets a list of entities
  function getFacultyList () {
    entitiesSrvc.getEntities($scope.thisEntity).then(function (resp) {
      $scope.faculties = resp.data;
      $scope.noData = "Немає записів";
    });
  };




  $scope.showingAddBtn = "Додавання факультетів";
//function shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
      $scope.showingAddBtn = "Скасувати додавання";
    } else {
      $scope.showingAdd = false;
      $scope.showingAddBtn = "Додавання факультетів";
      $scope.newDescription = "";
      $scope.newName = "";
    };
  };
//function creates new element of array and sends new entity on server
  $scope.addFaculty = function () {
    var newData = {
      faculty_description: $scope.newDescription,
      faculty_name: $scope.newName
    };
    // console.log(newData);
    entitiesSrvc.createEntity($scope.thisEntity, newData).then(function (resp) {
      if (resp.data.response == "ok") {
        newData.faculty_id = resp.data.id;
        // console.log(resp);
        $scope.faculties.push(newData);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.showAddForm();
  };




  //function opens a form for editing
    $scope.showEditForm = function (faculty) {
      if ($scope.editingFaculty != faculty) {
        $scope.editingFaculty = faculty;
        $scope.editingData = {};
        $scope.editingData.editingDescription = faculty.faculty_description;
        $scope.editingData.editingName = faculty.faculty_name;
        $scope.currentId = faculty.faculty_id;
      } else {
        $scope.editingFaculty = null;
      };
    };
  //function updates an element of array and send updating of entity to server
    $scope.editFaculty = function () {
      var editedData = {
        faculty_description: $scope.editingData.editingDescription,
        faculty_name: $scope.editingData.editingName
      };
      // console.log($scope.editingData, $scope.currentId);
      entitiesSrvc.updateEntity($scope.thisEntity, $scope.currentId, editedData).then(function (resp) {
      if (resp.data.response == "ok") {
        for (var i = 1; i < $scope.faculties.length; i++) {
          if ($scope.faculties[i].faculty_id == $scope.currentId) {
            $scope.faculties[i].faculty_description = editedData.faculty_description;
            $scope.faculties[i].faculty_name = editedData.faculty_name;
          } ;
        };
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });;
    $scope.editingFaculty = null;
    };




//function for initiate of entity for delete in modal
    $scope.activateFaculty = function (faculty) {
      if ($scope.activeFaculty != faculty) {
        $scope.activeFaculty = faculty;
      } else {
        $scope.activeFaculty = null;
      };
    };
//function removes an entity from array and from server
  $scope.removeFaculty = function () {
    var currentFaculty = $scope.activeFaculty;
    var currentId = $scope.activeFaculty.faculty_id;
    entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
      if (resp.data.response == "ok") {
            var index = $scope.faculties.indexOf(currentFaculty);
            $scope.faculties.splice(index, 1);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.activateFaculty();
  };




  getFacultyList();
});
