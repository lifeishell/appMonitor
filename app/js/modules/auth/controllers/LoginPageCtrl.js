define(function() {
    return ['SessionUser', '$scope', '$location', 'DialogService', 'SectionsService', LoginPageCtrl];

    function LoginPageCtrl(SessionUser, $scope, $location, DialogService, SectionsService) {

        SessionUser.on('login:start', function() {
            $scope.isWaiting = true;
        });

        SessionUser.on('login:success', function() {
            $scope.isWaiting = false;
            if (SessionUser.isLoggedIn()) {
                var redirectPath = sessionStorage.getItem("redirectPath");
                if (!redirectPath || redirectPath === "/login") {
                    redirectPath = "/main";
                }
                //init sections
                SectionsService.initActiveSection();
                $location.path(redirectPath);
            }
        });

        $scope.credentials = {};
        $scope.user = SessionUser;

        $scope.login = function() {
            function error() {
                DialogService.showDialog(
                    '登录失败',
                    '登录失败，用户名密码错误，请重试', [{
                        name: 'Ok',
                        class: 'btn-primary',
                        callback: $location.path('main')
                    }]
                );
                $scope.isWaiting = false;
            }
            return SessionUser.login(this.credentials).then(undefined, error);
        };
    }
});