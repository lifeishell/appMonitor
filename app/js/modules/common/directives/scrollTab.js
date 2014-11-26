define(['../controllers/ScrollTabCtrl'],
function(ScrollTabCtrl){
    'use strict';

    return ['$window', scrollTab];

    /*
        useage: <ul scroll-tab></ul>
     */


    function scrollTab($window){
        return {
            restrict: 'A',
            templateUrl: 'js/modules/common/templates/myxScrollTab.html',
            controller: ScrollTabCtrl,
            link: function($scope, element, attr){
                $window.onresize = $scope.setRealWidth();
            }
        };
    }
});