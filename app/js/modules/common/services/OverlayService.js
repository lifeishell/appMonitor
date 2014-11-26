define(function() {
    function overlayService($document, $compile, $rootScope) {
        var body = $document.find('body');
        var scope = $rootScope.$new();
        scope.shown = false;
        scope.hideCallback = null;
        var element;
        
        function createModalElement() {
            if(element) {
                element.remove();
            }
            element = angular.element(
                '<div class="flying-term" ng-show="shown">' +
                '<div class="flying-term--container">' +
                '<h1><i class="icon-close" myx-fast-click ng-click="returnObject.hide()"></i> {{ title }}</h1>' +
                '<div class="flying-term--content" ng-include="templatePath"></div>' +
                '</div>' +
                '</div>');
            $compile(element)(scope);
            body.append(element);
        }
        // @example
        //  OverlayService.setContent('My overlays title','js/modules/xyz/templates/xyz.html');
        //  OverlayService.setOuterScope($scope);
        //  OverlayService.show();
        var returnObject = scope.returnObject = {
            setContent: function(title, templatePath) {
                scope.title = title;
                scope.templatePath = templatePath;
            },
            setOuterScope: function(outerScope) {
                scope.outerScope = outerScope;
            },
            show: function(hideCallback, restart) {
                if (restart || !element) {
                    createModalElement();
                }
                if (typeof hideCallback !== 'undefined') {
                    scope.hideCallback = hideCallback;
                }
                scope.shown = true;
            },
            hide: function() {
                scope.shown = false;
                if (scope.hideCallback) {
                    scope.hideCallback();
                    scope.hideCallback = null;
                }
            }
        };
        return returnObject;
    }

    return ['$document', '$compile', '$rootScope', overlayService];
});