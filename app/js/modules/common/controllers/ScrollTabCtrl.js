define(function(){
    return ['$scope', '$interval', 'SectionsService', ScrollTabCtrl];

    function ScrollTabCtrl($scope, $interval, SectionsService){

        var sectionsPerPage = Math.ceil($(window).width()/5);
        $scope.activeSections = SectionsService.activeSections;
        $scope.activeSection = SectionsService.activeSection;

        $scope.changeSection = function(section){
            SectionsService.setActiveSection(section);
        };

        $scope.closeSection = function(section){
            SectionsService.closeActiveSection(section);
        };

        $scope.$watch(function(){
            return SectionsService.activeSections.length;
        },
        function(newValue, oldValue){
            $scope.setRealWidth();
            if(newValue > oldValue){
                $scope.scrollSectionRight();
            }
        });

        $scope.scrollSectionLeft = function(){
            var realWidth = 150 * SectionsService.activeSections.length;
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
            $scope.scrollableRight = true;
            $scope.scrollableLeft = false;
        };

        $scope.scrollSectionRight = function(){

            var realWidth = 150 * SectionsService.activeSections.length;
            var left = 0;
            var step = 100;
            var intervalPromise = $interval(
                function() {
                    if(((left+1)*step) > (realWidth + 500 - $(window).width())){
                        $interval.cancel(intervalPromise);
                    }
                    $('.scrollable--actual').scrollLeft((left+1)*step);
                    left ++;
                }, 100);
            $scope.scrollableRight = false;
            $scope.scrollableLeft = true;
        };

        $scope.setRealWidth = function() {
            var realWidth = 150 * SectionsService.activeSections.length;
            sectionsPerPage = Math.ceil($(window).width()/5);
            if ($(window).width() > realWidth){
                $('.active-section').css('width', $(window).width() - $('.scrollable').offset().left + 'px');
                $('.scrollable').css('padding-right', '0');
                $scope.scrollable = false;
                $scope.scrollableRight = false;
                $scope.scrollableLeft = false;
            }else{
                $('.active-section').css('width', realWidth + 30 + 'px');
                $('.scrollable').css('padding-right', '30px');
                $scope.scrollable = true;
                if(!$scope.scrollableRight){
                    $scope.scrollableLeft = true;
                }
            }
        };

        function initScrollTab() {
            SectionsService.initActiveSection();
            $scope.setRealWidth();
        }

        initScrollTab();
    }
});