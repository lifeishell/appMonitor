define([
    'angular',
    './controllers/LoginPageCtrl',

    './services/SessionUser'
], function (
    angular,
    LoginPageCtrl,

    SessionUser
) {
    var module = angular.module('appMonitor.auth', ['appMonitor.config', 'restangular']);

    module.controller({
        LoginPageCtrl: LoginPageCtrl
    });

    module.service({
        SessionUser: SessionUser
    });
});