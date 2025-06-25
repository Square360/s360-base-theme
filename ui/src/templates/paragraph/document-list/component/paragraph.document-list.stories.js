import documentListTwig from './paragraph.document-list.twig';
import documentListData from './paragraph.document-list.yml';
import './paragraph.document-list.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Document List' };

export const documentList = (args) => {
  let data = Object.assign(documentListData, args);

  return documentListTwig({
    ...data,
  });
}

documentList.args = documentListData;
