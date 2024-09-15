import placeholderTwig from './placeholder.twig';
import placeholderData from './placeholder.yml';
import './placeholder.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = (args) => {
  let { paragraph_field_title, paragraph_field_body } = args ?? '';

  paragraph_field_title = (paragraph_field_title)
    ? paragraph_field_title
    : placeholderData.paragraph_field_title;

  return placeholderTwig({
    paragraph_field_title,
    paragraph_field_body
  });
};
placeholder.args = placeholderData;
