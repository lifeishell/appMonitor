define([
    'angular',

    './controllers/SystemUserCtrl',
    './controllers/SystemRoleCtrl',
    './controllers/SystemConfigurationCtrl'
], function(
    angular,

    SystemUserCtrl,
    SystemRoleCtrl,
    SystemConfigurationCtrl
){
    var module = angular.module('appMonitor.system', []);

    module.controller({
        SystemUserCtrl: SystemUserCtrl,
        SystemRoleCtrl: SystemRoleCtrl,
        SystemConfigurationCtrl: SystemConfigurationCtrl
    });
});