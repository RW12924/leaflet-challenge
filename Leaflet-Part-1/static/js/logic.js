// Creates the map
let myMap = L.map('map', {
  center: [37, -120],
  zoom: 6
});


// Creates the tile layer for the background of our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Establishes the URL that data will be drawn from
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


// Sets the colors for the markers on our map based on the depth of each entry in the data
function circleColor(depth){
  return depth > 90 ? '#FF0000':
         depth > 70 ? '#F07204':
         depth > 50 ? '#FFD500':
         depth > 30 ? '#F0F005':
         depth > 10 ? '#B9F004':
                      '#00E80F';
};

// Performs API call to retrieve data
d3.json(url).then(function(results){
  features = results.features;

  // Loops through the data entries retrieved from the API call
  for (let i=0; i<features.length; i++) {
    let location = features[i].geometry;

    // Creates circle markers centered on the coordinates for each entry
    if(location){
      L.circle([location.coordinates[1], location.coordinates[0]], {
        weight: 0.75,
        fillOpacity: 1,
        color: 'white',

        // Sets the fill color for each circle based on the depth of the earthquake
        fillColor: circleColor(location.coordinates[2]),

        // Sets the size of the circle based on the earthquake magnitude
        radius: (features[i].properties.mag*9000)
      })
      .addTo(myMap)

      // Creates popup messages for each circle containing additional info on each earthquake
      .bindPopup(`<h3>Location: ${features[i].properties.place}</h3><hr>
      <p>Coordinates: ${location.coordinates[1]}, ${location.coordinates[0]}</p>
      <p>Magnitude: ${features[i].properties.mag}</p>
      <p>Depth: ${location.coordinates[2]}</p>`);
    }
  }
})

// Creates a custom legend control
var legend = L.control({position: 'bottomright'});

// Sets the label values for the legend and adds colored boxes to the legend
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var labels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
    var colors = ['#00E80F', '#B9F004', '#F0F005', '#FFD500', '#F07204', '#FF0000'];

    // Adds a title to the legend
    let legendInfo = '<h3>Earthquake Depth</h3>';

    div.innerHTML = legendInfo;

    // Loops through the depth ranges we previously defined and generates a label with a colored square for each interval
    for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

legend.addTo(myMap);