define(function() {
    return ['$scope', '$rootScope', '$location', 'SectionsService', DashboardCtrl];

    function DashboardCtrl($scope, $rootScope, $location, SectionsService) {

        var loading = true;

        $scope.topScope = $scope;

        $scope.topScope.isLoading = function(){
            return false;
        };

        $scope.changeSection = function(section){
            SectionsService.setActiveSection(section);
        };

        function initDashboard(){
            SectionsService.initActiveSection();
            $scope.activeSections = SectionsService.activeSections;
            $scope.activeSection = SectionsService.activeSection;
            loading = false;
        }

        initDashboard();

        $scope.closeSection = function(section){
            SectionsService.closeActiveSection(section);
        };

        $scope.scrollValue = {
            scrollable: false,
            scrollableLeft: false,
            scrollableRight: false,
            scrollSectionLeft: function(){},
            scrollSectionRight: function(){}
        };

        $scope.showLoading = function(){
            return loading || $scope.topScope.isLoading();
        };
    }
});