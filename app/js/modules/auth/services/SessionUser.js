define(function(){
    try {
        SessionUser.prototype = _.clone(EventEmitter.prototype);
    } catch(e) {
        require(['eventEmitter'], function(EventEmitter){
            SessionUser.prototype = _.clone(EventEmitter.prototype);
        });
    }

    function SessionUser(RA, $window, $q) {
        var self = this;

        function onLogin(userInfo) {
            _.extend(self, userInfo);
            self.trigger('login:success');
        }

        /**
         * Current user's login status
         * @return {Boolean}
         */
        this.isLoggedIn = function() {
            return !!this.id;
        };

        /**
         * Lets the user log in.
         * @param  {object} credentials
         * @return {promise}
         */
        this.login = function(credentials, password) {
            self.trigger('login:start');
            if (password) {
                var c = {
                    username: credentials,
                    password: password
                };
                credentials = c;
            }
            var promise = RA.all('login').post(credentials);
            this.promise = promise.then(onLogin);
            return promise;
        };

        /**
         * Logs the current user out of the application and reloads the page
         * @return {promise}
         */
        this.logout = function() {
            return RA.one('logout').get().then(function() {
                $window.location.reload();
            });
        };
    }

    return ['Restangular', '$window', '$q', SessionUser];
});
