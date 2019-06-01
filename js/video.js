import { undimMap } from "./map.js";
import { showDome } from "./dome.js";
import { hide } from "./utils.js";

const playLargeVideo = url => {
  $("#video-player-source").attr("src", url);
  $("#video-player-sel")[0].load();
  $("#video-player-sel")[0].play();
};

const stopLargeVideo = () => {
  $("#video-player-sel")[0].pause();
  $("#video-player-sel")[0].currentTime = 0;
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
