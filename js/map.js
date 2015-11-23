
// Function to draw your map
var drawMap = function() {
  var map = L.map("container").setView([33.883, -99.0167], 4);

  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  layer.addTo(map);

  getData(map);
}

// Function for getting data
var getData = function(map) {
   $.ajax({
    url: "data/response.json",
    data: "incidents",
    success: function(data) {
      customBuild(map,data);
      var shootingCount = dataCount(data);
      $('#whiteMale').append(shootingCount.whiteMale);
      $('#whiteFemale').append(shootingCount.whiteFemale);
      $('#nonWhiteMale').append(shootingCount.nonWhiteMale);
      $('#nonWhiteFemale').append(shootingCount.nonWhiteFemale);
    },
    dataType: "json"
    })
}

// creates circle markers for map
var customBuild = function(map,data) {
  var unknown =[];
  var white = [];
  var black = [];
  var asian = [];
  var indian = [];
  var islander = [];
  var all = [];

  data.map(function(d) {
    var race = d["Race"];
    var color;

    var circle = new L.circleMarker([d.lat, d.lng], {
      color: color
    });

    circle.bindPopup(race);

    if(race == "Unknown") {
      circle.setStyle({color: 'purple'});
      unknown.push(circle);
    } else if(race == "White") {
      circle.setStyle({color: 'blue'});
      white.push(circle);
    } else if(race == "Black or African American") {
      circle.setStyle({color: 'black'});
      black.push(circle);
    } else if(race == "Asian") {
      circle.setStyle({color: 'yellow'});
      asian.push(circle);
    } else if(race == "American Indian or Alaska Native") {
      circle.setStyle({color: 'red'});
      indian.push(circle);
    } else {
      circle.setStyle({color: 'green'});
      islander.push(circle);
    }
  });

  var unknowns = new L.LayerGroup(unknown);
  var whites = new L.LayerGroup(white);
  var blacks = new L.LayerGroup(black);
  var asians = new L.LayerGroup(asian);
  var indians = new L.LayerGroup(indian);
  var islanders = new L.LayerGroup(islander);

  unknowns.addTo(map);
  whites.addTo(map);
  blacks.addTo(map);
  asians.addTo(map);
  indians.addTo(map);
  islanders.addTo(map);

  var mapView = {
    "Unknown": unknowns,
    "White": whites,
    "Black or African American": blacks,
    "Asian": asians,
    "American Indian or Alaska Native": indians,
    "Native Hawaiian or Other Pacific Islander": islanders
  };
  L.control.layers(null,mapView).addTo(map);
}

// counts data of police shooting for table
var dataCount = function(data) {
  var whiteMale = 0;
  var whiteFemale = 0;
  var nonWhiteMale = 0;
  var nonWhiteFemale = 0;

  data.map(function(d) {
    var gender = d["Victim's Gender"];
    var race = d["Race"];
    var color;

    if(race == "Unknown" && (gender == "male" || gender == "Male")) {
      nonWhiteMale++;
    }
    if(race == "Unknown" && (gender == "female" || gender == "Female")) {
      nonWhiteFemale++;
    }
    if(race == "White" && (gender == "male" || gender == "Male")) {
      whiteMale++;
    }
    if(race == "White" && (gender == "female" || gender == "Female")) {
      whiteFemale++;
    }
    if(race == "Black or African American" && (gender == "male" || gender == "Male")) {
      nonWhiteMale++;
    }
    if(race == "Black or African American" && (gender == "female" || gender == "Female")) {
      nonWhiteFemale++;
    }
    if(race == "Asian" && (gender == "male" || gender == "Male")) {
      nonWhiteMale++;
    }
    if(race == "Asian" && (gender == "female" || gender == "Female")) {
      nonWhiteFemale++;
    }
    if(race == "American Indian or Alaska Native" && (gender == "male" || gender == "Male")) {
      nonWhiteMale++;
    }
    if(race == "American Indian or Alaska Native" && (gender == "female" || gender == "Female")) {
      nonWhiteFemale++;
    }
    if(race == "Native Hawaiian or Other Pacific Islander" && (gender == "male" || gender == "Male")) {
      nonWhiteMale++;
    }
    if(race == "Native Hawaiian or Other Pacific Islander" && (gender == "female" || gender == "Female")) {
      nonWhiteFemale++;
    }
  });

  // returns object of data of police shooting
  dataDemographics = {
    "whiteMale" : whiteMale,
    "whiteFemale" : whiteFemale,
    "nonWhiteMale" : nonWhiteMale,
    "nonWhiteFemale" : nonWhiteFemale
  }
  return dataDemographics;
};