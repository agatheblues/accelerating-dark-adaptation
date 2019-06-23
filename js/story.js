import { show, hide } from './utils.js';
import { playLargeVideo, resizeVideo, videoPlayer, playSlideVideo, videoStoryPlayer } from './video.js';
import { showVideoDetails, toggleLux, toggleNormal, toggleNqm } from './footer.js';
import { findMarkerById, findIntervieweesById } from './markers.js';
import { startMapStoryMode, moveTo, mapConfig, dimMap, undimMap, startMapExploreMode } from './map.js';
import { loadAudio } from './audio.js';
import { hideDome, showDome } from './dome.js';

let SKIP_EXPLORE = false;

const initStoryFooter = () => {
  hide('.dropdown-container');
  hide('.control-container');
  hide('.footer-audio');
  hide('#help');
};

const initExploreFooter = () => {
  show('.dropdown-container');
  show('.control-container');
  show('.footer-audio');
  show('#help');
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

const playSlide = (callback) => (videoId, nextState) => {
  playSlideVideo(videoId);
  videoStoryPlayer.off('ended');

  if (!nextState) return;
  videoStoryPlayer.on('ended', () => callback(nextState));
};

const skipExplore = () => {
  SKIP_EXPLORE = true;
  stopSlideStory();
  initExploreFooter();
  startMapExploreMode();
};

const stopSlideStory = () => {
  videoStoryPlayer.unload();
  hide('#slide-video-wrapper');
}

const moveToVideo = (id, nextState) => {
  const marker = findMarkerById(id);
  const [longitude, latitude] = marker.geometry.coordinates;

  const position = {
    zoom: 16,
    center: [longitude, latitude],
    bearing: 0,
    pitch: 0
  };

  if (!nextState) {
    moveTo(position, null);
    return;
  }
  moveTo(position, null, () => playStory(nextState));
};


const playExplore = (state) => {
  if (SKIP_EXPLORE) return;

  const playSlideExplore = playSlide(playExplore);
  console.log('explore', state);
  switch (state) {
    case 0:
      hide('#intro');
      initStoryFooter();
      playSlideExplore(343488449, 2);
      break;
    case 2:
      playSlideExplore(343488480, 3);
      break;
    case 3:
      playSlideExplore(343488509, 4);
      break;
    case 4:
      playSlideExplore(343488540, 5);
      break;
    case 5:
      playSlideExplore(343488570, 6);
      break;
    case 6:
      playSlideExplore(343488795, 7);
      break;
    case 7:
      stopSlideStory();
      initExploreFooter();
      startMapExploreMode();
      break;
    default:
      break;
  }
}

const playStory = (state) => {
  console.log('story', state);
  const playSlideStory = playSlide(playStory);
  switch (state) {
    case 0:
      hide('#intro');
      initStoryFooter();
      loadAudio('story');
      playSlideStory(343763165, 1); // this is a 15 mn
      break;
    case 1:
      stopSlideStory();
      playVideoStory('33', 339823972, 2); // Achterlaan Tour
      break;
    case 2:
      playSlideStory(343763185, 3); // in the netherlands
      stopVideoStory();
      break;
    case 3:
      stopSlideStory();
      startMapStoryMode();
      $('#audio-player')[0].onended = () => playStory(4);
      setTimeout(() => $('#audio-player')[0].play(), 3000);
      break;
    case 4:
      window.STATUS = 'down';
      moveToVideo('42', 5);
      break;
    case 5:
      playVideoStory('42', 339823739, 6); // Museumplein
      break;
    case 6:
      stopVideoStory();
      playSlideStory(343763201, 7); // in a study
      break;
    case 7:
      stopSlideStory();
      undimMap();
      moveToVideo('6', 8);
      break;
    case 8:
      playVideoStory('6', 339823043, 9); // Amstel River
      break;
    case 9:
      stopVideoStory();
      playSlideStory(343763217, 10); // in the nl
      break;
    case 10:
      stopSlideStory();
      undimMap();
      moveToVideo('36', 11);
      break;
    case 11:
      setTimeout(() => {
        hideDome();
        undimMap();
        moveTo(mapConfig.side_rotate.position, null, null);
      }, 50000); // undim map halfway
      playVideoStory('36', 339823923, 12); // North IJ Hallen
      break;
    case 12:
      stopVideoStory();
      dimMap();
      playSlideStory(343763230, 13); // for nocturnal
      break;
    case 13:
      stopSlideStory();
      undimMap();
      showDome();
      show('.footer');
      toggleLux();
      setTimeout(() => playStory(14), 5000);
      break;
    case 14:
      window.STATUS = 'down';
      moveToVideo('26', 15);
      break;
    case 15:
      playVideoStory('26', 339824214, 16); // Ziggodome
      break;
    case 16:
      stopVideoStory();
      playSlideStory(343763239, 17); // billboard
      break;
    case 17:
      stopSlideStory();
      undimMap();
      show('#lux-definition');
      moveToVideo('32', 18);
      break;
    case 18:
      playVideoStory('32', 339824141, 19); // Uithammerdijk
      break;
    case 19:
      stopVideoStory();
      playSlideStory(343763246, 20); // there is no clear
      break;
    case 20:
      stopSlideStory();
      undimMap();
      show('#lux-definition');
      setTimeout(() => playStory(21), 2000);
      break;
    case 21:
      toggleNormal();
      moveToVideo('18', 22);
      break;
    case 22:
      setTimeout(() => {
        hideDome();
        undimMap();
        moveTo(mapConfig.side_rotate.position, null, null);
      }, 36000); // undim map halfway
      playVideoStory('18', 339823292, 23); // De dam
      break;
    case 23:
      stopVideoStory();
      dimMap();
      playSlideStory(343763255, 24); // the impact of
      break;
    case 24:
      stopSlideStory();
      undimMap();
      showDome();
      show('.footer');
      toggleNqm();
      setTimeout(() => playStory(25), 5000);
      break;
    case 25:
      window.STATUS = 'down';
      moveToVideo('24', 26);
      break;
    case 26:
      playVideoStory('24', 339823602, 27); // Blijburg
      break;
    case 27:
      stopVideoStory();
      playSlideStory(343763263, 28); // the impact of
      break;
    case 28:
      stopSlideStory();
      undimMap();
      show('#nqm-definition');
      moveToVideo('19', 29);
      break;
    case 29:
      setTimeout(() => {
        hideDome();
        undimMap();
        window.STATUS = 'down';
        moveToVideo('23', null);
      }, 34000); // undim map halfway
      playVideoStory('19', 339824071, 30); // Skinny Bridge
      break;
    case 30:
      stopVideoStory();
      dimMap();
      playSlideStory(343763267, 31); // compared to
      break;
    case 31:
      stopSlideStory();
      undimMap();
      showDome();
      toggleNormal();
      setTimeout(() => playVideoStory('23', 341809140, 32), 4000); // IJ KNSM
      break;
    case 32:
      stopVideoStory();
      playSlideStory(343763272, 33); // oldest science
      break;
    case 33:
      stopSlideStory();
      moveToVideo('15', 34);
      break;
    case 34:
      playVideoStory('15', 343763285, 35); // Houthavens
      break;
    case 35:
      stopVideoStory();
      hide('#video-wrapper');
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

const startExplore = () => {
  show('.skip-container');
  playExplore(0);
};

export { startStory, startExplore, skipExplore };
