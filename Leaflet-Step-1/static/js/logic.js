
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Store our API endpoint inside queryUrl

d3.json(queryUrl).then(function(data) {
    console.log(data);

    var quakes = data.features;

//     createFeature(quakes);
// });

// function createFeature(earthquake_info) {
// Creating each marker coordinate and pushing to empty array
    var quakeMarkers = [];
                
    function onEachFeature(element, layer) {
        
            // Define function markerSize 
            function markerSize(depth) {
            return depth * 100 
            };

        // quakeMarkers.push (
        //     L.circle([element.geometry.coordinates[0], element.geometry.coordinates[1]], {
        //         // color: element.geometry.coordinates[2],
        //         // color: red,
        //         fillOpacity: 0.75,
        //         radius: markerSize(element.properties.mag)
            
        //     }))
        
            // L.circleMarker ("<h3>" + "Point of Earthquake: " + element.properties.place +
            // "</h3><hr><h3>" + "Magnitude: " + element.properties.mag + "</h3><hr><h3>" + "Time: " + 
            // new Date(element.properties.time) +
            // "</h3><hr><h3>" + "Depth: " + element.geometry[2] + "</h3>")
        
    }        
        // var earthquakes = L.geoJSON(earthquake_info, 
        //     {onEachFeature: onEachFeature});    
    
    // Sending our earthquake_info layer to the createMap function
//     createMap(earthquakes);

// };     


// function createMap(earthquakes) {

    // Define streetmap and darkmap layers

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 5,
        id: "satellite-v9",
        accessToken: API_KEY
    });
    
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
      });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite": satellite,
      "Street Map": streetmap,
      "Light" : light
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    }
       // Create a map object
 
       var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [satellite, earthquakes]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
})