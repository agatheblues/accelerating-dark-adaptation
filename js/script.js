import {
  updateCoordinates,
  mapStyle,
  showMap
} from "./map.js";
import { addMarkerPopupToMap } from "./popup.js";
import { playVideo, hideVideo, showVideo, stopVideo } from "./video.js";
import { markers, addMarkerToMap } from "./markers.js";
import { customLayer } from "./dome.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw";

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
  stopVideo();
  hideVideo();
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
  showVideo();
  playVideo(e.target.dataset.url + "");
});


/* Map events */
map.on("load", function () {
  map.addSource("markers", {
    type: "geojson",
    data: markers
  });

  markers.features.forEach(feature => {
    addMarkerToMap(feature, map);
    addMarkerPopupToMap(feature, map);
  });
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