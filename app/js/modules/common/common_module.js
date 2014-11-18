define([
    'angular',
    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/scrollMenu',

    './services/DialogService'
], function (
    angular,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
    scrollMenu,
    DialogService
) {
    var module = angular.module('appMonitor.common', []);

    module.directive({
        myxPattern: pattern,
        myxFastClick: fastclick,
        myxParseInt: myxParseInt,
        myxCloseWhenOutsideClick: myxCloseWhenOutsideClick,
        DialogService: DialogService,
        scrollMenu: scrollMenu,
        loadingIcon: loadingIcon
    });
});