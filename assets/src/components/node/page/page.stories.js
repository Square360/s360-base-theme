import pageTwig from './page.twig';
import pageData from './page.yml';
import './page.js';

import '../node.js';
import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Content Types/Page' };

export const page = () => {
  return pageTwig({
    ...pageData,
    attributes: new drupalAttribute(Object.entries(pageData.node_attributes)),
  });
}
