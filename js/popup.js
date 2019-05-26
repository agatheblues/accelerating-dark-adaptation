import { show, hide } from "./utils.js";

const setDefaultValue = value => (value.length > 0 ? value : "~");

const renderPopupLocation = (quartier, lieu, latitude, longitude) => `<div class='popup-location hidden'><div class='popup-quartier'><p>${quartier}, ${lieu}</p></div><div><p>${longitude}&nbsp;&nbsp;${latitude}</p></div></div>`;

const renderPopupLabels = () =>
  "<div class='popup-left'><p class='popup-lux'>Lux</p><p class='popup-nqm'>Night quality</p></div>";

const renderPopupValues = (lux, nqm) =>
  `<div class='popup-right'><p class='popup-lux'>${setDefaultValue(lux)}</p>
  <p class='popup-nqm'>${setDefaultValue(nqm)}</p></div>`;

const renderPopUpContent = ({
  quartier = "",
  lieu = "",
  lux = "",
  nqm = "",
  latitude = 0,
  longitude = 0,
  url_long_video = ""
}) => {
  latitude = latitude.toFixed(5);
  longitude = longitude.toFixed(5);

  return (
    `<div class='popup-wrapper' data-lat=${latitude} data-lon=${longitude} data-url=${url_long_video}>` +
    renderPopupLocation(quartier, lieu, latitude, longitude) +
    "<div class='popup-data'>" +
    renderPopupLabels() +
    renderPopupValues(lux, nqm) +
    "</div></div>"
  );
};

const showExtendedPopups = () => {
  show('.popup-left');
  show('.popup-location');
}

const showShortPopups = () => {
  show('.popup-left');
  hide('.popup-location');
}

const showMarkerPopups = () => {
  hide('.popup-left');
  hide('.popup-location');
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

  if (pitch > 60 || zoom <= 12) {
    showMarkerPopups();
  } else {
    if (zoom >= 14) {
      showExtendedPopups();
    } else {
      showShortPopups();
    }
  }
}

export { addMarkerPopupToMap, handlePopups }