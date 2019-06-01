import {
  mapConfig,
  moveTo,
  toggleLayer,
  handleDimmedMap
} from "./map.js";
import { playAudio } from "./audio.js";
import { show, hide } from "./utils.js";

const handleSwitch = (checked, switchId, popupShow, popupHide) => {
  if (checked) {
    $(`#${switchId}`).prop('disabled', true);
    $(`label[for='${switchId}']`).addClass('switch-disabled');
    show(`.popup-${popupShow}`);
    hide(`.popup-${popupHide}`);
  } else {
    $(`#${switchId}`).prop('disabled', false);
    $(`label[for='${switchId}']`).removeClass('switch-disabled');
    show(`.popup-${popupShow}`);
    show(`.popup-${popupHide}`);
  }
}

const toggleLux = (checked) => {
  handleDimmedMap();
  toggleLayer('lux', checked);
  handleSwitch(checked, 'toggle-nqm', 'lux', 'nqm');
}

const toggleNqm = (checked) => {
  handleDimmedMap();
  toggleLayer('nqm', checked);
  handleSwitch(checked, 'toggle-lux', 'nqm', 'lux');
}

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

export { toggleDropdownMenu, handleDropdownMenu, toggleLux, toggleNqm }