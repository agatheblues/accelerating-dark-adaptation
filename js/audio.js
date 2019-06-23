
const playAudio = () => {
  $('#toggle-audio').show();
  $('#toggle-audio').html('\u275A\u275A');
  $('#toggle-audio').data('status', 'play');
  $('#audio-player')[0].play();
};

const pauseAudio = (disabled) => {
  $('#toggle-audio').toggle(!disabled);
  $('#toggle-audio').html('\u25B6');
  $('#toggle-audio').data('status', 'pause');
  $('#audio-player')[0].pause();
};

const loadAudio = (mode) => {
  if (mode === 'explore') {
    $('#audio-player').prop('loop', true);
    $('#audio-player source').attr('src', 'https://res.cloudinary.com/dkylbarf5/video/upload/v1560795612/audio/poetic%20sky%20view/Interview-poeticSkyView_v03_yno57h.mp3');
  } else {
    $('#audio-player source').attr('src', 'https://res.cloudinary.com/dkylbarf5/video/upload/v1560723368/audio/poetic%20sky%20view/podcast_poeticSkyView_part01_ezskyu.mp3');
  }

  $('#audio-player')[0].load();
};

const toggleAudio = (status) => {
  if (status === 'play') {
    pauseAudio(false);
  } else {
    playAudio();
  }
};

export { toggleAudio, pauseAudio, playAudio, loadAudio };
