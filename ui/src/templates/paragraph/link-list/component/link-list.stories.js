import linkListTwig from './link-list.twig';
import linkListData from './link-list.yml';
import './link-list.js';

import linkTwig from '@ui-base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Link List' };

export const linkList = () => {
  let links = [];

  linkListData.paragraph_field_links.forEach(link => {
    links.push(linkTwig({ ...link }));
  });

  return linkListTwig({
    ...linkListData,
    paragraph_field_links: links,
  });
};
