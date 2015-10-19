var app = angular.module('app', []);
app.controller('mainCtrl', function ($scope, subjectSrvc, $http) {

    $scope.showAdd = function () {
    $scope.addSubj = !$scope.addSubj
    console.log($scope.addSubj)
  }

  subjectSrvc.getSubjects().then(function (response) {
    $scope.subjects = response.data;
  });
  
  function update () {
    subjectSrvc.getSubjects().then(function (response) {
      $scope.subjects = response.data;
    })
  }

  $scope.add = function () {
    var data = {
      subject_name: $scope.name,
      subject_description: $scope.description
    };

    subjectSrvc.createSubject(data)
    update()
    $scope.name = '';
    $scope.description = '';
    console.log('add made')
  }


  $scope.delete = function (subject) {
    console.log(subject.subject_id)
    subjectSrvc.delSubject(subject.subject_id)
    console.log(subjectSrvc.delsubject(subject.subject_id))
    update()
  }
  
  $scope.edit = function (subject) {
    var name = prompt('Введіть назву предмету', subject.subject_name);
    var description = prompt('Введіть опис предмету', subject.subject_description)
    var newData = {
      subject_name: name,
      subject_description: description
    }
    var id = subject.subject_id
    update(subjectSrvc.editSubject(id, newData))
  }

});


