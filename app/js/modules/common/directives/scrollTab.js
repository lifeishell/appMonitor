define(['../controllers/ScrollTabCtrl'],
function(ScrollTabCtrl){
    'use strict';

    return scrollTab;

    /*
        useage: <ul scroll-tab></ul>
     */


    function scrollTab(){
        return {
            restrict: 'A',
            templateUrl: 'js/modules/common/templates/myxScrollTab.html',
            controller: ScrollTabCtrl,
            link: function($scope, element, attr){
                angular.element(window).bind('resize', $scope.setRealWidth());
            }
        };
    }
});