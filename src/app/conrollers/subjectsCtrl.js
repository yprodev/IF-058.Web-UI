;
app.controller('subjectsCtrl', function ($scope, subjectsSrvc) {
  console.log("hidhsfo");

    $scope.showAdd = function () {
    $scope.addSubj = !$scope.addSubj
    console.log($scope.addSubj)
  }

  subjectsSrvc.getSubjects().then(function (response) {
    $scope.subjects = response.data;
  });
  
  function update () {
    subjectsSrvc.getSubjects().then(function (response) {
      $scope.subjects = response.data;
    })
  }

  $scope.add = function () {
    var data = {
      subject_name: $scope.name,
      subject_description: $scope.description
    };

    subjectsSrvc.createSubject(data)
    update()
    $scope.name = '';
    $scope.description = '';
    console.log('add made')
  }


  $scope.delete = function (subject) {
    subjectsSrvc.delSubject(subject.subject_id)
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
    update(subjectsSrvc.editSubject(id, newData))
  }

});


