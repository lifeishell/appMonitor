define(function() {
    return ['$scope', '$location', 'MENU_GROUPS', 'SessionUser', HeaderCtrl];

    function HeaderCtrl($scope, $location, menuGroups, SessionUser) {
        $scope.logout = function(){
            SessionUser.logout();
        };

        $scope.menuGroups = menuGroups;

        $scope.addSection = function(section){
            $location.path('/'+ section.id);
        };
    }

});