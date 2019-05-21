import { handleMiniVideos } from "./video.js";

const setDefaultValue = value => (value.length > 0 ? value : "~");

const renderPopupLocation = (quartier, lieu, latitude, longitude) => `<div class='popup-location hidden'><div class='popup-quartier'><p>${quartier}, ${lieu}</p></div><div><p>${longitude}&nbsp;&nbsp;${latitude}</p></div></div>`;

const renderPopupLabels = () =>
  "<div class='popup-left'><p>Lux</p><p>Night quality</p><p>Conditions</p></div>";

const renderVideo = (name, url_short_video, url_long_video) =>
  `<video id='${name}-player-sel' class='minivideo-player hidden' data-url='${url_long_video}' loop muted>
  <source src='${url_short_video}' type='video/mp4' />
</video>`;

const renderPopupValues = (lux, nqm, conditions) =>
  `<div class='popup-right'><p>${setDefaultValue(lux)}</p><p>${setDefaultValue(
    nqm
  )}</p><p>${setDefaultValue(
    conditions
  )}</p></div>`;

const renderPopUpContent = ({
  quartier = "",
  lieu = "",
  lux = "",
  nqm = "",
  conditions = "",
  latitude = 0,
  longitude = 0,
  name,
  url_short_video = "",
  url_long_video = ""
}) => {
  latitude = latitude.toFixed(5);
  longitude = longitude.toFixed(5);

  return (
    renderVideo(name, url_short_video, url_long_video) +
    renderPopupLocation(quartier, lieu, latitude, longitude) +
    "<div class='popup-data hidden'>" +
    renderPopupLabels() +
    renderPopupValues(lux, nqm, conditions) +
    "</div>"
  );
};

const showExtendedPopups = () => {
  $('.minivideo-player').removeClass('hidden');
  $('.popup-data').removeClass('hidden');
  $('.popup-location').removeClass('hidden');
  $('.mapboxgl-popup-content').removeClass('hidden');
}

const showLocationPopups = () => {
  $('.minivideo-player').addClass('hidden');
  $('.popup-data').addClass('hidden');
  $('.popup-location').removeClass('hidden');
  $('.mapboxgl-popup-content').removeClass('hidden');
}

const showMarkerPopups = () => {
  $('.minivideo-player').addClass('hidden');
  $('.popup-data').addClass('hidden');
  $('.popup-location').addClass('hidden');
  $('.mapboxgl-popup-content').addClass('hidden');
}

const addMarkerPopupToMap = (feature, map) => {
  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
    maxWidth: '140px'
  });

  let coordinates = feature.geometry.coordinates.slice();

  popup
    .setLngLat(coordinates)
    .addTo(map)
    .setHTML(renderPopUpContent({
      ...feature.properties,
      latitude: coordinates[1],
      longitude: coordinates[0]
    }));

  handlePopups(map);
};

const handlePopups = (map) => {
  const zoom = map.getZoom()
  const pitch = map.getPitch();

  if (pitch > 60) {
    showMarkerPopups();
  } else {
    if (zoom >= 14) {
      showExtendedPopups();
      handleMiniVideos(map);
    } else {
      showLocationPopups();
    }
  }
}

export { addMarkerPopupToMap, handlePopups }