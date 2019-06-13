import { undimMap } from "./map.js";
import { showDome } from "./dome.js";
import { hide } from "./utils.js";
import Player from '@vimeo/player';


let videoPlayer;

const initPlayer = (id) => {
  videoPlayer = new Player('player', { autoplay: true, controls: true, id: id });
  videoPlayer.setVolume(1);
  videoPlayer.on('ended', function () {
    closeVideo();
  });
}

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
  hide("#video-wrapper");
  hide("#close-video");
  hide('.footer-tooltip');
  hide('#video-details');
  $('#toggle-audio').prop('disabled', false);
  showDome();
}

const resizeVideo = () => {
  $('#video-wrapper').css({ 'height': `calc(100vh - ${$('#footer').innerHeight()}px)` });
}

export { playLargeVideo, stopLargeVideo, closeVideo, resizeVideo };
