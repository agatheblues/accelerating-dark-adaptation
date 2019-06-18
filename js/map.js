import { show, hide, easing } from './utils.js';
import { config } from '../config.js';
import { initPopups, updatePopupContent } from './popup.js';
import { customLayer, hideDome } from './dome.js';
import { showVideoDetails } from './footer.js';
import { pauseAudio, loadAudio } from './audio.js';
import { playLargeVideo, closeVideo, resizeVideo } from './video.js';
import { findMarkerById, findIntervieweesById } from './markers.js';

let timer;

const initMap = (config, mode) => {
  map = new mapboxgl.Map(config);
  map.doubleClickZoom.disable();

  map.on('load', () => {
    map.addLayer(customLayer);
    initPopups();

    if (mode === 'explore') $('.popup-wrapper').css({ 'cursor': 'pointer' });
    animateMap();
  });
};

const showMap = () => {
  hide('#intro');
  $('#map').removeClass('invisible');
};

const animateMap = () => {
  setTimeout(() => {
    map.easeTo({
      ...mapConfig.side_rotate.position,
      ...mapConfig.side_rotate.limits,
      duration: 3000
    });

    map.once('moveend', () => {
      show('#footer');
      show('.mapboxgl-popup');
    });
  }, 750);
};

const startExploreMode = () => {
  showMap();
  loadAudio('explore');
  initMap({ ...mapConfig.default, ...mapConfig.intro.position, ...mapConfig.intro.limits }, 'explore');
  updatePopupContent();

  map.on('pitchend', () => {
    if (map.getPitch() === 80) {
      window.STATUS = 'up';
      rotateCamera();
      return;
    }
    if (map.getPitch() < 80) window.STATUS = 'down';
  });

  map.on('zoomend', () => updatePopupContent());

  $('#map').on('click', '.mapboxgl-popup-content', function (e) {
    window.STATUS = 'down';
    const popupId = $(this).children('.popup-wrapper').data('id');
    const marker = findMarkerById(`${popupId}`);
    const interviewees = findIntervieweesById(`${popupId}`);

    const [longitude, latitude] = marker.geometry.coordinates;

    moveTo({
      zoom: 15,
      center: [longitude, latitude],
      bearing: 0,
      pitch: 0
    }, null, () => dimMap(), 'explore');

    pauseAudio(true);

    show('#video-wrapper');
    show('#close-video');
    show('.footer-tooltip');
    show('#video-details');
    hide('#nqm-definition');
    hide('#lux-definition');
    playLargeVideo(marker.properties.video_id);
    showVideoDetails({ ...marker.properties, longitude, latitude, interviewees });
    resizeVideo();
    hideDome();
  });

  $('body').on('mousemove', () => handleDimmedMap());
  $('body').on('touchstart', () => handleDimmedMap());

  $('#close-video').on('click', e => closeVideo());

  $('#audio-player')[0].play();
};

const startMapStoryMode = () => {
  $('#map').removeClass('invisible');
  initMap({ ...mapConfig.default, ...mapConfig.intro.position, ...mapConfig.intro.limits, 'interactive': false }, 'story');
  window.STATUS = 'up';

  map.on('pitchend', () => {
    if (map.getPitch() === 80) {
      window.STATUS = 'up';
      rotateCamera();
      return;
    }
    if (map.getPitch() < 80) window.STATUS = 'down';
  });
};

const undimMap = () => {
  clearTimeout(timer);
  $('.mapboxgl-map').removeClass('opacity-off');
};

const dimMapAfterDelay = () => {
  timer = setTimeout(() => dimMap(), 3000);
};

const dimMap = () => {
  $('.mapboxgl-map').addClass('opacity-off');
};

const handleDimmedMap = () => {
  if (!$('.mapboxgl-map').hasClass('opacity-off')) return;
  undimMap();
  dimMapAfterDelay();
};

const moveTo = (position, limits = null, callback = null, mode = 'story') => {
  if (mode === 'story') {
    map.flyTo({
      ...position,
      minZoom: 13,
      speed: 0.25,
      easing: easing
    });
  } else {
    map.easeTo({
      ...position,
      easing,
      duration: 2000
    });

    if (limits !== null) {
      map.setMinZoom(limits.minZoom);
      map.setMaxZoom(limits.maxZoom);
    }
  }

  if (callback) map.once('moveend', callback);
};

const rotateCamera = () => {
  if (window.STATUS !== 'up') return;

  // Request the next frame of the animation.
  map.easeTo({
    bearing: map.getBearing() - 0.25,
    easing: easing,
    pitch: 80
  });
  requestAnimationFrame(() => rotateCamera());
};

const bounds = [
  [4.717755, 52.278175], // Southwest coordinates
  [5.07506, 52.431021] // Northeast coordinates
];

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const mapConfig = {
  default: {
    container: 'map',
    maxBounds: bounds,
    style: 'mapbox://styles/agatheblues/cjwsb96fq9r211cmgdq36xulv?optimize=true'
  },
  top_zoomed: {
    position: {
      zoom: 14,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    },
    limits: {
      maxZoom: 19,
      minZoom: 12
    }
  },
  top_distanced: {
    position: {
      zoom: 12,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    },
    limits: {
      maxZoom: 19,
      minZoom: 12
    }
  },
  intro: {
    position: {
      zoom: 13,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    },
    limits: {
      maxZoom: 19,
      minZoom: 12
    }
  },
  side_rotate: {
    position: {
      center: [4.892891, 52.370088],
      zoom: 13,
      pitch: 80,
      bearing: 0
    },
    limits: {
      maxZoom: 16,
      minZoom: 13
    }
  }
};

let map;

export { mapConfig, showMap, handleDimmedMap, dimMap, undimMap, moveTo, rotateCamera, map, startExploreMode, startMapStoryMode };
