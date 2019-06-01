import {
  mapConfig,
  moveTo,
  map
} from "./map.js";
import { playAudio } from "./audio.js";

const toggleDropdownMenu = () => $('.dropdown-menu').toggle(300);

const handleDropdownMenu = (target) => {
  // Change current active view
  $('.dropdown-menu p').removeClass('active');
  $(target).addClass('active');

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

export { toggleDropdownMenu, handleDropdownMenu }