const playLargeVideo = url => {
  $("#video-player-source").attr("src", url);
  $("#video-player-sel")[0].load();
  $("#video-player-sel")[0].play();
};

const stopLargeVideo = () => {
  $("#video-player-sel")[0].pause();
  $("#video-player-sel")[0].currentTime = 0;
};

const showLargeVideo = () => {
  $("#map").addClass("hidden");
  $("#video-wrapper").removeClass("hidden");
};

const hideLargeVideo = () => {
  $("#map").removeClass("hidden");
  $("#video-wrapper").addClass("hidden");
};

const playMiniVideos = (features) => {
  console.log(features, 'play')
  features.forEach(feature => {
    let name = feature.properties.name;
    $(`#${name}-player-sel`)[0].play();
  });
};

const pauseMiniVideos = (features) => {
  console.log(features, 'pause')
  features.forEach(feature => {
    let name = feature.properties.name;
    $(`#${name}-player-sel`)[0].pause();
  });
};

export { playLargeVideo, hideLargeVideo, showLargeVideo, stopLargeVideo, playMiniVideos, pauseMiniVideos };
