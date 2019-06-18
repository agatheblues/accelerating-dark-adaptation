import { show, hide } from './utils.js';
import { playLargeVideo, resizeVideo, videoPlayer } from './video.js';
import { showVideoDetails, toggleLux, toggleNormal, toggleNqm } from './footer.js';
import { findMarkerById, findIntervieweesById } from './markers.js';
import { startMapStoryMode, moveTo, mapConfig, dimMap, undimMap } from './map.js';
import { loadAudio } from './audio.js';

const SLIDE_ANIMATION = 8000;

const initFooter = () => {
  hide('.dropdown-container');
  hide('.control-container');
  hide('.footer-audio');
};

const stopVideoStory = () => {
  show('#map');
  hide('.footer');
  hide('#video-wrapper');
  hide('.footer-tooltip');
  hide('#video-details');
};

const playVideoStory = (id, video_id, nextState) => {
  const marker = findMarkerById(id);
  const interviewees = findIntervieweesById(id);

  dimMap();
  show('.footer');
  show('#video-wrapper');
  show('.footer-tooltip');
  show('#video-details');
  hide('#nqm-definition');
  hide('#lux-definition');
  playLargeVideo(video_id);
  showVideoDetails({ ...marker.properties, interviewees });
  resizeVideo();

  videoPlayer.off('ended');
  videoPlayer.on('ended', () => playStory(nextState));
};

const moveToVideo = (id, nextState) => {
  const marker = findMarkerById(id);
  const [longitude, latitude] = marker.geometry.coordinates;

  const position = {
    zoom: 15,
    center: [longitude, latitude],
    bearing: 0,
    pitch: 0
  };

  moveTo(position, null, () => playStory(nextState));
};

const playStory = (state) => {
  console.log(state);
  switch (state) {
    case 0:
      initFooter();
      loadAudio('story');
      show('#intro-slide');
      setTimeout(() => playStory(1), SLIDE_ANIMATION * 4);
      break;
    case 1:
      playVideoStory('33', 339823972, 2); // Achterlaan Tour
      break;
    case 2:
      stopVideoStory();
      show('#intro');
      hide('.intro-actions');
      setTimeout(() => playStory(3), 8000);
      break;
    case 3:
      hide('#intro');
      show('#author-slide');
      setTimeout(() => playStory(4), SLIDE_ANIMATION * 2);
      break;
    case 4:
      hide('#author-slide');
      startMapStoryMode();
      $('#audio-player')[0].onended = () => playStory(5);
      $('#audio-player')[0].play();
      break;
    case 5:
      window.STATUS = 'down';
      moveToVideo('42', 6);
      break;
    case 6:
      playVideoStory('42', 339823739, 7); // Museumplein
      break;
    case 7:
      stopVideoStory();
      show('#text-slide-7');
      setTimeout(() => playStory(8), SLIDE_ANIMATION * 2);
      break;
    case 8:
      hide('#text-slide-7');
      undimMap();
      moveToVideo('6', 9);
      break;
    case 9:
      playVideoStory('6', 339823043, 10); // Amstel River
      break;
    case 10:
      stopVideoStory();
      show('#text-slide-10');
      setTimeout(() => playStory(11), SLIDE_ANIMATION * 2);
      break;
    case 11:
      hide('#text-slide-10');
      undimMap();
      moveToVideo('36', 12);
      break;
    case 12:
      playVideoStory('36', 339823923, 13); // North IJ Hallen
      break;
    case 13:
      stopVideoStory();
      show('#text-slide-13');
      setTimeout(() => playStory(14), SLIDE_ANIMATION);
      break;
    case 14:
      hide('#text-slide-13');
      undimMap();
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(15);
      });
      break;
    case 15:
      show('.footer');
      toggleLux();
      setTimeout(() => playStory(16), 5000);
      break;
    case 16:
      window.STATUS = 'down';
      moveToVideo('26', 17);
      break;
    case 17:
      playVideoStory('26', 339824214, 18); // Ziggodome
      break;
    case 18:
      stopVideoStory();
      show('#text-slide-18');
      setTimeout(() => playStory(19), SLIDE_ANIMATION);
      break;
    case 19:
      hide('#text-slide-18');
      undimMap();
      show('#lux-definition');
      moveToVideo('32', 20);
      break;
    case 20:
      playVideoStory('32', 339824141, 21); // Uithammerdijk
      break;
    case 21:
      stopVideoStory();
      show('#text-slide-21');
      setTimeout(() => playStory(22), SLIDE_ANIMATION * 3);
      break;
    case 22:
      hide('#text-slide-21');
      undimMap();
      show('#lux-definition');
      setTimeout(() => playStory(23), 2000);
      break;
    case 23:
      toggleNormal();
      moveToVideo('18', 24);
      break;
    case 24:
      playVideoStory('18', 339823292, 25); // De dam
      break;
    case 25:
      stopVideoStory();
      show('#text-slide-25');
      setTimeout(() => playStory(26), SLIDE_ANIMATION * 2);
      break;
    case 26:
      hide('#text-slide-25');
      undimMap();
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(27);
      });
      break;
    case 27:
      show('.footer');
      toggleNqm();
      setTimeout(() => playStory(28), 5000);
      break;
    case 28:
      window.STATUS = 'down';
      moveToVideo('24', 29);
      break;
    case 29:
      playVideoStory('24', 339823602, 30); // Blijburg
      break;
    case 30:
      stopVideoStory();
      show('#text-slide-30');
      setTimeout(() => playStory(31), SLIDE_ANIMATION * 4);
      break;
    case 31:
      hide('#text-slide-30');
      undimMap();
      show('#nqm-definition');
      moveToVideo('19', 32);
      break;
    case 32:
      playVideoStory('19', 339824071, 33); // Skinny Bridge
      break;
    case 33:
      stopVideoStory();
      show('#text-slide-33');
      setTimeout(() => playStory(34), SLIDE_ANIMATION * 2);
      break;
    case 34:
      hide('#text-slide-33');
      undimMap();
      show('#nqm-definition');
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(35);
      });
      break;
    case 35:
      window.STATUS = 'down';
      moveToVideo('23', 36);
      break;
    case 36:
      playVideoStory('23', 341809140, 37); // IJ KNSM
      break;
    case 37:
      stopVideoStory();
      show('#text-slide-37');
      setTimeout(() => playStory(38), SLIDE_ANIMATION * 2);
      break;
    case 38:
      hide('#text-slide-37');
      undimMap();
      toggleNormal();
      moveToVideo('15', 39);
      break;
    case 39:
      playVideoStory('15', 341571530, 40); // Houthavens
      break;
    case 40:
      stopVideoStory();
      show('#intro');
      show('.intro-actions');
      break;
    default:
      console.log('default');
  }
};

const startStory = () => {
  playStory(0);
};

export { startStory };
