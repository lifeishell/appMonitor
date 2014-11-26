define([
    'angular',

    './controllers/DialogBoxCtrl',

    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/scrollTab',
    './directives/resizable',

    './services/DialogService',
    './services/OverlayService'
], function (
    angular,
    DialogBoxCtrl,
    pattern,
    fastclick,
    myxParseInt,
    myxCloseWhenOutsideClick,
    loadingIcon,
    scrollTab,
    resizable,
    DialogService,
    OverlayService
) {
    var module = angular.module('appMonitor.common', []);

    module.controller({
        DialogBoxCtrl: DialogBoxCtrl
    });

    module.directive({
        myxPattern: pattern,
        myxFastClick: fastclick,
        myxParseInt: myxParseInt,
        myxCloseWhenOutsideClick: myxCloseWhenOutsideClick,
        resizable: resizable,
        scrollTab: scrollTab,
        loadingIcon: loadingIcon
    });

    module.factory({
        DialogService: DialogService,
        OverlayService: OverlayService
    });
});