import imageTwig from './image.twig';
import imageData from './image.yml';
import './image.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Image' };

export const image = () => {
  return imageTwig({
    ...imageData,
    attributes: new drupalAttribute(Object.entries(imageData.paragraph_attributes)),
  });
};
