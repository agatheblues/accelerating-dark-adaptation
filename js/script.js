import {
  updateCoordinates,
  mapConfig,
  showMap,
  toggleLayer
} from "./map.js";
import { addMarkerPopupToMap, handlePopups } from "./popup.js";
import { playLargeVideo, hideLargeVideo, showLargeVideo, stopLargeVideo } from "./video.js";
import { markers } from "./markers.js";
import { customLayer } from "./dome.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.side_rotate.position, ...mapConfig.side_rotate.limits });

const showHide = (show, hide) => {
  $(show).removeClass("hidden");
  $(hide).addClass("hidden");
}

const handleSwitch = (checked, switchId) => {
  if (checked) {
    $(`#${switchId}`).prop('disabled', true);
    $(`label[for='${switchId}']`).addClass('switch-disabled');
  } else {
    $(`#${switchId}`).prop('disabled', false);
    $(`label[for='${switchId}']`).removeClass('switch-disabled');
  }
}

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
  stopLargeVideo();
  hideLargeVideo();
});

$("#lookup").on("click", function () {
  showHide("#lookdown", "#lookup");

  STATUS = "up";
  moveTo('side_rotate');

  $("#audio-player")[0].play();
});

$("#lookdown").on("click", function () {
  showHide("#lookup", "#lookdown")

  STATUS = "down";

  moveTo('top_zoomed');

  $("#audio-player")[0].pause();
});

$("#map").on("click", ".minivideo-player", e => {
  showLargeVideo();
  playLargeVideo(e.target.dataset.url + "");
});

$("#toggle-lux").change(function () {
  toggleLayer(map, 'heatmap_lux', this.checked);
  handleSwitch(this.checked, 'toggle-nqm');
});

$("#toggle-nqm").change(function () {
  toggleLayer(map, 'heatmap_nqm', this.checked);
  handleSwitch(this.checked, 'toggle-lux');
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

map.on('moveend', () => handlePopups(map));

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