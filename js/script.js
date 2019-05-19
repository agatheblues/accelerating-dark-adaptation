import {
  updateCoordinates,
  mapStyle,
  showMap
} from "./map.js";
import { addMarkerPopupToMap } from "./popup.js";
import { playLargeVideo, hideLargeVideo, showLargeVideo, stopLargeVideo, playMiniVideos, pauseMiniVideos } from "./video.js";
import { markers } from "./markers.js";
import { customLayer } from "./dome.js";
import { config } from "../config.js";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

let bounds = [
  [4.717755, 52.278175], // Southwest coordinates
  [5.07506, 52.431021] // Northeast coordinates
];

const map = new mapboxgl.Map({
  container: "map",
  minZoom: 13,
  maxZoom: 19,
  zoom: 15,
  center: [4.892891, 52.370088],
  bearing: 0,
  pitch: 0,
  maxBounds: bounds,
  style: mapStyle
});

const THREE = window.THREE;
let STATUS = "down";

/* Events */
$(".mapboxgl-canvas").css("cursor", "crosshair");

$("#btn-start").on("click", e => {
  showMap();
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
    center: [4.892891, 52.370088],
    zoom: 13,
    pitch: 80,
    bearing: 0,
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

map.on("drag", () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

map.on("style.load", function () {
  map.addLayer(customLayer);
});

map.on("pitchend", () => {
  if (STATUS === "down") return;
  rotateCamera();
});

map.on("zoom", () => {
  if (map.getZoom() < 15) {
    $(".mapboxgl-popup").addClass("hidden");
  } else {
    $(".mapboxgl-popup").removeClass("hidden");
  }
});

map.on('moveend', function () {
  var features = map.queryRenderedFeatures({ layers: ['markers'] });
  playMiniVideos(features);
  const names = features.map((f) => f.properties.name);
  pauseMiniVideos(markers.features.filter((f) => names.indexOf(f.properties.name) < 0));
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
      center: [4.892891, 52.370088],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      speed: 5,
      curve: 10,
      easing: easing
    });
  }
}