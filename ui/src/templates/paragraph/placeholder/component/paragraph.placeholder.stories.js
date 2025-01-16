import placeholderTwig from './paragraph.placeholder.twig';
import placeholderData from './paragraph.placeholder.yml';
import './paragraph.placeholder.js';

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

placeholder.argTypes = {
  paragraph_field_title: {
    name: 'Title'
  },
  paragraph_field_body: {
    name: 'Body'
  }
};
placeholder.args = placeholderData;
