import linkListTwig from './paragraph.link-list.twig';
import linkListData from './paragraph.link-list.yml';
import './paragraph.link-list.js';

import linkTwig from '@ui-base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Link List' };

export const linkList = () => {
  let { paragraph_field_links } = args ?? '';
  let links = [];

  paragraph_field_links.forEach(link => {
    links.push(linkTwig({ link_text: link }));
  });

  return linkListTwig({
    paragraph_field_links: links
  });
};
linkList.args = linkListData;
