import htmlContentTwig from './html-content.twig';
import htmlContentData from './html-content.yml';
import './html-content.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Html Content' };

export const htmlContent = () => {
  return htmlContentTwig({
    ...htmlContentData,
    attributes: new drupalAttribute(Object.entries(htmlContentData.paragraph_attributes)),
  });
}
