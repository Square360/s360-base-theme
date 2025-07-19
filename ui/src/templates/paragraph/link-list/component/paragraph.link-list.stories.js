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
  argTypes: {
    paragraph: { control: false }
  }
};

export const linkList = (args) => {
  let data = Object.assign(linkListData, args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

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
