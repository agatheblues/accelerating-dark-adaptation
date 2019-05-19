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
  features.forEach(feature => {
    let name = feature.properties.name;
    $(`#${name}-player-sel`)[0].play();
  });
};

const pauseMiniVideos = (features) => {
  features.forEach(feature => {
    let name = feature.properties.name;
    $(`#${name}-player-sel`)[0].pause();
  });
};

const handleMiniVideos = (map, markers) => {
  if (map.getZoom() < 14.5) {
    pauseMiniVideos(markers.features);
    return;
  }

  var features = map.queryRenderedFeatures({ layers: ['markers'] });
  playMiniVideos(features);
  const names = features.map((f) => f.properties.name);
  pauseMiniVideos(markers.features.filter((f) => names.indexOf(f.properties.name) < 0));
};

export { playLargeVideo, hideLargeVideo, showLargeVideo, stopLargeVideo, handleMiniVideos };
