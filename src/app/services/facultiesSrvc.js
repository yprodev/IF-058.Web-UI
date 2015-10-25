;
app.factory('entitiesSrvc', function ($http, baseUrl) {

  return {
    getEntities: function (entity) {
      return $http.get(baseUrl + entity + '/getRecords')
        .then(fulfilled, rejected);
    },

    createEntity: function (entity, data) {
      return $http.post(baseUrl + entity + '/insertData', data)
        .then(fulfilled, rejected);
    },

    deleteEntity: function (entity, id) {
      return $http.delete(baseUrl + entity + '/del/' + id)
        .then(fulfilled, rejected);
    },

    updateEntity: function (entity, id, data) {
      return $http.post(baseUrl + entity + '/update/' + id, data)
      .then(fulfilled, rejected);
    }
  };

  function fulfilled(response) {
    return response;
  };

  function rejected(error) {
    alert("Помилка " + error.status + " " + error.statusText);
  };
});
