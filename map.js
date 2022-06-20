mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl4kpm8j1000h14u9kol956io',
    maxZoom: 10,
    minZoom: 1,
    center: [0, 5],
    projection: 'naturalEarth',
})

map.on("load", function () {
    map.addLayer(
        {
          id: "countries_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/countries.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.2,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );

      map.addLayer(
        {
          id: "points",
          type: "circle",
          source: {
            type: "geojson",
            data: "data/geo_conflicts.geojson",
          },
          minzoom: 3,
          paint: {
            "circle-radius": 7,
            "circle-color": "#e34a33",
            "circle-opacity": 0.7,
          }, 
          },
        "countries_outline" // Here's where we tell Mapbox where to slot this new layer
      );

      map.addLayer(
        {
          id: "points2",
          type: "circle",
          source: {
            type: "geojson",
            data: "data/geo_conflicts.geojson",
          },
          minzoom: .5,
          paint: {
            "circle-radius": 7,
            "circle-color": "#e34a33",
            "circle-opacity": 0.7,
          }, 
          },
        "points" // Here's where we tell Mapbox where to slot this new layer
      );

    map.addLayer(
      {
        id: "fill",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/waterstress.geojson",
        },
        maxzoom: 3,
        paint: {
          "fill-color":[
            "match",
            ["get", "level"],
            "Low stress",
            "#b2d8d8",
            "Low-to-medium stress",
            "#66b2b2",
            "Medium-to-high stress",
            "#008080",
            "High stress",
            "#006666",
            "Extremely high stress",
            "#004c4c",
            "#ffffff",
          ],
          "fill-outline-color": "#ffffff",
        },
      },
      "points2" // Here's where we tell Mapbox where to slot this new layer
    );
  });

map.on("click", "fill", function (e) {
  var stateName = e.features[0].properties.Entity;
  var level = e.features[0].properties.level;
  var Perc = e.features[0].properties.percent;
  Perc = Perc.toFixed(1);
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stateName +
        "</h4>" +
        "<h2>" +
        level +
        "</h2>" +
        "<p>" +
        "Freshwater withdrawal as a share of internal resources in 2017: " +
        Perc +
        "%"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "fill", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "fill", function () {
  map.getCanvas().style.cursor = "";
});

map.on("click", "points", function (e) {
  var stateName = e.features[0].properties.Country;
  var head = e.features[0].properties.Headline;
  var Description = e.features[0].properties.Description;
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stateName +
        "</h4>" +
        "<h2>" +
        head +
        "</h2>" +
        "<p>" +
        Description +
        "<p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "points", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "points", function () {
  map.getCanvas().style.cursor = "";
});
