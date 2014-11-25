define([
    'angular',

    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/scrollTab',
    './directives/resizable',

    './services/DialogService'
], function (
    angular,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
    scrollTab,
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
        scrollTab: scrollTab,
        loadingIcon: loadingIcon
    });
});