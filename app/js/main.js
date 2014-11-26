define([
    'angular',
    'config',
    'modules/common/common_module',
    'modules/app/app_module',
    'modules/auth/auth_module',
    'modules/mainpage/mainpage_module',
    'modules/system/system_module',
    'template'
], function(angular) {
    // add template support for building process
    try {
        angular.module("template");
    } catch (e) {
        angular.module("template", []);
    }

    // Declare app level module which depends on filters, and services
    angular.module('appMonitor', [
        'ngRoute',
        'restangular',
        //'ngAnimate',
        'ngSanitize',
        'appMonitor.config',
        'appMonitor.common',
        'appMonitor.app',
        'appMonitor.auth',
        'appMonitor.mainpage',
        'appMonitor.system',
        'template'
    ])
        .config(['$routeProvider', 'API_HOST', 'API_URL', 'RestangularProvider',
            function($routeProvider, API_HOST, API_URL, RAProvider) {
                $routeProvider
                    .when('/login', {
                        templateUrl: 'js/modules/auth/templates/login.html',
                        controller: 'LoginPageCtrl',
                        pageType: 'login'
                    })
                    .when('/:sectionId', {
                        templateUrl: 'js/modules/app/templates/dashboard.html',
                        controller: 'DashboardCtrl',
                        pageType: 'edit'
                    })
                    .otherwise({
                        redirectTo: '/login'
                    });

                RAProvider
                    .setBaseUrl(API_HOST + API_URL)
                    .setResponseInterceptor(function(element, operation, what, url, response, deferred) {
                        return response.data;
                    });
            }
        ]).run([
            'Restangular',
            'DEBUG',
            '$location',
            function(Restangular, DEBUG, $location) {

                Restangular.setErrorInterceptor(function(response, index) {
                    switch (response.status) {
                        // On unauthorized error, redirect to login
                        case 401:
                            sessionStorage.setItem("redirectPath", $location.path());
                            $location.path('login');
                            break;
                        default:
                            // need to handle general error later.
                    }
                });
            }
        ]);
});