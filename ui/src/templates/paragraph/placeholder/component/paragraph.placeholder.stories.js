import placeholderTwig from './paragraph.placeholder.twig';
import placeholderData from './paragraph.placeholder.yml';
import './paragraph.placeholder.js';

import { formatParagraphText, setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout Components/Placeholder',
  argTypes: {
    paragraph: { control: false }
  }
};

export const placeholder = (args) => {
  let data = Object.assign(placeholderData, args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

  return placeholderTwig({
    ...data,
    paragraph_field_body: formatParagraphText(data.paragraph_field_body)
  });
};
placeholder.args = placeholderData;
