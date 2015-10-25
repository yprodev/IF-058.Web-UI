;
app.controller('subjectsCtrl', function($scope, entitiesSrvc){


  $scope.thisEntity = "subject";
//function gets a list of entities
  function getSubjectList () {
    entitiesSrvc.getEntities($scope.thisEntity).then(function (resp) {
      $scope.subjects = resp.data;
      $scope.noData = "Немає записів";
    });
  };




  $scope.showingAddBtn = "Додавання предметів";
//function shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
      $scope.showingAddBtn = "Скасувати додавання";
    } else {
      $scope.showingAdd = false;
      $scope.showingAddBtn = "Додавання предметів";
      $scope.newDescription = "";
      $scope.newName = "";
    };
  };
//function creates new element of array and sends new entity on server
  $scope.addSubject = function () {
    var newData = {
      subject_description: $scope.newDescription,
      subject_name: $scope.newName
    };
    // console.log(newData);
    entitiesSrvc.createEntity($scope.thisEntity, newData).then(function (resp) {
      if (resp.data.response == "ok") {
        newData.subject_id = resp.data.id;
        // console.log(resp);
        $scope.subjects.push(newData);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.showAddForm();
  };




  //function opens a form for editing
    $scope.showEditForm = function (subject) {
      if ($scope.editingSubject != subject) {
        $scope.editingSubject = subject;
        $scope.editingData = {};
        $scope.editingData.editingDescription = subject.subject_description;
        $scope.editingData.editingName = subject.subject_name;
        $scope.currentId = subject.subject_id;
      } else {
        $scope.editingSubject = null;
      };
    };
  //function updates an element of array and send updating of entity to server
    $scope.editSubject = function () {
      var editedData = {
        subject_description: $scope.editingData.editingDescription,
        subject_name: $scope.editingData.editingName
      };
      // console.log($scope.editingData, $scope.currentId);
      entitiesSrvc.updateEntity($scope.thisEntity, $scope.currentId, editedData).then(function (resp) {
      if (resp.data.response == "ok") {
        for (var i = 1; i < $scope.subjects.length; i++) {
          if ($scope.subjects[i].subject_id == $scope.currentId) {
            $scope.subjects[i].subject_description = editedData.subject_description;
            $scope.subjects[i].subject_name = editedData.subject_name;
          } ;
        };
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });;
    $scope.editingSubject = null;
    };




//function for initiate of entity for delete in modal
    $scope.activateSubject = function (subject) {
      if ($scope.activeSubject != subject) {
        $scope.activeSubject = subject;
      } else {
        $scope.activeSubject = null;
      };
    };
//function removes an entity from array and from server
  $scope.removeSubject = function () {
    var currentSubject = $scope.activeSubject;
    var currentId = $scope.activeSubject.subject_id;
    entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
      if (resp.data.response == "ok") {
            var index = $scope.subjects.indexOf(currentSubject);
            $scope.subjects.splice(index, 1);
      } else {
        alert ("Помилка " + resp.data.response);
      };
    });
    $scope.activateSubject();
  };




  getSubjectList();
});
