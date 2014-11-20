define(function(){
    try {
        SessionUser.prototype = _.clone(EventEmitter.prototype);
    } catch(e) {
        require(['eventEmitter'], function(EventEmitter){
            SessionUser.prototype = _.clone(EventEmitter.prototype);
        });
    }

    function SessionUser(RA, $window, $q, HttpSession) {
        var self = this;
        HttpSession.setUser(this);
        this.promise = RA.one('sid').get().then(onLogin);

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
            var promise = RA.all('authentication/login').post({}, credentials);
            this.promise = promise.then(onLogin);
            return promise;
        };

        /**
         * Logs the current user out of the application and reloads the page
         * @return {promise}
         */
        this.logout = function() {
            return RA.one('authentication/logout').get().then(function() {
                $window.location.reload();
            });
        };

        /**
         * Checks if the user with given username / email is a registered user
         * of FairGarage.
         * @param  {string} username A username or email to be tested
         * @return {boolean}
         */
        this.userExists = function(username) {
            if (!username) {
                var d = $q.defer();
                d.resolve(false);
                return d.promise;
            }
            return RA.one('authentication/login').get({
                username: username
            }).then(function(user) {
                return user.password;
            });
        };
    }

    return ['Restangular', '$window', '$q', 'HttpSession', SessionUser];
});
