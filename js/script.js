import {
  startExploreMode,
  handleDimmedMap
} from './map.js';
import { handleDataLayer, handleNavigateClick } from './footer.js';
import { toggleAudio } from './audio.js';
import { resizeVideo } from './video.js';
import { hideDropdownMenus } from './utils.js';
import { startStory } from './story.js';

window.STATUS = 'down';

/* Events */
$('.mapboxgl-canvas').css('cursor', 'crosshair');

$('#btn-explore').on('click', e => startExploreMode());

$('#btn-story').on('click', e => startStory());

$(window).resize(() => resizeVideo());

$('#toggle-audio').on('click', function () { return toggleAudio($(this).data('status')); });

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
