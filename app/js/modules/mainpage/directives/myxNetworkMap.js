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

                var color = d3.scale.category20();

                // d3 behivor
                var force = d3.layout.force()
                    .charge(-200)
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

                var node = container.append("g")
                    .attr("class", "nodes")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    .call(drag);

                node.append("circle")
                    .attr("r", function(d) { return d.rating/10 * 2+ 12; })
                    .style("fill", function(d) { return color(1/d.rating); });

                node.append("text")
                    .attr('class', 'icons')
                    .attr('text-anchor', 'left')
                    .attr('dominant-baseline', 'central')
                    .attr('font-family', 'appmonitor')
                    .attr('font-size', '2em')
                    .text(function(d){ return iconMapping[d.type] + ' ' + d.serviceName; });

                var link = container.append("g")
                    .attr("class", "links")
                    .selectAll(".link")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                force.nodes(graph.nodes)
                    .links(graph.links)
                    .start();


                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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
                    d3.select(this).select("circle").transition()
                        .duration(750)
                        .attr("r", (d.rating/10 * 2+ 12)*1.5);
                })

                    .on("mouseout", function(d){

                        node.classed("node-active", false);
                        link.classed("link-active", false);

                        d3.select(this).select("circle").transition()
                            .duration(750)
                            .attr("r", d.rating/10 * 2+ 12);
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