import {
  startExploreMode,
  handleDimmedMap
} from './map.js';
import { handleDataLayer, handleNavigateClick } from './footer.js';
import { toggleAudio } from './audio.js';
import { resizeVideo } from './video.js';
import { hideDropdownMenus, show, hide } from './utils.js';
import { startStory } from './story.js';

window.STATUS = 'down';

/* Events */
const handleStartClick = (callback, mode) => {
  hide('.intro-wrapper');
  show('#intro-modal');
  if (mode === 'explore') show('.instruction-container');
  $('#start').on('click', () => {
    hide('#intro-modal');
    if (mode === 'explore') hide('.instruction-container');
    $('#intro').addClass('opacity-off');
    setTimeout(() => hide('#intro'), 3000);
    callback();
  });
}
$('.mapboxgl-canvas').css('cursor', 'crosshair');

$('#btn-explore').on('click', e => handleStartClick(startExploreMode, 'explore'));

$('#btn-story').on('click', e => handleStartClick(startStory, 'story'));

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

$(document).on('click', (e) => hideDropdownMenus(e));
