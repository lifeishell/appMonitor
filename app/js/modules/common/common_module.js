define([
    'angular',
    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/resizable',

    './services/DialogService'
], function (
    angular,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
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
        loadingIcon: loadingIcon
    });
});