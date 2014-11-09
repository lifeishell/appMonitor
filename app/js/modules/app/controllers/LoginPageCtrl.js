define(function() {
    return ['SessionUser', '$scope', '$location', 'Restangular', DialogService, LoginPageCtrl];

    function LoginPageCtrl(SessionUser, $scope, $location, Restangular, DialogService) {
        $scope.invalidCredentials = false;

        $scope.fgAuth = {};
        SessionUser.on('login:start', function() {
            $scope.fgAuth.isWaiting = true;
        });

        SessionUser.on('login:success', function() {
            $scope.fgAuth.isWaiting = false;
            if (SessionUser.isLoggedIn()) {
                var redirectPath = sessionStorage.getItem("redirectPath");
                if (!redirectPath || redirectPath === "/authentication/login") {
                    redirectPath = "/dashboard";
                }
                $location.path(redirectPath);
            }
        });

        $scope.$on('login:error', function() {
            $scope.fgAuth.isWaiting = false;
            DialogService.showDialog(
                gettext('Login Failed'),
                gettext('Login failed. Please check your credentials and try again.'), [{
                    name: 'Ok',
                    class: 'btn-primary'
                }]
            );
        });

        $scope.changeLanguage = function() {
            myxLocaleService.setLanguage($scope.lang);
            localStorage.currentLanguage = $scope.lang;
        };

        $scope.confirmCallback = function(email) {
            Restangular.one("authentication/resetpassword")
                .post(null, {
                    emailAddress: email
                })
                .then(function() {
                    sucessDialog();
                })
                .catch(function() {
                    failedDialog();
                })
                .finally(function() {
                    $scope.trigger('loading:done');
                    $location.path('authentication/login');
                });
        };

        $scope.resetPasswordDialog = function() {
            DialogService.showDialog(
                gettext('Forgot your password?'),
                gettext('Please enter your email address to get instructions.'), [{
                    name: gettext('Confirm'),
                    'class': 'btn-primary',
                    callback: function(email) {
                        $scope.confirmCallback(email);
                    }
                }, {
                    name: gettext('Cancel'),
                    'class': 'btn',
                    callback: function() {
                        $location.path('authentication/login');
                    }
                }], null, true
            );
        };

        if ($location.path() === '/authentication/forgot-password') {
            $scope.resetPasswordDialog();
        }

        function sucessDialog() {
            DialogService.showDialog(
                gettext('Please check your email'),
                gettext("We've sent you an email that will allow you to reset your password quickly and easily. Please check your email now."), [{
                    name: 'Ok',
                    class: 'btn-primary'
                }]
            );
        }

        function failedDialog() {
            DialogService.showDialog(
                gettext('Password Reset Failed'),
                gettext('Password reset failed. Please check your email address and try again.'), [{
                    name: 'Ok',
                    class: 'btn-primary',
                    callback: function() {
                        $location.path('authentication/login');
                    }
                }]
            );
        }
    }
});