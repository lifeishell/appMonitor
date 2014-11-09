require.config({
    // List of all the dependencies
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        text: '../bower_components/requirejs-text/text',
        lodash: '../bower_components/lodash/dist/lodash',
        moment: '../bower_components/moment/moment',
        fastclick: '../bower_components/fastclick/lib/fastclick',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        angularCookies: '../bower_components/angular-cookies/angular-cookies',
        angularAnimate: '../bower_components/angular-animate/angular-animate',
        angularSanitize: '../bower_components/angular-sanitize/angular-sanitize',
        angularOnce: '../bower_components/angular-once/once',
        restangular: '../bower_components/restangular/src/restangular',
        'jquery.ui.core': '../bower_components/jquery.ui/ui/jquery.ui.core',
        'jquery.ui.widget': '../bower_components/jquery.ui/ui/jquery.ui.widget',
        'jquery.ui.mouse': '../bower_components/jquery.ui/ui/jquery.ui.mouse',
        'jquery.ui.sortable': '../bower_components/jquery.ui/ui/jquery.ui.sortable',
        'jquery.ui.draggable': '../bower_components/jquery.ui/ui/jquery.ui.draggable',
        'jquery-ui-touch-punch': '../bower_components/jqueryui-touch-punch/jquery.ui.touch-punch',
        jqplot: '../bower_components/jqplot/jquery.jqplot',
        'jqplot.barRenderer': '../bower_components/jqplot/plugins/jqplot.barRenderer',
        'jqplot.categoryAxisRenderer': '../bower_components/jqplot/plugins/jqplot.categoryAxisRenderer',
        'jqplot.funnelRenderer': '../bower_components/jqplot/plugins/jqplot.funnelRenderer',
        async: '../bower_components/requirejs-plugins/src/async',
        // Cached templates
        template: './template',
        eventEmitter: '../bower_components/eventEmitter/EventEmitter'
    },
    // Ensure that the dependencies are loaded in the right order
    shim: {
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularMocks: {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        angularCookies: {
            deps: ['angular']
        },
        angularSanitize: {
            deps: ['angular']
        },
        angularOnce: {
            deps: ['angular']
        },
        restangular: {
            deps: ['angular', 'lodash']
        },
        angularAnimate: {
            deps: ['angular']
        },
        'jquery.ui.core': {
            deps: ['jquery']
        },
        'jquery.ui.widget': {
            deps: ['jquery.ui.core']
        },
        'jquery.ui.mouse': {
            deps: ['jquery.ui.widget']
        },
        'jquery.ui.sortable': {
            deps: ['jquery.ui.mouse']
        },
        'jquery.ui.draggable': {
            deps: ['jquery.ui.mouse']
        },
        'jquery-ui-touch-punch': {
            deps: ['jquery.ui.sortable', 'jquery.ui.draggable']
        },
        'jqplot.categoryAxisRenderer': {
            deps: ['jqplot']
        },
        'jqplot.barRenderer': {
            deps: ['jqplot', 'jqplot.categoryAxisRenderer']
        },
        'jqplot.funnelRenderer': {
            deps: ['jqplot']
        },
        template: {
            deps: ['angular']
        }
    }
});

// using require() here, so that the related js files will be included in genereated js file build/myservice.build.js by requireJS. require.config.deps won't work withe requireJS build.
require(["bootstrap"]);