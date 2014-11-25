define(function(){
    return ['$scope', 'DialogService', SystemUserCtrl];

    function SystemUserCtrl($scope, DialogService){
        DialogService.showConfirm(
            gettext('Delete Invitation?'),
            gettext('Do you really want to delete this invitation?'),
            function() {
                $scope.loading = true;
                StaffApiService.deleteInvitation(api, $routeParams.id, person.id).then(function() {
                    $scope.staffList = _.without($scope.staffList, _.find($scope.staffList, { id: person.id }));
                }).finally(function() {
                    $scope.loading = false;
                });
            }, null
        );
    }
});