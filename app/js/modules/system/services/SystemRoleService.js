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
            },
            getFeatures: function(){
                var deffered = $q.defer();
                //Restangular.one('system/role', 'feature_list').post().then(function success(data){
                //    //TODO
                //},
                //function failure(errorResponse){
                //
                //});
                deffered.resolve([{
                    group: 'sdfsdf',
                    features: [{pk:1,name:'feature1',desc: 'aaa1'}]
                },{
                    group: '23434',
                    features: [{pk:33,name:'feature1',desc: 'aaa2'},{pk:3,name:'feature3',desc: 'aaa3'}]
                },{
                    group: 'Im group',
                    features: [{pk:7,name:'feature1',desc: 'aaa4'},{pk:4,name:'feature4',desc: 'aaa7'},{pk:6,name:'feature6',desc: 'aaa8'}]
                },{
                    group: 'Im another group',
                    features: [{pk:12,name:'feature1',desc: 'aaa5'}]
                },{
                    group: 'group group',
                    features: [{pk:72,name:'feature7',desc: 'aaa6'},{pk:22,name:'feature7',desc: 'aaa36'},{pk:32,name:'feature7',desc: 'aaa26'},{pk:52,name:'feature7',desc: 'aa1a6'}]
                }]);
                return deffered.promise;
            }
        };
    }
});