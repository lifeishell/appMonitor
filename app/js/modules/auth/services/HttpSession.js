define(function(){
    return ['Restangular', HttpSession];

    function HttpSession(RA) {
        var self = this;

        /**
         * Updates restangular to append session id to all calls.
         * @param {string} sessionid
         */
        function setSession(sessionid) {
            var suffix = RA.configuration.requestSuffix || '';
            RA.setRequestSuffix(suffix + ';jsessionid=' + sessionid);
        }

        function updateSession() {
            if (self.user && self.user.sessionId) {
                setSession(self.user.sessionId);
            }
        }

        this.setUser = function(user) {
            this.user = user;
            //user.on('login:success', updateSession);
        };
    }
});