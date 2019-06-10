import {
  startExploreMode,
  handleDimmedMap,
  dimMap,
  moveTo, rotateCamera,
  map
} from "./map.js";
import { handleDataLayer, handleNavigateClick, showVideoDetails } from "./footer.js";
import { pauseAudio, toggleAudio } from "./audio.js";
import { addMarkerPopupToMap, updatePopupContent } from "./popup.js";
import { playLargeVideo, closeVideo } from "./video.js";
import { markers, findMarkerById } from "./markers.js";
import { customLayer, hideDome } from "./dome.js";
import { show, hideDropdownMenus, hide } from "./utils.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

window.STATUS = "down";

/* Events */
$(".mapboxgl-canvas").css("cursor", "crosshair");

$("#btn-explore").on("click", e => startExploreMode());

$("#btn-story").on("click", e => {
  /* @TODO */
  console.log('create view story mode');
});

$("#close-video").on("click", e => closeVideo());


$("#map").on("click", '.mapboxgl-popup-content', function (e) {
  window.STATUS = "down";
  const popupId = $(this).children('.popup-wrapper').data('id');
  const marker = findMarkerById(`${popupId}`);

  const [longitude, latitude] = marker.geometry.coordinates;

  moveTo({
    zoom: 14,
    center: [longitude, latitude],
    bearing: 0,
    pitch: 0
  }, null);

  pauseAudio(true);

  show("#video-wrapper");
  show("#close-video");
  show("#video-details");
  hide('#nqm-definition');
  hide('#lux-definition');
  playLargeVideo(marker.properties.video_id);
  showVideoDetails({ ...marker.properties, longitude, latitude });

  dimMap();
  hideDome();
});

$('#toggle-audio').on('click', function () { return toggleAudio($(this).data('status')); });

$(document).mousemove(() => handleDimmedMap());

$(document).on('touchmove', () => handleDimmedMap());

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
  hide('.mapboxgl-popup');
  updatePopupContent();
});

map.on("style.load", () => map.addLayer(customLayer));

map.on("pitchend", () => {
  if (map.getPitch() == 80) {
    window.STATUS = "up";
    rotateCamera();
    return;
  }
  if (map.getPitch() < 80) window.STATUS = "down";
});

map.on("zoomend", () => updatePopupContent());

map.on('moveend', () => updatePopupContent());

/* FOOTER EVENTS */
$('.dropdown-trigger').on('click', (e) => {
  $('.dropdown-menu').hide(300);
  $(`#${e.target.id}-list`).toggle(300);
});

$('#data-menu-list').on('click', (e) => {
  handleDimmedMap();
  handleDataLayer(e.target);
  $('.dropdown-menu').hide(300);
});

$('#navigate-menu-list').on('click', (e) => {
  handleDimmedMap();
  handleNavigateClick(e.target);
  $('.dropdown-menu').hide(300);
});

$(document).on('click', (e) => hideDropdownMenus(e));