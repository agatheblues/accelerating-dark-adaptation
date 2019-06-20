import {
  handleDimmedMap
} from './map.js';
import { handleDataLayer, handleNavigateClick } from './footer.js';
import { toggleAudio } from './audio.js';
import { resizeVideo } from './video.js';
import { hideDropdownMenus, showMapInstructions, hideMapInstructions, showAbout, hideAbout } from './utils.js';
import { startStory, startExplore } from './story.js';

window.STATUS = 'down';

/* Events */
$('.mapboxgl-canvas').css('cursor', 'crosshair');

$('#btn-explore').on('click', e => startExplore());

$('#btn-story').on('click', e => startStory());

$(window).resize(() => resizeVideo());

$('#toggle-audio').on('click', function () { return toggleAudio($(this).data('status')); });

/* FOOTER EVENTS */
$('.dropdown-trigger').on('click', (e) => {
  $('.dropdown-menu').hide(300);
  $('.dropdown-wrapper').css({ 'margin-bottom': `${$('#footer').innerHeight() * window.devicePixelRatio - 10}px` });
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

$('#help').on('click', (e) => showMapInstructions());
$('#close-modal').on('click', (e) => hideMapInstructions());

$('#about').on('click', (e) => showAbout());
$('#close-about').on('click', (e) => hideAbout());

$(document).on('click', (e) => hideDropdownMenus(e));
