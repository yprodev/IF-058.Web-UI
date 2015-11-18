app.controller('entitiesCtrl',
  ['$scope', "$q", 'entitiesSrvc', 'countEntitiesSrvc', '$stateParams', '$state', '$timeout', 'entityObj',
  function ($scope, $q, entitiesSrvc, countEntitiesSrvc, $stateParams, $state, $timeout, entityObj) {

  //it defines from entitiesDrct
  $scope.thisEntity = "";

  //$scope.entityObj contains entities of application
  $scope.entityObj = entityObj;

  //create empty object for adding of entity
  $scope.newEntity = {};

  //shows inform message about error
  $scope.showInformModal = function(infMsg) {
    $scope.infMsg = infMsg;
    angular.element(document.querySelector('#informModal')).modal();
  };

  //goes to dependent entity after click on a row
  $scope.enterToEntity = function(to, entityId) {
    $state.go(to ,{'id': entityId});
  };

  //_____________________________________________
  //this code will be replace to separate directive in feature / Vitaliy
  $scope.getCurrentDate = function () {
      var now = new Date();
      return now.setDate(now.getDate());
  };


  //it will be countEntitiesDrct in main.html
  $scope.statistics = {};
  $q.all([
    countEntitiesSrvc.countQuestions("question"),
    countEntitiesSrvc.countTests("test"),
    countEntitiesSrvc.countSubjects("subject"),
    countEntitiesSrvc.countStudents("student"),
    countEntitiesSrvc.countGroups("group"),
    countEntitiesSrvc.countSpecialities("speciality"),
    countEntitiesSrvc.countFaculties("faculty")
    ]).then(function (data) {
      for (var i = 0; i < data.length; i++) {
        $scope.statistics["count_" + data[i][0]] = data[i][1];
      };
    });

}]);
