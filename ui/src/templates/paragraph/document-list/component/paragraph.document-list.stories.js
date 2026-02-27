import documentListTwig from './paragraph.document-list.twig';
import documentListData from './paragraph.document-list.yml';
import './paragraph.document-list.js';

import { setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout Components/Document List',
  argTypes: {
    paragraph: { control: false }
  }
};

export const documentList = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(documentListData ?? {}), args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

  return documentListTwig({
    ...data,
  });
}

documentList.args = documentListData;
