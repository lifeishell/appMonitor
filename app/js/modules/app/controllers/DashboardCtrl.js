define(function() {
    return ['$scope', '$routeParams', 'SectionsService', 'DialogService', DashboardCtrl];

    function DashboardCtrl($scope, $routeParams, SectionsService, DialogService) {

        var loading = true;

        $scope.topScope = $scope;

        $scope.topScope.isLoading = function(){
            return false;
        };

        function initDashboard(){
            loading = false;
        }

        var routeSection = _.filter(SectionsService.flatternSection, {id: $routeParams.sectionId});

        if(routeSection.length){
            SectionsService.addActiveSection(routeSection[0]);
        }
        $scope.activeSection = SectionsService.activeSection;

        initDashboard();

        $scope.showLoading = function(){
            return loading || $scope.topScope.isLoading();
        };

        $scope.showSaveSuccessDialog = function(title, description, callback) {
            DialogService.showDialog(
                (typeof(title) === 'undefined' || title === null) ? '保存成功' : title, (typeof(description) === 'undefined' || description === null) ? '' : description, [{
                    name: '是',
                    class: 'btn-primary',
                    callback: callback || angular.noop
                }]
            );
        };

        $scope.showSaveFailedDialog = function(title, description, retryCallback) {
            DialogService.showDialog(
                (typeof(title) === 'undefined' || title === null) ? '保存失败' : title, (typeof(description) === 'undefined' || description === null) ? '请稍后重试，如果问题依旧，请联系系统管理员' : description, [{
                    name: '重新发送？',
                    class: 'btn-default',
                    callback: (typeof(retryCallback) === 'undefined') ? $scope.saveChanges : retryCallback
                }, {
                    name: '关闭',
                    class: 'btn-primary'
                }]
            );
        };
    }
});