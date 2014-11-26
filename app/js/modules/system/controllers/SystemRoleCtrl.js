define(function(){
    return ['$scope', 'Restangular', 'DialogService', SystemRoleCtrl];

    function SystemRoleCtrl($scope, Restangular, DialogService){
        var loading = true;
        var isCreate = false;
        $scope.roleForm = {

        };
        $scope.deleteRole = function(){
            DialogService.showConfirm(
                '删除角色',
                '确定要删除选中角色？',
                function() {

                }, null
            );
        };

        $scope.selectAll = function(){

        };

        $scope.addRole = function(){

        };

        $scope.editRole = function(role){

        };

        $scope.saveRole = function(){
            if(!$scope.roleForm.isValid()){
                return false;
            }
            loading = true;
            Restangular.one('system/role', 'merge').post({}).then(function success(data){

            },
            function failure(errorResponse){

            })
            .finally(function(){
               loading = false;
            });
        };

        function initRolelist(){
            Restangular.one('system/role', 'list').post().then(function success(data){

                },
                function failure(errorResponse){

                })
                .finally(function(){
                    loading = false;
                });
            $scope.roleList = [{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },{
                pk: 1,
                name: 'aaa',
                desc: 'desc'
            },
            ];
        }

        initRolelist();

        $scope.topScope.isLoading = function(){
            return loading;
        };
    }
});