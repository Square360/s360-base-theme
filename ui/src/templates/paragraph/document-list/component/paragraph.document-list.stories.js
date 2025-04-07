import documentListTwig from './paragraph.document-list.twig';
import documentListData from './paragraph.document-list.yml';
import './paragraph.document-list.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Document List' };

export const documentList = () => {
  let data = args ?? documentListData;

  return documentListTwig({
    ...data,
  });
}

documentList.args = documentListData;
