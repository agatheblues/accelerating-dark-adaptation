import { handleMiniVideos } from "./video.js";
import { markers } from "./markers.js";

let popups = [];

const setDefaultValue = value => (value.length > 0 ? value : "~");

const renderPopupLocation = (quartier, lieu, latitude, longitude) => `<div class='popup-location'><p>${quartier}, ${lieu}</p></div><div><p>${longitude}&nbsp;&nbsp;${latitude}</p></div>`;

const renderPopupLabels = () =>
  "<div class='popup-left'><p>Lux</p><p>Night quality</p><p>Conditions</p></div>";

const renderVideo = (name, url_short_video, url_long_video) =>
  `<video id='${name}-player-sel' class='minivideo-player' data-url='${url_long_video}' loop autoplay muted>
  <source src='${url_short_video}' type='video/mp4' />
</video>`;

const renderPopupValues = (lux, nqm, conditions) =>
  `<div class='popup-right'><p>${setDefaultValue(lux)}</p><p>${setDefaultValue(
    nqm
  )}</p><p>${setDefaultValue(
    conditions
  )}</p></div>`;

const renderPopUpContent = ({ quartier = "", lieu = "", latitude = 0, longitude = 0 }) => {
  latitude = latitude.toFixed(5);
  longitude = longitude.toFixed(5);
  return renderPopupLocation(quartier, lieu, latitude, longitude);
};

const renderPopUpExtendedContent = ({
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
    renderPopupLocation(quartier, lieu) +
    "<div class='popup-data'>" +
    renderPopupLabels() +
    renderPopupValues(lux, nqm, conditions, latitude, longitude) +
    "</div>"
  );
};

const addMarkerPopupToMap = (feature, map) => {
  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
    maxWidth: '140px'
  });

  popups.push(popup);

  let coordinates = feature.geometry.coordinates.slice();

  popup.data = {
    ...feature.properties,
    latitude: coordinates[1],
    longitude: coordinates[0]
  }

  popup
    .setLngLat(coordinates)
    .addTo(map);

  handlePopups(map);
};

const handlePopups = (map) => {
  // handleMiniVideos
  const zoom = map.getZoom()
  const pitch = map.getPitch();

  console.log(zoom, pitch)

  if (pitch > 60) {
    popups.forEach(popup => popup.setHTML(""));
    return;
  }

  if (pitch <= 60) {
    if (zoom < 16) {
      popups.forEach(popup => popup.setHTML(renderPopUpExtendedContent(popup.data)))
      handleMiniVideos(map, markers);
      return;
    }
    popups.forEach(popup => popup.setHTML(renderPopUpContent(popup.data)))
  }
}

export { addMarkerPopupToMap, handlePopups }