define([
    'd3',
    '../fixture'
],
function(d3, fixture){
    return myxNetworkMap;

    function myxNetworkMap(){
        return {
            restrict: 'E',
            transclude: true,
            link: function($scope, elem) {
                var iconMapping = {
                    apache: '\uf139',
                    php: '\uf14A',
                    mysql: '\uf121',
                    server: '\ue061',
                    tomcat: '\uf153',
                    cloud: '\ue0BA'
                };
                var graph = fixture.graph;

                var y = d3.scale.ordinal()
                    .domain(d3.range(10))
                    .rangePoints([0, 100 * 10], 1);

                var color = d3.scale.category20();

                // d3 behivor
                var force = d3.layout.force()
                    .charge(-1000)
                    .gravity(0.2)
                    .linkDistance(200)
                    .size([$('#network').width(), $('#network').height()]);

                var zoom = d3.behavior.zoom()
                    .scaleExtent([1, 10])
                    .on("zoom", zoomed);

                var drag = d3.behavior.drag()
                .origin(function(d) { return d; })
                    .on("dragstart", dragstarted)
                    .on("drag", dragged)
                    .on("dragend", dragended);

                var svg = d3.select('#network').append("svg")
                    .append('g')
                    .call(zoom);

                var rect = svg.append("rect")
                    .attr("width", '100%')
                    .attr("height", '100%')
                    .style("fill", "none")
                    .style("pointer-events", "all");

                var container = svg.append("g");

                var link = container.append("g")
                    .attr("class", "links")
                    .selectAll(".link")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", 5);

                var node = container.append("g")
                    .attr("class", "nodes")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    .call(drag);

                force.nodes(graph.nodes)
                    .links(graph.links)
                    .start();

                node.append("text")
                    .attr('class', function(d){ return d.status.name; })
                    .attr('font-family', 'appmonitor')
                    .attr('font-size', '5em')
                    .attr('transform', "translate(" + -30 + "," + 20 + ")")
                    .text(function(d){ return iconMapping[d.type]; });

                var statusPanel = node.append('g')
                    .attr('transform', "translate(" + 40 + "," + -40 + ")");

                statusPanel.append("circle")
                    .attr("r", function(d) {
                        if(d.status.name === 'warning' || d.status.name === 'alarm'){
                            return 15;
                        } else {
                            return 0;
                        }
                    })
                    .style("fill", function(d) {
                        switch(d.status.name){
                            case 'warning':
                                return color(1/60);
                                break;
                            case 'alarm':
                                return color(1/100);
                                break;
                            case 'running':
                                return color(1/5);
                                break;
                            case 'inactive':
                                return color(1/2);
                                break;
                        }
                    });

                statusPanel.append("text")
                    .attr('transform', "translate(" + -10 + "," + 0 + ")")
                    .attr('font-size', '12px')
                    .attr('dominant-baseline', 'central')
                    .text(function(d){ return d.status.number; });

                force.on("tick", function(e) {
                    _.each(graph.nodes, function(o) {
                        o.y += (y(o.position.toString().slice(0, 1)) - o.y) * e.alpha;
                        o.x += (y(o.position.toString().slice(1)) - o.x) * e.alpha;
                    });
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node
                        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                        .attr('x', function(d) { return d.x; })
                        .attr('y', function(d) { return d.y; });
                });

                var linkedByIndex = {};

                _.each(graph.links, function(d) {
                    linkedByIndex[d.source.index + "," + d.target.index] = 1;
                });

                function isConnected(a, b) {
                    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
                }

                node.on("mouseover", function(d){

                    node.classed("node-active", function(o) {
                        var thisOpacity = isConnected(d, o) ? true : false;
                        this.setAttribute('fill-opacity', thisOpacity);
                        return thisOpacity;
                    });

                    link.classed("link-active", function(o) {
                        return o.source === d || o.target === d ? true : false;
                    });

                    d3.select(this).classed("node-active", true);
                })

                    .on("mouseout", function(d){
                        node.classed("node-active", false);
                        link.classed("link-active", false);
                    });


                function dottype(d) {
                    d.x = +d.x;
                    d.y = +d.y;
                    return d;
                }

                //help functions
                function zoomed() {
                    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                }

                function dragstarted(d) {
                    d3.event.sourceEvent.stopPropagation();

                    d3.select(this).classed("dragging", true);
                    force.start();
                }

                function dragged(d) {

                    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

                }

                function dragended(d) {

                    d3.select(this).classed("dragging", false);
                }
            }
        };
    }
});