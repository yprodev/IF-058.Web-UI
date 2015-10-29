/**
 * Created by Серёга on 27.10.2015.
 */
// Зробити цей сервіс у entitiesSrvc
app.factory('testsSrvc', function ($http, baseUrl) {
  return {
    getEntitiesByEntitie: function (entity, entityIn, id) {
      //console.log("get works")
      return $http.get(baseUrl + entity + '/get'+entity[0].toUpperCase()+entity.slice(1) + 's' + 'By' + entityIn[0].toUpperCase()+entityIn.slice(1) +'/' + id)
        .then(fulfilled, rejected);
      console.log("get works")
    }
  }
  function fulfilled(response) {
    return response;
  };

  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };
})