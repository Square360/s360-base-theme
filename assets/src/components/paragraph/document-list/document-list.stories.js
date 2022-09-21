import documentListTwig from './document-list.twig';
import documentListData from './document-list.yml';
import './document-list.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Document List' };

export const documentList = () => {
  return documentListTwig({
    ...documentListData,
    attributes: new drupalAttribute(Object.entries(documentListData.paragraph_attributes)),
  });
}
