// to be modified in future
var mymap = L.map('mapid').setView([28.65, 77.22], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

$.getJSON("markers.json", function(json) {
    var markerdata = json; // this will show the info it in firebug console

    function onEachFeature(feature, layer) {
        console.log(feature)
        layer.bindPopup(
            "<div class='box'> <img src="+feature.properties.image+"> </div> Date: "+feature.properties.date+" <br>contributer: "+feature.properties.contributer+"<br>Community : "+feature.properties.community
            );
    }
    
    var jsonFeatures = [];
    markerdata.forEach(function(point){
        var lat = point.latitud;
        var lon = point.longitud;
        var feature = {type: 'Feature',
            properties:point,
    
            geometry: {
                type: 'Point',
                coordinates: [lon,lat]
            }
        };
        jsonFeatures.push(feature);
    });
    
    var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
    
    L.geoJSON(geoJson, {
        onEachFeature: onEachFeature
    }).addTo(mymap);

});

