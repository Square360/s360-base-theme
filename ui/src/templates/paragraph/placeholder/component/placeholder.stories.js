import placeholderTwig from './placeholder.twig';
import placeholderData from './placeholder.yml';
import './placeholder.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = ({ field_title, field_body }) => {
  field_title = (field_title)
    ? field_title || placeholderData.field_title
    : '';
  field_body = (field_body)
    ? field_body || placeholderData.field_body
    : '';

  return placeholderTwig({
    field_title,
    field_body,
  });
}
placeholder.argTypes = {
  field_body: {
    name: 'label',
    control: {
      type: 'text',
    }
  },
  field_title: {
    name: 'label',
    control: {
      type: 'text',
    }
  }
}
placeholder.args = {
  field_title: placeholderData.field_title,
  field_body: placeholderData.field_body
}
