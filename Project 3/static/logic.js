// Leaflet Map Initialization
var map = L.map('map').setView([51.505, -0.09], 1);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    

//var url = 'https://127.0.0.1:5000/data'

// load the data xxx

//fetch('/data').then(response => response.json())

//d3.json(url).then(function(data) {
//    console.log(data)
//})

d3.json('./static/data.json').then((data) => {
    console.log(data)

    for (let i=0; i< data.length; i++) {

        // 
        const name = data[i].name;
        console.log(name);
        const type = data[i].brewery_type;
        const city = data[i].city;
        const state = data[i].state;
        const latitude = data[i].latitude;
        const longitude = data[i].longitude;        
    }});


//
function createMap(data) {
    let 

}
    
    // add markers to map
    const marker = L.marker([latitude, longitude], {

    }).bindPopup(`<h1> Magnitude: ${data[i].name}</h1>`)

// D3 Chart 1
var chart1Data = [30, 45, 60, 80, 95];
var chart1Svg = d3.select("#chart_1").append("svg").attr("width", 200).attr("height", 200);
var chart1Bars = chart1Svg.selectAll("rect").data(chart1Data).enter().append("rect")
  .attr("x", (d, i) => i * 30)
  .attr("y", (d) => 200 - d)
  .attr("width", 25)
  .attr("height", (d) => d)
  .attr("fill", "blue");

// D3 Chart 2
var chart2Data = [10, 20, 30, 40, 50];
var chart2Svg = d3.select("#chart_2").append("svg").attr("width", 200).attr("height", 200);
var chart2Line = d3.line().x((d, i) => i * 30).y((d) => 200 - d);
chart2Svg.append("path").datum(chart2Data).attr("d", chart2Line).attr("fill", "none").attr("stroke", "green");

function optionChanged(city)
{
    console.log(`optionChanged, new value: ${City}`);
    createMap(City);
    createBubbleChart(City);
    dataDescription(City);
}

function Init()
{
    console.log('InitDashboard()');

    let selector = d3.select("selDataset")

    d3.josn()
};