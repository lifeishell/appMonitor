define(function(){
    return ['$scope', '$location', 'SectionsService', ScrollTabCtrl];

    function ScrollTabCtrl($scope, $location, SectionsService){

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
            $('.scrollable--actual').stop().animate({
                scrollLeft: 0
            }, 500);
            $scope.scrollableRight = true;
            $scope.scrollableLeft = false;
        };

        $scope.scrollSectionRight = function(){
            var realWidth = 150 * SectionsService.activeSections.length;
            $('.scrollable--actual').stop().animate({
                scrollLeft: realWidth
            }, 500);
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