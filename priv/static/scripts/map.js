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

map.addControl(
  new m.NavigationControl({
    visualizePitch: true,
    visualizeRoll: true,
    showZoom: true,
    showCompass: true,
  }),
);
