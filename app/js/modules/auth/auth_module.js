define([
    'angular',
    './controllers/LoginFormCtrl',

    './services/HttpSession',
    './services/SessionUser'
], function (
    angular,
    LoginFormCtrl,

    HttpSession,
    SessionUser
) {
    var module = angular.module('appMonitor.auth', ['appMonitor.config', 'restangular']);

    module.controller({
        LoginFormCtrl: LoginFormCtrl
    });

    module.service({
        HttpSession: HttpSession,
        SessionUser: SessionUser
    });

    module.run(['$rootScope', '$location',
        function($rootScope, $location) {
            // on every change of route check if user is logged in
            $rootScope.$on('$routeChangeStart', function(event, next, current) {

            });
        }
    ]);
});