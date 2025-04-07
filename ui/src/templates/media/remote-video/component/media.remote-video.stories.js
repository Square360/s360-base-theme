import remoteVideoTwig from './media.remote-video.twig';
import remoteVideoData from './media.remote-video.yml';
import './media.remote-video.js';

/**
 * Storybook Definition.
 */
export default { title: 'Media/Remote Video' };

export const remoteVideo = (args) => {
  let data = args ?? remoteVideoData;

  return remoteVideoTwig({
    ...data,
  })
}
remoteVideo.args = remoteVideoData;
