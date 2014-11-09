define(function() {
    return ['$scope', '$rootScope', '$location', 'Restangular', DashboardCtrl];

    function DashboardCtrl($scope, $rootScope, $location, Restangular) {

        var loading = true;

        $scope.topScope = $scope;

        $scope.topScope.isLoading = function(){
            return false;
        };

        $scope.changeSection = function(section){
            $scope.activeSection = section;
        };

        function initDashboard(){
            $scope.sctiveSection = $scope.sctiveSection || {};
        }

        initDashboard();

        $scope.showLoading = function(){
            return loading || $scope.topScope.isLoading();
        };
    }
});