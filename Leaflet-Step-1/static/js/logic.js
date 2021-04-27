//Create the different types of maps

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Earthquake Data; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Earthquake Data <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Earthquake Data <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});
  

// Create a map object

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: satellite
});



var baseMaps = {
"Satellite": satellite,
"StreetMap": streetmap,
"Light" : light
};

L.control.layers(baseMaps, {
    // collapsed: false
}).addTo(myMap);


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Store our API endpoint inside queryUrl

d3.json(queryUrl).then(function(data) {

    var quakes = data.features;

    
    function colormydot (depth) { 
        // if depth is between 0 and 150 color it green
        //  if depth is between 151 and 300 color it yellow
        // if depth is between 301 and 450 color it orange
        // if depth is greater than 450 color it red

        if (depth <= 5) {
            return "green";
        }
        else if (depth <= 10) {
            return "yellow";
        } 
        else if (depth <= 15) {
            return "orange";
        }
        else {
            return "red";
        }

    };
    
    quakes.forEach(element => {
        lat = element['geometry']["coordinates"][1];
        lng = element['geometry']["coordinates"][0];
        mag = element["properties"]['mag'];
        depth = element['geometry']["coordinates"][2];

        var marker = L.circleMarker([lat, lng], {
            radius: mag * 5,
            opacity: 1,
            fillOpacity: .9,
            color: "black",
            stroke: true,
            weight: .5,
            fillColor: colormydot(depth)
        }).addTo(myMap);

        marker.bindPopup("<h3>" + "Point of Earthquake: " + element.properties.place +
            "</h3><hr><h3>" + "Magnitude: " + mag + " ML" + "</h3><hr><h3>" + "Time: " + 
            new Date(element.properties.time) +
            "</h3><hr><h3>" + "Depth: " + depth + " km" + "</h3>")
        .addTo(myMap);
            
    console.log(marker);
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = marker.options.fillColor;
        console.log(colors);



        // Add min & max
    var legendInfo = "<h1> Earthquake Magnitude </h1> <div> <ul> <li> green < 5 </li> </ul> </div>" ;

    div.innerHTML = legendInfo;

        return div;
    };
    legend.addTo(myMap);

    });


    


});