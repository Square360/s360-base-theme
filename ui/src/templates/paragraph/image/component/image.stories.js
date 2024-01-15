import imageTwig from './image.twig';
import imageData from './image.yml';
import './image.js';

import imgTwig from '../../../base/img/_img.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Image' };

export const image = () => {
  return imageTwig({
    ...imageData,
    field_erm_image: imgTwig({ ...imageData.field_erm_image }),
  });
}
