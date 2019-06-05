import {
  mapConfig,
  moveTo,
  map
} from "./map.js";
import { playAudio } from "./audio.js";
import { show, hide } from "./utils.js";

const handleNavigateClick = (target) => {
  // Move to different areas on map
  const action = $(target).data('action');
  switch (action) {
    case 'center':
      window.STATUS = "down";
      moveTo(mapConfig.top_zoomed.position, mapConfig.top_zoomed.limits);
      break;
    case 'rotating':
      moveTo(mapConfig.side_rotate.position, mapConfig.side_rotate.limits);
      window.STATUS = "up";
      playAudio();
      break;
    case 'top':
      window.STATUS = "down";
      moveTo(mapConfig.top_distanced.position, mapConfig.top_distanced.limits);
      break;
    default:
      break;
  }
}

const handleDataLayer = (target) => {
  // Change current active view
  $('.dropdown-menu p').removeClass('active');
  $(target).addClass('active');

  const action = $(target).data('action');
  switch (action) {
    case 'normal':
      hide('.popup-lux');
      hide('.popup-nqm');
      hide('#lux-definition');
      hide('#nqm-definition');

      map.setPaintProperty("public_lighting", "circle-radius", [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0.5,
        12.66,
        0.7,
        22,
        7
      ]);

      map.setPaintProperty("public_lighting", "circle-opacity", 1);

      break;
    case 'lux':
      hide('.popup-nqm');
      show('.popup-lux');
      show('#lux-definition');
      hide('#nqm-definition');

      map.setPaintProperty("public_lighting", "circle-radius", [
        "interpolate",
        ["linear"],
        ["get", "markers_lux"],
        0.22,
        0.5,
        123.6,
        5
      ]);

      map.setPaintProperty("public_lighting", "circle-opacity", 1);

      break;
    case 'nqm':
      hide('.popup-lux');
      show('.popup-nqm');
      hide('#lux-definition');
      show('#nqm-definition');

      map.setPaintProperty("public_lighting", "circle-radius", [
        "interpolate",
        ["linear"],
        ["get", "markers_lux"],
        0,
        1,
        11.31,
        1,
        19.38,
        0.5
      ]);

      map.setPaintProperty("public_lighting", "circle-opacity", [
        "interpolate",
        ["linear"],
        ["get", "markers_nqm"],
        0,
        1,
        11.31,
        1,
        19.38,
        0
      ]);
      break;
    default:
      break;
  }
}

export { handleNavigateClick, handleDataLayer }