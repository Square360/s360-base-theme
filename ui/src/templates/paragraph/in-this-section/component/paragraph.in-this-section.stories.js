import sectionMenuTwig from './section-menu.twig';
import sectionMenuData from './section-menu.yml';
import './paragraph.in-this-section.js';

import linkTwig from '@ui-base/link/_link.twig';
/**
 * Storybook Definition.
 */
export default { title: 'Components/Section Menu' };

export const sectionMenu = (args) => {
  return sectionMenuTwig({
    ...args,
    section_menu_parent_label_as_link: linkTwig({ ...args.section_menu_parent_label_as_link })
  });
}
sectionMenu.args = sectionMenuData;
