import { show, hide, easing } from './utils.js';
import { config } from '../config.js';
import { initPopups, updatePopupContent } from './popup.js';
import { customLayer, hideDome } from './dome.js';
import { showVideoDetails } from './footer.js';
import { pauseAudio, loadAudio } from './audio.js';
import { playLargeVideo, closeMapVideo, resizeVideo, stopVideo } from './video.js';
import { findMarkerById, findIntervieweesById } from './markers.js';

let timer;

/**
 * Handle rotating on pitch event
 */
const handlePitchEnd = () => {
  if (map.getPitch() === 80) {
    window.STATUS = 'up';
    rotateCamera();
    return;
  }
  if (map.getPitch() < 80) window.STATUS = 'down';
}

/**
 * Initialize popups, show dome, show intro animation of map
 */
const handleLoadedMap = (mode) => {
  map.addLayer(customLayer);
  initPopups(mode);
  showMap();
  animateMap();
}

const initMap = (config, mode) => {
  // Init DOM node
  $('#map-container').append("<div id='map' class='container invisible'></div>");

  // Init map with config
  map = new mapboxgl.Map(config);

  // For mobile and tablet
  map.doubleClickZoom.disable();

  map.off('load');
  map.on('load', () => handleLoadedMap(mode));

  map.off('pitchend');
  map.on('pitchend', () => handlePitchEnd());

  map.off('pitchstart');
  map.on('pitchstart', () => { window.STATUS = 'down'; });
};

const showMap = () => {
  $('#map').removeClass('invisible');
};

const hideMap = () => {
  $('#map').addClass('invisible');
};

const animateMap = () => {
  // Initial position
  map.jumpTo(mapConfig.intro.position);

  // Animation
  setTimeout(() => {
    map.easeTo({
      ...mapConfig.side_rotate.position,
      duration: 3000
    });

    map.once('moveend', () => {
      show('#footer');
      updatePopupContent();
      show('.mapboxgl-popup');
    });
  }, 750);
};

const startMapExploreMode = () => {
  hide('.skip-container');
  loadAudio('explore');
  initMap({ ...mapConfig.default, ...mapConfig.intro.position }, 'explore');

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
    }, () => dimMap(), 'explore');

    pauseAudio(true);

    show('#video-wrapper');
    show('#close-video');
    show('.footer-tooltip');
    show('#video-details');
    hide('#nqm-definition');
    hide('#lux-definition');
    playLargeVideo(marker.properties.video_id, closeMapVideo);
    showVideoDetails({ ...marker.properties, interviewees });
    resizeVideo();
    hideDome();
  });

  $('body').on('mousemove', () => handleDimmedMap());
  $('body').on('touchstart', () => handleDimmedMap());

  $('#close-video').on('click', e => {
    stopVideo();
    closeMapVideo();
  });

  $('#audio-player')[0].play();
};

const startMapStoryMode = () => {
  initMap({ ...mapConfig.default, ...mapConfig.intro.position, 'interactive': false }, 'story');
  window.STATUS = 'up';
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

const moveTo = (position, callback = null, mode = 'story') => {
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
    style: 'mapbox://styles/agatheblues/cjwsb96fq9r211cmgdq36xulv?optimize=true',
    minZoom: 12,
    maxZoom: 19
  },
  top_distanced: {
    position: {
      zoom: 12,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    }
  },
  intro: {
    position: {
      zoom: 13,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    }
  },
  side_rotate: {
    position: {
      center: [4.892891, 52.370088],
      zoom: 13,
      pitch: 80,
      bearing: 0
    }
  }
};

let map;

export { mapConfig, showMap, hideMap, handleDimmedMap, dimMap, undimMap, moveTo, rotateCamera, map, startMapExploreMode, startMapStoryMode };
