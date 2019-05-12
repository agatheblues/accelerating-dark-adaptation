const updateCoordinates = (e) => {
  $('#info-long').html(getCoordinate(e, 'lng'));
  $('#info-lat').html(getCoordinate(e, 'lat'));
}

const getCoordinate = (e, field) => e.lngLat[field].toFixed(19);

const setDefaultValue = (value) => (value.length > 0) ? value : '/';

const renderPopUpContent = (lux, nqm, conditions) => {
  return `<div class='popup-left'><p>Lux</p><p>Night quality</p><p>Conditions</p></div><div class='popup-right'><p>${setDefaultValue(lux)}</p><p>${setDefaultValue(nqm)}</p><p>${setDefaultValue(conditions)}</p></div>`
}

const getPath = (name, currentImage) => {
  return `../data/${name}/(${currentImage}).gif`;
}

const mapStyle = {
  "version": 8,
  "name": "Dark - Dev",
  "metadata": {
    "mapbox:type": "default",
    "mapbox:origin": "dark-v10",
    "mapbox:autocomposite": true,
    "mapbox:groups": {
      "1444855786460.0557": { "name": "Roads", "collapsed": false },
      "1444934295202.7542": {
        "name": "Admin boundaries",
        "collapsed": true
      },
      "1444855799204.86": { "name": "Bridges", "collapsed": true },
      "1444855769305.6016": { "name": "Tunnels", "collapsed": true }
    },
    "mapbox:sdk-support": {
      "js": "0.50.0",
      "android": "6.7.0",
      "ios": "4.6.0"
    },
    "mapbox:trackposition": false
  },
  "center": [4.8939090868191215, 52.36163000690422],
  "zoom": 12,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "composite": {
      "url": "mapbox://manonfeval.cjvggfi2820tn2xo78ohk9pu3-9y2lv,mapbox.mapbox-streets-v8,manonfeval.4hkm5cev",
      "type": "vector"
    },
    // "video1": {
    //   "type": "video",
    //   "urls": ["./data/video1.mp4"],
    //   "coordinates": [
    //     [4.786708, 52.380492], // Top left corner
    //     [4.788628, 52.380492], // Top right corner
    //     [4.788628, 52.379832], // Bottom right corner
    //     [4.786708, 52.379832], // Bottom left corner
    //   ]
    // }
  },
  "sprite": "mapbox://sprites/manonfeval/cjvcuv3ro4ljp1fpnqu44sb24/cj530pqtvmepv7xox0ujq2mef",
  "glyphs": "mapbox://fonts/manonfeval/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "land",
      "type": "background",
      "layout": {},
      "paint": { "background-color": "hsl(241, 0%, 0%)" }
    },
    {
      "id": "landuse",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse",
      "minzoom": 5,
      "filter": [
        "match",
        ["get", "class"],
        ["park", "airport", "glacier", "pitch", "sand"],
        true,
        false
      ],
      "layout": {},
      "paint": {
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          0,
          6,
          ["match", ["get", "class"], "glacier", 0.5, 1]
        ],
        "fill-color": "hsl(132, 0%, 0%)"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "layout": {},
      "paint": { "fill-color": "hsl(236, 0%, 0%)" }
    },
    {
      "id": "road-secondary-tertiary",
      "type": "line",
      "metadata": { "mapbox:group": "1444855786460.0557" },
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "match",
          ["get", "class"],
          ["secondary", "tertiary"],
          true,
          false
        ],
        ["match", ["get", "structure"], ["none", "ford"], true, false],
        ["==", ["geometry-type"], "LineString"]
      ],
      "layout": { "line-cap": "round", "line-join": "round" },
      "paint": {
        "line-width": 0.1,
        "line-color": "hsl(55, 93%, 69%)",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          11.99,
          1,
          12.1,
          0
        ]
      }
    },
    {
      "id": "road-primary",
      "type": "line",
      "metadata": { "mapbox:group": "1444855786460.0557" },
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        ["==", ["get", "class"], "primary"],
        ["match", ["get", "structure"], ["none", "ford"], true, false],
        ["==", ["geometry-type"], "LineString"]
      ],
      "layout": { "line-cap": "round", "line-join": "round" },
      "paint": {
        "line-width": 0.5,
        "line-color": "hsl(54, 73%, 85%)",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          11.65,
          1,
          12.1,
          0,
          22,
          1
        ]
      }
    },
    {
      "id": "road-motorway-trunk",
      "type": "line",
      "metadata": { "mapbox:group": "1444855786460.0557" },
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        ["match", ["get", "class"], ["motorway", "trunk"], true, false],
        ["match", ["get", "structure"], ["none", "ford"], true, false],
        ["==", ["geometry-type"], "LineString"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "none"
      },
      "paint": { "line-width": 0.5, "line-color": "hsl(56, 82%, 81%)" }
    },
    {
      "id": "road-rail",
      "type": "line",
      "metadata": { "mapbox:group": "1444855786460.0557" },
      "source": "composite",
      "source-layer": "road",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "match",
          ["get", "class"],
          ["major_rail", "minor_rail"],
          true,
          false
        ],
        ["match", ["get", "structure"], ["none", "ford"], true, false]
      ],
      "layout": { "line-join": "round", "visibility": "none" },
      "paint": {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          14,
          0.5,
          20,
          1
        ],
        "line-color": "hsl(0, 0%, 17%)"
      }
    },
    {
      "id": "markers",
      "interactive": true,
      "type": "symbol",
      "source": "composite",
      "source-layer": "data_v3",
      "layout": {
        "icon-image": ["step", ["zoom"], "rocket-15", 22, "rocket-15"],
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          22,
          1
        ],
      },
      "paint": {}
    },
    {
      "id": "amsterdam-publiclight-057i4x",
      "type": "circle",
      "source": "composite",
      "source-layer": "amsterdam-publicLight-057i4x",
      "layout": {},
      "paint": {
        "circle-color": "hsl(57, 88%, 95%)",
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          12.66,
          0.7,
          22,
          7
        ]
      }
    },
    // {
    //   "id": "video1",
    //   "type": "raster",
    //   "source": "video1",
    //   "paint": {
    //     'raster-opacity': 1
    //   }
    // }
  ],
  "created": "2019-05-06T21:06:44.077Z",
  "id": "cjvcuv3ro4ljp1fpnqu44sb24",
  "modified": "2019-05-06T21:11:17.288Z",
  "owner": "manonfeval",
  "visibility": "private",
  "draft": false
}

export { updateCoordinates, getPath, renderPopUpContent, mapStyle };