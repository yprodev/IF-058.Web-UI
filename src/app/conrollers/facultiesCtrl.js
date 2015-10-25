;
app.controller('facultiesCtrl', function($scope, facultiesSrvc){

  $scope.showingAddBtn = "Додавання факультетів";
//функція, яка викликає сервіс для отримання списку факультетів із сервера
  getFacultyList();


//функція відкриття форми створення нового запису (факультету)
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



// функція на клік, викликає сервіс, який присвоює в обєкт newFaculty дані з
// інпутів, відпраляється а сервер.
  $scope.addFaculty = function () {
    var newData = {
      faculty_description: $scope.newDescription,
      faculty_name: $scope.newName
    };
    facultiesSrvc.createFaculty(function (resp) {
      getFacultyList();
    }, newData);
    $scope.showAddForm();
  };



    $scope.editingData = {};
//функція відкриття форми редагування запису (факультету)
  $scope.showEditForm = function (faculty) {
    if ($scope.editingFaculty != faculty) {
      $scope.editingFaculty = faculty;
      $scope.editingData.editingDescription = faculty.faculty_description;
      $scope.editingData.editingName = faculty.faculty_name;
      $scope.currentId = faculty.faculty_id;
    } else {
      $scope.editingFaculty = null;
    };
  };



  $scope.editFaculty = function () {
    var editingData = {
      faculty_description: $scope.editingData.editingDescription,
      faculty_name: $scope.editingData.editingName
    };
    console.log($scope.editingData, $scope.currentId);
    facultiesSrvc.updateFaculty(function () {
      getFacultyList(); //функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
    }, $scope.currentId, editingData);
    $scope.showEditForm();
    $scope.activateFaculty();
  };


  $scope.activateFaculty = function (faculty) {
    if ($scope.activeFaculty != faculty) {
      $scope.activeFaculty = faculty;
    } else {
      $scope.activeFaculty = null;
    };
    console.log($scope.activeFaculty);
  };


// функція на клік викликає сервіс для видалення обєкту масиву faculties за відповідним faculty_id
  $scope.removeFaculty = function () {
    var currentId = $scope.activeFaculty.faculty_id;
    facultiesSrvc.deleteFaculty(function () {
      getFacultyList(); //функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
    }, currentId);
    $scope.activateFaculty();
  };


//функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
  function getFacultyList () {
    facultiesSrvc.getFaculties(function (resp) {
      $scope.faculties = resp.data; // faculties використовується у view для перебору обєктів (факультетів)
    });
  };

});
