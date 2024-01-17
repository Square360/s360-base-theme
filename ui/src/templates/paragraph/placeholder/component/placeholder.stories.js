import placeholderTwig from './placeholder.twig';
import placeholderData from './placeholder.yml';
import './placeholder.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = ({ paragraph_field_title, paragraph_field_body }) => {
  paragraph_field_title = (paragraph_field_title)
    ? paragraph_field_title || placeholderData.paragraph_field_title
    : '';
  paragraph_field_body = (paragraph_field_body)
    ? paragraph_field_body || placeholderData.paragraph_field_body
    : '';

  return placeholderTwig({
    paragraph_field_title,
    paragraph_field_body,
    attributes: new drupalAttribute(Object.entries(placeholderData.paragraph_attributes)),
  });
}
placeholder.argTypes = {
  paragraph_field_body: {
    name: 'label',
    control: {
      type: 'text',
    }
  },
  paragraph_field_title: {
    name: 'label',
    control: {
      type: 'text',
    }
  }
}
placeholder.args = {
  paragraph_field_title: placeholderData.paragraph_field_title,
  paragraph_field_body: placeholderData.paragraph_field_body
}
