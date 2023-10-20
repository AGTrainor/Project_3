// Parse data.json and create a bar chart for the number of breweries in each city
d3.json('./static/data.json').then(function(data) {
    var cityCounts = {}; // Object to store city counts

    // Count the number of breweries in each city
    data.forEach(function(item) {
        var city = item.city;
        cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    // Prepare data for the bar chart
    var cities = Object.keys(cityCounts);
    var counts = Object.values(cityCounts);

    // Create the bar chart
    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .domain(cities)
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(counts)])
        .nice()
        .range([height, 0]);

    svg.selectAll(".bar")
        .data(cities)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(cityCounts[d]); })
        .attr("height", function(d) { return height - y(cityCounts[d]); });

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(cities)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(cityCounts[d]); })
        .attr("height", function(d) { return height - y(cityCounts[d]); });

    svg.selectAll(".bar")
        .data(cities)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(cityCounts[d]); })
        .attr("height", function(d) { return height - y(cityCounts[d]); });

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));
});
