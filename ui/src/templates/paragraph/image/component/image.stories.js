import imageTwig from './image.twig';
import imageData from './image.yml';
import './image.js';

import imgTwig from '@ui-base/img/_img.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Image' };

export const image = (args) => {
  return imageTwig({
    paragraph_field_erm_image: imgTwig({ image_src: args.paragraph_field_erm_image }),
  });
};
image.args = imageData;
