define([
    'angular',
    './controllers/AppCtrl',
    './controllers/HeaderCtrl',
    './controllers/DashboardCtrl',

    './services/SectionsService'
], function (
    angular,
    AppCtrl,
    HeaderCtrl,
    DashboardCtrl,

    SectionsService
) {
    var module = angular.module('appMonitor.app', ['appMonitor.config', 'restangular']);

    module.controller({
        AppCtrl: AppCtrl,
        HeaderCtrl: HeaderCtrl,
        DashboardCtrl: DashboardCtrl
    });

    module.factory({
        SectionsService: SectionsService
    });

    module.run(['$rootScope', '$location',
        function($rootScope, $location) {
            // on every change of route check if user is logged in
            $rootScope.$on('$routeChangeStart', function(event, next, current) {

            });
        }
    ]);
});