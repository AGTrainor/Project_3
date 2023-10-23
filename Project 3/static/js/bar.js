d3.json("static/js/data.json").then((data) => {
    const cityCounts = {}

    data.forEach((entry) => {
        const city = entry.city;
        if (cityCounts[city]) {
            cityCounts[city] += 1;
        } else {
            cityCounts[city] = 1;
        }
    });

    const cityNames = Object.keys(cityCounts);
    const barCounts = Object.values(cityCounts);

    let trace1 = {
        x: cityNames,
        y: barCounts,
        type: "bar"
    };

    let layout = {
        title: "Number of Breweries by City"
    }

    let plotData = [trace1];

    Plotly.newPlot("simpleplot", plotData, layout);

});