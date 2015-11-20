testPlayerApp.controller('userResultListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentResults = function () {
    var url = 'result/getRecordsByStudent/'
    var data = '69'//захардкоджено, потім внести в базу данних і поміняти
    /*localStorage.userId*/
    
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      return resp.data
    }).then(function (resp) {
      var entities = []
      for (var i = 0; i < resp.length; i++) {
        entities.push(resp[i].result)//вывести во вью
        entities.push(resp[i].session_date)
        idArr = []
        idArr.push(resp[i].test_id)
      }
      url = 'EntityManager/getEntityValues'
      postData = {entity: "Test", ids: idArr}
      $scope.entities = entities
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        idArr = []
        idArr.push(resp.data[0].subject_id)
      }
      postData = {entity: "Subject", ids: idArr}
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i = 0; i < resp.data.length; i++) {
        $scope.entities.push(resp.data[i].subject_name)
      }
    })
  }
  $scope.getStudentResults()
}]);