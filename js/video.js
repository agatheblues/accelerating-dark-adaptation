import { undimMap } from './map.js';
import { showDome } from './dome.js';
import { show, hide } from './utils.js';
import Player from '@vimeo/player';

let videoPlayer, videoSlidePlayer;

const initPlayer = (id) => {
  videoPlayer = new Player('player', { autoplay: true, controls: true, id: id, autopause: false });
  videoPlayer.setVolume(1);
  videoPlayer.on('ended', function () {
    closeVideo();
  });
};

const initSlidePlayer = (id) => {
  videoSlidePlayer = new Player('slide-player', { autoplay: true, muted: true, controls: true, id: id, autopause: false });
  videoSlidePlayer.setVolume(0);
};

const playSlideVideo = id => {
  if (!videoSlidePlayer) {
    initSlidePlayer(id);
    show('#slide-video-wrapper');
    videoSlidePlayer.play();
  } else {
    videoSlidePlayer.loadVideo(id).then(() => {
      videoSlidePlayer.play();
      show('#slide-video-wrapper');
    });
  }
};


const playLargeVideo = id => {
  if (!videoPlayer) {
    initPlayer(id);
    show('#video-wrapper');
    videoPlayer.play();
  } else {
    videoPlayer.loadVideo(id).then(() => {
      videoPlayer.play();
      show('#video-wrapper');
    });
  }
};

const stopLargeVideo = () => {
  videoPlayer.unload();
};

const closeVideo = () => {
  undimMap();
  stopLargeVideo();
  hide('#video-wrapper');
  hide('#close-video');
  hide('.footer-tooltip');
  hide('#video-details');
  $('#toggle-audio').show();
  showDome();
};

const resizeVideo = () => {
  $('#video-wrapper').css({ 'height': `calc(100vh - ${$('#footer').innerHeight() * window.devicePixelRatio}px)` });
};

export { playLargeVideo, stopLargeVideo, closeVideo, resizeVideo, videoPlayer, videoSlidePlayer, playSlideVideo, initPlayer };
