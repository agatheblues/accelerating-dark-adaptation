import {
  updateCoordinates,
  mapConfig,
  showMap,
  toggleLayer,
  handleSwitch,
  handleDimmedMap,
  dimMap,
  undimMap,
  moveTo, rotateCamera
} from "./map.js";
import { addMarkerPopupToMap, handlePopups } from "./popup.js";
import { playLargeVideo, stopLargeVideo } from "./video.js";
import { markers } from "./markers.js";
import { customLayer, hideDome, showDome } from "./dome.js";
import { show, hide } from "./utils.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

$("#audio-player")[0].play();

const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.side_rotate.position, ...mapConfig.side_rotate.limits });

window.STATUS = "up";

/* Events */
$(".mapboxgl-canvas").css("cursor", "crosshair");

$("#btn-explore").on("click", e => {
  showMap();
});

$("#btn-story").on("click", e => {
  /* @TODO */
  console.log('create view story mode');
});

$("#close-video").on("click", e => {
  undimMap();
  stopLargeVideo();
  hide("#video-wrapper");
  hide("#close-video");
  showDome(map);
  $("#audio-player")[0].play();
});

$("#lookup").on("click", function () {
  handleDimmedMap();
  moveTo(map, mapConfig.side_rotate.position, mapConfig.side_rotate.limits);
  window.STATUS = "up";
});

$("#lookdown").on("click", function () {
  handleDimmedMap();
  window.STATUS = "down";

  moveTo(map, mapConfig.top_zoomed.position, mapConfig.top_zoomed.limits);
});

$("#lookwhole").on("click", function () {
  handleDimmedMap();
  moveTo(map, mapConfig.top_distanced.position, mapConfig.top_distanced.limits);
});

$("#map").on("click", '.mapboxgl-popup-content', function (e) {
  window.STATUS = "down";
  const popupData = $(this).children('.popup-wrapper');

  moveTo(map, {
    zoom: 14,
    center: [popupData.data('lon'), popupData.data('lat')],
    bearing: 0,
    pitch: 0
  }, null);

  $("#audio-player")[0].pause();

  show("#video-wrapper");
  show("#close-video");
  playLargeVideo(popupData.data('url') + "");

  dimMap();
  hideDome(map);
});

$(document).mousemove(() => handleDimmedMap());

$(document).on('touchmove', () => handleDimmedMap());

$("#toggle-lux").change(function () {
  handleDimmedMap();
  toggleLayer(map, 'lux', this.checked);
  handleSwitch(this.checked, 'toggle-nqm', 'lux', 'nqm');
});

$("#toggle-nqm").change(function () {
  handleDimmedMap();
  toggleLayer(map, 'nqm', this.checked);
  handleSwitch(this.checked, 'toggle-lux', 'nqm', 'lux');
});

/* Map events */
map.on("load", function () {
  map.addLayer({
    "id": "markers",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": markers
    },
    'paint': {
      'circle-radius': 1,
      'circle-color': "#000"
    }
  });

  markers.features.forEach(feature => addMarkerPopupToMap(feature, map));
  handlePopups(map);

  rotateCamera(map, 1);
});

map.on("style.load", () => map.addLayer(customLayer));

map.on("drag", () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

map.on("pitchend", () => {
  if (map.getPitch() == 80 && window.STATUS == "up") {
    rotateCamera(map, 1);
    return;
  }
  if (map.getPitch() < 80) window.STATUS = "down";
});

map.on("zoomend", () => handlePopups(map));

map.on('moveend', () => {
  handlePopups(map);
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});
