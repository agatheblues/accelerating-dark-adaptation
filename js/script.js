import {
  updateCoordinates,
  mapConfig,
  showMap,
  toggleLayer,
  handleSwitch,
  handleDimmedMap,
  dimMap,
  undimMap
} from "./map.js";
import { addMarkerPopupToMap, handlePopups } from "./popup.js";
import { playLargeVideo, stopLargeVideo } from "./video.js";
import { markers } from "./markers.js";
import { customLayer } from "./dome.js";
import { show, hide } from "./utils.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

$("#audio-player")[0].play();

const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.side_rotate.position, ...mapConfig.side_rotate.limits });

let STATUS = "up";

/* Events */
$(".mapboxgl-canvas").css("cursor", "crosshair");

$("#btn-explore").on("click", e => {
  showMap();
});

$("#btn-story").on("click", e => {
  /* @TODO */
  console.log('create view story mode');
});

$("#close-video").on("click", e => {
  undimMap();
  stopLargeVideo();
  hide("#video-wrapper");
  hide("#close-video");

  $("#audio-player")[0].play();
});

$("#lookup").on("click", function () {
  handleDimmedMap();
  STATUS = "up";
  moveTo('side_rotate');
});

$("#lookdown").on("click", function () {
  handleDimmedMap();
  STATUS = "down";

  moveTo('top_zoomed');
});

$("#lookwhole").on("click", function () {
  handleDimmedMap();
  STATUS = "up";
  moveTo('top_distanced');
});

$("#map").on("click", '.mapboxgl-popup-content', function (e) {
  const popupData = $(this).children('.popup-wrapper');

  map.easeTo({
    zoom: 14,
    center: [popupData.data('lon'), popupData.data('lat')],
    bearing: 0,
    pitch: 0
  });

  $("#audio-player")[0].pause();

  show("#video-wrapper");
  show("#close-video");
  playLargeVideo(popupData.data('url') + "");
  dimMap();
});

$(document).mousemove(() => handleDimmedMap());

$(document).on('touchmove', () => handleDimmedMap());

$("#toggle-lux").change(function () {
  handleDimmedMap();
  toggleLayer(map, 'lux', this.checked);
  handleSwitch(this.checked, 'toggle-nqm', 'lux', 'nqm');
});

$("#toggle-nqm").change(function () {
  handleDimmedMap();
  toggleLayer(map, 'nqm', this.checked);
  handleSwitch(this.checked, 'toggle-lux', 'nqm', 'lux');
});

/* Map events */
map.on("load", function () {
  map.addLayer({
    "id": "markers",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": markers
    },
    'paint': {
      'circle-radius': 1,
      'circle-color': "#000"
    }
  });

  markers.features.forEach(feature => addMarkerPopupToMap(feature, map));
});

map.on("style.load", () => map.addLayer(customLayer));

map.on("drag", () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

map.on("pitchend", () => {
  if (STATUS === "down") return;
  // rotateCamera();
});

map.on("zoomend", () => handlePopups(map));

map.on('moveend', () => {
  handlePopups(map);
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

// degrees the map rotates when the left or right arrow is clicked
var deltaDegrees = 1;

function easing(t) {
  return t * (2 - t);
}

function rotateCamera() {
  map.easeTo({
    bearing: map.getBearing() - deltaDegrees,
    easing: easing,
    pitch: 80
  });

  // Request the next frame of the animation.
  if (STATUS == "up") {
    requestAnimationFrame(rotateCamera);
  } else {
    map.easeTo({
      bearing: map.getBearing(),
      easing: easing,
      pitch: 80
    });

    map.easeTo({
      ...mapConfig.down,
      speed: 5,
      curve: 10,
      easing: easing
    });
  }
}

const moveTo = (config) => {
  map.easeTo({
    ...mapConfig[config].position,
    speed: 5,
    curve: 10,
    easing: easing
  });

  map.setMinZoom(mapConfig[config].limits.minZoom);
  map.setMaxZoom(mapConfig[config].limits.maxZoom);
}