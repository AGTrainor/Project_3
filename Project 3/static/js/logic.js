$(document).ready(function () {
    $.getJSON('./static/js/data.json', function (jsonData) {
       data = jsonData; // Assign the loaded data to the data variable
        // Continue with your code
    
    var map = L.map('map').setView([35, -100], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    var cityCoordinates = {
        "All": { lat: 40, lng: -95 , zoom: 4},
        "San Francisco": { lat: 37.7833, lng: -122.4167, zoom: 12},
        "San Diego": { lat: 32.7157, lng: -117.1611, zoom: 12},
        "Seattle": { lat: 47.6061, lng: -122.3328, zoom: 12},
        "Denver": { lat: 39.7392, lng: -104.9903, zoom: 12},
        "Chicago": { lat: 41.8781, lng: -87.6298, zoom: 12},
        "Columbus": {lat: 39.9612, lng: -82.9988, zoom: 12},
        "Cincinnati": { lat: 39.1031, lng: -84.5120, zoom: 12},
        "Portland": { lat: 45.5152, lng: -122.6784, zoom: 12},
        "Cleveland": { lat: 41.4933 , lng: -81.6944, zoom: 12},
        "Minneapolis": { lat: 44.9778 , lng: -93.2650, zoom: 12},
        "Saint Louis": { lat: 38.6270 , lng: -90.1994, zoom: 12},
        "Spokane": {lat: 47.6580 , lng: -117.4235, zoom: 12},
        "Bend": { lat: 44.0582 , lng: -121.3153, zoom: 12},
        "Albuquerque": { lat: 35.0844 , lng: -106.6504, zoom: 12},
        "Austin": { lat: 30.2672 , lng: -97.7431, zoom: 12},
        "Los Angeles": { lat: 34.0549 , lng: -118.2426, zoom: 12},
        "Milwaukee": { lat: 43.0389 , lng: -87.9065, zoom: 12},
        "Sacramento": { lat: 38.5816 , lng: -121.4944, zoom: 12},
        "Kansas City": { lat: 39.0977 , lng: -94.5786, zoom: 12},
        "Salt Lake City": { lat: 40.7608 , lng: -111.8910, zoom: 12},
    };

    

    function filterMarkers(city) {
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Check if data is defined before using it
        if (data) {
            data.forEach(function (item) {
                const latitude = item.latitude;
                const longitude = item.longitude;
                const cityName = item.city;
                if (city === 'All' || city === cityName) {
                    const name = item.name;
                    const type = item.brewery_type;
                    L.marker([latitude, longitude]).addTo(map)
                        .bindPopup(`<h1>${name}</h1><h2>Type: ${type}</h2><h2>City: ${cityName}</h2>`);
                }
            });
        }
        
        // Update the map view based on the selected city
        map.setView([cityCoordinates[city].lat, cityCoordinates[city].lng], cityCoordinates[city].zoom);
    }

    var citySelector = document.getElementById('citySelector');
    citySelector.addEventListener('change', function () {
        var selectedCity = citySelector.value;
        filterMarkers(selectedCity);
    });

    // Initialize markers with the default city selected
    filterMarkers('All');

    // Generate Pie Chart
    function generatePieChart(data) {
        var pieChartData = [];

        data.forEach(function (item) {
            var type = item.brewery_type;
            var existingType = pieChartData.find(function (x) { return x.type === type});
            if (existingType) {
                existingType.count++;
            } else {
                pieChartData.push({ type: type, count: 1});
            }
        });

        var pieChartSvg = d3.select("#pieChart")
            .append("svg")
            .attr("width", 300)
            .attr("height", 300);

        var width = 300;
        var height = 300;
        var radius = 150;

        var g = pieChartSvg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.count;
            });
        
        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius + 10)
            .innerRadius(radius + 10);
        
        var arc = g.selectAll(".arc")
            .data(pie(pieChartData))
            .enter().append("g")
            .attr("class", "arc");
        
        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                return color(d.data.type);
            });

        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .text(function (d) {
                return d.data.type;
            });

    }
    generatePieChart(data);

});

});