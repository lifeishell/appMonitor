define(function() {
    return ['$scope', '$rootScope', '$location', 'MENU_GROUPS', 'Restangular', AppCtrl];

    function AppCtrl($scope, $rootScope, $location, menuGroups, Restangular) {
        $scope.page = {};
        $rootScope.$on('$routeChangeStart', function(event, route, prevRoute) {
            if (route.$$route) {
                $scope.page = {
                    type: typeof(route.$$route.pageType) !== 'undefined' ? route.$$route.pageType : 'default'
                };
            }
        });

    }
});