const updateCoordinates = (lat, long) => {
  $("#info-long").html(long.toFixed(5));
  $("#info-lat").html(lat.toFixed(5));
};

const showMap = () => {
  $("#intro").addClass("hidden");
  $("#map").removeClass("invisible");
  $("#footer").removeClass("hidden");
};

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
    "mapbox://agatheblues.71znpuwr": {
      "url": "mapbox://agatheblues.71znpuwr",
      "type": "vector"
    }
  },
  "sprite": "mapbox://sprites/agatheblues/cjvv4z3cg2j9q1cq5pkojz8h2/8419b3clsjyq6xdbsdmiowfig",
  "glyphs": "mapbox://fonts/agatheblues/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "land",
      type: "background",
      layout: {},
      paint: { "background-color": "hsl(241, 0%, 0%)" }
    },
    {
      "id": "ovl-amsterdam-wgs84-cs8m3r",
      "type": "circle",
      "source": "mapbox://agatheblues.71znpuwr",
      "source-layer": "ovl-amsterdam-wgs84-cs8m3r",
      "layout": {},
      paint: {
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
      minZoom: 13
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

export { updateCoordinates, mapConfig, mapStyle, showMap };
