import placeholderTwig from './paragraph.placeholder.twig';
import placeholderData from './paragraph.placeholder.yml';
import './paragraph.placeholder.js';

import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = (args) => {
  let data = args ?? placeholderData;

  return placeholderTwig({
    ...data,
    paragraph_field_body: formatParagraphText(data.paragraph_field_body)
  });
};
placeholder.args = placeholderData;
