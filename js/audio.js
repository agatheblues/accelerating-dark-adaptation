import { findMarkerByVideoId } from './markers.js';

const playVideoAudio = (videoId) => {
  const { audio_url: url } = findMarkerByVideoId(videoId).properties;
  $('#audio-video-player source').attr('src', url);
  $('#audio-video-player')[0].load();
  $('#audio-video-player')[0].play();
};

const pauseVideoAudio = () => {
  $('#audio-video-player')[0].pause();
};

const playAudio = () => {
  $('#toggle-audio').show();
  $('#toggle-audio').addClass('btn--pause');
  $('#toggle-audio').removeClass('btn--play');
  $('#toggle-audio').data('status', 'play');
  $('#audio-player')[0].play();
};

const pauseAudio = (disabled) => {
  $('#toggle-audio').toggle(!disabled);
  $('#toggle-audio').addClass('btn--play');
  $('#toggle-audio').removeClass('btn--pause');
  $('#toggle-audio').data('status', 'pause');
  $('#audio-player')[0].pause();
};

const loadAudio = (mode) => {
  if (mode === 'explore') {
    $('#audio-player').prop('loop', true);
    $('#audio-player source').attr('src', 'https://res.cloudinary.com/dkylbarf5/video/upload/v1560795612/audio/poetic%20sky%20view/Interview-poeticSkyView_v03_yno57h.mp3');
  } else {
    $('#audio-player').prop('loop', false);
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

export { toggleAudio, pauseAudio, playAudio, loadAudio, playVideoAudio, pauseVideoAudio };
