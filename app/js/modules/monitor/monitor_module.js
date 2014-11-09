define([
    'angular',
    './controllers/ApplicationCtrl',
    './controllers/ServerCtrl',
    './controllers/ServiceCtrl'
], function (
    angular,
    ApplicationCtrl,
    ServerCtrl,
    ServiceCtrl
) {
    var module = angular.module('appMonitor.monitor', []);

    module.controller({
        ApplicationCtrl: ApplicationCtrl,
        ServerCtrl: ServerCtrl,
        ServiceCtrl: ServiceCtrl
    });
});
