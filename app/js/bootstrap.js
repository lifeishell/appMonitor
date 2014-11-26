// Include libraries that should be included at "all times" and are dependencies
// to some other behaviors.
//
// Add some functionalities to specific parts of existing libraries
define([
    'jquery',
    'fastclick',
    'angular',
    'angularRoute',
    'angularCookies',
    'restangular',
    'angularAnimate',
    'angularSanitize',

    // modules
    'main'
], function (
    $,
    FastClick
) {
    var htmlElement = ['<div ng-controller="AppCtrl" ng-class="\'page-\'+page.type" class="app-container" id="appMonitor-app">'];
    htmlElement.push('<div id="header" ng-include src="\'js/modules/app/templates/header.html\'" ng-show="page.type===\'edit\'"></div>');
    htmlElement.push('<div class="metro" scroll-tab ng-show="page.type===\'edit\'"></div>');
    htmlElement.push('<div id="content" class="content">');
    htmlElement.push('<div class="current" ng-view></div>');
    htmlElement.push('</div>');
    htmlElement.push('</div>');

    angular.element(document).ready(function() {
        var myElement = angular.element('[app-monitor]');
        myElement.html(htmlElement.join(''));
        angular.bootstrap(myElement, ['appMonitor']);
    });
    
    require(["template"]);
});