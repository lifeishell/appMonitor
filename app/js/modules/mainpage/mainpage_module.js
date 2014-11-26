define([
    'angular',
    './controllers/MainPageCtrl'
], function (
    angular,
    MainPageCtrl
) {
    var module = angular.module('appMonitor.mainpage', []);

    module.controller({
        MainPageCtrl: MainPageCtrl
    });
});
