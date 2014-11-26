define([
    '../controllers/uiLayoutCtrl'
],
function(uiLayoutCtrl) {
    return ['$window', uiLayout];

    function uiLayout($window) {
        return {
            restrict: 'AE',
            controller: uiLayoutCtrl,
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(element[0][ctrl.sizeProperties.offsetName], function () {
                    ctrl.updateDisplay();
                });
                function onResize() {
                    scope.$apply(function () {
                        ctrl.updateDisplay();
                    });
                }

                angular.element($window).bind('resize', onResize);
                scope.$on('$destroy', function () {
                    angular.element($window).unbind('resize', onResize);
                });
            }
        };
    }
});