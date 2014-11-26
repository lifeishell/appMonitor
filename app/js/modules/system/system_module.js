define([
    'angular',

    './controllers/SystemUserCtrl',
    './controllers/SystemRoleCtrl',
    './controllers/SystemConfigurationCtrl',

    './services/SystemRoleService'
], function(
    angular,

    SystemUserCtrl,
    SystemRoleCtrl,
    SystemConfigurationCtrl,

    SystemRoleService
){
    var module = angular.module('appMonitor.system', []);

    module.controller({
        SystemUserCtrl: SystemUserCtrl,
        SystemRoleCtrl: SystemRoleCtrl,
        SystemConfigurationCtrl: SystemConfigurationCtrl
    });

    module.factory({
        SystemRoleService: SystemRoleService
    });
});