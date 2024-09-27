require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "dojo/domReady!"
], function (Map, MapView, Graphic, GraphicsLayer, Point, Polygon, SimpleMarkerSymbol, SimpleFillSymbol) {
  var map = new Map({
      basemap: "satellite",
  });

  var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [106.68833168094307, 11.195745354400728],
      zoom: 11,
      highlightOptions: {
          color: "blue",
      },
  });

  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  fetch("data.json")
      .then((response) => response.json())
      .then((jsondata) => {
          jsondata.polygons.forEach(function (data) {
              var polygonGraphic = new Graphic({
                  geometry: new Polygon({
                      rings: data.rings,
                      spatialReference: { wkid: 4326 }
                  }),
                  symbol: new SimpleFillSymbol({
                      color: data.symbol.color,
                      outline: data.symbol.outline
                  }),
                  attributes: data,
                  popupTemplate: data.popupTemplate,
              });
              graphicsLayer.add(polygonGraphic);
          });
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });  
});
