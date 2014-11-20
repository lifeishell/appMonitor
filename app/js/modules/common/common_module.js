define([
    'angular',
    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/scrollMenu',
    './directives/resizable',

    './services/DialogService'
], function (
    angular,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
    scrollMenu,
    resizable,
    DialogService
) {
    var module = angular.module('appMonitor.common', []);

    module.directive({
        myxPattern: pattern,
        myxFastClick: fastclick,
        myxParseInt: myxParseInt,
        myxCloseWhenOutsideClick: myxCloseWhenOutsideClick,
        resizable: resizable,
        DialogService: DialogService,
        scrollMenu: scrollMenu,
        loadingIcon: loadingIcon
    });
});