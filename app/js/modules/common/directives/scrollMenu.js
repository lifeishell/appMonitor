define(function(){
    'use strict';

    return ['$window', '$interval', 'SectionsService', ScrollMenu];

    /*
        useage: <ul scroll-menu active-sections="activeSections"></ul>
     */

    function setRealWidth($scope, $interval) {
        var realWidth = 150 * $scope.scrollable.activeSections.length;
        if ($(window).width() > realWidth){
            $('.scrollable').css('padding-right', '0');
            $scope.scrollValue.scrollable = false;
            $scope.scrollValue.scrollableRight = false;
            $scope.scrollValue.scrollableLeft = false;
            $scope.scrollValue.scrollSectionRight = angular.noop;
            $scope.scrollValue.scrollSectionLeft = angular.noop;
        }else{
            $('.active-section').css('width', realWidth + 60 + 'px');
            $('.scrollable').css('padding-right', '30px');
            $scope.scrollValue.scrollable = true;
            $scope.scrollValue.scrollableRight = true;
            $scope.scrollValue.scrollSectionLeft = function(){
                var left = 0;
                var step = 100;
                var intervalPromise = $interval(
                    function() {
                        if(realWidth - $(window).width() - ((left+1)*step) < 0){
                            $interval.cancel(intervalPromise);
                        }
                        $('.scrollable--actual').scrollLeft(realWidth - $(window).width() - ((left+1)*step));
                        left ++;
                    }, 100);
                $scope.scrollValue.scrollableRight = true;
                $scope.scrollValue.scrollableLeft = false;
            };
            $scope.scrollValue.scrollSectionRight = function(){
                var left = 0;
                var step = 100;
                var intervalPromise = $interval(
                    function() {
                        if(((left+1)*step) > (realWidth + 500 - $(window).width())){
                            $interval.cancel(intervalPromise);
                        }
                        console.log(realWidth + 500 - $(window).width());
                        console.log((left+1)*step);
                        $('.scrollable--actual').scrollLeft((left+1)*step);
                        left ++;
                    }, 100);
                $scope.scrollValue.scrollableRight = false;
                $scope.scrollValue.scrollableLeft = true;
            };
        }
    }

    function ScrollMenu($window, $interval, SectionsService){
        return {
            restrict: 'A',
            scope: {
                scrollValue: '='
            },
            link: function($scope, element, attr){
                $scope.scrollable = {};
                $scope.scrollable.activeSections = SectionsService.activeSections;
                setRealWidth($scope, $interval);
                $window.onresize = function(){
                    setRealWidth($scope, $interval);
                };

                $scope.$watch('scrollable.activeSections', function(n, o){
                    console.log("=======");
                   setRealWidth($scope, $interval);
                });
            }
        };
    }
});