import inThisSectionTwig from './paragraph.in-this-section.twig';
import inThisSectionData from './paragraph.in-this-section.yml';
import './paragraph.in-this-section.js';

import linkTwig from '@ui-base/link/_link.twig';
import { setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/In This Section',
  argTypes: {
    paragraph: { control: false }
  }
};

export const inThisSection = (args) => {
  let data = Object.assign(inThisSectionData, args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

  return inThisSectionTwig({
    ...data,
    section_menu_parent_label_as_link: linkTwig({ ...data.section_menu_parent_label_as_link })
  });
}
inThisSection.args = inThisSectionData;
