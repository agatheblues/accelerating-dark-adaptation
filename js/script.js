import { updateCoordinates, renderPopUpContent, mapStyle, showMap } from './map.js'
import { playVideo, hideVideo, showVideo, stopVideo, videoCoord } from './video.js'
import { markers } from './markers.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

let popups = [];
const map = new mapboxgl.Map({
  container: 'map',
  minZoom: 16,
  maxZoom: 19,
  center: [4.780525,
    52.360463],
  zoom: 10,
  bearing: 0,
  style: mapStyle
});


/* MAP */
$('.mapboxgl-canvas').css('cursor', 'crosshair');

const addVideoToMap = (name, lat_bottom, lat_top, lon_right, lon_left, index) => {
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
}

const addMarkerToMap = (feature, index) => {
  map.addLayer({
    "id": `marker-${index}`,
    "type": "symbol",
    "source": "markers",
    "layout": {
      "icon-image": "rocket-15",
      "icon-allow-overlap": true,
      "icon-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        22,
        1
      ]
    }
  });

  addMarkerLabelToMap(feature);
}

const addMarkerLabelToMap = (feature) => {
  let popup = new mapboxgl.Popup({
    "closeButton": false,
    "closeOnClick": false,
    "offset": -200,
  });

  let coordinates = feature.geometry.coordinates.slice();
  let { lux, nqm, conditions } = feature.properties;

  popup.setLngLat(coordinates)
    .setHTML(renderPopUpContent(lux, nqm, conditions, coordinates[0], coordinates[1]))
    .addTo(map);

  popups.push(popup);
}

const inMin = 16;
const inMax = 19;
const outMin = -200;
const outMax = -500;
const mapOffset = (value) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

/* Events */
map.on('load', function () {
  // MARKERS
  map.addSource("markers", {
    "type": "geojson",
    "data": markers
  });

  markers.features.forEach((feature, index) => addMarkerToMap(feature, index));

  // VIDEO
  videoCoord.forEach(({ name = "", lat_bottom = 0, lat_top = 0, lon_right = 0, lon_left = 0 }, index) => addVideoToMap(name, lat_bottom, lat_top, lon_right, lon_left, index));
});

map.on('zoom', function () {
  for (let i = 0; i < popups.length; i++) {
    popups[i].options.offset = mapOffset(map.getZoom());
  }
});

map.on('mousemove', e => updateCoordinates(e));

map.on('click', 'markers', function (e) {
  let { url } = e.features[0].properties;
  let video = "video1";
  showVideo();
  playVideo('https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4');
});

$('#btn-start').on('click', (e) => showMap());

$('#close-video').on('click', (e) => {
  stopVideo();
  hideVideo();
});