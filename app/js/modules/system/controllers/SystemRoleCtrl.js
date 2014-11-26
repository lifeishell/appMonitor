define(function(){
    return ['$scope', 'Restangular', 'DialogService', SystemRoleCtrl];

    function SystemRoleCtrl($scope, Restangular, DialogService){
        var loading = true;
        var storedRole = null;

        function createRole(){
            return {
                pk: null,
                name: null,
                desc: null
            };
        }

        $scope.deleteRole = function(){
            DialogService.showConfirm(
                '删除角色',
                '确定要删除选中角色？',
                function() {
                    loading = true;
                    Restangular.one('system/role', 'delete').post({}).then(function success(data){
                            //TODO
                        },
                        function failure(errorResponse){
                            $scope.showSaveFailedDialog(
                                '角色删除失败',
                                '角色删除失败'
                            );
                        })
                        .finally(function(){
                            loading = false;
                        });
                }, null
            );
        };

        $scope.addRole = function(){
            $scope.editRole = createRole();
            //init flying term form
            OverlayService.setContent('新建角色', 'js/modules/system/templates/roleForm.html');
            OverlayService.setOuterScope($scope);

            OverlayService.show();
        };

        $scope.modifyRole = function($event, role){
            $event.stopPropagation();
            $scope.editRole = role;
            storedRole= angular.copy(role);
            OverlayService.setContent('修改角色', 'js/modules/system/templates/roleForm.html');
            OverlayService.setOuterScope($scope);

            OverlayService.show($scope.cleanStoredRole());
        };

        $scope.cleanStoredRole = function(){
            if(storedRole){
                storedRole = null;
            }
        };

        $scope.resetForm = function(){
            if(storedRole){
                $scope.editRole = angular.copy(storedRole);
            } else {
                $scope.editRole = createRole();
            }
        };

        $scope.saveRole = function(){
            if($scope.roleForm.$invalid){
                return false;
            }
            loading = true;
            Restangular.one('system/role', 'merge').post({}).then(function success(data){

            },
            function failure(errorResponse){
                $scope.showSaveFailedDialog(
                    '保存失败',
                    '角色保存失败'
                );
            })
            .finally(function(){
               loading = false;
            });
        };

        function initRolelist(){
            Restangular.one('system/role', 'list').post().then(function success(data){

                },
                function failure(errorResponse){
                    $scope.showSaveFailedDialog(
                        '角色加载失败',
                        '角色列表读取失败'
                    );
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

        /*
         * handle page order
         */
        $scope.order = {
            field: null,
            reverse: false
        };

        $scope.search = {};

        $scope.orderBy = function(field){
            if($scope.order.field===field){
                $scope.order.reverse = !$scope.order.reverse;
            }else{
                $scope.order.reverse = false;
            }
            $scope.order.field = field;

            pagenation();
        };

        $scope.toggleSelectAll = function(){
            if($scope.selectAll){
                _.each($scope.roleList, function(role){
                    role.selected = true;
                });
            }else{
                _.each($scope.roleList, function(role){
                    role.selected = false;
                });
            }
        };

        $scope.$watch(function(){
            return _.any($scope.roleList, {selected:false});
        }, function(hasUnchosen){
            if(hasUnchosen){
                $scope.selectAll = false;
            }
        });

        $scope.topScope.isLoading = function(){
            return loading;
        };
    }
});