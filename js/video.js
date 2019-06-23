import { undimMap } from './map.js';
import { showDome } from './dome.js';
import { show, hide } from './utils.js';
import Player from '@vimeo/player';

let videoPlayer, videoStoryPlayer;

const initPlayer = (id) => {
  videoPlayer = new Player('player', { autoplay: true, controls: true, id: id });
  videoPlayer.setVolume(1);
  videoPlayer.on('ended', function () {
    closeVideo();
  });
};

const initStoryPlayer = (id) => {
  videoStoryPlayer = new Player('slide-player', { autoplay: true, muted: true, controls: false, id: id });
  videoStoryPlayer.setVolume(0);
};

const playSlideVideo = id => {
  if (!videoStoryPlayer) {
    initStoryPlayer(id);
    show('#slide-video-wrapper');
    videoStoryPlayer.play();
  } else {
    videoStoryPlayer.loadVideo(id).then(() => {
      show('#slide-video-wrapper');
      videoStoryPlayer.play();
    });
  }
};


const playLargeVideo = id => {
  if (!videoPlayer) {
    initPlayer(id);
    videoPlayer.play();
  } else {
    videoPlayer.loadVideo(id).then(() => {
      videoPlayer.play();
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

export { playLargeVideo, stopLargeVideo, closeVideo, resizeVideo, videoPlayer, videoStoryPlayer, playSlideVideo };
