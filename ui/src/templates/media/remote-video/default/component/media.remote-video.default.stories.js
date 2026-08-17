import remoteVideoTwig from './media.remote-video.default.twig';
import remoteVideoData from './media.remote-video.default.yml';
import './media.remote-video.default.js';

/**
 * Storybook Definition.
 */
export default { title: 'Media/Remote Video' };

export const remoteVideo = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(remoteVideoData ?? {}), args);

  return remoteVideoTwig({
    ...data,
  })
}
remoteVideo.args = remoteVideoData;
