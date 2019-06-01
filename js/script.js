import {
  updateCoordinates,
  showMap,
  toggleLayer,
  handleSwitch,
  handleDimmedMap,
  dimMap,
  undimMap,
  moveTo, rotateCamera,
  map
} from "./map.js";
import { toggleDropdownMenu, handleDropdownMenu } from "./footer.js";
import { pauseAudio, playAudio } from "./audio.js";
import { addMarkerPopupToMap, handlePopups } from "./popup.js";
import { playLargeVideo, stopLargeVideo } from "./video.js";
import { markers } from "./markers.js";
import { customLayer, hideDome, showDome } from "./dome.js";
import { show, hide } from "./utils.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

// const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.side_rotate.position, ...mapConfig.side_rotate.limits });

window.STATUS = "up";

/* Events */
$(".mapboxgl-canvas").css("cursor", "crosshair");

$("#btn-explore").on("click", e => {
  showMap();
  $("#audio-player")[0].play();
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
  $('#toggle-audio').prop('disabled', false);
  showDome(map);
});


$("#map").on("click", '.mapboxgl-popup-content', function (e) {
  window.STATUS = "down";
  const popupData = $(this).children('.popup-wrapper');

  moveTo({
    zoom: 14,
    center: [popupData.data('lon'), popupData.data('lat')],
    bearing: 0,
    pitch: 0
  }, null);

  pauseAudio(true);

  show("#video-wrapper");
  show("#close-video");
  playLargeVideo(popupData.data('url') + "");

  dimMap();
  hideDome(map);
});

$('#toggle-audio').on('click', function () {
  let status = $(this).data('status');

  if (status === 'play') {
    pauseAudio(false);
  } else {
    playAudio();
  }
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

  rotateCamera();
});

map.on("style.load", () => map.addLayer(customLayer));

map.on("drag", () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

map.on("pitchend", () => {
  if (map.getPitch() == 80 && window.STATUS == "up") {
    rotateCamera();
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


$('#navigate-menu').on('click', () => toggleDropdownMenu());

$('.dropdown-menu').on('click', (e) => {
  // Show map if hidden
  handleDimmedMap();
  handleDropdownMenu(e.target);
});