define([
    'angular',

    './controllers/SystemUserCtrl',
    './controllers/SystemRoleCtrl',
    './controllers/SystemConfigureCtrl',

    './services/SystemRoleService'
], function(
    angular,

    SystemUserCtrl,
    SystemRoleCtrl,
    SystemConfigureCtrl,

    SystemRoleService
){
    var module = angular.module('appMonitor.system', []);

    module.controller({
        SystemUserCtrl: SystemUserCtrl,
        SystemRoleCtrl: SystemRoleCtrl,
        SystemConfigureCtrl: SystemConfigureCtrl
    });

    module.factory({
        SystemRoleService: SystemRoleService
    });
});