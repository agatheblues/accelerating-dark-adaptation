import { mapStyle } from './mapStyle.js'
import { getCoordinate } from './utils.js'

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
  // Update lat / long
  $('#info-long').html(getCoordinate(e, 'lng'));
  $('#info-lat').html(getCoordinate(e, 'lat'));
});

$(document).mousemove(function (e) {
  // Move torchlight
  // windowWidth = $(window).width();
  // windowHeight = $(window).height();

  $('.radial-gradient').css('background', 'radial-gradient(300px 300px at ' + e.pageX + 'px ' + e.pageY + 'px,  transparent 25%, black 25.5%)');
});