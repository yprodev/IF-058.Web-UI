;
app.controller('entitiesCtrl', ['$scope', 'entitiesSrvc', '$stateParams', '$timeout', function ($scope, entitiesSrvc, $stateParams, $timeout) {

  //it defines from entitiesDrct
  $scope.thisEntity = "";

  //entityObj contains entities of application
  var entityObj = {
    "faculty": {
      faculty_name: "",
      faculty_description: ""
    },
    "speciality": {
      speciality_name: "",
      speciality_code: ""
    },
    "subject": {
      subject_name: "",
      subject_description: ""
    },
    "AdminUser": {
      username: "",
      password: "",
      password_confirm: "",
      email: ""
    },
    "test": {
      test_name: "",
      tasks: "",
      time_for_test: "",
      enabled: "",
      attempts: "",
      by: {
        parentEntity: 'subject'
      }
    },
    "question": {
      question_text: '',
      level: '',
      type: '',
      attachment: '',
      by: {
        parentEntity: 'test'
      }
    },
    "TestDetail": {
      level: "",
      tasks: "",
      rate: "",
      by: {
        parentEntity: 'test'
      }
    },
    "answer": {
      by: {
        parentEntity: 'question'
      },
      true_answer: '',
      answer_text: '',
      attachment: ''
    }

    //... and other entities
  };




  //gets a list of entities
  $scope.getEntityList = function () {
    defineCurrentEntity();
    defineNameOfId();
    checkForPropertyBy();
  };

  //define currentEntity by comparing of thisEntity and properties of entityObj
  function defineCurrentEntity () {
    if (entityObj[$scope.thisEntity] != undefined) {
      $scope.currentEntity = entityObj[$scope.thisEntity];
    };
  };

  //define id of entity: "entity_id" or "id" (it returns from server)
  function defineNameOfId (){
    $scope.commonId =
    $scope.thisEntity !== "AdminUser" && $scope.thisEntity !== "TestDetail"
    ? $scope.thisEntity + "_id"
    : "id";
    return $scope.commonId;
  };

  //check for dependencies in currentEntity
  function checkForPropertyBy () {
    if ($scope.currentEntity.by) {
      getEntitiesWithDependencies();
    }
    else {
      getEntitiesWithoutDependencies();
    };
  };

  function getEntitiesWithDependencies() {
    var id = $stateParams.id;
    //using different methods for dependencies of different entities
    switch ($scope.thisEntity) {
      case 'test':
      case 'TestDetail':
      case 'answer':
        entitiesSrvc.getEntitiesByEntity(
          $scope.thisEntity, $scope.currentEntity.by.parentEntity, id
          )
        .then(function (resp) {
          gettingResponseHandler (resp);
        });
        break;
      case 'question':
        entitiesSrvc.getRecordsRangeByEntity(
          $scope.thisEntity, $scope.currentEntity.by.parentEntity, id
          )
        .then(function (resp) {
          gettingResponseHandler (resp);
        });
        break;
    };
  };

  function getEntitiesWithoutDependencies () {
    entitiesSrvc.getEntities($scope.thisEntity).then(function (resp) {
      gettingResponseHandler (resp);
    });
  };

  //create array with entities if response has data
  function gettingResponseHandler (resp) {
    $scope.entities = resp.data;
    $scope.noData = "Немає записів";
  };






  //shows and hides the form for creating new entity
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
    } else {
      $scope.showingAdd = false;
      $scope.resetEntity();
    };
  };

  //makes newEntity and all fields of adding form empty,
  //it's click handler on button "Очистити"
  $scope.resetEntity = function(){
    $scope.newEntity = {};
  };

  //creates new element of array and sends new entity on server
  $scope.addEntity = function () {
    var newData = $scope.newEntity;
    addParentEntityId(newData);
    entitiesSrvc.createEntity($scope.thisEntity, newData)
    .then(function (resp) {
      addAndEditRespHandler (resp, successAddRespHandler, newData);
    });
    $scope.showAddForm();
  };

  //if entity depends of some entity function adds parentEntity_id property
  function addParentEntityId (newData) {
    if ($scope.currentEntity.by) {
      newData[$scope.currentEntity.by.parentEntity + "_id"] = $stateParams.id;
    };
  };



  //function opens a form for editing
  $scope.showEditForm = function (entity) {
    if ($scope.editingEntity != entity) {
      $scope.editingEntity = entity;
      createEditedEntityStorage(entity);
    } else {
      $scope.editingEntity = null;
    };
  };

  //creates buffer (storage) for editing object
  function createEditedEntityStorage (entity) {
    $scope.editedEntity = {};
    for (prop in entity) {
      $scope.editedEntity["new_" + prop] = entity[prop];
      if(entityObj["AdminUser"]){
        $scope.editedEntity.new_password = "";
        $scope.editedEntity.new_password_confirm = "";
      };
    };
  };

  //updates an element of array and send updating of entity to server
  $scope.editEntity = function (entity) {
    var fieldsFulled;
    var editedData = {};
    fieldsFulled = checkEmptyFields (entity, editedData);
    if (fieldsFulled == true) {
      entitiesSrvc.updateEntity($scope.thisEntity, entity[$scope.commonId], editedData)
      .then(function (resp) {
        addAndEditRespHandler (resp, successEditRespHandler, editedData, entity);
      });
    } else {
      showInformModal("Будь ласка, заповніть всі поля");
    };
  };

  //checks on empty fields, appropriationing all properties except ID of property
  function checkEmptyFields (entity, editedData) {
    for (prop in entity) {
      //new_prop is not empty and is not ID
      if ($scope.editedEntity["new_" + prop] != "") {
        fieldsFulled = true;
        createPropForSendingObj (editedData);
      } else {
        fieldsFulled = false;
        break;
      };
    };
    return fieldsFulled;
  };

  //prop = $scope.commonId ("id" or "entity_id")
  function createPropForSendingObj (editedData) {
    if (prop != ($scope.commonId)) {
      editedData[prop] = $scope.editedEntity["new_" + prop];
    }
  }

  //FOR ADD and EDIT
  //handing success and error response
  function addAndEditRespHandler (resp, successRespHandler, newOrEditedData, entity) {
    switch (resp.data.response) {
      case "ok":
        successRespHandler (resp, newOrEditedData, entity);
        break;
      case "error 23000":
        showInformModal("Зазначене ім'я вже існує");
        break;
      case "error":
        showInformModal("Дані не змінено");
        break;
      default:
        showInformModal("Помилка запису: " + resp.data.response);
    };
  };
  //pushes to array $scope.entities a new added object
  function successAddRespHandler (resp, newData) {
    newData[$scope.commonId] = resp.data.id;
    $scope.entities.push(newData);
  };
  //changes in array $scope.entities an edited object
  function successEditRespHandler (resp, editedData, entity) {
    for (var i = 0; i < $scope.entities.length; i++) {
      if ($scope.entities[i][$scope.commonId] == entity[$scope.commonId]) {
        for (prop in editedData) {
          $scope.entities[i][prop] = editedData[prop];
        };
      };
    };
    $scope.editingEntity = null;
  };




//function for initiate of entity for delete in modal
  $scope.activateEntity = function (entity) {
    if ($scope.deletingEntity != entity) {
      $scope.deletingEntity = entity;
    } else {
      $scope.deletingEntity = null;
    };
  };

//function removes an entity from array and from server
  $scope.removeEntity = function () {
    var currentEntity = $scope.deletingEntity;
    var currentId = $scope.deletingEntity[$scope.commonId];
    entitiesSrvc.deleteEntity($scope.thisEntity, currentId).then(function (resp) {
      removingResponseHandler (resp, currentEntity);
    });
    $scope.activateEntity();
  };

  function removingResponseHandler (resp, currentEntity) {
    switch (resp.data.response) {
      case "ok":
        var index = $scope.entities.indexOf(currentEntity);
        $scope.entities.splice(index, 1);
        break;
      case "error 23000":
        showInformModal("Неможливо видалити запис. Запис має залежні об'єкти.");
        break;
      default:
        showInformModal("Помилка редагування запису: " + resp.data.response);
    };
  };

  //show inform message about error
  function showInformModal(infMsg) {
    $scope.infMsg = infMsg;
    angular.element(document.querySelector('#informModal')).modal();
  };

}]);
