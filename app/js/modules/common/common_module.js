define([
    'angular',
    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',

    './services/DialogService'
], function (
    angular,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
    DialogService
) {
    var module = angular.module('appMonitor.common', []);

    module.directive({
        myxPattern: pattern,
        myxFastClick: fastclick,
        myxParseInt: myxParseInt,
        myxCloseWhenOutsideClick: myxCloseWhenOutsideClick,
        DialogService: DialogService,
        loadingIcon: loadingIcon
    });
});