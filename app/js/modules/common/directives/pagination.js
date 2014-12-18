define(function(){
    return ['$timeout', pagination];

    function pagination($timeout){
        return {
            restrict: 'E',
            templateUrl: 'js/modules/common/templates/myxPagination.html',
            replace: true,
            scope: {
                totalNum: '=?',
                beforeQuery: '=',
                returnQuery: '=',
                countPerPage: '=?',
                queryFn: '&'
            },
            link: function($scope, element){

                $timeout(function(){
                    if(!$scope.beforeQuery || !$scope.returnQuery){
                        return;
                    }
                    $scope.pageCounterChoice = [10, 50, 100, 200, 400];
                    var isCountByServer = !!$scope.totalNum;
                    $scope.countPerPage = $scope.countPerPage || 10;
                    $scope.totalCount = $scope.totalNum? $scope.totalNum : $scope.beforeQuery.length;
                    //set default values:
                    $scope.currentPage = 1;
                    $scope.firstPage = 1;
                    $scope.lastPage = Math.ceil($scope.totalCount/$scope.countPerPage);

                    $scope.getPage = function(page){

                        if(page) {
                            $scope.currentPage = page;
                        }
                        if(isCountByServer){
                            $scope.queryFn.apply({page: $scope.currentPage, count: $scope.countPerPage});
                        } else {
                            $scope.returnQuery = $scope.beforeQuery.slice(($scope.currentPage - 1) * $scope.countPerPage,
                                $scope.currentPage * $scope.countPerPage - 1);
                        }
                    };

                    $scope.updateCount = function(){
                        if(!_.isNumber($scope.countPerPage)) return;
                        $scope.lastPage = Math.ceil($scope.totalCount/$scope.countPerPage);
                        $scope.getPage(1);
                    };

                    $scope.getPage();

                    $scope.$watch('beforeQuery', function(n){
                        $scope.totalCount = $scope.beforeQuery.length;
                        $scope.lastPage = Math.ceil($scope.totalCount/$scope.countPerPage);
                        $scope.getPage(1);
                    });
                });
            }
        };
    }
});