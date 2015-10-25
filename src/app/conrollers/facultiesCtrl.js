;
app.controller('facultiesCtrl', function($scope, facultiesSrvc){



//function gets a list of entities
  function getFacultyList () {
    facultiesSrvc.getFaculties().then(function (resp) {
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
    facultiesSrvc.createFaculty(newData).then(function (resp) {
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
  //function for initiate of entity for using in modals
    $scope.activateFaculty = function (faculty) {
      if ($scope.activeFaculty != faculty) {
        $scope.activeFaculty = faculty;

      } else {
        $scope.activeFaculty = null;
      };
      console.log($scope.activeFaculty + "fin");
    };
  //function updates an element of array and send updating of entity to server
    $scope.editFaculty = function () {
      var editingData = {
        faculty_description: $scope.editingData.editingDescription,
        faculty_name: $scope.editingData.editingName
      };
      // console.log($scope.editingData, $scope.currentId);
      facultiesSrvc.updateFaculty($scope.currentId, editingData).then(function (resp) {
      if (resp.data.response == "ok") {
        for (var i = 1; i < $scope.faculties.length; i++) {
          if ($scope.faculties[i].faculty_id == $scope.currentId) {
            $scope.faculties[i].faculty_description = editingData.faculty_description;
            $scope.faculties[i].faculty_name = editingData.faculty_name;
          } ;
        };
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });;
      $scope.showEditForm();
      $scope.activateFaculty();
    };




//function removes an entity from array and from server
  $scope.removeFaculty = function () {
    var currentFaculty = $scope.activeFaculty;
    var currentId = $scope.activeFaculty.faculty_id;
    facultiesSrvc.deleteFaculty(currentId).then(function (resp) {
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
