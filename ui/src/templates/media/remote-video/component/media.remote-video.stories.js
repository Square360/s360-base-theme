import remoteVideoTwig from './media.remote-video.twig';
import remoteVideoData from './media.remote-video.yml';
import './media.remote-video.js';

/**
 * Storybook Definition.
 */
export default { title: 'Media/Remote Video' };

export const remoteVideo = (args) => {
  let data = Object.assign(remoteVideoData, args);

  return remoteVideoTwig({
    ...data,
  })
}
remoteVideo.args = remoteVideoData;
