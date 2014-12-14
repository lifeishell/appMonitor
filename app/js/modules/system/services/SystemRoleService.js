define([
    '../fixture'
],
function(fixture){
    return ['Restangular', '$q', SystemRoleService];

    function SystemRoleService(Restangular, $q){

        return {
            getRoles: function(){
                var deffered = $q.defer();
                Restangular.one('system/role', 'list').post().then(function success(data){
                    deffered.resolve(data);
                },
                function failure(errorResponse){
                    deffered.resolve(fixture.rolesList);
                });
                return deffered.promise;
            },
            getFeatures: function(){
                var deffered = $q.defer();
                Restangular.one('system/role', 'feature_list').post().then(function success(data){
                    deffered.resolve(data);
                },
                function failure(errorResponse){
                    deffered.resolve(fixture.featuresList);
                });
                return deffered.promise;
            }
        };
    }
});