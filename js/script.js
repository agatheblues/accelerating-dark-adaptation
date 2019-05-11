import { mapStyle } from './mapStyle.js'
import { videoCoord } from './videoCoord.js'
import { getCoordinate } from './utils.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFub25mZXZhbCIsImEiOiJjanZjdXFzeGExbTFkM3lwODV3MWRqZ2VwIn0.-JNe-7KSzOG_2Pr0g0MgEw';

/* Style */
var map = new mapboxgl.Map({
  container: 'map',
  minZoom: 13,
  maxZoom: 22,
  center: [4.8939090868191215, 52.36163000690422],
  zoom: 10,
  bearing: 0,
  style: mapStyle
});

$('.mapboxgl-canvas').css('cursor', 'crosshair');

const updateCoordinates = (e) => {
  $('#info-long').html(getCoordinate(e, 'lng'));
  $('#info-lat').html(getCoordinate(e, 'lat'));
}

const setDefaultValue = (value) => (value.length > 0) ? value : '/';

const renderPopUpContent = (lux, nqm, conditions) => {
  return `<div class='popup-left'><p>Lux</p><p>Night quality</p><p>Conditions</p></div><div class='popup-right'><p>${setDefaultValue(lux)}</p><p>${setDefaultValue(nqm)}</p><p>${setDefaultValue(conditions)}</p></div>`
}

const getPath = (name, currentImage) => {
  return `../data/${name}/(${currentImage}).gif`;
}

const showVideo = () => {
  runGifs = false;
  $('#map').addClass('hidden');
  $('#video-player').removeClass('hidden');
}

const hideVideo = () => {
  runGifs = true;
  $('#map').removeClass('hidden');
  $('#video-player').addClass('hidden');
}

const moveTorch = (e) => $('.radial-gradient').css('background', 'radial-gradient(200px 200px at ' + e.pageX + 'px ' + e.pageY + 'px,  rgba(255, 255, 255, 0) 0%, black 50.5%)');

let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});


let currentImage = 8;
var frameCount = 58;
let runGifs = false;

/* Events */

map.on('load', function () {
  videoCoord.forEach(({ name = "", lat_bottom = 0, lat_top = 0, lon_right = 0, lon_left = 0 }, index) => {

    map.addSource(name + index, {
      type: "image",
      url: getPath(name, currentImage),
      "coordinates": [
        [lon_left, lat_top], // Top left corner
        [lon_right, lat_top], // Top right corner
        [lon_right, lat_bottom], // Bottom right corner
        [lon_left, lat_bottom], // Bottom left corner
      ]
    });

    map.addLayer({
      id: name + index,
      "type": "raster",
      "source": name + index,
      "paint": {
        "raster-fade-duration": 0
      }
    });
  });

  runGifs = true;

  setInterval(function () {
    console.log(runGifs);
    if (!runGifs) return;
    currentImage = (currentImage + 1 > frameCount) ? 8 : currentImage + 1;
    videoCoord.forEach(({ name }, index) => {
      map.getSource(name + index).updateImage({ url: getPath(name, currentImage) });
    });
  }, 250);

});

map.on('mousemove', e => updateCoordinates(e));

map.on('mouseenter', 'markers', function (e) {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';

  // Set pop up location and content
  let coordinates = e.features[0].geometry.coordinates.slice();
  let { lux, nqm, conditions } = e.features[0].properties;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  popup.setLngLat(coordinates)
    .setHTML(renderPopUpContent(lux, nqm, conditions))
    .addTo(map);
});

map.on('click', 'markers', function (e) {
  // let { video } = e.features[0].properties;
  let video = "video1";
  showVideo();
});

map.on('mouseleave', 'markers', function () {
  map.getCanvas().style.cursor = 'crosshair';
  popup.remove();
});

$('#close-video').on('click', (e) => {
  hideVideo();
});

$(document).mousemove((e) => moveTorch(e));

