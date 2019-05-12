import { updateCoordinates, renderPopUpContent, mapStyle } from './map.js'
import { playVideo, hideVideo, showVideo, stopVideo, videoCoord } from './video.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

/* Style */
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

const moveTorch = (e) => $('.radial-gradient').css('background', 'radial-gradient(200px 200px at ' + e.pageX + 'px ' + e.pageY + 'px,  rgba(255, 255, 255, 0) 0%, black 50.5%)');

let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

/* Events */

map.on('load', function () {
  videoCoord.forEach(({ name = "", lat_bottom = 0, lat_top = 0, lon_right = 0, lon_left = 0 }, index) => {
    map.addSource(name + index, {
      "type": "video",
      "urls": ["https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557660500/north-onthedigue_1_tthihf.mp4"],
      "coordinates": [
        [lon_left, lat_top], // Top left corner
        [lon_right, lat_top], // Top right corner
        [lon_right, lat_bottom], // Bottom right corner
        [lon_left, lat_bottom], // Bottom left corner
      ]
    });

    map.addLayer({
      "id": name + index,
      "type": "raster",
      "source": name + index,
      "paint": {}
    });
  });
});

map.on('mousemove', e => updateCoordinates(e));

map.on('mouseenter', 'markers', function (e) {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';

  // Set pop up location and content
  let coordinates = e.features[0].geometry.coordinates.slice();
  let { lux, nqm, conditions } = e.features[0].properties;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  popup.setLngLat(coordinates)
    .setHTML(renderPopUpContent(lux, nqm, conditions))
    .addTo(map);
});

map.on('click', 'markers', function (e) {
  let { url } = e.features[0].properties;
  let video = "video1";
  showVideo();
  playVideo('https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4');
});

map.on('mouseleave', 'markers', function () {
  map.getCanvas().style.cursor = 'crosshair';
  popup.remove();
});

$('#close-video').on('click', (e) => {
  stopVideo();
  hideVideo();
});

$(document).mousemove((e) => moveTorch(e));

