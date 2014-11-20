define(function(){
    'use strict';

    return ['$window', ScrollMenu];

    /*
        useage: <ul scroll-menu></ul>
     */

    function setRealWidth(el){
        var realWidth = 130 * angular.element(el).find('li').context.childElementCount;
        angular.element(el).css('width:' + realWidth + 'px');
    }

    function ScrollMenu($window){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                setRealWidth(element);
                $window.onresize = function(){
                    setRealWidth(element);
                };
            }
        };
    }
});