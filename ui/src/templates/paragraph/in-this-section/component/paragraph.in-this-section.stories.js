import inThisSectionTwig from './paragraph.in-this-section.twig';
import inThisSectionData from './paragraph.in-this-section.yml';
import './paragraph.in-this-section.js';

import linkTwig from '@ui-base/link/_link.twig';
/**
 * Storybook Definition.
 */
export default { title: 'Components/In This Section' };

export const inThisSection = (args) => {
  return inThisSectionTwig({
    ...args,
    section_menu_parent_label_as_link: linkTwig({ ...args.section_menu_parent_label_as_link })
  });
}
inThisSection.args = inThisSectionData;
