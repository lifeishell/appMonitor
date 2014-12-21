define([
    '../fixture'
    ],
function(fixture){
    return ['$scope', '$filter', 'Restangular', 'DialogService', 'OverlayService', 'SystemRoleService', SystemUserCtrl];

    function SystemUserCtrl($scope, $filter, Restangular, DialogService, OverlayService, SystemRoleService){

        var loading = true;
        var storedUser = null;

        function createUser(){
            return {
                pk: null,
                username: null,
                password: null,
                role_pk: null,
                email: null,
                desc: null
            };
        }
        $scope.paginatorList = [];

        SystemRoleService.getRoles().then(function(data){
           $scope.roleChoice = data;
        });

        $scope.addUser = function(){
            $scope.editUser = createUser();
            //init flying term form
            OverlayService.setContent('新建用户', 'js/modules/system/templates/userForm.html');
            OverlayService.setOuterScope($scope);

            OverlayService.show();
        };

        $scope.modifyUser = function($event, user){
            $event.stopPropagation();
            $scope.editUser = user;
            storedUser = angular.copy(user);
            OverlayService.setContent('修改用户', 'js/modules/system/templates/userForm.html');
            OverlayService.setOuterScope($scope);

            OverlayService.show($scope.cleanStoredUser);
        };

        $scope.cleanStoredUser = function(){
            if(storedUser){
                storedUser = null;
            }
        };

        $scope.deleteUser = function(){
            DialogService.showConfirm(
                '删除用户',
                '确定要删除选中用户？',
                function() {
                    loading = true;
                    Restangular.one('system/user', 'delete').post({}).then(function success(data){
                        initUserlist();
                    },
                    function failure(errorResponse){
                        $scope.showSaveFailedDialog(
                            '用户删除失败',
                            '用户删除失败'
                        );
                    })
                    .finally(function(){
                        loading = false;
                    });
                }, null
            );
        };

        $scope.saveUser = function(){
            if($scope.userForm.$invalid){
                return false;
            }
            loading = true;
            Restangular.one('system/user', 'merge').post({}).then(function success(data){
                initUserlist();
            },
            function failure(errorReponse){
                $scope.showSaveFailedDialog(
                    '保存失败',
                    '用户保存失败'
                );
            })
            .finally(function(){
                loading=false;
                OverlayService.hide();
            });
        };

        $scope.resetForm = function(){
           if(storedUser){
               $scope.editUser = angular.copy(storedUser);
           } else {
               $scope.editUser = createUser();
           }
        };

        function initUserlist(){

            Restangular.one('system/user', 'list').post().then(function success(data){
                $scope.userList = data;
                $scope.doSort();
            },
            function failure(errorResponse){
                $scope.showSaveFailedDialog(
                    '用户加载失败',
                    '用户列表读取失败'
                );
            })
            .finally(function(){
                loading = false;
            });
            //todo remove
            $scope.userList = fixture.usersList;
            $scope.doSort();
        }

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

            $scope.doSort();
        };

        $scope.doSort = function(){
            var searchedQuery = $filter('filter')($scope.userList, $scope.search);
            $scope.orderdAndStortedList = $filter('orderBy')(searchedQuery, $scope.order.field, $scope.order.reverse);
        };


        initUserlist();

        $scope.selectedUsers =  function() {
            return _.any($scope.userList, {selected: true});
        };

        $scope.toggleSelectAll = function(){
            if($scope.selectAll){
                _.each($scope.userList, function(user){
                    user.selected = true;
                });
            }else{
                _.each($scope.userList, function(user){
                    user.selected = false;
                });
            }
        };

        $scope.$watch(function(){
            return _.any($scope.userList, {selected:false});
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