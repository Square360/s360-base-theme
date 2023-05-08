import remoteVideoTwig from './remote-video.twig';
import remoteVideoData from './remote-video.yml';
import './remote-video.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Media/Remote Video' };

export const remoteVideo = () => remoteVideoTwig({
  ...remoteVideoData,
  attributes: new drupalAttribute(Object.entries(remoteVideoData.media_attributes)),
});
