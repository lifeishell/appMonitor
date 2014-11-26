define(function() {
    function DialogBoxCtrl($scope) {
        $scope.param = {};
        $scope.callback = function(button, param) {
            if (typeof(button.callback) === 'function') {
                button.callback(param);
            }
            $scope.$close();
        };
    }

    return ['$scope', DialogBoxCtrl];
});