import viewBlockTwig from './view-block.twig';
import viewBlockData from './view-block.yml';
import './view-block.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/View Block' };

export const viewBlock = () => {
  return viewBlockTwig({
    ...viewBlockData,
    attributes: new drupalAttribute(Object.entries(viewBlockData.paragraph_attributes)),
  });
}
