app.controller('entitiesCtrl',
  ['$scope', 'entitiesSrvc', '$stateParams', '$state', '$timeout', 'entityObj',
  function ($scope, entitiesSrvc, $stateParams, $state, $timeout, entityObj) {

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
}]);
