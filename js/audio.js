
const playAudio = () => {
  $('#toggle-audio').prop('disabled', false);
  $('#toggle-audio').html(`\u275A\u275A`);
  $('#toggle-audio').data('status', 'play');
  $("#audio-player")[0].play();
}

const pauseAudio = (disabled) => {
  $('#toggle-audio').prop('disabled', disabled);
  $('#toggle-audio').html(`\u25B6`);
  $('#toggle-audio').data('status', 'pause');
  $("#audio-player")[0].pause();
}

export { pauseAudio, playAudio }