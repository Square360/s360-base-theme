import linkListTwig from './link-list.twig';
import linkListData from './link-list.yml';
import './link-list.js';

import fieldLinksTwig from '@ui-field/field--field-links.html.twig';
import linkTwig from '@ui-base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Link List' };

export const linkList = () => {
  let links = [];
  let fieldLinks;

  linkListData.paragraph_field_links.forEach(link => {
    links.push({ content: linkTwig({ ...link })});
    fieldLinks = fieldLinksTwig({ items: links });
  });

  return linkListTwig({
    ...linkListData,
    paragraph_field_links: fieldLinks,
  });
};
