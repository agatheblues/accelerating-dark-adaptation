import { mapStyle } from './mapStyle.js'
import { getCoordinate } from './utils.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

var map = new mapboxgl.Map({
  container: 'map',
  minZoom: 13,
  maxZoom: 22,
  center: [4.8939090868191215, 52.36163000690422],
  zoom: 10,
  bearing: 0,
  style: mapStyle
});

$('.mapboxgl-canvas').css('cursor', 'crosshair');

const updateCoordinates = (e) => {
  $('#info-long').html(getCoordinate(e, 'lng'));
  $('#info-lat').html(getCoordinate(e, 'lat'));
}

map.on('mousemove', e => updateCoordinates(e));

map.on('mouseenter', 'markers', function (e) {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';

  // var coordinates = e.features[0].geometry.coordinates.slice();
  // var description = e.features[0].properties.description;

  // // Ensure that if the map is zoomed out such that multiple
  // // copies of the feature are visible, the popup appears
  // // over the copy being pointed to.
  // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  // }

  // // Populate the popup and set its coordinates
  // // based on the feature found.
  // popup.setLngLat(coordinates)
  //   .setHTML(description)
  //   .addTo(map);
});

map.on('mouseleave', 'markers', function () {
  map.getCanvas().style.cursor = 'crosshair';
  // popup.remove();
});

$(document).mousemove(function (e) {
  // Move torchlight
  // windowWidth = $(window).width();
  // windowHeight = $(window).height();

  $('.radial-gradient').css('background', 'radial-gradient(200px 200px at ' + e.pageX + 'px ' + e.pageY + 'px,  rgba(255, 255, 255, 0) 0%, black 50.5%)');
});