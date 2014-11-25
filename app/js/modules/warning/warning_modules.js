define([
    'angular',
    './controllers/WarningPanelCtrl'
], function(
    angular,
    WarningPanelCtrl
){
    var module = angular.module('appMonitor.warning', []);

    module.controller({
        WarningPanelCtrl: WarningPanelCtrl
    });
});