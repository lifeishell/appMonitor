define([
    'angular',
    './controllers/MainPageCtrl',

    './directives/myxNetworkMap'
], function (
    angular,
    MainPageCtrl,
    myxNetworkMap
) {
    var module = angular.module('appMonitor.mainPage', []);

    module.controller({
        MainPageCtrl: MainPageCtrl
    });

    module.directive({
        myxNetworkMap: myxNetworkMap
    });
});
