define(function(){
    return {
        graph: {
            nodes:[
                {"name":"0", position:10, serviceName:'Cloud', type:'cloud', status: {name:'cloud'}},
                {"name":"1", position:20, serviceName:'Server A', type:'server', status: {name: 'warning', number: 200}},
                {"name":"2", position:30, serviceName:'Apache', type:'apache', status: {name: 'running'}},
                {"name":"3", position:31, serviceName:'MySQL', type:'mysql', status: {name: 'inactive'}},
                {"name":"4", position:40, serviceName:'OA1', type:'php', status: {name: 'alarm', number: 180}},
                {"name":"5", position:21, serviceName:'Server B', type:'server', status: {name: 'running'}},
                {"name":"6", position:32, serviceName:'Tomcat', type:'tomcat', status: {name: 'running'}}
            ],
            links:[
                {"source":0,"target":1},
                {"source":0,"target":5},
                {"source":1,"target":2},
                {"source":1,"target":3},
                {"source":2,"target":4},
                {"source":5,"target":6}
            ]
        }
    };
});