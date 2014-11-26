define(function(){
    return ['$scope', 'Restangular', 'DialogService', 'OverlayService', 'SystemRoleService', SystemUserCtrl];

    function SystemUserCtrl($scope, Restangular, DialogService, OverlayService, SystemRoleService){

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

        $scope.editUser = function(user){
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
                        //TODO
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
                //TODO
            },
            function failure(errorReponse){
                $scope.showSaveFailedDialog(
                    '保存失败',
                    '用户保存失败'
                );
            })
            .finally(function(){
                loading=false;
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
                //TODO
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
            $scope.userList = [{
                pk: 1,
                username: 'aaa',
                password: 'bbb',
                email: 'aaa@aaa.com',
                role_name: 'roleA',
                role_pk: 1,
                desc: 'desc',
                last_login: new Date(),
                super_user: true
            },
            {
                pk: 1,
                username: 'aaa',
                password: 'bbb',
                email: 'aaa@aaa.com',
                role_name: 'roleA',
                role_pk: 2,
                desc: 'desc',
                last_login: new Date(),
                super_user: true
            },
                {
                    pk: 1,
                    username: 'bbb',
                    password: 'bbb',
                    email: 'aaa@aaa.com',
                    role_name: 'roleA',
                    role_pk: 'c',
                    desc: 'desc',
                    last_login: new Date(),
                    super_user: true
                },
                {
                    pk: 1,
                    username: 'ccc',
                    password: 'bbb',
                    email: 'aaa@aaa.com',
                    role_name: 'roleA',
                    role_pk: 1,
                    desc: 'desc',
                    last_login: new Date(),
                    super_user: true
                },
                {
                    pk: 1,
                    username: 'ddd',
                    password: 'bbb',
                    email: 'aaa@aaa.com',
                    role_name: 'roleA',
                    role_pk: 1,
                    desc: 'desc',
                    last_login: new Date(),
                    super_user: true
                },
                {
                    pk: 1,
                    username: 'aaa',
                    password: 'bbb',
                    email: 'aaa@aaa.com',
                    role_name: 'roleA',
                    role_pk: 1,
                    desc: 'desc',
                    last_login: new Date(),
                    super_user: true
                },
                {
                    pk: 1,
                    username: 'aaa',
                    password: 'bbb',
                    email: 'aaa@aaa.com',
                    role_name: 'roleA',
                    role_pk: 2,
                    desc: 'desc',
                    last_login: new Date(),
                    super_user: true
                }
            ];
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

            pagenation();
        };

        pagenation(0, 15);

        function pagenation(offset, limit) {
            var param={offset: offset, limit: limit};

            if(offset<0){
                return;
            }
            if (offset==='') {
                return;
            }
        }


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