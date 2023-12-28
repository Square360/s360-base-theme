import linkListTwig from './link-list.twig';
import linkListData from './link-list.yml';
import './link-list.js';

import paragraphFieldLinksTwig from '../../field/paragraph-field-links.twig';
import linkTwig from '../../../base/link/_link.twig';
import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Link List' };

export const linkList = () => {
  let links = [];
  let paragraphFieldLinks;

  linkListData.paragraph_field_links.forEach(link => {
    links.push({ content: linkTwig({ ...link })});
    paragraphFieldLinks = paragraphFieldLinksTwig({ field_items: links });
  });

  return linkListTwig({
    ...linkListData,
    paragraph_field_links: paragraphFieldLinks,
    attributes: new drupalAttribute(Object.entries(linkListData.paragraph_attributes)),
  });
};
