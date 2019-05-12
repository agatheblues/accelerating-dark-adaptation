const playVideo = (url) => {
  $('#video-player-source').attr('src', url);
  $('#video-player-sel')[0].load();
  $('#video-player-sel')[0].play();
}

const stopVideo = () => {
  $('#video-player-sel')[0].pause();
  $('#video-player-sel')[0].currentTime = 0;
}


const showVideo = () => {
  window.runGifs = false;
  $('#map').addClass('hidden');
  $('#video-wrapper').removeClass('hidden');
}

const hideVideo = () => {
  $('#map').removeClass('hidden');
  $('#video-wrapper').addClass('hidden');
  window.runGifs = true;
}

const videoCoord = [
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.360793,
    "lat_bottom": 52.360133,
    "lon_left": 4.779565,
    "lon_right": 4.781485
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.380822,
    "lat_bottom": 52.380162,
    "lon_left": 4.785748,
    "lon_right": 4.787668
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.345659,
    "lat_bottom": 52.344999,
    "lon_left": 4.810561,
    "lon_right": 4.812481
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.319206,
    "lat_bottom": 52.318546,
    "lon_left": 4.829268,
    "lon_right": 4.831188
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.341407,
    "lat_bottom": 52.340747,
    "lon_left": 4.873458,
    "lon_right": 4.875378
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.340695,
    "lat_bottom": 52.340035,
    "lon_left": 4.916121,
    "lon_right": 4.918041
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.35662,
    "lat_bottom": 52.35596,
    "lon_left": 4.95458,
    "lon_right": 4.9565
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.360053,
    "lat_bottom": 52.359393,
    "lon_left": 4.91944,
    "lon_right": 4.92136
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.356306,
    "lat_bottom": 52.355646,
    "lon_left": 4.891926,
    "lon_right": 4.893846
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.343597,
    "lat_bottom": 52.342937,
    "lon_left": 4.853167,
    "lon_right": 4.855087
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.357958,
    "lat_bottom": 52.357298,
    "lon_left": 4.866521,
    "lon_right": 4.868441
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.364499,
    "lat_bottom": 52.363839,
    "lon_left": 4.843135,
    "lon_right": 4.845055
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.380537,
    "lat_bottom": 52.379877,
    "lon_left": 4.849163,
    "lon_right": 4.851083
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.386659,
    "lat_bottom": 52.385999,
    "lon_left": 4.871539,
    "lon_right": 4.873459
  },
  {
    "name": "video1",
    "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
    "lat_top": 52.398851,
    "lat_bottom": 52.398191,
    "lon_left": 4.883064,
    "lon_right": 4.884984
  },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.367667,
  //   "lat_bottom": 52.367007,
  //   "lon_left": 4.86721,
  //   "lon_right": 4.86913
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.375628,
  //   "lat_bottom": 52.374968,
  //   "lon_left": 4.882333,
  //   "lon_right": 4.884253
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.373392,
  //   "lat_bottom": 52.372732,
  //   "lon_left": 4.891691,
  //   "lon_right": 4.893611
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.363899,
  //   "lat_bottom": 52.363239,
  //   "lon_left": 4.901414,
  //   "lon_right": 4.903334
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.372393,
  //   "lat_bottom": 52.371733,
  //   "lon_left": 4.897285,
  //   "lon_right": 4.899205
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.378314,
  //   "lat_bottom": 52.377654,
  //   "lon_left": 4.899027,
  //   "lon_right": 4.900947
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.378351,
  //   "lat_bottom": 52.377691,
  //   "lon_left": 4.933854,
  //   "lon_right": 4.935774
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.368921,
  //   "lat_bottom": 52.368261,
  //   "lon_left": 4.947082,
  //   "lon_right": 4.949002
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.365637,
  //   "lat_bottom": 52.364977,
  //   "lon_left": 4.95855,
  //   "lon_right": 4.96047
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.348252,
  //   "lat_bottom": 52.347592,
  //   "lon_left": 5.027329,
  //   "lon_right": 5.029249
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.313741,
  //   "lat_bottom": 52.313081,
  //   "lon_left": 4.936256,
  //   "lon_right": 4.938176
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.313063,
  //   "lat_bottom": 52.312403,
  //   "lon_left": 4.94311,
  //   "lon_right": 4.94503
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.304425,
  //   "lat_bottom": 52.303765,
  //   "lon_left": 4.981932,
  //   "lon_right": 4.983852
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.399709,
  //   "lat_bottom": 52.399049,
  //   "lon_left": 4.893733,
  //   "lon_right": 4.895653
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.384449,
  //   "lat_bottom": 52.383789,
  //   "lon_left": 4.899586,
  //   "lon_right": 4.901506
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.383768,
  //   "lat_bottom": 52.383108,
  //   "lon_left": 4.928328,
  //   "lon_right": 4.930248
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.393457,
  //   "lat_bottom": 52.392797,
  //   "lon_left": 5.025729,
  //   "lon_right": 5.027649
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.407403,
  //   "lat_bottom": 52.406743,
  //   "lon_left": 4.965875,
  //   "lon_right": 4.967795
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.423938,
  //   "lat_bottom": 52.423278,
  //   "lon_left": 5.004761,
  //   "lon_right": 5.006681
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.417609,
  //   "lat_bottom": 52.416949,
  //   "lon_left": 4.85679,
  //   "lon_right": 4.85871
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.401311,
  //   "lat_bottom": 52.400651,
  //   "lon_left": 4.892341,
  //   "lon_right": 4.894261
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.418018,
  //   "lat_bottom": 52.417358,
  //   "lon_left": 4.892996,
  //   "lon_right": 4.894916
  // },
  // {
  //   "name": "video1",
  //   "url": "https://res.cloudinary.com/dsrzfxhmy/video/upload/v1557523838/video1_t1uile.mp4",
  //   "lat_top": 52.401746,
  //   "lat_bottom": 52.401086,
  //   "lon_left": 4.931332,
  //   "lon_right": 4.933252
  // }
];

export { playVideo, hideVideo, showVideo, stopVideo, videoCoord }