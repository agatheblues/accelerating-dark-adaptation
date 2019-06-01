import { show, hide, easing } from "./utils.js";

let timer;

const showMap = () => {
  hide("#intro");
  $("#map").removeClass("invisible");
  show("#footer");
};

const toggleLux = (map) => {
  map.setPaintProperty("public_lighting", "circle-radius", [
    "interpolate",
    ["linear"],
    ["get", "markers_lux"],
    0.22,
    0.5,
    123.6,
    5
  ]);
}

const toggleNqm = (map) => {
  map.setPaintProperty("public_lighting", "circle-radius", [
    "interpolate",
    ["linear"],
    ["get", "markers_nqm"],
    0,
    0.5,
    11.31,
    5,
    19.38,
    0.5
  ]);
}

const toggleLayer = (layer, status) => {
  if (status) {
    if (layer === 'lux') toggleLux(map);
    else if (layer === 'nqm') toggleNqm(map);
  }
  else {
    map.setPaintProperty("public_lighting", "circle-radius", [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      0.5,
      12.66,
      0.7,
      22,
      7
    ]);
  }
}

const undimMap = () => {
  clearTimeout(timer);
  $('.mapboxgl-map').removeClass('opacity-off');
}

const dimMapAfterDelay = () => {
  timer = setTimeout(() => dimMap(), 2000);
}

const dimMap = () => {
  $('.mapboxgl-map').addClass('opacity-off');
}

const handleDimmedMap = () => {
  if (!$('.mapboxgl-map').hasClass('opacity-off')) return;
  undimMap();
  dimMapAfterDelay();
}

const moveTo = (position, limits) => {
  map.easeTo({
    ...position,
    speed: 5,
    curve: 10,
    easing: easing
  });

  if (limits !== null) {
    map.setMinZoom(limits.minZoom);
    map.setMaxZoom(limits.maxZoom);
  }
}

const rotateCamera = () => {
  if (window.STATUS != "up") return;

  // Request the next frame of the animation.
  map.easeTo({
    bearing: map.getBearing() - 0.5,
    easing: easing,
    pitch: 80
  });
  requestAnimationFrame(() => rotateCamera());
}


const bounds = [
  [4.717755, 52.278175], // Southwest coordinates
  [5.07506, 52.431021] // Northeast coordinates
];

const mapStyle = {
  version: 8,
  name: "Dark - Dev",
  metadata: {
    "mapbox:type": "default",
    "mapbox:origin": "dark-v10",
    "mapbox:autocomposite": true,
    "mapbox:groups": {
      "1444855786460.0557": { name: "Roads", collapsed: false },
      "1444934295202.7542": {
        name: "Admin boundaries",
        collapsed: true
      },
      "1444855799204.86": { name: "Bridges", collapsed: true },
      "1444855769305.6016": { name: "Tunnels", collapsed: true }
    },
    "mapbox:sdk-support": {
      js: "0.50.0",
      android: "6.7.0",
      ios: "4.6.0"
    },
    "mapbox:trackposition": false
  },
  center: [4.8939090868191215, 52.36163000690422],
  zoom: 12,
  bearing: 0,
  pitch: 0,
  sources: {
    "mapbox://agatheblues.6xsw3odm": {
      "url": "mapbox://agatheblues.6xsw3odm",
      "type": "vector"
    }
  },
  "sprite": "mapbox://sprites/agatheblues/cjvv4z3cg2j9q1cq5pkojz8h2/8419b3clsjyq6xdbsdmiowfig",
  "glyphs": "mapbox://fonts/agatheblues/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "land",
      type: "background",
      paint: { "background-color": "hsla(241, 0%, 0%, 0%)" }
    },
    {
      "id": "public_lighting",
      "type": "circle",
      "source": "mapbox://agatheblues.6xsw3odm",
      "source-layer": "public_lighting_with_night_da-1z4eo8",
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
    }
  ],
  "created": "2019-05-19T16:09:37.474Z",
  "id": "cjvv4z3cg2j9q1cq5pkojz8h2",
  "modified": "2019-05-19T16:12:24.887Z",
  "owner": "agatheblues",
  "visibility": "private",
  "draft": false
};

const mapConfig = {
  default: {
    container: "map",
    maxBounds: bounds,
    style: mapStyle
  },
  top_zoomed: {
    position: {
      zoom: 14,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    },
    limits: {
      maxZoom: 19,
      minZoom: 12
    }
  },
  top_distanced: {
    position: {
      zoom: 12,
      center: [4.892891, 52.370088],
      bearing: 0,
      pitch: 0
    },
    limits: {
      maxZoom: 19,
      minZoom: 12
    }
  },
  side_rotate: {
    position: {
      center: [4.892891, 52.370088],
      zoom: 13,
      pitch: 80,
      bearing: 0,
    },
    limits: {
      maxZoom: 16,
      minZoom: 13
    }
  }
}

const map = new mapboxgl.Map({ ...mapConfig.default, ...mapConfig.side_rotate.position, ...mapConfig.side_rotate.limits });

export { mapConfig, showMap, toggleLayer, handleDimmedMap, dimMap, undimMap, moveTo, rotateCamera, map };
