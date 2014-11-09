define([
    'angular',
    './controllers/ManageCtrl'
], function (
    angular,
    ManageCtrl
) {
    var module = angular.module('appMonitor.manage', []);

    module.controller({
        ManageCtrl: ManageCtrl
    });
});
