import linkListTwig from './paragraph.link-list.twig';
import linkListData from './paragraph.link-list.yml';
import './paragraph.link-list.js';

import linkTwig from '@ui-base/link/_link.twig';
import { setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout Components/Link List',
  args: {
    paragraph_is_published: true,
  },
  argTypes: {
    paragraph_is_published: { name: 'Published' }
  }
};

export const linkList = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(linkListData ?? {}), args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published ?? true);

  let links = [];

  data.paragraph_field_links.forEach(link => {
    links.push(linkTwig({ link_text: link }));
  });

  return linkListTwig({
    ...data,
    paragraph_field_links: links
  });
};
linkList.args = linkListData;
