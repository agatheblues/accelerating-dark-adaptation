import { playVideoAudio, pauseVideoAudio } from './audio.js';
import { undimMap, showMap } from './map.js';
import { showDome } from './dome.js';
import { show, hide } from './utils.js';
import Player from '@vimeo/player';

let videoPlayer;

const initPlayer = (id) => {
  videoPlayer = new Player('player', { autoplay: true, muted: true, controls: false, id: id, autopause: false });
  videoPlayer.setVolume(0);
};

const playVideo = (id, callback, audio) => {
  show('#video-wrapper');
  videoPlayer.play();

  if (audio) { playVideoAudio(id); }

  // Clean video when ended
  videoPlayer.off('ended');
  videoPlayer.on('ended', () => {
    stopVideo();
    if (callback !== undefined) { callback(); }
  });
};
const initPlayVideo = (id, callback, audio) => {
  if (!videoPlayer) {
    initPlayer(id);
    playVideo(id, callback, audio);
  } else {
    videoPlayer
      .loadVideo(id)
      .then(() => playVideo(id, callback, audio));
  }
};

const playLargeVideo = (id, callback) => initPlayVideo(id, callback, true);
const playSlideVideo = (id, callback) => initPlayVideo(id, callback, false);

const stopVideo = () => {
  pauseVideoAudio();
  hide('#video-wrapper');
  videoPlayer.unload();
};

const closeMapVideo = () => {
  undimMap();
  hide('#close-video');
  hide('.footer-tooltip');
  hide('#video-details');
  $('#toggle-audio').show();
  showDome();
};

const stopStoryVideo = () => {
  hide('#video-wrapper');
  showMap();
  hide('.footer');
  hide('.footer-tooltip');
  hide('#video-details');
};

const resizeVideo = () => {
  $('#video-wrapper').css({ 'height': `calc(100vh - ${$('#footer').innerHeight() * window.devicePixelRatio}px)` });
};

export { playLargeVideo, stopVideo, closeMapVideo, resizeVideo, videoPlayer, playSlideVideo, stopStoryVideo };
