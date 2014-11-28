define(function(){
    return ['$scope', 'Restangular', 'DialogService', 'OverlayService', SystemConfigurationCtrl];

    function SystemConfigurationCtrl($scope, Restangular, DialogService, OverlayService){
        var loading = true;
        var storedConfig = null;

        $scope.cleanStoredConfig = function(){
            if(storedConfig){
                storedConfig = null;
            }
        };

        $scope.saveConfig = function(){
            if($scope.configForm.$invalid){
                return false;
            }
            loading = true;
            Restangular.one('system/config', 'merge').post('', $scope.editConfig).then(function success(data){
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
            if(storedConfig){
                $scope.editConfig = angular.copy(storedConfig);
            } else {
                $scope.editConfig = storedConfig();
            }
        };

        function initConfig(){

            Restangular.one('system/config', 'list').post().then(function success(data){
                    //TODO
                },
                function failure(errorResponse){
                    $scope.showSaveFailedDialog(
                        '系统设置加载失败',
                        '系统设置读取失败'
                    );
                })
                .finally(function(){
                    loading = false;
                });
            $scope.editConfig = {
                //smtp
                smtp_host: '10.2.30.255',
                smtp_port: 25,
                smtp_username: 'bbb',
                smtp_password: 'aaa',
                smtp_from_email: 'aaa@aaa.com',
                smtp_use_tls: false,
                //sms
                sms_ip: '10.2.31.2',
                sms_port: 443,
                sms_user_name: 'sdfsdf',
                sms_password: 'bbb',
                sms_from_number:0,

                //security
                password_validation_min_lower:1,
                password_validation_min_upper:3,
                password_validation_min_special:4,
                password_validation_min_number:5,
                password_validation_min_length:6,
                login_fail_times:23,

                //others
                log_max_days:10,
                monitor_max_days:5,
                alarm_max_days:1,
                notify_time_from: '',
                notify_time_to:''
            };

            storedConfig = angular.copy($scope.editConfig);
        }

        initConfig();
    }
});