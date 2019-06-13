import { undimMap } from "./map.js";
import { showDome } from "./dome.js";
import { hide } from "./utils.js";
import Player from '@vimeo/player';


let videoPlayer;

const playLargeVideo = stringId => {
  let id = stringId;
  console.log('vimeo', id)
  if (!videoPlayer) {
    videoPlayer = new Player('player', { autoplay: true, controls: false, id: id });
    videoPlayer.setVolume(1);
    videoPlayer.on('ended', function (data) {
      closeVideo();
    });
  }
  videoPlayer.loadVideo(id);
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
  $('body').off('mousemove');
  $('body').off('touchstart');
}

export { playLargeVideo, stopLargeVideo, closeVideo };
