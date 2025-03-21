import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

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

map.on("click", (event) => {
  const lat = event.lngLat.lat;
  const lng = event.lngLat.lng;
  channel.push("markers:new", {
    lat,
    lng,
  });
});

export default socket;
