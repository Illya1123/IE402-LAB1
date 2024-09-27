require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (Map, MapView, Graphic, GraphicsLayer) {
  var map = new Map({
    basemap: "topo-vector",
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    // center: [106.8033387, 10.8739831],
    center: [106.61819216561304, 11.111863916122832],
    zoom: 15,
    highlightOptions: {
      color: "blue",
    },
  });

  fetch("data.json")
    .then((response) => response.json())
    .then((jsondata) => {
      var createGraphic = function (data) {
        return new Graphic({
          geometry: data,
          symbol: data.symbol,
          attributes: data,
          popupTemplate: data.popupTemplate,
        });
      };

      var graphicsLayer = new GraphicsLayer();
      jsondata.points.forEach(function (data) {
        graphicsLayer.add(createGraphic(data));
      });
      jsondata.lines.forEach(function (data) {
        graphicsLayer.add(createGraphic(data));
      });
      jsondata.polygons.forEach(function (data) {
        graphicsLayer.add(createGraphic(data));
      });
      map.add(graphicsLayer);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});
