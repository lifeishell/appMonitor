define(function(){
    return ['Restangular', '$q', SystemRoleService];

    function SystemRoleService(Restangular, $q){
        return {
            getRoles: function(){
                var deffered = $q.defer();
                //Restangular.one('system/role', 'list').post().then(function success(data){
                //    //TODO
                //},
                //function failure(errorResponse){
                //    //TODO
                //});

                deffered.resolve([{pk: 1, name: 'aaa'},{pk: 2, name: 'ccc'},{pk: 3, name: 'bbb'}]);
                return deffered.promise;
            }
        };
    }
});