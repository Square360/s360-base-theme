import placeholderTwig from './paragraph.placeholder.twig';
import placeholderData from './paragraph.placeholder.yml';
import './paragraph.placeholder.js';

import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = (args) => {
  let { paragraph_field_title, paragraph_field_body } = args ?? '';

  paragraph_field_title = (paragraph_field_title)
    ? paragraph_field_title
    : placeholderData.paragraph_field_title;

  paragraph_field_body = (paragraph_field_body)
    ? paragraph_field_body
    : placeholderData.paragraph_field_body;

  return placeholderTwig({
    paragraph_field_title,
    paragraph_field_body: formatParagraphText(paragraph_field_body)
  });
};
placeholder.args = placeholderData;
