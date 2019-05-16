const setDefaultValue = value => (value.length > 0 ? value : "~");

const renderPopupLocation = (quartier, lieu) => `<div class='popup-location'><p>${quartier}, ${lieu}</p></div>`;

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
    renderPopupLocation(quartier, lieu) +
    "<div>" +
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
  });

  let coordinates = feature.geometry.coordinates.slice();
  let {
    quartier,
    lieu,
    name,
    lux,
    nqm,
    conditions,
    url_long_video,
    url_short_video
  } = feature.properties;

  popup
    .setLngLat(coordinates)
    .setHTML(
      renderPopUpContent(
        quartier,
        lieu,
        lux,
        nqm,
        conditions,
        coordinates[0],
        coordinates[1],
        name,
        url_short_video,
        url_long_video
      )
    )
    .addTo(map);
};

export { addMarkerPopupToMap }