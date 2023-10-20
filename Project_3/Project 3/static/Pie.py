// Parse data.json and create a pie chart for brewery types
d3.json('./static/data.json').then(function(data) {
    var breweryTypes = {}; // Object to store brewery type counts

    // Count the number of breweries for each type
    data.forEach(function(item) {
        var type = item.brewery_type;
        breweryTypes[type] = (breweryTypes[type] || 0) + 1;
    });

    // Prepare data for the pie chart
    var types = Object.keys(breweryTypes);
    var counts = Object.values(breweryTypes);

    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });

    var g = svg.selectAll(".arc")
        .data(pie(counts))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d, i) { return types[i]; });
});
