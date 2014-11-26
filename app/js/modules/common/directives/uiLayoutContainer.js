define(function(){
    return ['LayoutContainer', uiLayoutContainer];

    function uiLayoutContainer(LayoutContainer){
        return {
            restrict: 'AE',
            require: '^uiLayout',
            scope: {},
            compile: function (element) {
                //TODO: add ability to disable auto-adding a splitbar after the container
                var splitbar = angular.element('<div ui-splitbar><a><span class="glyphicon"></span></a><a><span class="glyphicon"></span></a></div>');
                element.after(splitbar);
                return {
                    pre: function (scope, element, attrs, ctrl) {
                        scope.container = LayoutContainer.Container();
                        scope.container.element = element;
                        ctrl.addContainer(scope.container);
                    },
                    post: function (scope, element, attrs, ctrl) {
                        if (!element.hasClass('stretch'))
                            element.addClass('stretch');
                        if (!element.hasClass('ui-layout-container'))
                            element.addClass('ui-layout-container');
                        scope.$watch('container.size', function (newValue) {
                            element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
                        });
                        scope.$watch('container.' + ctrl.sizeProperties.flowProperty, function (newValue) {
                            element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
                        });
                    }
                };
            }
        };
    }
});