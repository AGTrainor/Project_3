var citySelector; // Declare citySelector in the global scope
var stateSelector; // Declare stateSelector in the global scope
var map; // Declare map in the global scope

// Fetch and populate city and state names
fetch('./static/data.json')
    .then(response => response.json())
    .then(data => {
        GD = data;
        citySelector = document.getElementById('citySelector'); // Initialize citySelector
        stateSelector = document.getElementById('stateSelector'); // Initialize stateSelector

        data.forEach(item => {
            var cityOption = document.createElement('option');
            var stateOption = document.createElement('option');
            cityOption.value = item.city;
            cityOption.textContent = item.city;
            stateOption.value = item.state;
            stateOption.textContent = item.state;
            citySelector.appendChild(cityOption);
            stateSelector.appendChild(stateOption);
        });

        // Set up event listeners and call updateMarkers() after data is loaded
        citySelector.addEventListener('change', updateMarkers);
        stateSelector.addEventListener('change', updateMarkers);

        // Initialize Leaflet map and add tile layer
        map = L.map('map').setView([0, -40], 2);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Call updateMarkers() after setting up event listeners
        updateMarkers();
    })
    .catch(error => {
        console.error('Error fetching city names:', error);
    });

function updateMarkers() {
    var selectedCity = citySelector.value;
    var selectedState = stateSelector.value;

    // Clear existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Create markers for filtered data
    GD.filter(function (item) {
        return (selectedCity === 'All' || item.city === selectedCity) &&
            (selectedState === 'All' || item.state === selectedState);
    }).forEach(function (item) {
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
