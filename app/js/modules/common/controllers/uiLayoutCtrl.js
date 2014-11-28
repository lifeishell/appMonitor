define(function(){
    return ['$scope', '$attrs', '$element', 'LayoutContainer', uiLayoutCtrl];

    function uiLayoutCtrl($scope, $attrs, $element, LayoutContainer) {
        var ctrl = this;
        var opts = angular.extend({}, $scope.$eval($attrs.uiLayout), $scope.$eval($attrs.options));
        var numOfSplitbars = 0;
        var lastDividerRemoved = false;
        //var cache = {};
        var animationFrameRequested;
        var lastPos;
        ctrl.containers = [];
        ctrl.movingSplitbar = null;
        ctrl.bounds = $element[0].getBoundingClientRect();
        ctrl.isUsingColumnFlow = opts.flow === 'column';
        ctrl.sizeProperties = !ctrl.isUsingColumnFlow ? {
            sizeProperty: 'height',
            offsetName: 'offsetHeight',
            flowProperty: 'top',
            oppositeFlowProperty: 'bottom',
            mouseProperty: 'clientY',
            flowPropertyPosition: 'y'
        } : {
            sizeProperty: 'width',
            offsetName: 'offsetWidth',
            flowProperty: 'left',
            oppositeFlowProperty: 'right',
            mouseProperty: 'clientX',
            flowPropertyPosition: 'x'
        };
        $element.addClass('stretch').addClass('ui-layout-' + (opts.flow || 'row'));
        // Initial global size definition
        opts.sizes = opts.sizes || [];
        opts.maxSizes = opts.maxSizes || [];
        opts.minSizes = opts.minSizes || [];
        opts.dividerSize = opts.dividerSize || 5;
        //default divider size set to 5
        opts.collapsed = opts.collapsed || [];
        ctrl.opts = opts;
        $scope.updateDisplay = function () {
            console.log(ctrl.containers);
            ctrl.updateDisplay();
        };
        function draw() {
            var position = ctrl.sizeProperties.flowProperty;
            var dividerSize = parseInt(opts.dividerSize);
            var elementSize = $element[0][ctrl.sizeProperties.offsetName];
            if (ctrl.movingSplitbar !== null) {
                var splitbarIndex = ctrl.containers.indexOf(ctrl.movingSplitbar);
                var nextSplitbarIndex = splitbarIndex + 2 < ctrl.containers.length ? splitbarIndex + 2 : null;
                if (splitbarIndex > -1) {
                    var processedContainers = ctrl.processSplitbar(ctrl.containers[splitbarIndex]);
                    var beforeContainer = processedContainers.beforeContainer;
                    var afterContainer = processedContainers.afterContainer;
                    if (!beforeContainer.collapsed && !afterContainer.collapsed) {
                        // calculate container positons
                        var difference = ctrl.movingSplitbar[position] - lastPos;
                        var newPosition = ctrl.movingSplitbar[position] - difference;
                        // Keep the bar in the window (no left/top 100%)
                        newPosition = Math.min(elementSize - dividerSize, newPosition);
                        // Keep the bar from going past the previous element min/max values
                        if (angular.isNumber(beforeContainer.beforeMinValue) && newPosition < beforeContainer.beforeMinValue)
                            newPosition = beforeContainer.beforeMinValue;
                        if (angular.isNumber(beforeContainer.beforeMaxValue) && newPosition > beforeContainer.beforeMaxValue)
                            newPosition = beforeContainer.beforeMaxValue;
                        // Keep the bar from going past the next element min/max values
                        if (afterContainer !== null && angular.isNumber(afterContainer.afterMinValue) && newPosition > afterContainer.afterMinValue - dividerSize)
                            newPosition = afterContainer.afterMinValue - dividerSize;
                        if (afterContainer !== null && angular.isNumber(afterContainer.afterMaxValue) && newPosition < afterContainer.afterMaxValue)
                            newPosition = afterContainer.afterMaxValue;
                        // resize the before container
                        beforeContainer.size = newPosition - beforeContainer[position];
                        // update after container position
                        var oldAfterContainerPosition = afterContainer[position];
                        afterContainer[position] = newPosition + dividerSize;
                        //update after container size if the position has changed
                        if (afterContainer[position] != oldAfterContainerPosition)
                            afterContainer.size = nextSplitbarIndex !== null ? oldAfterContainerPosition + afterContainer.size - (newPosition + dividerSize) : elementSize - (newPosition + dividerSize);
                        // move the splitbar
                        ctrl.movingSplitbar[position] = newPosition;  //TODO: dispatch container resize event
                    }
                }
            }
            //Enable a new animation frame
            animationFrameRequested = null;
        }
        //================================================================================
        // Public Controller Functions
        //================================================================================
        ctrl.mouseUpHandler = function (event) {
            if (ctrl.movingSplitbar !== null) {
                ctrl.movingSplitbar = null;
            }
            return event;
        };
        ctrl.mouseMoveHandler = function (mouseEvent) {
            lastPos = mouseEvent[ctrl.sizeProperties.mouseProperty] || mouseEvent.originalEvent && mouseEvent.originalEvent[ctrl.sizeProperties.mouseProperty] || (mouseEvent.targetTouches ? mouseEvent.targetTouches[0][ctrl.sizeProperties.mouseProperty] : 0);
            //Cancel previous rAF call
            if (animationFrameRequested) {
                window.cancelAnimationFrame(animationFrameRequested);
            }
            //TODO: cache layout values
            //Animate the page outside the event
            animationFrameRequested = window.requestAnimationFrame(draw);
        };
        /**
         * Returns the min and max values of the ctrl.containers on each side of the container submitted
         * @param container
         * @returns {*}
         */
        ctrl.processSplitbar = function (container) {
            var index = ctrl.containers.indexOf(container);
            var setValues = function (container) {
                var start = container[ctrl.sizeProperties.flowProperty];
                var end = container[ctrl.sizeProperties.flowProperty] + container.size;
                container.beforeMinValue = angular.isNumber(container.minSize) ? start + container.minSize : start;
                container.beforeMaxValue = angular.isNumber(container.maxSize) ? start + container.maxSize : null;
                container.afterMinValue = angular.isNumber(container.minSize) ? end - container.minSize : end;
                container.afterMaxValue = angular.isNumber(container.maxSize) ? end - container.maxSize : null;
            };
            //verify the container was found in the list
            if (index > -1) {
                var beforeContainer = index > 0 ? ctrl.containers[index - 1] : null;
                var afterContainer = index + 1 <= ctrl.containers.length ? ctrl.containers[index + 1] : null;
                if (beforeContainer !== null)
                    setValues(beforeContainer);
                if (afterContainer !== null)
                    setValues(afterContainer);
                return {
                    beforeContainer: beforeContainer,
                    afterContainer: afterContainer
                };
            }
            return null;
        };
        /**
         * Checks if a string has a percent symbol in it.
         * @param num
         * @returns {boolean}
         */
        ctrl.isPercent = function (num) {
            return num && angular.isString(num) && num.indexOf('%') > -1 ? true : false;
        };
        /**
         * Converts a number to pixels from percent.
         * @param size
         * @param parentSize
         * @returns {number}
         */
        ctrl.convertToPixels = function (size, parentSize) {
            return Math.floor(parentSize * (parseInt(size) / 100));
        };
        /**
         * Sets the default size for each container.
         */
        ctrl.updateDisplay = function () {
            var c, i;
            var dividerSize = parseInt(opts.dividerSize);
            var elementSize = $element[0].getBoundingClientRect()[ctrl.sizeProperties.sizeProperty];
            var availableSize = elementSize - dividerSize * numOfSplitbars;
            var originalSize = availableSize;
            var usedSpace = 0;
            var numOfAutoContainers = 0;
            if (ctrl.containers.length > 0 && $element.children().length > 0) {
                // remove the last splitbar container from DOM
                if (!lastDividerRemoved && ctrl.containers.length === $element.children().length) {
                    var lastContainerIndex = ctrl.containers.length - 1;
                    ctrl.containers[lastContainerIndex].element.remove();
                    ctrl.containers.splice(lastContainerIndex, 1);
                    lastDividerRemoved = true;
                    numOfSplitbars--;
                }
                // calculate sizing for ctrl.containers
                for (i = 0; i < ctrl.containers.length; i++) {
                    if (!LayoutContainer.isSplitbar(ctrl.containers[i])) {
                        var child = ctrl.containers[i].element;
                        opts.maxSizes[i] = child.attr('max-size') || opts.maxSizes[i] || null;
                        opts.minSizes[i] = child.attr('min-size') || opts.minSizes[i] || null;
                        opts.sizes[i] = child.attr('size') || opts.sizes[i] || 'auto';
                        //opts.collapsed[i] = child.attr('collapsed') || opts.collapsed[i] || false;
                        // verify size is properly set to pixels or percent
                        var sizePattern = /\d+\s*(px|%)\s*$/i;
                        opts.sizes[i] = opts.sizes[i] != 'auto' && opts.sizes[i].match(sizePattern) ? opts.sizes[i] : 'auto';
                        opts.minSizes[i] = opts.minSizes[i] && opts.minSizes[i].match(sizePattern) ? opts.minSizes[i] : null;
                        opts.maxSizes[i] = opts.maxSizes[i] && opts.maxSizes[i].match(sizePattern) ? opts.maxSizes[i] : null;
                        if (opts.sizes[i] != 'auto') {
                            if (ctrl.isPercent(opts.sizes[i])) {
                                opts.sizes[i] = ctrl.convertToPixels(opts.sizes[i], originalSize);
                            } else {
                                opts.sizes[i] = parseInt(opts.sizes[i]);
                            }
                        }
                        if (opts.minSizes[i] !== null) {
                            if (ctrl.isPercent(opts.minSizes[i])) {
                                opts.minSizes[i] = ctrl.convertToPixels(opts.minSizes[i], originalSize);
                            } else {
                                opts.minSizes[i] = parseInt(opts.minSizes[i]);
                            }
                            // don't allow the container size to initialize smaller than the minSize
                            if (opts.sizes[i] < opts.minSizes[i])
                                opts.sizes[i] = opts.minSizes[i];
                        }
                        if (opts.maxSizes[i] !== null) {
                            if (ctrl.isPercent(opts.maxSizes[i])) {
                                opts.maxSizes[i] = ctrl.convertToPixels(opts.maxSizes[i], originalSize);
                            } else {
                                opts.maxSizes[i] = parseInt(opts.maxSizes[i]);
                            }
                            // don't allow the container size to intialize larger than the maxSize
                            if (opts.sizes[i] > opts.maxSizes[i])
                                opts.sizes[i] = opts.maxSizes[i];
                        }
                        if (opts.sizes[i] === 'auto') {
                            numOfAutoContainers++;
                        } else {
                            availableSize -= opts.sizes[i];
                        }
                    }
                }
                // set the sizing for the ctrl.containers
                var autoSize = Math.floor(availableSize / numOfAutoContainers);
                for (i = 0; i < ctrl.containers.length; i++) {
                    c = ctrl.containers[i];
                    c[ctrl.sizeProperties.flowProperty] = usedSpace;
                    c.maxSize = opts.maxSizes[i];
                    c.minSize = opts.minSizes[i];
                    c.collapsed = c.collapsed || opts.collapsed[i];
                    //TODO: adjust size if autosize is greater than the maxSize
                    if (!LayoutContainer.isSplitbar(c)) {
                        var newSize = opts.sizes[i] === 'auto' ? autoSize : opts.sizes[i];
                        c.size = newSize !== null ? newSize : autoSize;
                    } else {
                        c.size = dividerSize;
                    }
                    usedSpace += c.size;
                }
            }
        };
        /**
         * Adds a container to the list of layout ctrl.containers.
         * @param container
         */
        ctrl.addContainer = function (container) {
            ctrl.containers.push(container);
            if (LayoutContainer.isSplitbar(container)) {
                numOfSplitbars++;
            }
            ctrl.updateDisplay();
        };
        /**
         * Returns an array of layout ctrl.containers.
         * @returns {Array}
         */
        ctrl.getContainers = function () {
            return ctrl.containers;
        };
        /**
         * Toggles the container before the provided splitbar
         * @param splitbar
         * @returns {boolean|*|Array}
         */
        ctrl.toggleBefore = function (splitbar) {
            var index = ctrl.containers.indexOf(splitbar) - 1;
            var c = ctrl.containers[index];
            c.collapsed = !ctrl.containers[index].collapsed;
            var nextSplitbar = ctrl.containers[index + 1];
            var nextContainer = ctrl.containers[index + 2];
            $scope.$apply(function () {
                if (c.collapsed) {
                    c.actualSize = c.size;
                    c.size = 0;
                    if (nextSplitbar)
                        nextSplitbar[ctrl.sizeProperties.flowProperty] -= c.actualSize;
                    if (nextContainer) {
                        nextContainer[ctrl.sizeProperties.flowProperty] -= c.actualSize;
                        nextContainer.size += c.actualSize;
                    }
                } else {
                    c.size = c.actualSize;
                    if (nextSplitbar)
                        nextSplitbar[ctrl.sizeProperties.flowProperty] += c.actualSize;
                    if (nextContainer) {
                        nextContainer[ctrl.sizeProperties.flowProperty] += c.actualSize;
                        nextContainer.size -= c.actualSize;
                    }
                }
            });
            return c.collapsed;
        };
        /**
         * Toggles the container after the provided splitbar
         * @param splitbar
         * @returns {boolean|*|Array}
         */
        ctrl.toggleAfter = function (splitbar) {
            var index = ctrl.containers.indexOf(splitbar) + 1;
            var c = ctrl.containers[index];
            var prevSplitbar = ctrl.containers[index - 1];
            var prevContainer = ctrl.containers[index - 2];
            var isLastContainer = index === ctrl.containers.length - 1;
            var endDiff;
            ctrl.bounds = $element[0].getBoundingClientRect();
            c.collapsed = !ctrl.containers[index].collapsed;
            $scope.$apply(function () {
                if (c.collapsed) {
                    c.actualSize = c.size;
                    c.size = 0;
                    // adds additional space so the splitbar moves to the very end of the container
                    // to offset the lost space when converting from percents to pixels
                    endDiff = isLastContainer ? ctrl.bounds[ctrl.sizeProperties.sizeProperty] - c[ctrl.sizeProperties.flowProperty] - c.actualSize : 0;
                    if (prevSplitbar)
                        prevSplitbar[ctrl.sizeProperties.flowProperty] += c.actualSize + endDiff;
                    if (prevContainer)
                        prevContainer.size += c.actualSize + endDiff;
                } else {
                    c.size = c.actualSize;
                    // adds additional space so the splitbar moves back to the proper position
                    // to offset the additional space added when collapsing
                    endDiff = isLastContainer ? ctrl.bounds[ctrl.sizeProperties.sizeProperty] - c[ctrl.sizeProperties.flowProperty] - c.actualSize : 0;
                    if (prevSplitbar)
                        prevSplitbar[ctrl.sizeProperties.flowProperty] -= c.actualSize + endDiff;
                    if (prevContainer)
                        prevContainer.size -= c.actualSize + endDiff;
                }
            });
            return c.collapsed;
        };
        /**
         * Returns the container object of the splitbar that is before the one passed in.
         * @param currentSplitbar
         */
        ctrl.getPreviousSplitbarContainer = function (currentSplitbar) {
            if (LayoutContainer.isSplitbar(currentSplitbar)) {
                var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
                var previousSplitbarIndex = currentSplitbarIndex - 2;
                if (previousSplitbarIndex >= 0) {
                    return ctrl.containers[previousSplitbarIndex];
                }
                return null;
            }
            return null;
        };
        /**
         * Returns the container object of the splitbar that is after the one passed in.
         * @param currentSplitbar
         */
        ctrl.getNextSplitbarContainer = function (currentSplitbar) {
            if (LayoutContainer.isSplitbar(currentSplitbar)) {
                var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
                var nextSplitbarIndex = currentSplitbarIndex + 2;
                if (currentSplitbarIndex > 0 && nextSplitbarIndex < ctrl.containers.length) {
                    return ctrl.containers[nextSplitbarIndex];
                }
                return null;
            }
            return null;
        };
    }
});