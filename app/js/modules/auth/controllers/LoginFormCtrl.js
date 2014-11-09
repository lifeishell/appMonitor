define(function(){
    return ['SessionUser', '$scope', '$location', LoginFormCtrl];

    function LoginFormCtrl(SessionUser, $scope, $location) {
        var self = this;
        this.credentials = {};
        this.user = SessionUser;

        this.login = function() {
            //function error() {
            //    self.error = true;
            //    $scope.$emit('login:error');
            //}
            //return SessionUser.login(this.credentials).then(undefined, error);
            $location.path("dashboard");
        };
    }
});