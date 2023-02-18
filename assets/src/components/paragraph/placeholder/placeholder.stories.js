import placeholderTwig from './placeholder.twig';
import placeholderData from './placeholder.yml';
import './placeholder.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = ({ paragraph_field_title, paragraph_field_body }) => {
  return placeholderTwig({
    paragraph_field_title,
    paragraph_field_body,
    attributes: new drupalAttribute(Object.entries(placeholderData.paragraph_attributes)),
  });
}
