d3.json("static/js/data.json").then((data) => {
    const typeCounts = {}

    data.forEach((entry) => {
        const type = entry.rating;
        if (typeCounts[type]) {
            typeCounts[type] += 1;
        } else {
            typeCounts[type] = 1;
        }
    });

    const typeNames = Object.keys(typeCounts);
    const barCounts = Object.values(typeCounts);

    let trace1 = {
        x: typeNames,
        y: barCounts,
        type: "bar"
    };

    let layout = {
        title: "Number of Breweries by Yelp Rating",
        yaxis: {
            range: [0, 200]
        }
    };

    let plotData = [trace1];

    Plotly.newPlot("simpleplot2", plotData, layout);

});