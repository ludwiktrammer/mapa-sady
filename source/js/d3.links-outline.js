var d3 = require('d3');

module.exports = function(svg, links) {

  var lineFunction = d3.svg.line().interpolate("line");

  return svg.append("g")
    .attr("class", "g-links-bg")
    .selectAll("g")
      .data(links)
    .enter().append("g")
      .attr("class", "g-link-bg")
    .append("path")
      .attr("class", "link-outer")
      .attr("d", function(d) {
          return lineFunction([[d.source.x, d.source.y], [d.target.x, d.target.y]]);
      });


};
