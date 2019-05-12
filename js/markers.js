
const inMin = 16;
const inMax = 19;
const outMin = -200;
const outMax = -500;
const mapOffset = (value) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

const markers = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "quartier": "Osdorp",
        "lieu": "Memorial Park",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video1",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.360793,
        "lat_bottom": 52.360133,
        "lon_left": 4.779565,
        "lon_right": 4.781485
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.780525,
          52.360463
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Slotermeer",
        "lieu": "Sport Complex",
        "lux": "1.85",
        "nqm": "17.97",
        "conditions": "Clear sky",
        "name": "video2",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.380822,
        "lat_bottom": 52.380162,
        "lon_left": 4.785748,
        "lon_right": 4.787668
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.786708,
          52.380492
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Nieuw Sloten",
        "lieu": "2",
        "lux": "16.65",
        "nqm": "14.94",
        "conditions": "Clear sky",
        "name": "video3",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.345659,
        "lat_bottom": 52.344999,
        "lon_left": 4.810561,
        "lon_right": 4.812481
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.811521,
          52.345329
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Buitenveldert",
        "lieu": "Amsterdamse Bos",
        "lux": "0.02",
        "nqm": "19.14",
        "conditions": "Clear sky",
        "name": "video4",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.319206,
        "lat_bottom": 52.318546,
        "lon_left": 4.829268,
        "lon_right": 4.831188
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.830228,
          52.318876
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Zuidas",
        "lieu": "WTC, Zuid",
        "lux": "18.41",
        "nqm": "14.01",
        "conditions": "Clear sky",
        "name": "video5",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.341407,
        "lat_bottom": 52.340747,
        "lon_left": 4.873458,
        "lon_right": 4.875378
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.874418,
          52.341077
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Watergraafsmeer",
        "lieu": "Amstel",
        "lux": "1.28",
        "nqm": "17.72",
        "conditions": "Clear sky",
        "name": "video6",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.340695,
        "lat_bottom": 52.340035,
        "lon_left": 4.916121,
        "lon_right": 4.918041
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.917081,
          52.340365
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Watergraafsmeer",
        "lieu": "Anton Pannekoek",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video7",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.35662,
        "lat_bottom": 52.35596,
        "lon_left": 4.95458,
        "lon_right": 4.9565
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.95554,
          52.35629
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old East",
        "lieu": "OosterPark",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video8",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.360053,
        "lat_bottom": 52.359393,
        "lon_left": 4.91944,
        "lon_right": 4.92136
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.9204,
          52.359723
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "De Pijp",
        "lieu": "Gerard Douplein",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video9",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.356306,
        "lat_bottom": 52.355646,
        "lon_left": 4.891926,
        "lon_right": 4.893846
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.892886,
          52.355976
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old South",
        "lieu": "Olympishe Stadion",
        "lux": "9.61",
        "nqm": "15.81",
        "conditions": "Clear sky",
        "name": "video10",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.343597,
        "lat_bottom": 52.342937,
        "lon_left": 4.853167,
        "lon_right": 4.855087
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.854127,
          52.343267
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old South",
        "lieu": "Vondel Park",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video11",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.357958,
        "lat_bottom": 52.357298,
        "lon_left": 4.866521,
        "lon_right": 4.868441
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.867481,
          52.357628
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Slotervaart",
        "lieu": "Overtoomse Veld",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video12",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.364499,
        "lat_bottom": 52.363839,
        "lon_left": 4.843135,
        "lon_right": 4.845055
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.844095,
          52.364169
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Bos en Lommer",
        "lieu": "Hofwijckstraat",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video13",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.380537,
        "lat_bottom": 52.379877,
        "lon_left": 4.849163,
        "lon_right": 4.851083
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.850123,
          52.380207
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Westerpark",
        "lieu": "Machinegebouw",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video14",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.386659,
        "lat_bottom": 52.385999,
        "lon_left": 4.871539,
        "lon_right": 4.873459
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.872499,
          52.386329
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Westerpark",
        "lieu": "Houthavens",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video15",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.398851,
        "lat_bottom": 52.398191,
        "lon_left": 4.883064,
        "lon_right": 4.884984
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.884024,
          52.398521
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Oud-West",
        "lieu": "Kinkerbuurt",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video16",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.367667,
        "lat_bottom": 52.367007,
        "lon_left": 4.86721,
        "lon_right": 4.86913
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.86817,
          52.367337
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Center West",
        "lieu": "Anne Frank",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video17",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.375628,
        "lat_bottom": 52.374968,
        "lon_left": 4.882333,
        "lon_right": 4.884253
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.883293,
          52.375298
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Center West",
        "lieu": "de Dam",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video18",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.373392,
        "lat_bottom": 52.372732,
        "lon_left": 4.891691,
        "lon_right": 4.893611
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.892651,
          52.373062
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Center East",
        "lieu": "Skinny Bridge",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video19",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.363899,
        "lat_bottom": 52.363239,
        "lon_left": 4.901414,
        "lon_right": 4.903334
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.902374,
          52.363569
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Center East",
        "lieu": "De Wallen",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video20",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.372393,
        "lat_bottom": 52.371733,
        "lon_left": 4.897285,
        "lon_right": 4.899205
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.898245,
          52.372063
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Center East",
        "lieu": "Centraal Station",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video21",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.378314,
        "lat_bottom": 52.377654,
        "lon_left": 4.899027,
        "lon_right": 4.900947
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.899987,
          52.377984
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Indische Buurt",
        "lieu": "Sumatrakade ",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video22",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.378351,
        "lat_bottom": 52.377691,
        "lon_left": 4.933854,
        "lon_right": 4.935774
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.934814,
          52.378021
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Indische Buurt",
        "lieu": "Cruquiusweg ",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video23",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.368921,
        "lat_bottom": 52.368261,
        "lon_left": 4.947082,
        "lon_right": 4.949002
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.948042,
          52.368591
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "IjBurg Zeeburg",
        "lieu": "Camping Zeeburg",
        "lux": "0.12",
        "nqm": "19.38",
        "conditions": "Clear sky",
        "name": "video24",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.365637,
        "lat_bottom": 52.364977,
        "lon_left": 4.95855,
        "lon_right": 4.96047
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.95951,
          52.365307
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "IjBurg Zeeburg",
        "lieu": "Unnamed Road",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video25",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.348252,
        "lat_bottom": 52.347592,
        "lon_left": 5.027329,
        "lon_right": 5.029249
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.028289,
          52.347922
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Bijlmer Center",
        "lieu": "Ziggo Dome",
        "lux": "19.61",
        "nqm": "15.13",
        "conditions": "Clear sky",
        "name": "video26",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557676966/miniVideos/ziggoDome_mini_ivn2ei.mp4",
        "url_long_video": "ziggoDome.mp4",
        "lat_top": 52.313741,
        "lat_bottom": 52.313081,
        "lon_left": 4.936256,
        "lon_right": 4.938176
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.937216,
          52.313411
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Bijmer East",
        "lieu": "ArenA",
        "lux": "23.44",
        "nqm": "12.66",
        "conditions": "Clear sky",
        "name": "video27",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.313063,
        "lat_bottom": 52.312403,
        "lon_left": 4.94311,
        "lon_right": 4.94503
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.94407,
          52.312733
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Driemond",
        "lieu": "Dog Beach",
        "lux": "0.02",
        "nqm": "19.21",
        "conditions": "Clear sky",
        "name": "video28",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.304425,
        "lat_bottom": 52.303765,
        "lon_left": 4.981932,
        "lon_right": 4.983852
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.982892,
          52.304095
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old North",
        "lieu": "NDSM Bungee",
        "lux": "1.34",
        "nqm": "16.26",
        "conditions": "Clear sky",
        "name": "video29",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.399709,
        "lat_bottom": 52.399049,
        "lon_left": 4.893733,
        "lon_right": 4.895653
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.894693,
          52.399379
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old North",
        "lieu": "Eye Museum",
        "lux": "0.55",
        "nqm": "17.56",
        "conditions": "Clear sky",
        "name": "video30",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.384449,
        "lat_bottom": 52.383789,
        "lon_left": 4.899586,
        "lon_right": 4.901506
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.900546,
          52.384119
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old North",
        "lieu": "Monk Gym",
        "lux": "0.27",
        "nqm": "17.95",
        "conditions": "Clear sky",
        "name": "video31",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.383768,
        "lat_bottom": 52.383108,
        "lon_left": 4.928328,
        "lon_right": 4.930248
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.929288,
          52.383438
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North East",
        "lieu": "Uitdammerdijk",
        "lux": "0.04",
        "nqm": "17.62",
        "conditions": "Clear sky",
        "name": "video32",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.393457,
        "lat_bottom": 52.392797,
        "lon_left": 5.025729,
        "lon_right": 5.027649
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.026689,
          52.393127
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North East",
        "lieu": "Achterlaan Tour",
        "lux": "0.56",
        "nqm": "17.78",
        "conditions": "Clear sky",
        "name": "video33",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.407403,
        "lat_bottom": 52.406743,
        "lon_left": 4.965875,
        "lon_right": 4.967795
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.966835,
          52.407073
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North East",
        "lieu": "Belmermeer",
        "lux": "0.04",
        "nqm": "19.26",
        "conditions": "Clear sky",
        "name": "video34",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.423938,
        "lat_bottom": 52.423278,
        "lon_left": 5.004761,
        "lon_right": 5.006681
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.005721,
          52.423608
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North West",
        "lieu": "Noorden IjPolder",
        "lux": "",
        "nqm": "",
        "conditions": "",
        "name": "video35",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.417609,
        "lat_bottom": 52.416949,
        "lon_left": 4.85679,
        "lon_right": 4.85871
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.85775,
          52.417279
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "Old North",
        "lieu": "NDSM hallenplein",
        "lux": "123.6",
        "nqm": "11.31",
        "conditions": "Clear sky",
        "name": "video36",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-Ijhallen.mp4",
        "lat_top": 52.401311,
        "lat_bottom": 52.400651,
        "lon_left": 4.892341,
        "lon_right": 4.894261
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.893301,
          52.400981
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North West",
        "lieu": "Molenwijk parking",
        "lux": "16.06",
        "nqm": "15.17",
        "conditions": "Clear sky",
        "name": "video37",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.418018,
        "lat_bottom": 52.417358,
        "lon_left": 4.892996,
        "lon_right": 4.894916
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.893956,
          52.417688
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "quartier": "North West",
        "lieu": "Metro North",
        "lux": "23.1",
        "nqm": "13.24",
        "conditions": "Clear sky",
        "name": "video38",
        "url_short_video": "https://res.cloudinary.com/dkylbarf5/video/upload/v1557675002/miniVideos/north-ijHallen_ymxxxz.mp4",
        "url_long_video": "north-onthedigue.mp4",
        "lat_top": 52.401746,
        "lat_bottom": 52.401086,
        "lon_left": 4.931332,
        "lon_right": 4.933252
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.932292,
          52.401416
        ]
      }
    }
  ]
}


export { mapOffset, markers }