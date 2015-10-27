app.controller('addAdminCtrl', function($scope, entitiesSrvc) {

    $scope.thisEntity = "AdminUser";
    function getAdmins() {
        entitiesSrvc.getEntities($scope.thisEntity).then(function(resp){
            $scope.admins = resp.data;
            $scope.noData = "Not found";
            console.log($scope.admins);
        });
    };
    getAdmins();
});
