import { mapStyle } from './mapStyle.js'
import { getCoordinate } from './utils.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

var map = new mapboxgl.Map({
  container: 'map',
  minZoom: 10,
  maxZoom: 22,
  center: [4.8939090868191215, 52.36163000690422],
  zoom: 10,
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