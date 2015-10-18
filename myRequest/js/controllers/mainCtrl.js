;
var app = angular.module('app', [])
.controller('mainCtrl', function($scope, reqFactory, $document){

  $scope.showingAddBtn = "Додавання факультетів";
//функція, яка викликає сервіс для отримання списку факультетів із сервера
  getFacultyList();


//функція відкриття форми створення нового запису (факультету)
  $scope.showAddForm = function () {
    if (!$scope.showingAdd) {
      $scope.showingAdd = true;
      $scope.showingAddBtn = "Приховати форму";
    } else {
      $scope.showingAdd = false;
      $scope.showingAddBtn = "Додавання факультетів";
    };
  };



// функція на клік, викликає сервіс, який присвоює в обєкт newFaculty дані з
// інпутів, відпраляється а сервер.
  $scope.addFaculty = function () {
    var newData = {
      faculty_description: $scope.newDescription,
      faculty_name: $scope.newName
    };
    reqFactory.createFaculty(function (resp) {
      getFacultyList();
    }, newData);

    $scope.newDescription = "";
    $scope.newName = "";
  };



//функція відкриття форми редагування запису (факультету)
  $scope.showEditForm = function (event, faculty, index) {
    if (!$scope.showingEdit) {
      $scope.showingEdit = true;
      $scope.editingDescription = faculty.faculty_description;
      $scope.editingName = faculty.faculty_name;
      $scope.currentId = faculty.faculty_id;
      $scope.currentIndex = index;
    } else if (index == $scope.currentIndex) {
      $scope.showingEdit = false;
      $scope.editingDescription = "";
      $scope.editingName = "";
      $scope.currentId = "";
      $scope.currentIndex = 0;
    } else {
      alert("Закрийте попередню форму редагування!");
    };
  };



  $scope.editFaculty = function () {
    var editedData = {
      faculty_description: $scope.editingDescription,
      faculty_name: $scope.editingName
    };
    reqFactory.updateFaculty(function () {
      getFacultyList(); //функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
    }, $scope.currentId, editedData);
  };


// функція на клік викликає сервіс для видалення обєкту масиву faculties за відповідним faculty_id
  $scope.removeFaculty = function (faculty) {
    var currentId = faculty.faculty_id;
    reqFactory.deleteFaculty(function () {
      getFacultyList(); //функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
    }, currentId);
  };

//функція, яка викликає сервіс для отримання ОНОВЛЕННЯ списку факультетів із сервера
  function getFacultyList () {
    reqFactory.getFaculties(function (resp) {
      $scope.faculties = resp.data; // faculties використовується у view для перебору обєктів (факультетів)
    });
  };

});
