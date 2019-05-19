import {
  updateCoordinates,
  mapConfig,
  showMap
} from "./map.js";
import { addMarkerPopupToMap } from "./popup.js";
import { playLargeVideo, hideLargeVideo, showLargeVideo, stopLargeVideo, handleMiniVideos } from "./video.js";
import { markers } from "./markers.js";
import { customLayer } from "./dome.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.up });

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
  $("#lookdown").removeClass("hidden");
  $("#lookup").addClass("hidden");

  STATUS = "up";

  map.easeTo({
    ...mapConfig.up,
    speed: 5,
    curve: 10,
    easing: easing
  });

  $("#audio-player")[0].play();
});

$("#lookdown").on("click", function () {
  $("#lookup").removeClass("hidden");
  $("#lookdown").addClass("hidden");

  STATUS = "down";

  map.easeTo({
    ...mapConfig.down,
    speed: 5,
    curve: 10,
    easing: easing
  });

  $("#audio-player")[0].pause();
});

$("#map").on("click", ".minivideo-player", e => {
  showLargeVideo();
  playLargeVideo(e.target.dataset.url + "");
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

map.on("zoomend", () => handleMiniVideos(map, markers));

map.on('moveend', () => handleMiniVideos(map, markers));

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