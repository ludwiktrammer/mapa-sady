var d3 = require('d3');

function d3_svg_lineStep(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push(
      "H", (p[0] + (p = points[i])[0]) / 2 + 10,
      "a", "10",",","10",",","0",",","0",",","0",",","-10",",","10",
      "V", p[1],
      "a", "10",",","10",",","0",",","0",",","1",",","-10",",","10"
  );
  if (n > 1) path.push("H", p[0]);
  return path.join("");
}


module.exports = function(svg, links) {

  var lineFunction = d3.svg.line().interpolate("line");

  var link = svg.append("g")
  .attr("class", "g-links")
  .selectAll("g")
    .data(links)
  .enter().append("g")
    .attr("class", "g-link");

  link.append("path")
    .attr("class", "link-inner")
    .attr("d", function(d) {
        return lineFunction([[d.source.x, d.source.y], [d.target.x, d.target.y]]);
    });

 link.append('circle')
    .attr("class", "link-circle")
    .attr("cx", function(d){
      var path = d3.select(this.parentNode).select('.link-inner').node();
      return path.getPointAtLength((path.getTotalLength()||0)/2).x;
    })
   .attr("cy", function(d){
      var path = d3.select(this.parentNode).select('.link-inner').node();
      return path.getPointAtLength((path.getTotalLength()||0)/2).y;
    })
    .attr("r", 1); // we decided to hide the circles, but still need them
                   // as targets for tooltips

  return link;

};
