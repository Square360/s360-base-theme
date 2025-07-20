import imageTwig from './paragraph.image.twig';
import imageData from './paragraph.image.yml';
import './paragraph.image.js';

import imgTwig from '@ui-base/img/_img.twig';
import { setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout Components/Image',
  argTypes: {
    paragraph: { control: false }
  }
};

export const image = (args) => {
  let data = Object.assign(imageData, args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

  return imageTwig({
    ...data,
    paragraph_field_erm_image: imgTwig({
      image_src: data.paragraph_field_erm_image
    }),
  });
};
image.args = imageData;
