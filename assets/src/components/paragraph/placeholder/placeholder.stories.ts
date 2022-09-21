import placeholderTwig from './placeholder.twig';
import placeholderData from './placeholder.yml';
import './placeholder.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Placeholder' };

export const placeholder = () => {
  return placeholderTwig({
    ...placeholderData,
    attributes: new drupalAttribute(Object.entries(placeholderData.paragraph_attributes)),
  });
}
