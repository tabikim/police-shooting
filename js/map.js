
// Function to draw your map
var drawMap = function() {

  // Create map and set view
  var map = L.map("container").setView([33.883, -99.0167], 4);

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
  layer.addTo(map);
  // Execute your function to get data
  getData(map);
 
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
   $.ajax({
    url: "data/response.json",
    data: "incidents",
    success: function(data) {
      customBuild(map,data);
    },
    dataType: "json"
    })
  // When your request is successful, call your customBuild function
}

var unknown = new L.LayerGroup([]);
var white = new L.LayerGroup([]);
var black = new L.LayerGroup([]);
var asian = new L.LayerGroup([]);
var indian = new L.LayerGroup([]);
var islander = new L.LayerGroup([]);
// Loop through your data and add the appropriate layers and points

var customBuild = function(map,data) {

  for(var i = 0; i < data.length; i++) {
    var latitude = data[i]["lat"];
    var longitude = data[i]["lng"];
    var circle = new L.circleMarker([latitude, longitude]);

    var race = data[i]["Race"];
    if(race == null) {
      circle.addTo(unknown).bindPopup("Unknown");;
    } else if(race == "White") {
      circle.addTo(white).bindPopup("White");
      circle.setStyle({fillColor:'red'});
    } else if(race == "Black or African American") {
      circle.addTo(black).bindPopup("Black or African American");
      circle.setStyle({fillColor:'green'});
    } else if(race == "Asian") {
      circle.addTo(asian).bindPopup("Asian");
      circle.setStyle({fillColor:'yellow'});
    } else if(race == "American Indian or Alaska Native") {
      circle.addTo(indian).bindPopup("American Indian or Alaska Native");
      circle.setStyle({fillColor:'purple'});
    } else {
      circle.addTo(islander).bindPopup("Native Hawaiian or Other Pacific Islander");
      circle.setStyle({fillColor:'black'});
    }

  }

  unknown.addTo(map);
  white.addTo(map);
  black.addTo(map);
  asian.addTo(map);
  indian.addTo(map);
  islander.addTo(map);
  // Be sure to add each layer to the map  

  // Once layers are on the map, add a leaflet controller that shows/hides layers

  var mapView = {
    "Unknown": unknown,
    "White": white,
    "Black or African American": black,
    "Asian": asian,
    "American Indian or Alaska Native": indian,
    "Native Hawaiian or Other Pacific Islander": islander
  };
  L.control.layers(null,mapView).addTo(map);
  
}