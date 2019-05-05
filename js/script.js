mapboxgl.accessToken = 'pk.eyJ1IjoiYWdhdGhlYmx1ZXMiLCJhIjoiY2p2NW5mdGhjMHIyZTN5cG1wdTU5a2ppZiJ9.mGUzsVIk2x1XDXy3Zgp9eA';

var map = new mapboxgl.Map({
  container: 'map',
  minZoom: 11,
  maxZoom: 13,
  center: [4.8939090868191215, 52.36163000690422],
  zoom: 12,
  bearing: 0,
  style: mapStyle
}
);

map.on('mousemove', function (e) {
  const lng = e.lngLat.lng;
  const lat = e.lngLat.lat;

  document.getElementById('infoLong').innerHTML = lng;
  document.getElementById('infoLat').innerHTML = lat;
});