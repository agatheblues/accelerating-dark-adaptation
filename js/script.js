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

const updateCoordinates = (e) => {
  $('#info-long').html(getCoordinate(e, 'lng'));
  $('#info-lat').html(getCoordinate(e, 'lat'));
}

console.log(map.loaded());

map.on('mousemove', e => updateCoordinates(e));

$(document).mousemove(function (e) {
  // Move torchlight
  // windowWidth = $(window).width();
  // windowHeight = $(window).height();

  $('.radial-gradient').css('background', 'radial-gradient(300px 300px at ' + e.pageX + 'px ' + e.pageY + 'px,  rgba(255, 255, 255, 0) 0%, black 50.5%)');
});