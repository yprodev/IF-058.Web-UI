testPlayerApp.controller('userResultListCtrl', ['$scope', 'userSrvc', '$stateParams', '$state', function ($scope, userSrvc, $stateParams, $state) {
  $scope.getStudentResults = function () {
    var url = 'result/getRecordsByStudent/'
    var data = '4'//захардкоджено, потім внести в базу данних і поміняти
    /*localStorage.userId*/
    var entities = {
        result: '',
        session_date: '',
        subject_name: ''
      }
    userSrvc.getInfoForStudent(url, data).then(function (resp) {
      return resp.data
    }).then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        entities.result = resp[i].result//вывести во вью
        entities.session_date = resp[i].session_date
        idArr = []
        idArr.push(resp[i].test_id)
      }
      url = 'EntityManager/getEntityValues'
      postData = {entity: "Test", ids: idArr}
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        idArr = []
        idArr.push(resp.data[0].subject_id)
      }
      postData = {entity: "Subject", ids: idArr}
      return userSrvc.postInfoForStudent(url, postData)
    }).then(function (resp) {
      console.log(resp)
      for (var i = 0; i < resp.data.length; i++) {
        entities.subject_name = resp.data[i].subject_name
        console.log(entities)
        //$scope.entities = entities
      }
    })
  }
  $scope.getStudentResults()
}]);