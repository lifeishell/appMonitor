define([
    'angular',

    './controllers/DialogBoxCtrl',
    './controllers/uiLayoutCtrl',

    './directives/pattern',
    './directives/fastclick',
    './directives/parseInt',
    './directives/closeWhenOutsideClick',
    './directives/loadingIcon',
    './directives/scrollTab',
    './directives/resizable',
    './directives/uiLayout',
    './directives/uiLayoutContainer',
    './directives/uiSplitbar',
    './directives/pagination',

    './services/DialogService',
    './services/OverlayService',
    './services/LayoutContainer'
], function (
    angular,
    DialogBoxCtrl,
    uiLayoutCtrl,

    myxPattern,
    fastclick,
    myxParseInt,
    closeWhenOutsideClick,
    loadingIcon,
    scrollTab,
    resizable,
    uiLayout,
    uiLayoutContainer,
    uiSplitbar,
    pagination,

    DialogService,
    OverlayService,
    LayoutContainer
) {
    var module = angular.module('appMonitor.common', []);

    module.factory({
        DialogService: DialogService,
        OverlayService: OverlayService,
        LayoutContainer: LayoutContainer
    });

    module.controller({
        DialogBoxCtrl: DialogBoxCtrl,
        uiLayoutCtrl: uiLayoutCtrl
    });

    module.directive({
        myxPattern: myxPattern,
        myxFastClick: fastclick,
        myxParseInt: myxParseInt,
        closeWhenOutsideClick: closeWhenOutsideClick,
        resizable: resizable,
        scrollTab: scrollTab,
        loadingIcon: loadingIcon,
        uiLayout: uiLayout,
        uiLayoutContainer: uiLayoutContainer,
        uiSplitbar: uiSplitbar,
        pagination: pagination
    });
});