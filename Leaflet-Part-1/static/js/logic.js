// Creating initial map object
let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 3
});


// Adding tile layer (background image) to our map
let lightBlue = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var gray = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

lightBlue.addTo(myMap);


let baseMaps = {
    "Light Global": lightBlue,
    "Gray Global": gray
};

let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let overlays = {
    "Tectonic Plates": tectonicplates,
    Earthquakes: earthquakes
};

L
    .control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(myMap);

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"




// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data)

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    function chooseColor(depth) {
        if (depth > 90) {
            return "#ea2c2c";
        }
        if (depth > 70) {
            return "#ea822c";
        }
        if (depth > 50) {
            return "#ee9c00";
        }
        if (depth > 30) {
            return "#eecc00";
        }
        if (depth > 10) {
            return "#d4ee00";
        }
        return "#98ee00";
    }


    function markerSize(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }


    function style(feature) {
        return {
            color: "white",
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1.5,
            radius: markerSize(feature.properties.mag)
        }
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: onEachFeature,
        style: style
    }).addTo(earthquakes)

    earthquakes.addTo(myMap);


    //Set up the legend.
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");

        let grades = [-10, 10, 30, 50, 70, 90];

        let colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"];

        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: "
                + colors[i]
                + "'></i> "
                + grades[i]
                + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div
    };


    // Adding the legend to the map
    legend.addTo(myMap);

    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {

        L.geoJson(platedata, {
            color: "orange",
            weight: 2
        }).addTo(tectonicplates);

        tectonicplates.addTo(myMap);
    });

})