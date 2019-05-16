const setDefaultValue = value => (value.length > 0 ? value : "~");

const renderPopupLabels = () =>
  "<div class='popup-left'><p>Lux</p><p>Night quality</p><p>Conditions</p><p>Latitude</p><p>Longitude</p></div>";

const renderVideo = (name, url_short_video, url_long_video) =>
  `<video id='${name}-player-sel' class='minivideo-player' data-url='${url_long_video}' loop autoplay muted>
  <source src='${url_short_video}' type='video/mp4' />
</video>`;

const renderPopupValues = (lux, nqm, conditions, latitude, longitude) =>
  `<div class='popup-right'><p>${setDefaultValue(lux)}</p><p>${setDefaultValue(
    nqm
  )}</p><p>${setDefaultValue(
    conditions
  )}</p><p>${latitude}</p><p>${longitude}</p></div>`;

const renderPopUpContent = (
  quartier,
  lieu,
  lux,
  nqm,
  conditions,
  latitude,
  longitude,
  name,
  url_short_video,
  url_long_video
) => {
  latitude = latitude.toFixed(5);
  longitude = longitude.toFixed(5);
  return (
    renderVideo(name, url_short_video, url_long_video) +
    "<div>" +
    renderPopupLabels() +
    renderPopupValues(lux, nqm, conditions, latitude, longitude) +
    "</div>"
  );
};

export { renderPopUpContent }