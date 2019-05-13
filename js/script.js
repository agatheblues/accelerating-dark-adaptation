import { updateCoordinates, renderPopUpContent, mapStyle, showMap } from './map.js'
import { playVideo, hideVideo, showVideo, stopVideo, videoCoord } from './video.js'
import { markers, mapOffset } from './markers.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

let popups = [];
const map = new mapboxgl.Map({
  container: 'map',
  minZoom: 13,
  maxZoom: 19,
  center: [4.780525, 52.360463],
  zoom: 10,
  bearing: 0,
  pitch: 60,
  style: mapStyle
});

var THREE = window.THREE;

/* MAP */
$('.mapboxgl-canvas').css('cursor', 'crosshair');

const addVideoToMap = (properties) => {
  let { name, url_short_video, lat_bottom, lat_top, lon_right, lon_left } = properties;
  map.addSource(name, {
    "type": "video",
    "urls": [url_short_video],
    "coordinates": [
      [lon_left, lat_top], // Top left corner
      [lon_right, lat_top], // Top right corner
      [lon_right, lat_bottom], // Bottom right corner
      [lon_left, lat_bottom], // Bottom left corner
    ]
  });

  map.addLayer({
    "id": name,
    "type": "raster",
    "source": name,
    "paint": {}
  });
}

const addMarkerToMap = (feature) => {
  let el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);

  el.addEventListener('click', () => {
    showVideo();
    playVideo(feature.properties.url_long_video);
  });

  el.addEventListener('touchstart', () => {
    showVideo();
    playVideo(feature.properties.url_long_video);
  });
}

const addMarkerPopupToMap = (feature) => {
  let popup = new mapboxgl.Popup({
    "closeButton": false,
    "closeOnClick": false,
    "offset": -200,
  });

  let coordinates = feature.geometry.coordinates.slice();
  let { lux, nqm, conditions } = feature.properties;

  popup.setLngLat(coordinates)
    .setHTML(renderPopUpContent(lux, nqm, conditions, coordinates[0], coordinates[1]))
    .addTo(map);

  popups.push(popup);
}


/* Events */
map.on('load', function () {
  // MARKERS
  map.addSource("markers", {
    "type": "geojson",
    "data": markers
  });

  markers.features.forEach((feature) => {
    addMarkerToMap(feature);
    // addMarkerPopupToMap(feature);
    // addVideoToMap(feature.properties);
  });
});

// map.on('zoom', function () {
//   for (let i = 0; i < popups.length; i++) {
//     popups[i].options.offset = mapOffset(map.getZoom());
//   }
// });

map.on('drag', () => {
  let { lng, lat } = map.getCenter();
  updateCoordinates(lat, lng);
});

$('#btn-start').on('click', (e) => showMap());

$('#close-video').on('click', (e) => {
  stopVideo();
  hideVideo();
});

// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [4.780525, 52.360463];
var modelAltitude = -50;
var modelRotate = [Math.PI / 2, 0, 0];
var modelScale = 5.41843220338983e-8;

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
  translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
  translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
  translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  scale: modelScale
};


var customLayer = {
  id: '3d-model',
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    // create two three.js lights to illuminate the model
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    this.scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight2);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    var sphereGeom = new THREE.SphereGeometry(100, 32, 32);
    var sphereMat = new THREE.MeshPhongMaterial({
      color: 0xfb3550,
      flatShading: true
    });
    var sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    // sphereMesh.position.set(4.780525, 52.360463, 0)
    this.scene.add(sphereMesh);

    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });

    this.renderer.autoClear = false;
  },
  render: function (gl, matrix) {
    var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
    var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
    var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

    var m = new THREE.Matrix4().fromArray(matrix);
    var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
      .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    this.camera.projectionMatrix.elements = matrix;
    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
};

map.on('style.load', function () {
  map.addLayer(customLayer);
});