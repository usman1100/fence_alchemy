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

const clearMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
  markers = [];
  drawMarkers(markers);
};

var m = maplibregl;

var map = new m.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [30.5, 50.5],
  zoom: 5,
});

map.addControl(
  new m.NavigationControl({
    visualizePitch: true,
    visualizeRoll: true,
    showZoom: true,
    showCompass: true,
  })
);

map.on("click", (data) => {
  const lng = data.lngLat.lng;
  const lat = data.lngLat.lat;
  const color = getRandomColor();

  const marker = new m.Marker({
    color,
  }).setLngLat([lng, lat]);

  markers.push(marker);
  drawMarkers(markers);
});

let markers = [];

const drawMarkers = (list) => {
  list.forEach((item) => {
    item.addTo(map);
  });
};
