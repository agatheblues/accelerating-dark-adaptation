import { undimMap } from "./map.js";
import { showDome } from "./dome.js";
import { hide } from "./utils.js";
import Player from '@vimeo/player';


let videoPlayer;

const playLargeVideo = stringId => {
  let id = parseInt(stringId);
  if (!videoPlayer) {
    videoPlayer = new Player('player', { autoplay: true, controls: false, id });
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
  $('#toggle-audio').prop('disabled', false);
  showDome();
}

export { playLargeVideo, stopLargeVideo, closeVideo };
