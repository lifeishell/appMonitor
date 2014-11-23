define(function() {
    return ['$scope', '$rootScope', '$location', 'SectionsService', DashboardCtrl];

    function DashboardCtrl($scope, $rootScope, $location, SectionsService) {

        var loading = true;

        $scope.topScope = $scope;

        $scope.topScope.isLoading = function(){
            return false;
        };

        function initDashboard(){
            loading = false;
        }

        initDashboard();

        $scope.showLoading = function(){
            return loading || $scope.topScope.isLoading();
        };
    }
});