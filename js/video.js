const playVideo = (url) => {
  $('#video-player-source').attr('src', url);
  $('#video-player-sel')[0].load();
  $('#video-player-sel')[0].play();
}

const stopVideo = () => {
  $('#video-player-sel')[0].pause();
  $('#video-player-sel')[0].currentTime = 0;
}


const showVideo = () => {
  $('#map').addClass('hidden');
  $('#video-wrapper').removeClass('hidden');
}

const hideVideo = () => {
  $('#map').removeClass('hidden');
  $('#video-wrapper').addClass('hidden');
}


export { playVideo, hideVideo, showVideo, stopVideo }