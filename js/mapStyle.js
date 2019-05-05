const mapStyle = {
  "version": 8,
  "name": "Street Lighting in Amsterdam &Utrecht-copy",
  "metadata": {
    "mapbox:autocomposite": false,
    "mapbox:type": "default",
    "mapbox:origin": "dark-v9",
    "mapbox:groups": {
      "1444934828655.3389": { "name": "Aeroways", "collapsed": true },
      "1444933322393.2852": {
        "name": "POI labels  (scalerank 1)",
        "collapsed": true
      },
      "1444855786460.0557": { "name": "Roads", "collapsed": true },
      "1444856071629.7817": { "name": "Place labels", "collapsed": true },
      "1444934295202.7542": {
        "name": "Admin boundaries",
        "collapsed": true
      },
      "1444856151690.9143": { "name": "State labels", "collapsed": true },
      "1444933721429.3076": { "name": "Road labels", "collapsed": true },
      "1444933358918.2366": {
        "name": "POI labels (scalerank 2)",
        "collapsed": true
      },
      "1444933808272.805": { "name": "Water labels", "collapsed": true },
      "1444933372896.5967": {
        "name": "POI labels (scalerank 3)",
        "collapsed": true
      },
      "1444855799204.86": { "name": "Bridges", "collapsed": true },
      "1444856087950.3635": { "name": "Marine labels", "collapsed": true },
      "1456969573402.7817": { "name": "Hillshading", "collapsed": true },
      "1444856869758.2375": { "name": "Wetlands", "collapsed": true },
      "1444862510685.128": { "name": "City labels", "collapsed": true },
      "1444855769305.6016": { "name": "Tunnels", "collapsed": true },
      "1456970288113.8113": { "name": "Landcover", "collapsed": false },
      "1444856144497.7825": { "name": "Country labels", "collapsed": true }
    },
    "mapbox:sdk-support": {
      "js": "0.49.0",
      "android": "6.5.0",
      "ios": "4.4.0"
    },
    "mapbox:trackposition": false
  },
  "center": [4.8939090868191215, 52.36163000690422],
  "zoom": 12.033467569041422,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "composite": {
      "url": "mapbox://agatheblues.1gomfdhv,mapbox.mapbox-streets-v7",
      "type": "vector"
    },
    "mapbox://agatheblues.71znpuwr": {
      "url": "mapbox://agatheblues.71znpuwr",
      "type": "vector"
    },
    // "video1": {
    //   "type": "video",
    //   "urls": ["./data/test.MOV"],
    //   "coordinates": [
    //     [4.867143, 52.367445], // Top left corner
    //     [4.896343, 52.367445], // Top right corner
    //     [4.896343, 52.356565], // Bottom right corner
    //     [4.867143, 52.356565], // Bottom left corner
    //   ]
    // },
    // "video2": {
    //   "type": "video",
    //   "urls": ["./data/test.MOV"],
    //   "coordinates": [
    //     [4.837143, 52.367445], // Top left corner
    //     [4.866343, 52.367445], // Top right corner
    //     [4.866343, 52.356565], // Bottom right corner
    //     [4.837143, 52.356565], // Bottom left corner
    //   ]
    // }
  },
  "sprite": "mapbox://sprites/agatheblues/cjv5o0u814e5k1fmfos0nqiez/8419b3clsjyq6xdbsdmiowfig",
  "glyphs": "mapbox://fonts/agatheblues/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "layout": {},
      "paint": { "background-color": "hsl(30, 2%, 20%)" }
    },
    {
      "id": "national_park",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse_overlay",
      "filter": ["==", "class", "national_park"],
      "layout": {},
      "paint": { "fill-color": "#112811" }
    },
    {
      "id": "waterway-river-canal",
      "type": "line",
      "source": "composite",
      "source-layer": "waterway",
      "minzoom": 8,
      "filter": [
        "any",
        ["==", "class", "canal"],
        ["==", "class", "river"]
      ],
      "layout": {
        "line-cap": { "base": 1, "stops": [[0, "butt"], [11, "round"]] },
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(185, 2%, 10%)",
        "line-width": { "base": 1.3, "stops": [[8.5, 0.1], [20, 8]] },
        "line-opacity": { "base": 1, "stops": [[8, 0], [8.5, 1]] }
      }
    },
    {
      "id": "water shadow",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "layout": {},
      "paint": {
        "fill-color": "#140f48",
        "fill-translate": {
          "base": 1.2,
          "stops": [[7, [0, 0]], [16, [-1, -1]]]
        },
        "fill-translate-anchor": "viewport",
        "fill-opacity": 1
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "layout": {},
      "paint": { "fill-color": "#140f48" }
    },
    {
      "id": "barrier_line-land-polygon",
      "type": "fill",
      "source": "composite",
      "source-layer": "barrier_line",
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "class", "land"]
      ],
      "layout": {},
      "paint": {
        "fill-color": "hsl(55, 1%, 20%)",
        "fill-outline-color": "hsl(55, 1%, 20%)"
      }
    },
    {
      "id": "lichtmasten-utrecht-57u837",
      "type": "circle",
      "source": "composite",
      "source-layer": "lichtmasten-utrecht-57u837",
      "layout": {},
      "paint": {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          10,
          1,
          22,
          3
        ],
        "circle-stroke-width": 0,
        "circle-opacity": 0.44,
        "circle-color": "hsl(56, 91%, 59%)"
      }
    },
    {
      "id": "ovl-amsterdam-wgs84-cs8m3r",
      "type": "circle",
      "source": "mapbox://agatheblues.71znpuwr",
      "source-layer": "ovl-amsterdam-wgs84-cs8m3r",
      "layout": {},
      "paint": {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          10,
          1,
          22,
          3
        ],
        "circle-stroke-width": 0,
        "circle-opacity": 0.44,
        "circle-color": "hsl(56, 91%, 59%)"
      }
    },
    // {
    //   "id": "video1",
    //   "type": "raster",
    //   "source": "video1"
    // },
    // {
    //   "id": "video2",
    //   "type": "raster",
    //   "source": "video2",
    //   "paint": {
    //     'raster-opacity': 0.8
    //   }
    // }
  ],
  "created": "2019-05-01T20:20:51.093Z",
  "id": "cjv5o0u814e5k1fmfos0nqiez",
  "modified": "2019-05-01T20:20:51.093Z",
  "owner": "agatheblues",
  "visibility": "private",
  "draft": false
}