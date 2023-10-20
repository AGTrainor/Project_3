// Load JSON data and create markers with popup content
d3.json('./static/data.json').then(function(data) {
    // Create a Leaflet map and add a tile layer
    var map = L.map('map').setView([YOUR_LATITUDE, YOUR_LONGITUDE], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Populate city and state dropdowns
    var cities = Array.from(new Set(data.map(item => item.city)));
    var states = Array.from(new Set(data.map(item => item.state)));

    var citySelector = document.getElementById('citySelector');
    cities.forEach(function(city) {
        var option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelector.appendChild(option);
    });

    var stateSelector = document.getElementById('stateSelector');
    states.forEach(function(state) {
        var option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelector.appendChild(option);
    });

    // Event listeners for dropdown changes
    citySelector.addEventListener('change', updateMarkers);
    stateSelector.addEventListener('change', updateMarkers);

    // Function to update markers based on selected city and state
    function updateMarkers() {
        var selectedCity = citySelector.value;
        var selectedState = stateSelector.value;

        // Clear existing markers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Create markers for filtered data
        data.filter(function(item) {
            return (selectedCity === 'All' || item.city === selectedCity) &&
                   (selectedState === 'All' || item.state === selectedState);
        }).forEach(function(item) {
            var name = item.name;
            var type = item.brewery_type;
            var latitude = item.latitude;
            var longitude = item.longitude;

            // Create a popup with content including a driving map link
            var popupContent = `
                <h1>${name}</h1>
                <p>Type: ${type}</p>
                <p>City: ${selectedCity}</p>
                <p>State: ${selectedState}</p>
                <p><a href="https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}" target="_blank">Get Directions</a></p>
            `;

            // Create a marker with the popup
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup(popupContent);
        });
    }

    // Initialize markers with all cities and states selected
    updateMarkers();
});
