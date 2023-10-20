// Leaflet Map Initialization
var map = L.map('map').setView([51.505, -0.09], 1);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load JSON data and create markers
d3.json('./static/data.json').then(function(data) {
    console.log(data);

    // Function to filter markers based on selected city and state
    function filterMarkers(city, state) {
        // Clear existing markers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add filtered markers based on the selected city and state
        data.forEach(function(item) {
            const latitude = item.latitude;
            const longitude = item.longitude;
            const cityName = item.city;
            const stateName = item.state;

            if ((city === 'All' || city === cityName) && (state === 'All' || state === stateName)) {
                const name = item.name;
                const type = item.brewery_type;

                // Create a marker for each data point and add it to the map
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup(`<h1>${name}</h1><p>Type: ${type}</p><p>City: ${cityName}</p><p>State: ${stateName}</p>`);
            }
        });
    }

    // Event listeners for dropdown changes
    var citySelector = document.getElementById('citySelector');
    citySelector.addEventListener('change', updateMarkers);
    
    var stateSelector = document.getElementById('stateSelector');
    stateSelector.addEventListener('change', updateMarkers);

    // Function to handle dropdown changes and update markers
    function updateMarkers() {
        var selectedCity = citySelector.value;
        var selectedState = stateSelector.value;
        filterMarkers(selectedCity, selectedState);
    }

    // Initialize markers with all cities and states selected
    filterMarkers('All', 'All');
});
