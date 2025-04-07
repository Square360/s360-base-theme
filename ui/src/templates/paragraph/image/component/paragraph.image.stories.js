import imageTwig from './paragraph.image.twig';
import imageData from './paragraph.image.yml';
import './paragraph.image.js';

import imgTwig from '@ui-base/img/_img.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Image' };

export const image = (args) => {
  let { paragraph_field_erm_image } = args ?? '';

  return imageTwig({
    paragraph_field_erm_image: imgTwig({
      image_src: paragraph_field_erm_image
    }),
  });
};
image.args = imageData;
