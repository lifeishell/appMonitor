define(function(){
    return ['LayoutContainer', uiSplitbar];

    function uiSplitbar(LayoutContainer) {
        // Get all the page.
        var htmlElement = angular.element(document.body.parentElement);
        return {
            restrict: 'EAC',
            require: '^uiLayout',
            scope: {},
            link: function (scope, element, attrs, ctrl) {
                if (!element.hasClass('stretch'))
                    element.addClass('stretch');
                if (!element.hasClass('ui-splitbar'))
                    element.addClass('ui-splitbar');
                scope.splitbar = LayoutContainer.Splitbar();
                scope.splitbar.element = element;
                //chevron <a> elements
                var prevButton = angular.element(element.children()[0]);
                var afterButton = angular.element(element.children()[1]);
                //chevron <span> elements
                var prevChevron = angular.element(prevButton.children()[0]);
                var afterChevron = angular.element(afterButton.children()[0]);
                //chevron bootstrap classes
                var chevronLeft = 'glyphicon-chevron-left';
                var chevronRight = 'glyphicon-chevron-right';
                var chevronUp = 'glyphicon-chevron-up';
                var chevronDown = 'glyphicon-chevron-down';
                var prevChevronClass = ctrl.isUsingColumnFlow ? chevronLeft : chevronUp;
                var afterChevronClass = ctrl.isUsingColumnFlow ? chevronRight : chevronDown;
                prevChevron.addClass(prevChevronClass);
                afterChevron.addClass(afterChevronClass);
                prevButton.on('click', function () {
                    var prevSplitbarBeforeButton, prevSplitbarAfterButton;
                    var result = ctrl.toggleBefore(scope.splitbar);
                    var previousSplitbar = ctrl.getPreviousSplitbarContainer(scope.splitbar);
                    if (previousSplitbar !== null) {
                        prevSplitbarBeforeButton = angular.element(previousSplitbar.element.children()[0]);
                        prevSplitbarAfterButton = angular.element(previousSplitbar.element.children()[1]);
                    }
                    if (ctrl.isUsingColumnFlow) {
                        if (result) {
                            afterButton.css('display', 'none');
                            prevChevron.removeClass(chevronLeft);
                            prevChevron.addClass(chevronRight);
                            // hide previous splitbar buttons
                            if (previousSplitbar !== null) {
                                prevSplitbarBeforeButton.css('display', 'none');
                                prevSplitbarAfterButton.css('display', 'none');
                            }
                        } else {
                            afterButton.css('display', 'inline');
                            prevChevron.removeClass(chevronRight);
                            prevChevron.addClass(chevronLeft);
                            // show previous splitbar chevrons
                            if (previousSplitbar !== null) {
                                prevSplitbarBeforeButton.css('display', 'inline');
                                prevSplitbarAfterButton.css('display', 'inline');
                            }
                        }
                    } else {
                        if (result) {
                            afterButton.css('display', 'none');
                            prevChevron.removeClass(chevronUp);
                            prevChevron.addClass(chevronDown);
                            // hide previous splitbar buttons
                            if (previousSplitbar !== null) {
                                prevSplitbarBeforeButton.css('display', 'none');
                                prevSplitbarAfterButton.css('display', 'none');
                            }
                        } else {
                            afterButton.css('display', 'inline');
                            prevChevron.removeClass(chevronDown);
                            prevChevron.addClass(chevronUp);
                            // show previous splitbar chevrons
                            if (previousSplitbar !== null) {
                                prevSplitbarBeforeButton.css('display', 'inline');
                                prevSplitbarAfterButton.css('display', 'inline');
                            }
                        }
                    }
                });
                afterButton.on('click', function () {
                    var nextSplitbarBeforeButton, nextSplitbarAfterButton;
                    var result = ctrl.toggleAfter(scope.splitbar);
                    var nextSplitbar = ctrl.getNextSplitbarContainer(scope.splitbar);
                    if (nextSplitbar !== null) {
                        nextSplitbarBeforeButton = angular.element(nextSplitbar.element.children()[0]);
                        nextSplitbarAfterButton = angular.element(nextSplitbar.element.children()[1]);
                    }
                    if (ctrl.isUsingColumnFlow) {
                        if (result) {
                            prevButton.css('display', 'none');
                            afterChevron.removeClass(chevronRight);
                            afterChevron.addClass(chevronLeft);
                            // hide next splitbar buttons
                            if (nextSplitbar !== null) {
                                nextSplitbarBeforeButton.css('display', 'none');
                                nextSplitbarAfterButton.css('display', 'none');
                            }
                        } else {
                            prevButton.css('display', 'inline');
                            afterChevron.removeClass(chevronLeft);
                            afterChevron.addClass(chevronRight);
                            // show next splitbar buttons
                            if (nextSplitbar !== null) {
                                nextSplitbarBeforeButton.css('display', 'inline');
                                nextSplitbarAfterButton.css('display', 'inline');
                            }
                        }
                    } else {
                        if (result) {
                            prevButton.css('display', 'none');
                            afterChevron.removeClass(chevronDown);
                            afterChevron.addClass(chevronUp);
                            // hide next splitbar buttons
                            if (nextSplitbar !== null) {
                                nextSplitbarBeforeButton.css('display', 'none');
                                nextSplitbarAfterButton.css('display', 'none');
                            }
                        } else {
                            prevButton.css('display', 'inline');
                            afterChevron.removeClass(chevronUp);
                            afterChevron.addClass(chevronDown);
                            // show next splitbar buttons
                            if (nextSplitbar !== null) {
                                nextSplitbarBeforeButton.css('display', 'inline');
                                nextSplitbarAfterButton.css('display', 'inline');
                            }
                        }
                    }
                });
                element.on('mousedown touchstart', function (e) {
                    ctrl.movingSplitbar = scope.splitbar;
                    ctrl.processSplitbar(scope.splitbar);
                    e.preventDefault();
                    e.stopPropagation();
                    htmlElement.on('mousemove touchmove', function (event) {
                        scope.$apply(angular.bind(ctrl, ctrl.mouseMoveHandler, event));
                    });
                    return false;
                });
                htmlElement.on('mouseup touchend', function (event) {
                    scope.$apply(angular.bind(ctrl, ctrl.mouseUpHandler, event));
                    htmlElement.off('mousemove touchmove');
                });
                scope.$watch('splitbar.size', function (newValue) {
                    element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
                });
                scope.$watch('splitbar.' + ctrl.sizeProperties.flowProperty, function (newValue) {
                    element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
                });
                //Add splitbar to layout container list
                ctrl.addContainer(scope.splitbar);
            }
        };
    }
});