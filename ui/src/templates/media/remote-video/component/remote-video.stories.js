import remoteVideoTwig from './remote-video.twig';
import remoteVideoData from './remote-video.yml';
import './remote-video.js';

/**
 * Storybook Definition.
 */
export default { title: 'Media/Remote Video' };

export const remoteVideo = (args) => {
  return remoteVideoTwig({
    ...args,
  })
}
remoteVideo.args = remoteVideoData;
