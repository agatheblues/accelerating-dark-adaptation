import {
  showMap,
  handleDimmedMap,
  dimMap,
  moveTo, rotateCamera,
  map
} from "./map.js";
import { handleDropdownMenu, toggleLux, toggleNqm, updateCoordinates } from "./footer.js";
import { pauseAudio, toggleAudio } from "./audio.js";
import { addMarkerPopupToMap, updatePopupContent } from "./popup.js";
import { playLargeVideo, closeVideo } from "./video.js";
import { markers } from "./markers.js";
import { customLayer, hideDome } from "./dome.js";
import { show } from "./utils.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

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

$("#close-video").on("click", e => closeVideo());


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
  hideDome();
});

$('#toggle-audio').on('click', function () { return toggleAudio($(this).data('status')); });

$(document).mousemove(() => handleDimmedMap());

$(document).on('touchmove', () => handleDimmedMap());

$("#toggle-lux").change(function () { return toggleLux(this.checked); });

$("#toggle-nqm").change(function () { return toggleNqm(this.checked); });

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

  markers.features.forEach(feature => addMarkerPopupToMap(feature));
  updatePopupContent();

  rotateCamera();
});

map.on("style.load", () => map.addLayer(customLayer));

map.on("drag", () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

map.on("pitchend", () => {
  if (map.getPitch() == 80) {
    window.STATUS == "up";
    rotateCamera();
    return;
  }
  if (map.getPitch() < 80) window.STATUS = "down";
});

map.on("zoomend", () => updatePopupContent());

map.on('moveend', () => {
  updatePopupContent();
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

/* DROPDOWN MENU EVENTS */
$('#navigate-menu').on('click', () => $('#navigate-menu-list').toggle(300));
$('#site-menu').on('click', () => $('#site-menu-list').toggle(300));

$('#navigate-menu-list').on('click', (e) => {
  handleDimmedMap();
  handleDropdownMenu(e.target);
});

$(document).on('click', function (e) {
  const $menu = $('.dropdown-container');

  if (!$menu.is(e.target) // if the target of the click isn't the container...
    && $menu.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $('.dropdown-menu').hide(300)
  }
});