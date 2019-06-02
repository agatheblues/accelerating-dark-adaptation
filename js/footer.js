import {
  mapConfig,
  moveTo,
  map
} from "./map.js";
import { playAudio } from "./audio.js";

const updateCoordinates = () => {
  let { lng, lat } = map.getCenter();
  $("#info-long").html(lng.toFixed(5));
  $("#info-lat").html(lat.toFixed(5));
};

const handleNavigateClick = (target) => {
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

  // Move to different areas on map
  const action = $(target).data('action');
  switch (action) {
    case 'normal':
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
      break;
    case 'lux':
      map.setPaintProperty("public_lighting", "circle-radius", [
        "interpolate",
        ["linear"],
        ["get", "markers_lux"],
        0.22,
        0.5,
        123.6,
        5
      ]);
      break;
    case 'nqm':
      map.setPaintProperty("public_lighting", "circle-radius", [
        "interpolate",
        ["linear"],
        ["get", "markers_nqm"],
        0,
        0.5,
        11.31,
        5,
        19.38,
        0.5
      ]);
      break;
    default:
      break;
  }
}

export { handleNavigateClick, updateCoordinates, handleDataLayer }