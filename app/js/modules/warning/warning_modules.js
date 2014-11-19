define([
    'angular',
    './controllers/WarningPanelCtrl'
], function(
    angular,
    WarningPanelCtrl
){
    var module = angular.module('appmonitor.warning', []);

    module.controller({
        WarningPanelCtrl: WarningPanelCtrl
    });
});