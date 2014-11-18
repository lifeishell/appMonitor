define(function() {
    return ['$scope', '$location', 'MENU_GROUPS', 'SectionsService', HeaderCtrl];

    function HeaderCtrl($scope, $location, menuGroups, SectionsService) {
        $scope.logout = function(){
            $location.path('/login');
        };

        $scope.menuGroups = menuGroups;

        $scope.addSection = function(section){
            SectionsService.addActiveSection(section);
        };
    }

});