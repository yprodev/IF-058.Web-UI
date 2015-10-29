/**
 * Created by Серёга on 27.10.2015.
 */
app.controller('testsCtrl', function ($scope, entitiesSrvc, testsSrvc, $rootScope, $stateParams) {
  $scope.thisEntity = "test";
   //function gets a list of entities by entity
   var entityIn = 'subject'
   function getTestList () {
   //console.log(subjectCtrl.activeSubject.subject_id)
     var id = $stateParams.id
   testsSrvc.getEntitiesByEntitie($scope.thisEntity, entityIn, id).then(function (resp) {//id is not defined needed to add from SubjectCtrl
   $scope.tests = resp.data;
   $scope.noData = "Немає записів";
   });
   };

//function shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
    } else {
      $scope.showingAdd = false;
      $scope.newName = '',
      $scope.newTasks = '',
      $scope.newTime_for_test = '',
      $scope.newEnabled = '',
      $scope.newAttempts = ''
    };
  };


//function creates new element of array and sends new entity on server
  $scope.addTest = function () {
    var newData = {
      test_name: $scope.newName,
      tasks: $scope.newTasks,
      time_for_test: $scope.newTime_for_test,
      enabled: $scope.newEnabled,
      attempts: $scope.newAttempts,
      subject_id: $stateParams.id// поміняти повинне бути значення із обранного предмету
    };
    console.log(newData);
    entitiesSrvc.createEntity($scope.thisEntity, newData).then(function (resp) {
      if (resp.data.response == "ok") {
        newData.test_id = resp.data.id;
        // console.log(resp);
        $scope.tests.push(newData);
      } else {
        alert("Помилка " + resp.data.response);
      }
      ;
    });
    $scope.showAddForm();
  };
  $scope.resetTest = function () {//дописати
    $scope.newName = '',
      $scope.newTasks = '',
      $scope.newTime_for_test = '',
      $scope.newEnabled = '',
      $scope.newAttempts = '',
      $stateParams.id = ''

    //console.log(newData)
  }

  //function opens a form for editing
  $scope.showEditForm = function (test) {
    if ($scope.editingTest != test) {
      $scope.editingTest = test;
      $scope.editingData = {};
      $scope.editingData.editingName = test.test_name;
      $scope.editingData.editingTasks = test.tasks;
      $scope.editingData.editingTime_for_test = test.time_for_test;
      $scope.editingData.editingEnabled = test.enabled;
      $scope.editingData.editingAttempts = test.attempts;

      $scope.currentId = test.test_id;
    } else {
      $scope.editingTest = null;
    }
    ;
  };
  //function updates an element of array and send updating of entity to server
  $scope.editTest = function () {
    var editedData = {
      test_name: $scope.editingData.editingName,
      tasks: $scope.editingData.editingTasks,
      time_for_test: $scope.editingData.editingTime_for_test,
      enabled: $scope.editingData.editingEnabled,
      attempts: $scope.editingData.editingAttempts
    };
    // console.log($scope.editingData, $scope.currentId);
    entitiesSrvc.updateEntity($scope.thisEntity, $scope.currentId, editedData).then(function (resp) {
      if (resp.data.response == "ok") {
        for (var i = 1; i < $scope.tests.length; i++) {
          if ($scope.tests[i].test_id == $scope.currentId) {
            $scope.tests[i].test_name = editedData.test_name;
            $scope.tests[i].tasks = editedData.tasks;
            $scope.tests[i].time_for_test = editedData.time_for_test;
            $scope.tests[i].enabled = editedData.enabled;
            $scope.tests[i].attempts = editedData.attempts;
          };
        };
      } else {
        alert("Помилка " + resp.data.response);
      };
    });
    $scope.editingTest = null;
  };

   //function for initiate of entity for delete in modal
   $scope.activateTest = function (test) {
   if ($scope.activeTest != test) {
   $scope.activeTest = test;
   } else {
   $scope.activeTest = null;
   };
   };
   //function removes an entity from array and from server
   $scope.removeTest = function () {
   var currentTest = $scope.activeTest ;
   var currentId = $scope.activeTest.test_id;
   entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
   if (resp.data.response == "ok") {
   var index = $scope.tests.indexOf(currentTest);
   $scope.tests.splice(index, 1);
   } else {
   alert ("Помилка " + resp.data.response);
   };
   });
   $scope.activateTest();
   };



  getTestList();





});
