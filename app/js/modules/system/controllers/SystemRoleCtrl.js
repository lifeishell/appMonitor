define([
    '../fixture'
],
function(fixture){
    return ['$scope', '$filter', 'Restangular', 'DialogService', 'OverlayService', 'SystemRoleService', SystemRoleCtrl];

    function SystemRoleCtrl($scope, $filter, Restangular, DialogService, OverlayService, SystemRoleService){
        var loading = true;
        var storedRole = null;

        function createRole(){
            return {
                pk: null,
                name: null,
                desc: null,
                features: []
            };
        }

        $scope.paginatorList = [];

        function flaternFeatureList(){
            var featureList = [];
            _.each($scope.featureList, function(group){
                featureList.push({group: group.group});
                featureList = featureList.concat(group.features);
            });
            return featureList;
        }

        $scope.isGroup = function(feature){
            return feature.group;
        };

        SystemRoleService.getFeatures().then(function success(data){
            $scope.featureList = data;
            $scope.flaternedFeatureList = flaternFeatureList();
        },
        function fairlure(errorResponse){
        });

        $scope.updateFeatures = function(feature){
            $scope.selectedFeature = feature;
            if($scope.isGroup(feature)){
                var group = _.filter($scope.featureList, {group: feature.group})[0];
                _.each(group.features, function(groupFeatures){
                    if(!_.any($scope.editRole.features, {pk: groupFeatures.pk})){
                        $scope.editRole.features = $scope.editRole.features.concat(_.filter($scope.flaternedFeatureList, {pk: parseFloat(groupFeatures.pk)}));
                    }
                });
            } else {
                if(!_.any($scope.editRole.features, {pk: feature.pk})){
                    $scope.editRole.features = $scope.editRole.features.concat(_.filter($scope.flaternedFeatureList, {pk: parseFloat(feature.pk)}));
                }
            }
        };

        $scope.removeFeature = function(feature){
            _.remove($scope.editRole.features, {pk: feature.pk});
        };

        $scope.deleteRole = function(){
            DialogService.showConfirm(
                '删除角色',
                '确定要删除选中角色？',
                function() {
                    loading = true;
                    Restangular.one('system/role', 'delete').post({}).then(function success(data){
                            initRolelist();
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
            $scope.editRole = angular.copy(role);
            storedRole = angular.copy(role);
            OverlayService.setContent('修改角色', 'js/modules/system/templates/roleForm.html');
            OverlayService.setOuterScope($scope);

            OverlayService.show($scope.cleanStoredRole);
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
            Restangular.one('system/role', 'merge').post('', $scope.editRole).then(function success(data){
                initRolelist();
            },
            function failure(errorResponse){
                $scope.showSaveFailedDialog(
                    '保存失败',
                    '角色保存失败'
                );
            })
            .finally(function(){
                loading = false;
                OverlayService.hide();
            });
        };

        function initRolelist(){
            SystemRoleService.getRoles().then(function success(data){
                $scope.roleList = data;
                $scope.doSort();
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
        }

        initRolelist();

        $scope.selectedRoles =  function() {
            return _.any($scope.roleList, {selected: true});
        };

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
            var searchedQuery = $filter('filter')($scope.roleList, $scope.search);
            $scope.orderdAndStortedList = $filter('orderBy')(searchedQuery, $scope.order.field, $scope.order.reverse);
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