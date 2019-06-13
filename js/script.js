import {
  startExploreMode,
  handleDimmedMap,
  dimMap,
  moveTo
} from "./map.js";
import { handleDataLayer, handleNavigateClick, showVideoDetails } from "./footer.js";
import { pauseAudio, toggleAudio } from "./audio.js";
import { playLargeVideo, closeVideo } from "./video.js";
import { findMarkerById, findIntervieweesById } from "./markers.js";
import { hideDome } from "./dome.js";
import { show, hideDropdownMenus, hide } from "./utils.js";

window.STATUS = "down";

/* Events */
document.body.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

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
  const interviewees = findIntervieweesById(`${popupId}`);

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
  show('.footer-tooltip');
  show("#video-details");
  hide('#nqm-definition');
  hide('#lux-definition');
  playLargeVideo(marker.properties.video_id);
  showVideoDetails({ ...marker.properties, longitude, latitude, interviewees });

  dimMap();
  hideDome();
});

$('#toggle-audio').on('click', function () { return toggleAudio($(this).data('status')); });

$(document).mousemove(() => handleDimmedMap());

$(document).on('touchmove', () => handleDimmedMap());


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