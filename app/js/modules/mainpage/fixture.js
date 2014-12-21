define(function(){
    return {
        graph: {
            nodes:[
                {"name":"0","rating":90,serviceName:'Cloud',type:'cloud'},
                {"name":"1","rating":80,serviceName:'Server A',type:'server'},
                {"name":"2","rating":70,serviceName:'Apache',type:'apache'},
                {"name":"3","rating":70,serviceName:'MySQL',type:'mysql'},
                {"name":"4","rating":60,serviceName:'OA1',type:'php'},
                {"name":"5","rating":80,serviceName:'Server B',type:'server'},
                {"name":"6","rating":70,serviceName:'Tomcat',type:'tomcat'}
            ],
            links:[
                {"source":0,"target":1,"value":6},
                {"source":0,"target":5,"value":6},
                {"source":1,"target":2,"value":6},
                {"source":1,"target":3,"value":6},
                {"source":2,"target":4,"value":6},
                {"source":5,"target":6,"value":6}
            ]
        }
    };
});