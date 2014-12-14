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
        async: '../bower_components/requirejs-plugins/src/async',
        d3: '../bower_components/d3/d3',
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
            deps: ['angular', 'lodash', 'globalEventEmitter']
        },
        angularAnimate: {
            deps: ['angular']
        },
        template: {
            deps: ['angular']
        },
        moment: {
            exports: 'moment'
        }
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

// using require() here, so that the related js files will be included in genereated js file build/myservice.build.js by requireJS. require.config.deps won't work withe requireJS build.
require(["bootstrap"]);