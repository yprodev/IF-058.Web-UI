;
app.controller('facultiesCtrl', function($scope, entitiesSrvc, $timeout){

  function showInformModal (infMsg) {
    $scope.infMsg = infMsg;
    console.log(angular.element(document.querySelector('#informModal')));
    angular.element(document.querySelector('#informModal')).modal();
  };

  $scope.thisEntity = "faculty";
//function gets a list of entities
  $scope.getFacultyList = function () {
    entitiesSrvc.getEntities($scope.thisEntity).then(function (resp) {
      $scope.faculties = resp.data;
      $scope.noData = "Немає записів";
    });
  };




//function shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
    } else {
      $scope.showingAdd = false;
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
      switch (resp.data.response) {
          case "ok":
            newData.faculty_id = resp.data.id;
            $scope.faculties.push(newData);
            // //lightins of addedRow for ... seconds
            // var succeedRow = angular.element(document.querySelector('#row'+($scope.faculties.length)))[0];
            // var standartClass = succeedRow.className;
            // succeedRow.className = succeedRow.className + " success";
            // $timeout(function () {
            //   succeedRow.className = standartClass;
            // }, 3000);
            break;
          case "error 23000":
            showInformModal("Зазначене ім'я вже існує");
            break;
          default:
            showInformModal("Помилка редагування запису:" + resp.data.response);
      };
    });
    $scope.showAddForm();
  };




  //function opens a form for editing
  $scope.showEditForm = function (faculty) {
    if ($scope.editingFaculty != faculty) {
      $scope.editingFaculty = faculty;
      $scope.editingData = {};
      $scope.editingData.editingName = faculty.faculty_name;
      $scope.editingData.editingDescription = faculty.faculty_description;
    } else {
      $scope.editingFaculty = null;
    };
  };
//function updates an element of array and send updating of entity to server
  $scope.editFaculty = function (faculty) {
    if ($scope.editingData.editingName != "" && $scope.editingData.editingDescription != "") {
      var editedData = {
      faculty_name: $scope.editingData.editingName,
      faculty_description: $scope.editingData.editingDescription
      };
      entitiesSrvc.updateEntity($scope.thisEntity, faculty.faculty_id, editedData).then(function (resp) {
        switch (resp.data.response) {
          case "ok":
            for (var i = 1; i < $scope.faculties.length; i++) {
              if ($scope.faculties[i].faculty_id == faculty.faculty_id) {
                $scope.faculties[i].faculty_name = editedData.faculty_name;
                $scope.faculties[i].faculty_description = editedData.faculty_description;

                //lightins of editedRow for ... seconds
                var succeedRow = angular.element(document.querySelector('#row'+(i+1)))[0];
                var standartClass = succeedRow.className;
                succeedRow.className = succeedRow.className + " success";
                $timeout(function () {
                  succeedRow.className = standartClass;
                }, 2000);
              };
            };
            break;
          case "error 23000":
            showInformModal("Зазначене ім'я вже існує");
            break;
          default:
            showInformModal("Помилка редагування запису:" + resp.data.response);
        };
      });
      $scope.editingFaculty = null;
    } else {
      showInformModal("Будь ласка, заповніть всі поля");
    };
  };




//function for initiate of entity for delete in modal
  $scope.activateFaculty = function (faculty) {
      if ($scope.deletingFaculty != faculty) {
        $scope.deletingFaculty = faculty;
      } else {
        $scope.deletingFaculty = null;
      };
    };
//function removes an entity from array and from server
  $scope.removeFaculty = function () {
    var currentFaculty = $scope.deletingFaculty;
    var currentId = $scope.deletingFaculty.faculty_id;
    entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
      if (resp.data.response == "ok") {
            var index = $scope.faculties.indexOf(currentFaculty);
            $scope.faculties.splice(index, 1);
      } else {
        showInformModal("Помилка видалення запису" + resp.data.response);
      };
    });
    $scope.activateFaculty();
  };


  $scope.getFacultyList();
});
