import { show, hide } from './utils.js';
import { playLargeVideo, resizeVideo, videoPlayer, playSlideVideo, videoStoryPlayer } from './video.js';
import { showVideoDetails, toggleLux, toggleNormal, toggleNqm } from './footer.js';
import { findMarkerById, findIntervieweesById } from './markers.js';
import { startMapStoryMode, moveTo, mapConfig, dimMap, undimMap, startMapExploreMode } from './map.js';
import { loadAudio } from './audio.js';

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
  videoStoryPlayer.on('ended', () => callback(nextState));
};

const skipExplore = () => {
  playExplore(7);
};

const stopSlideStory = () => {
  videoStoryPlayer.off('ended');
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

  moveTo(position, null, () => playStory(nextState));
};


const playExplore = (state) => {
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
      playSlideStory(343487535, 1); // Put sound on
      break;
    case 1:
      playSlideStory(343487595, 2); // Created by
      break;
    case 2:
      playSlideStory(343487624, 3); // IN collab with
      break;
    case 3:
      playSlideStory(343487647, 4); // Unpolluted
      break;
    case 4:
      playSlideStory(343487689, 5); // but why
      break;
    case 5:
      playSlideStory(343487731, 6); // while
      break;
    case 6:
      stopSlideStory();
      playVideoStory('33', 339823972, 7); // Achterlaan Tour
      break;
    case 7:
      playSlideStory(343487775, 8); // in the netherlands
      stopVideoStory();
      break;
    case 8:
      playSlideStory(343487816, 9); // ams street lights
      break;
    case 9:
      stopSlideStory();
      startMapStoryMode();
      $('#audio-player')[0].onended = () => playStory(10);
      setTimeout(() => $('#audio-player')[0].play(), 3000);
      break;
    case 10:
      window.STATUS = 'down';
      moveToVideo('42', 11);
      break;
    case 11:
      playVideoStory('42', 339823739, 12); // Museumplein
      break;
    case 12:
      stopVideoStory();
      playSlideStory(343487864, 13); // in a study
      break;
    case 13:
      playSlideStory(343487899, 14); // they estimate
      break;
    case 14:
      stopSlideStory();
      undimMap();
      moveToVideo('6', 15);
      break;
    case 15:
      playVideoStory('6', 339823043, 16); // Amstel River
      break;
    case 16:
      stopVideoStory();
      playSlideStory(343487930, 17); // in the nl
      break;
    case 17:
      playSlideStory(343487967, 18); // if we dont
      break;
    case 18:
      stopSlideStory();
      undimMap();
      moveToVideo('36', 19);
      break;
    case 19:
      playVideoStory('36', 339823923, 20); // North IJ Hallen
      break;
    case 20:
      stopVideoStory();
      playSlideStory(343488001, 21); // for nocturnal
      break;
    case 21:
      stopSlideStory();
      undimMap();
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(22);
      });
      break;
    case 22:
      show('.footer');
      toggleLux();
      setTimeout(() => playStory(23), 5000);
      break;
    case 23:
      window.STATUS = 'down';
      moveToVideo('26', 24);
      break;
    case 24:
      playVideoStory('26', 339824214, 25); // Ziggodome
      break;
    case 25:
      stopVideoStory();
      playSlideStory(343488032, 26); // billboard
      break;
    case 26:
      playSlideStory(343488060, 27); // they are believed to be harmful
      break;
    case 27:
      stopSlideStory();
      undimMap();
      show('#lux-definition');
      moveToVideo('32', 28);
      break;
    case 28:
      playVideoStory('32', 339824141, 29); // Uithammerdijk
      break;
    case 29:
      stopVideoStory();
      playSlideStory(343488095, 30); // there is no clear
      break;
    case 30:
      playSlideStory(343488111, 31); // it makes
      break;
    case 31:
      stopSlideStory();
      undimMap();
      show('#lux-definition');
      setTimeout(() => playStory(32), 2000);
      break;
    case 32:
      toggleNormal();
      moveToVideo('18', 33);
      break;
    case 33:
      playVideoStory('18', 339823292, 34); // De dam
      break;
    case 34:
      stopVideoStory();
      playSlideStory(343488111, 35); // the impact of
      break;
    case 35:
      playSlideStory(343488142, 36); // recent research
      break;
    case 36:
      stopSlideStory();
      undimMap();
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(37);
      });
      break;
    case 37:
      show('.footer');
      toggleNqm();
      setTimeout(() => playStory(38), 5000);
      break;
    case 38:
      window.STATUS = 'down';
      moveToVideo('24', 39);
      break;
    case 39:
      playVideoStory('24', 339823602, 40); // Blijburg
      break;
    case 40:
      stopVideoStory();
      playSlideStory(343488142, 41); // the impact of
      break;
    case 41:
      playSlideStory(343488167, 42); // recent research
      break;
    case 42:
      stopSlideStory();
      undimMap();
      show('#nqm-definition');
      moveToVideo('19', 43);
      break;
    case 43:
      playVideoStory('19', 339824071, 44); // Skinny Bridge
      break;
    case 44:
      stopVideoStory();
      playSlideStory(343488196, 45); // compared to
      break;
    case 45:
      playSlideStory(343488218, 46); // they can be
      break;
    case 46:
      stopSlideStory();
      undimMap();
      show('#nqm-definition');
      moveTo(mapConfig.side_rotate.position, null, () => {
        window.STATUS = 'up';
        playStory(47);
      });
      break;
    case 47:
      window.STATUS = 'down';
      moveToVideo('23', 48);
      break;
    case 48:
      playVideoStory('23', 341809140, 49); // IJ KNSM
      break;
    case 49:
      stopVideoStory();
      playSlideStory(343488249, 50); // oldest science
      break;
    case 50:
      playSlideStory(343510277, 51); // it originated
      break;
    case 51:
      playSlideStory(343488311, 52); // however
      break;
    case 52:
      stopSlideStory();
      undimMap();
      toggleNormal();
      setTimeout(() => playStory(53), 4000);
      break;
    case 53:
      playSlideStory(343488334, 54); // in april
      break;
    case 54:
      playSlideStory(343488374, 54); // signed
      break;
    case 55:
      playSlideStory(343488413, 56);
      break;
    case 56:
      stopSlideStory();
      moveToVideo('15', 57);
      break;
    case 57:
      playVideoStory('15', 341571530, 58); // Houthavens
      break;
    case 58:
      stopVideoStory();
      playSlideStory(343494886, 59);
      break;
    case 60:
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

const startExplore = () => {
  show('.skip-container');
  playExplore(0);
};

export { startStory, startExplore, skipExplore };
