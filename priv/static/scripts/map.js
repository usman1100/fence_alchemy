let socket = new window.PhoenixSocket("/socket", {
  params: { token: window.userToken },
});

const mapStyles = {
  demo: "https://demotiles.maplibre.org/style.json",
  arcgis:
    "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/arcgis_hybrid.json",
  positron: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  openStreet:
    "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
};

let markers = [];

const reDrawMarkers = (new_markers) => {
  markers.forEach((marker) => {
    marker.remove();
  });

  markers = new_markers.map((item) =>
    new maplibregl.Marker().setLngLat([item.lng, item.lat]),
  );

  markers.forEach((marker) => {
    marker.getElement().addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(event);
    });
    marker.addTo(map);
  });
};

socket.connect();

let channel = socket.channel("markers:all", {});
channel
  .join()
  .receive("ok", (resp) => {
    reDrawMarkers(resp.markers);
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

channel.on("markers:new", (resp) => {
  reDrawMarkers(resp.markers);
});

var m = maplibregl;

var map = new m.Map({
  container: "map",
  style: mapStyles.arcgis,
  center: [1.131057475965207, 8.556351936524663],
  zoom: 5,
});

MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true, // Enable polygon drawing
    trash: true, // Enable delete button
  },
});

map.addControl(draw);

map.on("click", (event) => {
  const modes = draw.getMode();
  if (["draw_polygon", "draw_line_string", "direct_select"].includes(modes)) {
    return;
  }

  const lat = event.lngLat.lat;
  const lng = event.lngLat.lng;
  channel.push("markers:new", {
    lat,
    lng,
  });
});

map.on("draw.create", (event) => {
  console.log(event.features?.[0]);
  console.log(event.features?.[0]?.geometry);
});
