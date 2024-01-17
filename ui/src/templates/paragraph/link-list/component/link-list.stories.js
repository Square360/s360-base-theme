import linkListTwig from './link-list.twig';
import linkListData from './link-list.yml';
import './link-list.js';

// import paragraphFieldLinksTwig from '../../field/paragraph-field-links.twig';
import linkTwig from '../../../base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Link List' };

export const linkList = () => {
  let links = [];
  let fieldLinks;

  linkListData.field_links.forEach(link => {
    links.push({ content: linkTwig({ ...link })});
    // fieldLinks = fieldLinksTwig({ field_items: links });
  });

  return linkListTwig({
    ...linkListData,
    field_links: fieldLinks,
  });
};
