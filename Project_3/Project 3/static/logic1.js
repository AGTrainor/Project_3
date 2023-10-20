// Leaflet Map Initialization
var map = L.map('map').setView([51.505, -0.09], 1);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load JSON data and create markers
d3.json('./static/data.json').then(function(data) {
    console.log(data);

    data.forEach(function(item) {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const name = item.name;
        const type = item.brewery_type;
        const city = item.city;
        const state = item.state;

        // Create a marker for each data point and add it to the map
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<h1>${name}</h1><p>Type: ${type}</p><p>City: ${city}</p><p>State: ${state}</p>`);
    });
});
