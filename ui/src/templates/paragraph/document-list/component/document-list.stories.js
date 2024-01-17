import documentListTwig from './document-list.twig';
import documentListData from './document-list.yml';
import './document-list.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Document List' };

const DOCUMENT_VIEW_MODE_OPTIONS = {
}

export const documentList = ({ documentViewMode }) => {
  return documentListTwig({
    ...documentListData,
    paragraph_field_document_view_mode: documentViewMode
  });
}

documentList.argTypes = {
  documentViewMode: {
    name: 'Document View Mode',
    options: Object.keys(DOCUMENT_VIEW_MODE_OPTIONS),
    control: {
      type: 'select',
      labels: DOCUMENT_VIEW_MODE_OPTIONS
    },
  }
};
documentList.args = {
  documentViewMode: '',
}
