import { showIntroSlides, show, hide } from "./utils.js";
import { playLargeVideo, resizeVideo, videoPlayer } from "./video.js";
import { showVideoDetails } from "./footer.js";
import { findMarkerById, findIntervieweesById } from "./markers.js";
import { startMapStoryMode } from "./map.js";

const initFooter = () => {
  hide('.dropdown-container');
  hide('.control-container');
  hide('.footer-audio');
}

const stopVideoStory = () => {
  hide('.footer');
  hide("#video-wrapper");
  hide('.footer-tooltip');
  hide("#video-details");
}

const playVideoStory = (id, video_id, callback) => {
  const marker = findMarkerById(id);
  const interviewees = findIntervieweesById(id);
  const [longitude, latitude] = marker.geometry.coordinates;

  show('.footer');
  show("#video-wrapper");
  show('.footer-tooltip');
  show("#video-details");
  playLargeVideo(video_id);
  showVideoDetails({ ...marker.properties, longitude, latitude, interviewees });
  resizeVideo();

  videoPlayer.off('ended');
  videoPlayer.on('ended', callback);
}

const showAuthorSlides = () => {
  stopVideoStory();
  show('#intro');
  hide('.intro-actions');

  setTimeout(() => {
    hide('#intro');
    show('#author-slide');

  }, 6500);
}

const getStoryState = (state) => {

}

const startStory = () => {
  initFooter();
  showIntroSlides();

  setTimeout(() => {
    playVideoStory("33", 339823972, () => showAuthorSlides());
  }, 34000);

}

export { startStory }