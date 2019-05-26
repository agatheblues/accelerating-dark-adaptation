const playLargeVideo = url => {
  $("#video-player-source").attr("src", url);
  $("#video-player-sel")[0].load();
  $("#video-player-sel")[0].play();
};

const stopLargeVideo = () => {
  $("#video-player-sel")[0].pause();
  $("#video-player-sel")[0].currentTime = 0;
};

export { playLargeVideo, stopLargeVideo };
