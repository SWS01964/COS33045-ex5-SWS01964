d3.csv("data/tvScreenSize.csv", d => {
  return {
    screenSize: d.screenSize,
    count: +d.count
  };
}).then(data => {
  console.log(data);
  drawDonutChart(data);
});

const drawDonutChart = data => {
  const radius = Math.min(width, height) / 2 - 20;
  const total = d3.sum(data, d => d.count);

  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.screenSize))
    .range(["#4682b4", "#e67e22", "#27ae60"]);

  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius)
    .padAngle(0.02)
    .cornerRadius(4);

  const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const donutContainer = svg
    .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const arcs = donutContainer
    .selectAll(".arc")
    .data(pie(data))
    .join("g")
      .attr("class", "arc");

  arcs
    .append("path")
      .attr("d", arcGenerator)
      .attr("fill", d => colorScale(d.data.screenSize));

  arcs
    .append("text")
      .attr("class", "donut-label")
      .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => `${d.data.screenSize} ${Math.round(d.data.count / total * 100)}%`);

  donutContainer
    .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 6)
      .style("font-size", "18px")
      .text(`${total} models`);
};
