define(function() {
    return ['$scope', '$location', 'MENU_GROUPS', 'Restangular', HeaderCtrl];

    function HeaderCtrl($scope, $location, menuGroups, Restangular) {
        $scope.logout = function(){
            $location.path('/login');
        };

        $scope.menuGroups = menuGroups;
    }

});