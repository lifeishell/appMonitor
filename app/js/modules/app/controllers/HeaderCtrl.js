define(function() {
    return ['$scope', '$location', 'MENU_GROUPS', HeaderCtrl];

    function HeaderCtrl($scope, $location, menuGroups) {
        $scope.logout = function(){
            $location.path('/login');
        };

        $scope.menuGroups = menuGroups;

        $scope.addSection = function(section){
            $location.path('/'+ section.id);
        };
    }

});