let socket = new window.PhoenixSocket("/socket", { params: { token: window.userToken } });

let markers = [];

const reDrawMarkers = (new_markers) => {
  markers.forEach((marker) => {
    marker.remove();
  });

  markers = new_markers.map((item) =>
    new maplibregl.Marker().setLngLat([item.lng, item.lat]),
  );

  markers.forEach((marker) => {
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


const getRandomColor = () => {
  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

var m = maplibregl;

var map = new m.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [1.131057475965207, 8.556351936524663],
  zoom: 5,
});

map.on("click", (event) => {
  const lat = event.lngLat.lat;
  const lng = event.lngLat.lng;
  channel.push("markers:new", {
    lat,
    lng,
  });
});

map.addControl(
  new m.NavigationControl({
    visualizePitch: true,
    visualizeRoll: true,
    showZoom: true,
    showCompass: true,
  }),
);
