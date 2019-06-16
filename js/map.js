import { show, hide, easing } from "./utils.js";
import { config } from "../config.js";
import { initPopups, updatePopupContent } from "./popup.js";
import { customLayer } from "./dome.js";

let timer;

const loadingSpinner = (loaded) => {
  if (loaded) {
    hide('#loader');
  } else {
    show('#loader');
  }
}

const initMap = (config) => {
  map = new mapboxgl.Map(config);
  map.doubleClickZoom.disable();

  if (map.loaded) {
    map.addLayer(customLayer);
    initPopups();
    animateMap();
  } else {
    map.on("load", () => {
      // loadingSpinner(true);
      map.addLayer(customLayer);
      initPopups();
      animateMap();
    });
  }

  map.on("pitchend", () => {
    if (map.getPitch() == 80) {
      window.STATUS = "up";
      rotateCamera();
      return;
    }
    if (map.getPitch() < 80) window.STATUS = "down";
  });

  map.on("zoomend", () => updatePopupContent());
}

const showMap = () => {
  hide("#intro");
  $("#map").removeClass("invisible");
  show("#footer");
  show("#header");
};

const animateMap = () => {
  setTimeout(() => {
    map.easeTo({
      ...mapConfig.side_rotate.position,
      ...mapConfig.side_rotate.limits,
      duration: 3000
    });

    map.once('moveend', () =>
      show('.mapboxgl-popup'));
  }, 750);
}

const startExploreMode = () => {
  // loadingSpinner(false);
  showMap();
  initMap({ ...mapConfig.default, ...mapConfig.intro.position, ...mapConfig.intro.limits });
  $("#audio-player")[0].play();
}


const startMapStoryMode = () => {
  // loadingSpinner(false);
  showMap();
  initMap({ ...mapConfig.default, ...mapConfig.intro.position, ...mapConfig.intro.limits, 'interactive': false });
  $("#audio-player")[0].play();
}

const undimMap = () => {
  clearTimeout(timer);
  $('.mapboxgl-map').removeClass('opacity-off');
}

const dimMapAfterDelay = () => {
  timer = setTimeout(() => dimMap(), 2000);
}

const dimMap = () => {
  $('.mapboxgl-map').addClass('opacity-off');
}

const handleDimmedMap = () => {
  if (!$('.mapboxgl-map').hasClass('opacity-off')) return;
  undimMap();
  dimMapAfterDelay();
}

const moveTo = (position, limits) => {
  map.easeTo({
    ...position,
    speed: 5,
    curve: 10,
    easing: easing
  });

  if (limits !== null) {
    map.setMinZoom(limits.minZoom);
    map.setMaxZoom(limits.maxZoom);
  }
}

const rotateCamera = () => {
  if (window.STATUS != "up") return;

  // Request the next frame of the animation.
  map.easeTo({
    bearing: map.getBearing() - 0.25,
    easing: easing,
    pitch: 80
  });
  requestAnimationFrame(() => rotateCamera());
}


const bounds = [
  [4.717755, 52.278175], // Southwest coordinates
  [5.07506, 52.431021] // Northeast coordinates
];


mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const mapConfig = {
  default: {
    container: "map",
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
      bearing: 0,
    },
    limits: {
      maxZoom: 16,
      minZoom: 13
    }
  }
}


let map;

export { mapConfig, showMap, handleDimmedMap, dimMap, undimMap, moveTo, rotateCamera, map, startExploreMode, startMapStoryMode };
